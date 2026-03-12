import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm />
      <div className="flex items-center justify-center gap-1 text-sm my-5">
        <span className="text-muted-foreground">Don't have an account?</span>
        <Link href={"/register"} className="font-bold hover:underline">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
