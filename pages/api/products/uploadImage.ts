import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import mime from "mime-types";

interface ParsedFiles {
  file: any;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new multiparty.Form();

  const parseFormPromise = new Promise<ParsedFiles>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  const clientConfig: S3ClientConfig = {
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY as string,
      secretAccessKey: process.env.SECRET_KEY as string,
    },
  };

  const client = new S3Client(clientConfig);

  const files = await parseFormPromise;

  const productID = req.query.productId;
  const links = [];

  for (const file of files.file) {
    const newFileName = productID + Date.now().toString();

    await client.send(
      new PutObjectCommand({
        Bucket: "upload-png-4567",
        Key: newFileName,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path) || undefined,
      })
    );

    const link = `https://${process.env.BUCKET_NAME}.s3.us-west-1.amazonaws.com/${newFileName}`;
    links.push(link);
  }

  return res.status(200).json({ links });
}

export const config = { api: { bodyParser: false } };
