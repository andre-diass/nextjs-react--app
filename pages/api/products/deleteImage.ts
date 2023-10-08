import { NextApiRequest, NextApiResponse } from "next";
import {
  DeleteObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";

export default async function deleteImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageSrc = req.body.imageSrc;
  const url = new URL(imageSrc);
  const pathname = url.pathname;
  const segments = pathname.split("/");
  const objectKey = segments[segments.length - 1] as string;

  console.log(typeof objectKey);

  const clientConfig: S3ClientConfig = {
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY as string,
      secretAccessKey: process.env.SECRET_KEY as string,
    },
  };

  const client = new S3Client(clientConfig);

  try {
    const data = await client.send(
      new DeleteObjectCommand({ Bucket: "upload-png-4567", Key: objectKey })
    );
    console.log("Success. Object deleted.", data);
    return res.status(200).json({ message: "Success. Object deleted." });
  } catch (error) {
    console.log("Error", error);
  }
}
