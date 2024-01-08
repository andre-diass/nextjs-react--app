import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export async function protectedRouteMiddleware({
  req,
  res,
}: GetServerSidePropsContext) {
  const session: any = await getServerSession(req, res, authOptions);
  const apiToken = session.apiToken;
  const userId = session.userId;

  if (session === null) {
    return {
      notFound: true,
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {
      session,
      userId,
      apiToken,
    },
  };
}
