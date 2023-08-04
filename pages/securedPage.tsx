import { getSession, useSession } from "next-auth/react";

const SecuredPage = ({ user }: any) => {
  return (
    <>
      <p>you should not see this page</p>
      <p>{user.name}</p>
    </>
  );
};

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
      user: session.user,
    },
  };
}

export default SecuredPage;
