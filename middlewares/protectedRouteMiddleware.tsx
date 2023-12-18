import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export async function protectedRouteMiddleware({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  console.log("THE AUTH ROUTE HAS BEEN CALLED AGAIN");
  console.log(session?.apiToken);

  if (session === null) {
    return {
      notFound: true,
      redirect: {
        destination: "/", // Replace with your desired destination path
        permanent: true, // Set to true if the redirect is permanent
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
