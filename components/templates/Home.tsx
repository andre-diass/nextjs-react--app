import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <button
          onClick={() => signIn("google")}
          className="bg-white mb-5 dark:text-slate-950 text-black rounded-lg p-2 px-4"
        >
          {" "}
          Google log in{" "}
        </button>
        <p> Welcome to the login page!</p>
      </div>
    </>
  );
};

export default Home;
