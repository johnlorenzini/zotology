// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseFinal } from "@/lib/section/utils/parseFinal";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(req.url!, `http://${req.headers.host}`);

  const time = url.searchParams.get("time");

  res.status(200).json(parseFinal(time));
}
