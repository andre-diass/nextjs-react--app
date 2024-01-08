import api from "@/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await api.post("/addCategory", req.body);
    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
