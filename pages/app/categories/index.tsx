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

  const [isSaving, setIsSaving] = useState<boolean>(false);
  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories/getCategories", {
        params: { userId: userId },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function saveCategory(event: any) {
    event?.preventDefault();
    setIsSaving(true);

    if (editedCategory) {
      await axios
        .put("/api/categories/updateCategory", {
          name: name,
          categoryId: editedCategory?._id,
        })
        .then(() => setIsSaving(false));
      setEditedCategory(null);
    } else {
      await axios
        .post("/api/categories/addCategory", {
          name: name,
          userId: userId,
        })
        .then(() => setIsSaving(false));
      fetchCategories();
    }

    fetchCategories();
  }

  function handleEditButton(category: any) {
    setEditedCategory(category);
    setName(category.name);
  }

  async function handleDeleteButton(category: ICategory) {
    try {
      await axios
        .delete("/api/categories/deleteCategory", {
          params: { categoryId: category._id },
        })
        .then(() => fetchCategories());
    } catch (error) {}
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
          className="text-black block"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-default">
          {!isSaving ? "Save" : "Saving"}
        </button>
      </form>

      <CustomTable
        cols={cols}
        actionCols={actionCols}
        data={categories}
        type="category"
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

  return {
    props: {
      ...props,
      userId: userId,
      savedCategories: categories,
    },
  };
};
