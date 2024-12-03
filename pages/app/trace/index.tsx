/* eslint-disable @next/next/no-img-element */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { getLocation } from "@/services/location/getLocation";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./map"), {
  ssr: false,
});

interface Props {
  locations: any;
}

export default function Settings({ locations }: Props) {
  return (
    <div className="flex items-center justify-center h-screen pb-8 pt-6 px-5">
      <DynamicMap locations={locations}></DynamicMap>
    </div>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  const locations = await getLocation();
  const serializedLocations = JSON.parse(JSON.stringify(locations));

  console.log(serializedLocations);

  return {
    props: {
      ...props,
      locations: serializedLocations,
    },
  };
};
