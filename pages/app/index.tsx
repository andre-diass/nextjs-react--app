/* eslint-disable @next/next/no-img-element */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  return (
    <>
      <div className="text-gray-800 justify-between flex flex-row md:flex-col">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div>
          <img
            src={session?.user?.image ?? ""}
            alt=""
            className="w-20 h-20 rounded-md md:mt-3"
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
