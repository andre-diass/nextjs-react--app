import { signOut, useSession, getSession } from "next-auth/react";

export default function App() {
  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <p> this is the app protected page</p>
    </>
  );
}
