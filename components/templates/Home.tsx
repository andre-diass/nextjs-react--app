/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <>
      <img
        className="m-5 box-content "
        src="/cropped-headerteste-2.png"
        alt="teste"
      />
      <div className="text-center">
        <button
          onClick={() => signIn("google")}
          className="bg-white mb-5 dark:text-slate-950 text-black rounded-lg p-2 px-4"
        >
          Google log in
        </button>
        <p>
          {" "}
          Projeto Sistema de rastreamento de ativos utilizando tecnologia LTE-M{" "}
        </p>
      </div>
    </>
  );
};

export default Home;
