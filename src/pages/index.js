import { useSession } from "next-auth/react";
import Head from "next/head";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Next Auth</title>
      </Head>
      <h1 style={{ textAlign: "center", marginTop: "10%" }}>
        Welcome To Next Auth Home Page
      </h1>
      {session?.user && (
        <h1 style={{ textAlign: "center" }}>{session.user?.name}</h1>
      )}
    </div>
  );
};

export default HomePage;
