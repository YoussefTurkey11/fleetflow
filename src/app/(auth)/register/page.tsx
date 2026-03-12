import Link from "next/link";
import RegisterForm from "./registerForm";

const Register = () => {
  return (
    <>
      <RegisterForm />
      <div className="flex items-center justify-center gap-1 text-sm my-5">
        <span className="text-muted-foreground">
          You have an account already?
        </span>
        <Link href={"/login"} className="font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default Register;
