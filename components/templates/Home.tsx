import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <>
      <button
        onClick={() => signIn("google")}
        className="bg-white dark:text-slate-950 rounded-lg p-2 px-4"
      >
        {" "}
        Google log in{" "}
      </button>
      <p> this is the unsecured home page</p>
    </>
  );
};

export default Home;
