import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex items-center gap-1 text-xs my-5">
        <Link
          href={"/login"}
          className="font-bold text-muted-foreground hover:underline hover:text-primary flex items-center gap-1 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
      </div>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
