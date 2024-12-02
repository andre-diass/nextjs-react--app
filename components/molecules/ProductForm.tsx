/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import upload from "@/public/upload.svg";
import axios from "axios";
import { useState } from "react";
import { BounceLoader } from "react-spinners";
import IProduct, { Device } from "@/types/products";
import ICategory from "@/types/categories";
interface Props {
  onSubmit: (data: any) => Promise<void>;
  categories: Array<ICategory>;
  product?: Device;
  formType: "EditProduct" | "CreateProduct";
}

export const FormProperties = {
  EditProduct: {
    heading: "Editar Produto",
    isInputRequired: true,
    buttonLabel: "Editar",
  },
  CreateProduct: {
    heading: "Novo Rastreador",
    isInputRequired: true,
    buttonLabel: "Adicionar",
  },
};

export default function ProductForm({
  onSubmit,
  categories,
  product,
  formType,
}: Props) {
  const form = useForm<Device>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  // const [images, setImages] = useState(product?.imageLinks || []);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   const uploadImages = async (event: any) => {
  //     setIsImageLoading(true);
  //     const files = event.target?.files;
  //     if (files.length > 0) {
  //       const data = new FormData();
  //       for (const file of files) {
  //         data.append("file", file);
  //       }
  //
  //       await axios
  //         .post("/api/products/uploadImages", data, {
  //           params: { productId: product?.productId },
  //         })
  //         .then((res) => {
  //           setImages((oldImages: any) => {
  //             return [...oldImages, ...res.data.links];
  //           });
  //         })
  //         .finally(() => setIsImageLoading(false));
  //     }
  //   };
  //
  //   const deleteImage = async (indexToDelete: number) => {
  //     try {
  //       await axios
  //         .post("/api/products/deleteImage", {
  //           imageSrc: images[indexToDelete],
  //         })
  //         .then((res) => {
  //           const updatedImages = images.filter(
  //             (_: any, index: number) => index !== indexToDelete
  //           );
  //           console.log(res);
  //
  //           setImages(updatedImages);
  //         });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const onSubmitt = async (data: any) => {
    onSubmit({ ...data });
    setIsLoading(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitt)}
        noValidate
        className="flex my-5 mx-5 md:my-10 md:mx-20 z-10 flex-col gap-4 bg-white p-6 rounded-md shadow-md"
      >
        <h1 className="text-xl font-medium text-black dark:text-white">
          {FormProperties[formType].heading}
        </h1>
        {/* <div>
          <Label
            className="text-black dark:text-white"
            htmlFor="productName"
            value="IMEI"
          />
          <TextInput
            id="productName"
            type="string"
            className="mt-2 bg-gray-100 rounded-md"
            {...register("name", {
              required: {
                value: FormProperties[formType].isInputRequired,
                message: "Nome do produto é obrigatório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div> */}
        {/* <div>
          <Label
            className="text-black dark:text-white block"
            htmlFor="category"
            value="Categoria"
          />
          <select
            className="my-2 rounded-lg text-black bg-gray-100"
            {...register("category")}
          >
            <option value="">uncategorized</option>
            {categories.length > 0 &&
              categories.map((e: any) => (
                <option key={e._id} value={e._name}>
                  {e.name}
                </option>
              ))}
          </select>
        </div> */}
        {/* <div>
          <Label
            className="text-black dark:text-white"
            htmlFor="email"
            value="Descrição"
          />
          <TextInput
            id="productDescription"
            type="string"
            className="mt-2 bg-gray-100 rounded-md"
            style={{ height: "80px" }}
            {...register("description")}
          />
        </div> */}

        {/* <Label
          className="text-black dark:text-white"
          htmlFor="productPrice"
          value="Photos"
        />
        <div className="flex flex-wrap gap-2">
          {!!images?.length &&
            images.map((link: string, index: number) => (
              <div
                key={link}
                className="h-24 relative bg-white border border-gray-200 rounded-md hover:blur-sm transition-transform transform-gpu"
              >
                <img
                  className="max-h-24 rounded-md hover:blur-sm transition-transform transform-gpu "
                  onClick={(e) => deleteImage(index)}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  src={link}
                  alt="link"
                />
              </div>
            ))}
          {isImageLoading && (
            <div className="max-h-24 p-3 bg-white">
              <BounceLoader color="#233876" />
            </div>
          )}

          <div>
            <label className="flex cursor-pointer text-sm gap-1 w-24 h-24 text-center justify-center items-center text-gray-500 rounded-md bg-gray-100">
              <img src={upload.src} alt="upload" width={22} height={22} />
              Upload{" "}
              <input
                onChange={uploadImages}
                multiple
                className="hidden"
                type="file"
              ></input>
            </label>
          </div>
        </div> */}

        <div>
          <Label
            className="text-black dark:text-white"
            htmlFor="productPrice"
            value="IMEI"
          />
          <TextInput
            id="productPrice"
            type="number"
            className="mt-2 bg-gray-100 rounded-md"
            {...register("IMEI", {
              required: {
                value: FormProperties[formType].isInputRequired,
                message: "IMEI é obrigatório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.IMEI?.message}</p>
        </div>
        <button
          type="submit"
          className="text-white max-w-xs self-center
           bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          {!isLoading ? "Adicionar" : "Adicionando"}
        </button>
      </form>
    </>
  );
}
