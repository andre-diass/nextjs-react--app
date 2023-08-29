import { NextApiRequest, NextApiResponse } from "next";
import api from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    try {
      const response = await api.post("/createProduct", req.body);
      console.log("Response:", response.data);
      return res.json(response.data);
    } catch (error) {
      console.error("Error in API handler:", error);
    }
  }

  if (method === "GET") {
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
}
