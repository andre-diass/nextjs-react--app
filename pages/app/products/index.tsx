import Link from "next/link";
import { protectedRouteMiddleware } from "../../../middlewares/protectedRouteMiddleware";

export default function Products() {
  return (
    <>
      <Link
        className="bg-slate-100 rounded-lg p-2 text-zinc-900"
        href={"/app/products/new"}
      >
        {" "}
        New product{" "}
      </Link>
      <p className="mt-4">this is the app products page</p>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
