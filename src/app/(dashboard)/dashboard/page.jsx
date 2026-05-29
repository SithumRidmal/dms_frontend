import DashboardShell from "@/components/layout/DashboardShell";
import StatCard from "@/components/dashboard/StatCard";
import RecentOrdersCard from "@/components/dashboard/RecentOrdersCard";
import CaseStatusBreakdown from "@/components/dashboard/CaseStatusBreakdown";
import CurrentDateTime from "@/components/dashboard/CurrentDateTime";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[18px] font-semibold text-[#111827] sm:text-[20px]">
              Good morning, John
            </h1>
            <p className="mt-[4px] text-[13px] text-[#64748B]">
              Here&apos;s what&apos;s happening with your practice today
            </p>
          </div>

          <CurrentDateTime />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={<OrderIcon />} value="12" label="Total Orders" change="+12%" />
          <StatCard icon={<CaseIcon />} value="3" label="Active Cases" change="+5%" />
          <StatCard icon={<PickupIcon />} value="2" label="Ready to Pickup" change="+2" />
          <StatCard icon={<CompletedIcon />} value="1" label="Completed" change="+8%" />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <RecentOrdersCard />
          <CaseStatusBreakdown />
        </div>
      </div>
    </DashboardShell>
  );
}

function OrderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h10v18H7V3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16v12H4V7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 7V5h6v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PickupIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="m7 12 3 3 7-7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}