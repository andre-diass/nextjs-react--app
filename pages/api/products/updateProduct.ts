import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productID = req.query.productId;
  try {
    const response = await api.put("/updateProduct", req.body, {
      params: { productId: productID },
    });
    console.log("Response:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
