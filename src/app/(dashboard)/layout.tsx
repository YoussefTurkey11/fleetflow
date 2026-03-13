import Header from "@/components/layouts/header/Header";
import Sidebar from "@/components/layouts/sidebar/Sidebar";
import GridPattern from "@/components/shared/GridPattern";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex relative">
      <Sidebar />
      <section className="w-full">
        <Header />
        <div className="bg-secondary relative min-h-[calc(100vh-81px)]">
          <GridPattern width={15} height={15} />
          {children}
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
