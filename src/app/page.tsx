import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Landpage from "@/components/shared/Landpage";

const Home = () => {
  return (
    <section className="relative w-full py-12 lg:py-20 flex justify-center items-center min-h-screen">
      <div className="fixed top-5 right-5">
        <ThemeToggle />
      </div>
      <Landpage />
    </section>
  );
};

export default Home;
