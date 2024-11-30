/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <>
      <div className="text-center px-4">
        <img
          className="mx-auto m-5 box-content max-w-full h-auto w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[90%]"
          src="/cropped-headerteste-2.png"
          alt="teste"
        />
        <button
          onClick={() => signIn("google")}
          className="bg-white mb-5 dark:text-slate-950 text-black rounded-lg p-2 px-4"
        >
          Google log in
        </button>
        <p>
          Projeto Sistema de Rastreamento de Ativos utilizando tecnologia LTE-M
        </p>
      </div>
    </>
  );
};

export default Home;
