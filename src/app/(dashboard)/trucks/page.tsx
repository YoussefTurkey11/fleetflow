"use client";

import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { TableTrucks } from "@/components/dashboard/trucks/TableTrucks";
import { useAllTrucksQuery } from "@/redux/apis/truckApi";
import { BadgeCheck, CircleX, TruckElectric } from "lucide-react";

const Trucks = () => {
  const {
    data: allTrucks,
    isLoading: isTruckLoading,
    isFetching: isTruckFetching,
  } = useAllTrucksQuery();

  const trucks = allTrucks?.data;
  const availableTrucks = trucks?.filter((truck) => truck.Available);
  const unAvailableTrucks = trucks?.filter((truck) => !truck.Available);
  const truckLoading = isTruckLoading || isTruckFetching;

  return (
    <div className="p-5">
      <Title
        title="Trucks Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<TruckElectric size={25} />}
          precentage={12.5}
          title={"Total Trucks"}
          count={trucks?.length ?? 0}
          loading={truckLoading}
        />

        <StatsCards
          icon={<BadgeCheck size={25} />}
          precentage={12.5}
          title={"Available Trucks"}
          count={availableTrucks?.length ?? 0}
          loading={truckLoading}
        />

        <StatsCards
          icon={<CircleX size={25} />}
          precentage={12.5}
          title={"Unavailable Trucks"}
          count={unAvailableTrucks?.length ?? 0}
          loading={truckLoading}
        />
      </div>

      <div className="bg-background rounded-lg shadow p-5">
        <TableTrucks trucks={allTrucks} isFetching={truckLoading} />
      </div>
    </div>
  );
};

export default Trucks;
