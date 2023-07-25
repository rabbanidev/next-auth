import { Button } from "antd";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import auth from "@/firebase/firebase.auth";

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // redirect when user is loggedin
  if (session?.user || user?.user?.email) {
    router.push("/");
  }

  const githubSignIn = () => {
    signIn("github", {
      callbackUrl: "http://localhost:3000",
      redirect: false,
    });
  };

  const googleSignIn = () => {
    signIn("google", {
      callbackUrl: "http://localhost:3000",
      redirect: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <GoogleOutlined onClick={googleSignIn} />
          <GithubOutlined onClick={githubSignIn} />
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Your Email</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Your Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button htmlType="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
