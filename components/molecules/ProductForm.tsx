/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import upload from "@/public/upload.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { BounceLoader, GridLoader, HashLoader } from "react-spinners";
import { getCategories } from "@/services/categories/getCategories";

interface IForm {
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function ProductForm(props: any) {
  const form = useForm<IForm>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [images, setImages] = useState(props.imageLinks || []);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const uploadImages = async (event: any) => {
    setIsImageLoading(true);
    const files = event.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      await axios
        .post("/api/products/uploadImages", data, {
          params: { productId: props.productId },
        })
        .then((res) => {
          setImages((oldImages: any) => {
            return [...oldImages, ...res.data.links];
          });
        })
        .finally(() => setIsImageLoading(false));
    }
  };

  const deleteImage = async (indexToDelete: number) => {
    try {
      await axios
        .post("/api/products/deleteImage", {
          imageSrc: images[indexToDelete],
        })
        .then((res) => {
          const updatedImages = images.filter(
            (_: any, index: number) => index !== indexToDelete
          );
          console.log(res);

          setImages(updatedImages);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: IForm) => {
    props.onSubmit({ ...data, imageLinks: images });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex m-10 mx-20 flex-col gap-4  "
      >
        <h1 className="text-xl font-medium dark:text-white">{props.heading}</h1>
        <div>
          <Label
            className="text-slate-200"
            htmlFor="productName"
            value="Nome do produto"
          />
          <TextInput
            id="productName"
            type="string"
            className="mt-2"
            placeholder={props.name}
            {...register("name", {
              required: {
                value: props.isInputRequired,
                message: "Nome do produto é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <Label
            className="text-slate-200 block"
            htmlFor="category"
            value="Category"
          />
          <select
            className="my-2 rounded-lg text-black"
            {...register("category")}
          >
            <option value="">uncategorized</option>
            {props.categories.length > 0 &&
              props.categories.map((e: any) => (
                <option key={e._id} value={e._name}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <Label className="text-slate-200" htmlFor="email" value="Descrição" />
          <TextInput
            id="productDescription"
            type="string"
            className="mt-2"
            placeholder={props.description}
            style={{ height: "80px" }}
            {...register("description")}
          />
        </div>

        <Label
          className="text-slate-200"
          htmlFor="productPrice"
          value="Photos"
        />
        <div className="flex flex-wrap gap-2">
          {!!images?.length &&
            images.map((link: string, index: number) => (
              <div key={link} className="h-24 relative">
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
            <div className="max-h-24 p-3">
              <BounceLoader color="#233876" />
            </div>
          )}

          <div>
            <label className="flex cursor-pointer text-sm gap-1 w-24 h-24 text-center justify-center items-center text-gray-500 rounded-md bg-gray-200">
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
        </div>

        <div>
          <Label
            className="text-slate-200"
            htmlFor="productPrice"
            value="Preço"
          />
          <TextInput
            id="productPrice"
            type="number"
            className="mt-2"
            placeholder={props.price}
            {...register("price", {
              required: {
                value: props.isInputRequired,
                message: "Preço é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>
        <button type="submit"> Submit </button>
      </form>
    </>
  );
}
