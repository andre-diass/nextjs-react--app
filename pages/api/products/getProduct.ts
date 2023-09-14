import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productID = req.query.productId;
  try {
    console.log(productID);

    const response = await api.get("/getProduct", {
      params: { productId: productID },
    });
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
