import { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "@/services/products/getProducts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userID = req.query.userId as string;
  try {
    const response = await getProducts(userID);
    return res.json(response);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
