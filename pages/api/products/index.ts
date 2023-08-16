import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      "https://ske84d6xyj.execute-api.us-west-1.amazonaws.com/dev/serverlessSetup/createProduct",
      req.body
    );
    console.log("Response:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
  }
}
