/* eslint-disable @next/next/no-img-element */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../orders/map"), {
  ssr: false,
});

export default function Settings() {
  return (
    <div className="flex items-center justify-center h-screen pb-8 pt-6 px-5">
      <DynamicMap></DynamicMap>
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
