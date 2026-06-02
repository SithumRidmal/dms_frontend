"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import ReportsOrdersTable from "@/components/reports/ReportsOrdersTable";
import CurrentDateTime from "@/components/dashboard/CurrentDateTime";
import Link from "next/link";

const reportTypes = [
  "Orders Reports",
  "Unpaid Reports",
  "Produce Reports",
  "Facility Reports",
];

const baseOrders = [
  {
    orderNo: "75228-1",
    subNo: "1899094",
    status: "Active",
    invoiced: false,
    subpoenaDate: "2026-05-15",
    dateServed: "2026-05-20",
    applicant: "Astrid Ramirez",
    caseNumber: "ADJ 0821858",
    dob: "10/08/1988",
    ssn: "XXX-XX-1752",
    provider: "Gemini Legal Support, Inc.",
    recordsRequested: "Medical Records 05/28/16-prese...",
    doctor: "Gabriel Rubanenko, MD",
    address: "4521 Medical Center Dr, Suite 300, Los Angeles, CA 90027",
    rush: "Rush 1",
  },
  {
    orderNo: "75229-1",
    subNo: "REC-187697",
    status: "Active",
    invoiced: true,
    subpoenaDate: "2026-05-18",
    dateServed: "2026-05-25",
    applicant: "Marco Delgado",
    caseNumber: "ADJ 0821901",
    dob: "03/22/1979",
    ssn: "XXX-XX-3481",
    provider: "Pacific Diagnostic Center",
    recordsRequested: "Radiology Records 01/15/2...",
    doctor: "Sarah Chen, MD",
    address: "8900 Sunset Blvd, Floor 4, West Hollywood, CA",
    rush: "Rush 2",
  },
  {
    orderNo: "75230-1",
    subNo: "1899283",
    status: "Ready",
    invoiced: true,
    subpoenaDate: "2026-04-10",
    dateServed: "2026-04-15",
    applicant: "Jennifer Walsh",
    caseNumber: "ADJ 0822044",
    dob: "07/14/1992",
    ssn: "XXX-XX-9823",
    provider: "Valley Medical Group",
    recordsRequested: "Complete Medical Records 06/01/18-present",
    doctor: "David Park, DO",
    address: "12044 Ventura Blvd, Studio City, CA 91604",
    rush: "–",
  },
  {
    orderNo: "75231-1",
    subNo: "1899218",
    status: "Active",
    invoiced: false,
    subpoenaDate: "2026-05-01",
    dateServed: "2026-05-10",
    applicant: "Robert Kim",
    caseNumber: "ADJ 0822112",
    dob: "11/30/1980",
    ssn: "XXX-XX-4456",
    provider: "Kaiser Permanente",
    recordsRequested: "Surgical Records 03/10/19-prese...",
    doctor: "Amanda Foster, MD",
    address: "4900 W Sunset Blvd, Los Angeles, CA 90027",
    rush: "Rush 2",
  },
  {
    orderNo: "75231-2",
    subNo: "1899211",
    status: "Active",
    invoiced: false,
    subpoenaDate: "2026-05-01",
    dateServed: "2026-05-10",
    applicant: "Robert Kim",
    caseNumber: "ADJ 0822112",
    dob: "11/30/1980",
    ssn: "XXX-XX-4456",
    provider: "Kaiser Permanente",
    recordsRequested: "Surgical Records 03/10/19-prese...",
    doctor: "Amanda Foster, MD",
    address: "4900 W Sunset Blvd, Los Angeles, CA 90027",
    rush: "Rush 2",
  },
  {
    orderNo: "75232-1",
    subNo: "1899301",
    status: "Ready",
    invoiced: true,
    subpoenaDate: "2026-04-22",
    dateServed: "2026-04-30",
    applicant: "Maria Santos",
    caseNumber: "ADJ 0822178",
    dob: "02/18/1985",
    ssn: "XXX-XX-7712",
    provider: "Cedars Medical Center",
    recordsRequested: "Billing Records 01/01/20-present",
    doctor: "Helen Morris, MD",
    address: "8700 Beverly Blvd, Los Angeles, CA 90048",
    rush: "–",
  },
];

