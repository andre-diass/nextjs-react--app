import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";

export default function App() {
  return (
    <>
      <p> teste . isso dever ir dentro do componente main </p>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;

/*
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) return { redirect: { destination: "/" } };

  return { props: {} };
}
*/
