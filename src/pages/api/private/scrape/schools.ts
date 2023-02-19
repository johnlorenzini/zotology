import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(
    new URL("https://catalogue.uci.edu/schoolsandprograms/")
  );
  let doc = parse(await result.text());

  const schools = doc
    .querySelectorAll("#textcontainer > h4 > a")
    .map((school) => ({
      name: school.textContent,
    }));

  const { data, error } = await supabase
    .from("schools")
    .upsert(schools, {
      ignoreDuplicates: false,
      onConflict: "name",
    })
    .select();

  res.status(200).json({
    data,
    schools,
  });
}
