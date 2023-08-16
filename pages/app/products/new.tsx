import { protectedRouteMiddleware } from "../../../middlewares/protectedRouteMiddleware";
import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";

interface FormData {
  name: string;
  description: string;
  price: number;
}

export default function NewProduct() {
  const form = useForm<FormData>();
  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  async function makePostRequest(body: any) {
    axios.post("/api/products", body).catch((x) => console.error(x));
  }

  const onSubmit = (data: any) => {
    console.log(data);
    makePostRequest(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex m-10 mx-20 flex-col gap-4  "
      >
        <h1 className="text-xl font-medium dark:text-white">Novo Produto</h1>
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
            {...register("name", {
              required: {
                value: true,
                message: "Nome do produto é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <Label className="text-slate-200" htmlFor="email" value="Descrição" />
          <TextInput
            id="productDescription"
            type="string"
            className="mt-2"
            style={{ height: "80px" }}
            {...register("description")}
          />
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
            {...register("price", {
              required: {
                value: true,
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

export const getServerSideProps = protectedRouteMiddleware;
