import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("teste");

    const response = await api.post("/createProduct", req.body);
    console.log("Response:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
