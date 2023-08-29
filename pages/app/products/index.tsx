import Link from "next/link";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import { useEffect, useState } from "react";

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

    const response = await axios.get("/api/products", {
      params: { userId: userID.data },
    });
    console.log(response.data);

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
                <Link href={"/products/" + product._id}> Edit </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
