import Link from "next/link";
import { protectedRouteMiddleware } from "../../../middlewares/protectedRouteMiddleware";
import axios from "axios";

export default function Products() {
  async function makeGetRequest() {
    const userID = await axios.get("/api/accountID");

    const newResponse = await axios.get("/api/products", {
      params: { userId: userID.data },
    });
    /*
    const response = await axios.get(
      "https://ske84d6xyj.execute-api.us-west-1.amazonaws.com/dev/serverlessSetup/getProduct",
      { params: { userId: userID.data } }
    );
    */
    console.log(newResponse.data);
  }

  return (
    <>
      <Link
        className="bg-slate-100 rounded-lg p-2 text-zinc-900"
        href={"/app/products/new"}
      >
        New product
      </Link>
      <p className="mt-4">this is the app products page</p>
      <button
        onClick={makeGetRequest}
        className="bg-white text-black p-2 rounded-lg mt-5"
      >
        Make get request
      </button>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
