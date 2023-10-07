/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import { useEffect, useState } from "react";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";

interface Product {
  description: string;
  name: string;
  price: string;
  userId: string;
  __v: number;
  _id: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  async function makeGetRequest() {
    const userID = await axios.get("/api/accountID");

    const response = await axios.get("/api/products/getProducts", {
      params: { userId: userID.data },
    });

    setProducts(response.data);
  }
  useEffect(() => {
    makeGetRequest();
  }, []);

  return (
    <>
      <Link
        className="bg-slate-100 rounded-lg p-2 text-zinc-900"
        href={"/app/products/new"}
      >
        New product
      </Link>

      <table className="basic">
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Link href={"products/edit/" + product._id}>
                  <img src={edit.src} alt="Icon" width={22} height={16} />
                  Edit{" "}
                </Link>
                <Link href={"products/delete/" + product._id}>
                  <img src={trash.src} alt="Icon" width={22} height={16} />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
