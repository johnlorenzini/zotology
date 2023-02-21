import type { NextApiRequest, NextApiResponse } from "next";
import type { IContents } from "@alexanderliu/cheerio-table-parser";
import { parse } from "node-html-parser";
import { parseTable } from "@alexanderliu/cheerio-table-parser";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(
    new URL(
      "https://reg.uci.edu/calendars/quarterly/2022-2023/quarterly22-23.html"
    )
  );
  let doc = parse(await result.text());

  const elements = doc.querySelectorAll("h2, .calendartable");
  const titleCalendars: [HTMLElement, HTMLElement][] = [];
  const findCalendarElementIndex = () =>
    elements.findIndex((element) =>
      element.classList.contains("calendartable")
    );
  let calendarElementIndex = findCalendarElementIndex();
  while (calendarElementIndex !== -1) {
    // @ts-ignore
    titleCalendars.push(elements.splice(calendarElementIndex - 1, 2));

    calendarElementIndex = findCalendarElementIndex();
  }

  const calendarList = ["Enrollment", "Fee Payment", "Quarter Activity"];
  const calendars = titleCalendars
    .filter(([titleElement]) =>
      calendarList.includes(titleElement.textContent!)
    )
    .map(([titleElement, calendarElement]) =>
      parseCalendar(titleElement.innerText, calendarElement)
    );

  const { data, error } = await supabase
    .from("dates")
    .upsert(calendars.flat(2), {
      ignoreDuplicates: false,
      onConflict: "term_id, title",
    })
    .select();

  res.status(200).json({ calendars, data, error });
}

const categorizeRow = (row: IContents) => {
  if (Object.keys(row).length === 1) return "category";
  if (Object.values(row)[0].toString().startsWith("\xA0\xA0"))
    return "indented";
  return "regular";
};

const parseCalendar = (tableName: string, calendar: HTMLElement) => {
  const table = parseTable(calendar.toString(), {
    headerIsFirstLine: true,
    trim: false,
  }).map((row) => ({
    type: categorizeRow(row),
    values: row,
  }));

  let output = [];
  let group: string | null = null;
  for (const i in table) {
    const j = parseInt(i);
    const { type, values } = table[j];
    const { "": label, ...dates } = values;
    if (type === "category") group = label.toString();

    for (const term in dates) {
      const date = dates[term];
      output.push({
        term,
        type,
        ...(type === "indented" ? { group } : {}),
        label: label
          .toString()
          .replaceAll("\xA0", "")
          .replaceAll(/( )+/g, " ")
          .trim(),
        date: date
          .toString()
          .replaceAll("\xA0", "")
          .replaceAll(/( )+/g, " ")
          .trim(),
      });
    }
  }

  output = output.filter(({ type }) => type !== "category");
  output = output.map(({ type, ...output }) => output);

  const labelFilters = [
    "Enrollment by window",
    "Open Enrollment",
    "Final examinations",
  ];
  output = output.filter(({ label }) => {
    for (const labelFilter of labelFilters) {
      if (label.startsWith(labelFilter)) return false;
    }
    return true;
  });

  const termYears = new Map([
    ["fall2022", 2022],
    ["winter2023", 2022],
    ["spring2023", 2023],
  ]);
  const pastDate = new Map<string, Date | null>([
    ["fall2022", null],
    ["winter2023", null],
    ["spring2023", null],
  ]);

  for (const i in output) {
    const { term, date } = output[i];

    const dateObject = new Date(date);
    const year = termYears.get(term)!;
    dateObject.setFullYear(year);

    if (pastDate.get(term) === null) pastDate.set(term, dateObject);
    if (dateObject < pastDate.get(term)!) {
      termYears.set(term, year + 1);
      dateObject.setFullYear(termYears.get(term)!);
    }

    output[i] = {
      ...output[i],
      // @ts-ignore
      date: dateObject,
    };
  }

  const termMap = new Map<string, string>([
    ["fall2022", "495b3cde-e801-494c-9f32-e296bd5d6fa8"],
    ["winter2023", "cbf835e0-5329-45b5-ae1f-c8207b0894f1"],
    ["spring2023", "d26e7668-b92a-4afb-a3f6-7391ec88b637"],
  ]);

  for (const i in output) {
    const { term } = output[i];

    output[i] = {
      ...output[i],
      term: termMap.get(term)!,
      // @ts-ignore
      table: tableName,
    };
  }

  // @ts-ignore
  output = output.map(({ label, date, group, term, table }) => ({
    title: label ?? null,
    date: date ?? null,
    group: group ?? null,
    term_id: term ?? null,
    table: table ?? null,
  }));

  return output as unknown as {
    title: string;
    date: Date;
    group?: string | null;
    term_id: string;
    table: string;
  }[];
};
