import { NextApiRequest, NextApiResponse } from "next";
import api, { api_monolith } from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await api_monolith.post("/devices", req.body);
    console.log("Response:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
