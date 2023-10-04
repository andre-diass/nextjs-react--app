import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      if (err) {
        // Handle parsing errors
        res.status(400).json({ error: "Error parsing form data" });
        return;
      }

      // Log the fields and files to inspect the data
      console.log(files.file);
      console.log();

      // Process the data as needed

      // Send a response to the client
      res.status(200).json({ message: "Data received successfully" });
    });
  } else {
    res.status(405).end(); // Method not allowed
  }
}
export const config = { api: { bodyParser: false } };
