import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userID = req.query.userId;
  try {
    const response = await api.get("/getProducts", {
      params: { userId: userID },
    });
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
