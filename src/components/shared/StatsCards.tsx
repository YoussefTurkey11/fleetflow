import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

const StatsCards = ({
  icon,
  precentage,
  title,
  count,
  loading,
}: {
  icon: React.ReactNode;
  precentage: number;
  title: string;
  count: number;
  loading: boolean;
}) => {
  if (loading)
    return (
      <div className="rounded-lg shadow bg-background p-5 space-y-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-6 w-14 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    );

  return (
    <div className="rounded-lg shadow bg-background p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-secondary rounded-lg">{icon}</div>
        <Badge
          variant={precentage > 0 ? "default" : "destructive"}
          className={`
                text-sm font-semibold min-w-14 justify-center
                ${precentage > 0 ? "bg-chart-1 hover:bg-chart-1/90" : ""}
            `}
        >
          {precentage}%
        </Badge>
      </div>

      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h4 className="text-3xl font-bold">{count}</h4>
      </div>
    </div>
  );
};

export default StatsCards;
