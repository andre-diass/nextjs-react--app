import { signOut, useSession, getSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
      <p> this is the app protected page</p>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: session.user,
    },
  };
}
