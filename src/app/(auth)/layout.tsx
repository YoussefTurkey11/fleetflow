import Footer from "@/components/layouts/footer/Footer";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex items-center justify-center min-h-screen">
      <div className="fixed top-5 right-5">
        <ThemeToggle />
      </div>
      <section className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/images/logo1.svg"}
            width={50}
            height={50}
            alt="Swanteam-logo"
            loading="eager"
          />
          <h1 className="text-3xl font-bold">FleetFlow</h1>
          <p className="text-muted-foreground text-sm">
            Enter your details to sign
          </p>
        </div>
        <div className="my-5 md:min-w-sm">{children}</div>
      </section>
      <Footer />
    </main>
  );
};

export default AuthLayout;
