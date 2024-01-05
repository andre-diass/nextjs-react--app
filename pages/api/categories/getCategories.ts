import { getCategories } from "@/services/categories/getCategories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userID = req.query.userId as string;

  try {
    const response = await getCategories(userID);
    console.log("testeeeee", response);

    return res.json(response);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
