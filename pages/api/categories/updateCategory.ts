import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categoryID = req.body.categoryId;
  try {
    const response = await api.put("/updateCategory/" + categoryID, req.body);
    console.log("Response:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
