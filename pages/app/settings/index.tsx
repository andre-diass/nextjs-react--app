/* eslint-disable @next/next/no-img-element */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { GetServerSidePropsContext } from "next";
import tool from "@/public/tool.svg";

export default function Settings() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={tool.src} alt="" width={35} height={35} />

      <p className="text-black text-lg">Page under development</p>
    </div>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  return {
    props: {
      ...props,
    },
  };
};
