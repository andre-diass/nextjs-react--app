import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getUser } from "@/services/getUserId";

export default function Categories({ userId }: any) {
  const [name, setName] = useState<string>("");

  async function saveCategory() {
    event?.preventDefault();
    await axios.post("/api/categories/addCategory", {
      category: name,
      userId: userId,
    });
  }

  return (
    <>
      <h1 className="text-xl mb-4">Categories</h1>
      <Label className="text-white">New category name</Label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <TextInput
          className="text-black min-w-fit"
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-default">
          Save
        </button>
      </form>
    </>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  const userEmail = props?.session.user?.email as string;

  const user = await getUser(userEmail);
  console.log(user);

  return {
    props: {
      ...props,
      userId: user?._id,
      //data: data as any,
    },
  };
};
