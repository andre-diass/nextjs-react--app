import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Navbar from "@/components/organisms/Navbar";

export default function App() {
  const session = useSession();
  return (
    <>
      <div className="bg-blue-900 min-h-screen flex">
        <Navbar />
        <div className="bg-slate-900 flex-grow my-2 mr-2 rounded-lg p-4">
          logged in as {}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) return { redirect: { destination: "/" } };

  return { props: {} };
}
