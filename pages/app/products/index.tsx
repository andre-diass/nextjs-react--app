import Link from "next/link";
import { protectedRouteMiddleware } from "../../../middlewares/protectedRouteMiddleware";

export default function Products() {
  return (
    <>
      <Link href={"/app/products/new"}> New product </Link>
      <p>this is the app products page</p>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
