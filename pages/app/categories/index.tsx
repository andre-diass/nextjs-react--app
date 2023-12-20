import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getUser } from "@/services/user/getUserId";
import { getCategories } from "@/services/categories/getCategories";

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

  async function handleDeleteButton(categoryID: string) {
    await axios.delete("/api/categories/deleteCategory", {
      params: { categoryId: categoryID },
    });
    fetchCategories();
  }

  return (
    <>
      <h1 className="text-xl mb-4">Categories</h1>
      <Label className="text-white">
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </Label>
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

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category: any) => (
              <tr key={category?._id}>
                <td>{category?.name}</td>
                <div className="flex">
                  <td>
                    <button
                      onClick={() => handleEditButton(category)}
                      className="btn-default mr-1"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDeleteButton(category?._id)}
                      className="btn-default"
                    >
                      delete
                    </button>
                  </td>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
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
