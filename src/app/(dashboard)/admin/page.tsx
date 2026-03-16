"use client";
import { TableLoads } from "@/components/dashboard/loads/TableLoads";
import LoadsChart from "@/components/dashboard/loads/LoadsChart";
import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { useAllDriversQuery } from "@/redux/apis/driverApi";
import { useAllLoadsQuery } from "@/redux/apis/loadApi";
import { useAllTrucksQuery } from "@/redux/apis/truckApi";
import { Box, TruckElectric, UserRound, Wallet } from "lucide-react";
import LoadsMoneyChart from "@/components/dashboard/loads/LoadsMoneyChart";

const Admin = () => {
  const {
    data: allLoads,
    isLoading: isLoadLoading,
    isFetching: isLoadFetching,
  } = useAllLoadsQuery();
  const {
    data: allDrivers,
    isLoading: isDriverLoading,
    isFetching: isDriverFetching,
  } = useAllDriversQuery();
  const {
    data: allTrucks,
    isLoading: isTruckLoading,
    isFetching: isTruckFetching,
  } = useAllTrucksQuery();

  const loads = allLoads?.data;
  const drivers = allDrivers?.data;
  const trucks = allTrucks?.data;

  const availableLoads = loads?.filter((load) => load.Available);
  const unAvailableLoads = loads?.filter((load) => !load.Available);
  const chartData =
    loads?.map((load) => ({
      id: load.id,
      total: Number(load.Total),
    })) ?? [];
  const totalRevenue =
    loads?.reduce((sum, load) => sum + Number(load.Total), 0) ?? 0;

  const loadLoading = isLoadLoading || isLoadFetching;
  const loading =
    isLoadLoading ||
    isDriverLoading ||
    isTruckLoading ||
    isLoadFetching ||
    isDriverFetching ||
    isTruckFetching;

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
          count={loads?.length ?? 0}
          loading={loading}
        />
        <StatsCards
          icon={<UserRound size={25} />}
          precentage={4.2}
          title={"Drivers Online"}
          count={drivers?.length ?? 0}
          loading={loading}
        />
        <StatsCards
          icon={<TruckElectric size={25} />}
          precentage={-2.1}
          title={"Trucks Available"}
          count={trucks?.length ?? 0}
          loading={loading}
        />
        <StatsCards
          icon={<Wallet size={25} />}
          precentage={18.3}
          title={"Revenue (Monthly)"}
          count={totalRevenue ?? 0}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2 bg-background rounded-lg shadow p-5">
          <TableLoads loads={allLoads} isFetching={loadLoading} />
        </div>
        <div className="space-y-5">
          <LoadsChart
            loads={loads?.length ?? 0}
            available={availableLoads?.length ?? 0}
            unavailable={unAvailableLoads?.length ?? 0}
            loading={loadLoading}
          />
          <LoadsMoneyChart loads={chartData} loading={loadLoading} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
