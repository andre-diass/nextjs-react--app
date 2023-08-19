import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const client = await clientPromise;
    const db = client.db("test");

    const collection = db.collection("users");

    const user = await collection.findOne({ email: session?.user?.email });
    const userId = user?._id;
    const idNumber = userId?.toString();

    if (!user) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(idNumber);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/*
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const uri = process.env.MONGODB_URI;
  const options = {};

  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    const database = client.db("test");
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ email: "adsf@poli.br" });
    console.log(user);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  } finally {
    client.close();
  }
};
*/
