import { protectedRouteMiddleware } from "../../middlewares/protectedRouteMiddleware";

export default function Products() {
  return <p>this is the app products page</p>;
}

export const getServerSideProps = protectedRouteMiddleware;
