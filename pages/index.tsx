import Home from "@/components/templates/Home";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Index() {
  const { data: session } = useSession();

  return <Home />;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) return { redirect: { destination: "/app/" } };
  return { props: {} };
}
