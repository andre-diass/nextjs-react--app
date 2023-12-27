import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getCategories } from "@/services/categories/getCategories";
import CustomTable from "@/components/templates/CustomTable";

export default function Categories({ userId, savedCategories }: any) {
  interface ICategory {
    _id?: string;
    name?: number;
  }
  const [name, setName] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>(savedCategories);
  const [editedCategory, setEditedCategory] = useState<ICategory | null>(null);
  async function fetchCategories() {
    const response = await getCategories(userId);
    setCategories(response);
  }

  async function saveCategory(event: any) {
    event?.preventDefault();

    if (editedCategory) {
      await axios.put("/api/categories/updateCategory", {
        name: name,
        categoryId: editedCategory?._id,
      });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories/addCategory", {
        name: name,
        userId: userId,
      });
      fetchCategories();
    }

    fetchCategories();
  }

  function handleEditButton(category: any) {
    setEditedCategory(category);
    setName(category.name);
  }

  async function handleDeleteButton(category: ICategory) {
    await axios.delete("/api/categories/deleteCategory", {
      params: { categoryId: category._id },
    });
    fetchCategories();
  }
  const cols = [{ key: "name", label: "Name" }];

  const actionCols = [
    {
      label: "",
      render: (item: ICategory) => (
        <>
          <button
            onClick={() => handleEditButton(item)}
            className="btn-default mr-1"
          >
            Edit
          </button>
          <button onClick={() => handleDeleteButton(item)} className="btn-red">
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-xl mb-4 text-black">Categories</h1>
      <label className="text-black ">
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
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

      <CustomTable
        cols={cols}
        actionCols={actionCols}
        data={categories}
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

  const categories = await getCategories(userId);
  console.log(categories);

  return {
    props: {
      ...props,
      userId: userId,
      savedCategories: categories,
      //data: data as any,
    },
  };
};
