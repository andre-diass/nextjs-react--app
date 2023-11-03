import api from "@/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const response = await api.post("/addCategory", req.body);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
