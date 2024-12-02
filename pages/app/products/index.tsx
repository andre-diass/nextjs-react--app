/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { GetServerSidePropsContext } from "next";
import { getProducts } from "@/services/products/getProducts";
import CustomTable from "@/components/templates/CustomTable";
import IProduct, { DeviceArray } from "@/types/products";
import { getDevices } from "@/services/location/getDevices";

interface Props {
  devices: Array<DeviceArray>;
}

export default function Products({ devices }: Props) {
  const cols = [
    { key: "IMEI", label: "IMEI" },
    // { key: "price", label: "Price" },
    { key: "id", label: "ID" },
    // { key: "createdAt", label: "Created At" },
  ];

  const actionCols = [
    {
      label: "",
      render: (item: DeviceArray) => (
        <>
          <div className="flex gap-1">
            <Link
              className="flex bg-blue-800 p-2 text-white rounded-md"
              href={"products/edit/" + item.id}
            >
              <img
                className="hidden md:block"
                src={edit.src}
                alt="Icon"
                width={22}
                height={16}
              />
              <p> Edit </p>
            </Link>

            <Link
              className="flex bg-red-600 p-2 text-white rounded-md"
              href={"products/delete/" + item.id}
            >
              <img
                className="hidden md:block"
                src={trash.src}
                alt="Icon"
                width={22}
                height={16}
              />
              <p> Delete</p>
            </Link>
          </div>
        </>
      ),
    },
  ];

  const customDataRender = {
    createdAt: (item: IProduct) => new Date(item.createdAt).toLocaleString(),
  };

  return (
    <>
      <Link
        className="bg-blue-800 rounded-lg p-2 text-white"
        href={"/app/products/new"}
      >
        Novo rastreador
      </Link>
      <CustomTable
        cols={cols}
        actionCols={actionCols}
        data={devices}
        customDataRender={customDataRender}
        type="product"
      ></CustomTable>
    </>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  const userId = props?.userId;

  // const products = await getProducts(userId);
  const devices = await getDevices(userId);
  console.log(devices);

  // console.log(products);

  return {
    props: {
      ...props,
      userId: userId,
      devices: devices,
    },
  };
};
