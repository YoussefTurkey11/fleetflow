"use client";

import { TableLoads } from "@/components/loads/TableLoads";
import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { useAllLoadsQuery } from "@/redux/apis/loadApi";
import { BadgeCheck, Box, CircleX } from "lucide-react";

const Loads = () => {
  const {
    data: allLoads,
    isLoading: isLoadLoading,
    isFetching: isLoadFetching,
  } = useAllLoadsQuery();

  const loads = allLoads?.data;
  const availableLoads = loads?.filter((load) => load.Available);
  const unAvailableLoads = loads?.filter((load) => !load.Available);
  const loadLoading = isLoadLoading || isLoadFetching;

  return (
    <div className="p-5">
      <Title
        title="Loads Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<Box size={25} />}
          precentage={12.5}
          title={"Total Loads"}
          count={loads?.length ?? 0}
          loading={loadLoading}
        />

        <StatsCards
          icon={<BadgeCheck size={25} />}
          precentage={12.5}
          title={"Available Loads"}
          count={availableLoads?.length ?? 0}
          loading={loadLoading}
        />

        <StatsCards
          icon={<CircleX size={25} />}
          precentage={12.5}
          title={"Unavailable Loads"}
          count={unAvailableLoads?.length ?? 0}
          loading={loadLoading}
        />
      </div>

      <div className="bg-background rounded-lg shadow p-5">
        <TableLoads loads={allLoads} isFetching={loadLoading} />
      </div>
    </div>
  );
};

export default Loads;
