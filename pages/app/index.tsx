import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function App() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <p> this is the app protected page</p>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) return { redirect: { destination: "/" } };

  return { props: {} };
}
