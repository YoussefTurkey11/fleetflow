import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3">
        <Image
          src={"/images/logo1.svg"}
          width={50}
          height={50}
          alt="Swanteam-logo"
          loading="eager"
        />
        <h1 className="text-3xl font-bold">FleetFlow</h1>
        <p className="">Enter your details to sign</p>
      </div>
      <div>{children}</div>
    </section>
  );
};

export default AuthLayout;
