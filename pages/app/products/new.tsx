import { protectedRouteMiddleware } from "../../../middlewares/protectedRouteMiddleware";

export default function NewProduct() {
  return (
    <>
      <p>this is the create app route</p>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
