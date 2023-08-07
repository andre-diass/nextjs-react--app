import { signOut } from "next-auth/react";
import Navbar from "@/components/organisms/Navbar";
import { protectedRouteMiddleware } from "../../middlewares/protectedRouteMiddleware";

export default function App() {
  return (
    <>
      <div className="bg-blue-900 min-h-screen flex">
        <Navbar />
        <div className="bg-slate-900 flex-grow my-2 mr-2 rounded-lg p-4">
          logged in as {}
        </div>
        <button
          onClick={async () => {
            await signOut({ redirect: true, callbackUrl: "/" });
          }}
          className="bg-white dark:text-slate-950"
        >
          Sign out
        </button>
      </div>
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
