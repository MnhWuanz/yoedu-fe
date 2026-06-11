import { getDashboardData } from "@/features/dashboard/api/dashboard-api";
import RecentActivity from "@/features/dashboard/components/recent-activity";
import StatCard from "@/features/dashboard/components/stat-card";
import TodayClasses from "@/features/dashboard/components/today-classes";
import { useQuery } from "@tanstack/react-query";

const mapColor = ['green', 'blue', 'purple', 'red'];


export default function DashBoardPage() {
  const { getDashboard } = getDashboardData;
  const query = useQuery({ queryKey: ['dashboard'], queryFn: getDashboard });
  console.log('Dashboard data:', query.data);
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold mb-3">Dashboard</h1>
        <p className="text-gray-500 text-xs">Tổng quan hệ thống quản lý YOEDU</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {query.data?.statData.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            extra={item.extra}
            color={mapColor[index % mapColor.length]}
          />
        ))}
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 gap-4">
        <RecentActivity data={query.data?.recentActivityData || []} />
        <TodayClasses data={query.data?.todayClasses || []} />
      </div>
    </div>
  );
}
