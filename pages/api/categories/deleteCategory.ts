import api from "@/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categoryId = req.query.categoryId;
  try {
    const response = await api.delete("/deleteCategory/" + categoryId);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
