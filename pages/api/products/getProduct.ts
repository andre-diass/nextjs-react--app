import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";
import { getProduct } from "@/services/products/getProduct";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productID = req.query.productId as string;
  try {
    const response = await getProduct(productID);
    return res.json(response);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
