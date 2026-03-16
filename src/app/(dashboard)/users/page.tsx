"use client";

import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { TableUsers } from "@/components/dashboard/users/TableUsers";
import { useAllUsersQuery } from "@/redux/apis/userApi";
import { BadgeCheck, CircleX, User2 } from "lucide-react";

const Users = () => {
  const {
    data: allUsers,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useAllUsersQuery();

  const users = allUsers ?? [];
  console.log(users);
  const blockedUser = users?.filter((user) => user.blocked);
  const confirmedUser = users?.filter((user) => user.confirmed);
  const userLoading = isUserLoading || isUserFetching;

  return (
    <div className="p-5">
      <Title
        title="Users Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<User2 size={25} />}
          precentage={12.5}
          title={"Total Users"}
          count={users?.length ?? 0}
          loading={userLoading}
        />

        <StatsCards
          icon={<BadgeCheck size={25} />}
          precentage={12.5}
          title={"Confirmed Users"}
          count={confirmedUser?.length ?? 0}
          loading={userLoading}
        />

        <StatsCards
          icon={<CircleX size={25} />}
          precentage={12.5}
          title={"Blocked Users"}
          count={blockedUser?.length ?? 0}
          loading={userLoading}
        />
      </div>

      <div className="bg-background rounded-lg shadow p-5">
        <TableUsers users={users} isFetching={userLoading} />
      </div>
    </div>
  );
};

export default Users;
