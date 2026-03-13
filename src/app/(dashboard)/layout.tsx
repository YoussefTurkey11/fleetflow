import Header from "@/components/layouts/header/Header";
import Sidebar from "@/components/layouts/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex relative">
      <Sidebar />
      <section className="w-full">
        <Header />
        <div className="bg-secondary relative min-h-[calc(100vh-81px)]">
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
