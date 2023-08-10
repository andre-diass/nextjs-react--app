import { protectedRouteMiddleware } from "../../../middlewares/protectedRouteMiddleware";
import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function NewProduct() {
  const form = useForm<FormData>();
  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  async function makePostRequest(body: any) {
    try {
      const response = await axios.post("teste", body);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
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
        <h1 className="text-xl font-medium dark:text-white">Teste</h1>
        <div>
          <Label
            className="text-slate-200"
            htmlFor="nome completo"
            value="Nome completo"
          />
          <TextInput
            id="fullName"
            type="name"
            className="mt-2"
            {...register("name", {
              required: {
                value: true,
                message: "Nome é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <Label className="text-slate-200" htmlFor="email" value="email" />
          <TextInput
            id="email"
            type="email"
            className="mt-2"
            {...register("email", {
              required: {
                value: true,
                message: "email é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <Label className="text-slate-200" htmlFor="senha" value="senha" />
          <TextInput
            id="password"
            type="string"
            className="mt-2"
            {...register("password", {
              required: {
                value: true,
                message: "senha é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <button type="submit"> Submit </button>
      </form>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
