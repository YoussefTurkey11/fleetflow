"use client";

import { TableDrivers } from "@/components/drivers/TableDrivers";
import { TableLoads } from "@/components/loads/TableLoads";
import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { useAllDriversQuery } from "@/redux/apis/driverApi";
import { useAllLoadsQuery } from "@/redux/apis/loadApi";
import { BadgeCheck, CircleX, User2 } from "lucide-react";

const Drivers = () => {
  const {
    data: allDrivers,
    isLoading: isDriverLoading,
    isFetching: isDriverFetching,
  } = useAllDriversQuery();

  const drivers = allDrivers?.data;
  const availableLoads = drivers?.filter((driver) => driver.Available);
  const unAvailableLoads = drivers?.filter((driver) => !driver.Available);
  const driverLoading = isDriverLoading || isDriverFetching;

  return (
    <div className="p-5">
      <Title
        title="Drivers Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<User2 size={25} />}
          precentage={12.5}
          title={"Total Drivers"}
          count={drivers?.length ?? 0}
          loading={driverLoading}
        />

        <StatsCards
          icon={<BadgeCheck size={25} />}
          precentage={12.5}
          title={"Available Drivers"}
          count={availableLoads?.length ?? 0}
          loading={driverLoading}
        />

        <StatsCards
          icon={<CircleX size={25} />}
          precentage={12.5}
          title={"Unavailable Drivers"}
          count={unAvailableLoads?.length ?? 0}
          loading={driverLoading}
        />
      </div>

      <div className="bg-background rounded-lg shadow p-5">
        <TableDrivers drivers={allDrivers} isFetching={driverLoading} />
      </div>
    </div>
  );
};

export default Drivers;
