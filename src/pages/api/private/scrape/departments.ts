import type { NextApiRequest, NextApiResponse } from "next";
import { request, gql } from "graphql-request";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = gql`
    {
      allCourses {
        department
        department_name
        school
      }
    }
  `;

  const { data: schoolsData, error: schoolsError } = await supabase
    .from("schools")
    .select("id, name");

  const schoolsMap = new Map<string, string>(
    schoolsData?.map((school) => [school.name, school.id])
  );

  if (schoolsError) throw new Error("Failed to fetch schools.");

  const courses = await request<{
    allCourses: {
      department: string;
      department_name: string;
      school: string;
    }[];
  }>("https://api.peterportal.org/graphql/", query);

  const departments = Array.from(
    new Map(
      courses.allCourses.map((course) => [
        course.department_name,
        {
          name: course.department_name ?? null,
          code: course.department ?? null,
          school_id: schoolsMap.get(course.school) ?? null,
        },
      ])
    ).values()
  );

  const { data, error } = await supabase
    .from("departments")
    .upsert(departments, {
      ignoreDuplicates: false,
      onConflict: "name",
    })
    .select();

  res.status(200).json({
    departments,
    data,
  });
}