const ordersSeed = Array.from({ length: 30 }, (_, index) => {
  const item = baseOrders[index % baseOrders.length];

  return {
    ...item,
    id: index + 1,
    orderNo:
      index < baseOrders.length
        ? item.orderNo
        : `${75233 + index}-${(index % 3) + 1}`,
    subNo: `${1899000 + index}`,
  };
});

export default function ReportsPage() {
  const [reportType, setReportType] = useState("Orders Reports");
  const [searchValue, setSearchValue] = useState("");
  const [minimumColumns, setMinimumColumns] = useState(false);
  const [showDuplicates, setShowDuplicates] = useState(false);

  const filteredOrders = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    let result = ordersSeed.filter((order) => {
      if (!search) return true;

      return (
        order.orderNo.toLowerCase().includes(search) ||
        order.applicant.toLowerCase().includes(search) ||
        order.caseNumber.toLowerCase().includes(search) ||
        order.provider.toLowerCase().includes(search) ||
        order.doctor.toLowerCase().includes(search)
      );
    });

    if (reportType === "Unpaid Reports") {
      result = result.filter((order) => !order.invoiced);
    }

    if (reportType === "Produce Reports") {
      result = result.filter((order) => order.status === "Ready");
    }

    if (reportType === "Facility Reports") {
      result = result.filter((order) =>
        order.provider.toLowerCase().includes("medical")
      );
    }

    if (!showDuplicates) {
      result = result.filter((order, index, array) => {
        return array.findIndex((item) => item.orderNo === order.orderNo) === index;
      });
    }

    return result;
  }, [reportType, searchValue, showDuplicates]);

  const handleActivityReport = () => {
    console.log("Activity report clicked");
  };

  return (
    <DashboardShell>
      <div className="flex min-h-[calc(100vh-92px)] min-w-0 flex-col gap-5 overflow-hidden">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <h1 className="text-[18px] font-semibold text-[#111827]">
              DMS Orders
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="h-[34px] rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[12px] font-medium text-[#334155] outline-none focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/10"
              >
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <Link
  href="/reports/activity-report"
  className="inline-flex h-[34px] items-center justify-center gap-2 rounded-[6px] bg-[#0097B2] px-4 text-[12px] font-semibold text-white hover:bg-[#0086A0]"
>
  <ReportIcon />
  Activity Report
</Link>

              <button
                type="button"
                onClick={() => setMinimumColumns((prev) => !prev)}
                className={`h-[34px] rounded-[6px] px-2 text-[12px] font-semibold ${
                  minimumColumns
                    ? "bg-[#E6F7FA] text-[#007F96]"
                    : "text-[#007F96] hover:bg-[#E6F7FA]"
                }`}
              >
                Minimum Columns
              </button>

              <button
                type="button"
                onClick={() => setShowDuplicates((prev) => !prev)}
                className={`h-[34px] rounded-[6px] px-2 text-[12px] font-semibold ${
                  showDuplicates
                    ? "bg-[#E6F7FA] text-[#007F96]"
                    : "text-[#475569] hover:bg-[#F8FAFC]"
                }`}
              >
                Show Duplicates
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1 text-[12px] text-[#94A3B8]">
  <span>Found</span>

  <span className="font-semibold text-[#64748B]">
    {filteredOrders.length}
  </span>

  <span>records as of</span>

  <CurrentDateTime />
</div>

            <div className="relative w-full max-w-[300px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex w-[36px] items-center justify-center text-[#94A3B8]">
                <SearchIcon />
              </div>

              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search orders..."
                className="h-[36px] w-full rounded-[6px] border border-[#CBD5E1] bg-white pl-[38px] pr-3 text-[12px] text-[#111827] outline-none placeholder:text-[#94A3B8] focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/10"
              />
            </div>
          </div>
        </div>

        <ReportsOrdersTable
          orders={filteredOrders}
          minimumColumns={minimumColumns}
        />
      </div>
    </DashboardShell>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 20V4h12v16H6Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 9h6M9 13h6M9 17h4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}