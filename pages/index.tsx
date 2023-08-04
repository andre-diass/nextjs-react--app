import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="bg-blue-900 h-screen w-screen flex items-center">
          <div className="text-center w-full">
            <button
              onClick={() => signIn("google")}
              className="bg-white dark:text-slate-950 rounded-lg p-2 px-4"
            >
              {" "}
              Google log in{" "}
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <div>Logged in</div>
      <br />
      <span>Signed in as {session.user?.name || session.user?.email}</span>
    </>
  );
}
