import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { Box, TruckElectric, UserRound, Wallet } from "lucide-react";

const Admin = () => {
  return (
    <div className="p-5">
      <Title
        title="fleet Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<Box size={25} />}
          precentage={12.5}
          title={"Active Loads"}
          count={124}
        />
        <StatsCards
          icon={<UserRound size={25} />}
          precentage={4.2}
          title={"Drivers Online"}
          count={86}
        />
        <StatsCards
          icon={<TruckElectric size={25} />}
          precentage={-2.1}
          title={"Trucks Available"}
          count={22}
        />
        <StatsCards
          icon={<Wallet size={25} />}
          precentage={18.3}
          title={"Revenue (Monthly)"}
          count={54200}
        />
      </div>
    </div>
  );
};

export default Admin;
