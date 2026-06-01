"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import InvoiceReportTable from "@/components/invoices/InvoiceReportTable";
import CurrentDateTime from "@/components/dashboard/CurrentDateTime";

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("outstanding");
  const [filters, setFilters] = useState({
    from: "",
    through: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterByDate = () => {
    console.log("Filter invoices:", filters);
  };

  const handleReset = () => {
    setFilters({
      from: "",
      through: "",
    });
  };

  return (
    <DashboardShell>
      <div className="flex min-h-[calc(100vh-92px)] min-w-0 flex-col gap-5 overflow-hidden">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            DMS Outstanding Invoices Report
          </h1>

          <CurrentDateTime
            variant="short"
            prefix="as of"
            className="text-[12px] text-[#94A3B8]"
          />
        </div>

        <InvoiceTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(520px,650px)]">
          <InvoiceFilters
            filters={filters}
            onChange={handleFilterChange}
            onFilter={handleFilterByDate}
            onReset={handleReset}
          />

          <InvoiceSummary />
        </div>

        {activeTab === "outstanding" ? (
          <InvoiceReportTable />
        ) : (
          <ResendInvoicesPanel />
        )}
      </div>
    </DashboardShell>
  );
}

function InvoiceTabs({ activeTab, onChange }) {
  return (
    <div className="border-b border-[#E2E8F0]">
      <div className="flex items-center gap-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => onChange("outstanding")}
          className={`whitespace-nowrap border-b-2 px-5 py-3 text-[13px] font-semibold transition ${
            activeTab === "outstanding"
              ? "border-[#0097B2] bg-[#E6F7FA] text-[#007F96]"
              : "border-transparent text-[#64748B] hover:bg-[#F8FAFC]"
          }`}
        >
          Outstanding Invoices (66)
        </button>

        <button
          type="button"
          onClick={() => onChange("resend")}
          className={`whitespace-nowrap border-b-2 px-5 py-3 text-[13px] font-semibold transition ${
            activeTab === "resend"
              ? "border-[#0097B2] bg-[#E6F7FA] text-[#007F96]"
              : "border-transparent text-[#64748B] hover:bg-[#F8FAFC]"
          }`}
        >
          Resend Invoices (13)
        </button>
      </div>
    </div>
  );
}

function InvoiceFilters({ filters, onChange, onFilter, onReset }) {
  return (
    <section className="rounded-[10px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-sm">
      <h2 className="mb-4 text-[13px] font-semibold text-[#334155]">
        Filters
      </h2>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <DateField
          label="From"
          name="from"
          value={filters.from}
          onChange={onChange}
        />

        <DateField
          label="Through"
          name="through"
          value={filters.through}
          onChange={onChange}
        />

        <button
          type="button"
          onClick={onFilter}
          className="h-[38px] whitespace-nowrap rounded-[6px] bg-[#0097B2] px-5 text-[12px] font-semibold text-white hover:bg-[#0086A0]"
        >
          Filter by Date
        </button>

        <button
          type="button"
          onClick={onReset}
          className="h-[38px] whitespace-nowrap rounded-[6px] bg-[#F1F5F9] px-5 text-[12px] font-semibold text-[#334155] hover:bg-[#E2E8F0]"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

function DateField({ label, name, value, onChange }) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 block text-[11px] font-medium text-[#64748B]">
        {label}
      </label>

      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="h-[38px] w-full rounded-[6px] border border-[#CBD5E1] bg-[#F8FAFC] px-3 text-[12px] text-[#111827] outline-none focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/10"
      />
    </div>
  );
}

function InvoiceSummary() {
  return (
    <section className="rounded-[10px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-sm">
      <h2 className="mb-4 text-[13px] font-semibold text-[#334155]">
        Summary
      </h2>

      <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3 xl:grid-cols-5">
        <SummaryItem label="Companies" value="20" />
        <SummaryItem label="Cases" value="66" />
        <SummaryItem label="Invoiced" value="$108,065.00" />
        <SummaryItem label="Paid" value="$39,450.00" green />
        <SummaryItem label="Due" value="$68,615.00" red />
      </div>
    </section>
  );
}

function SummaryItem({ label, value, green = false, red = false }) {
  return (
    <div className="min-w-[105px]">
      <p className="mb-2 text-[11px] text-[#64748B]">{label}</p>

      <p
        className={`whitespace-nowrap text-[18px] font-semibold ${
          green
            ? "text-[#059669]"
            : red
            ? "text-red-500"
            : "text-[#111827]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ResendInvoicesPanel() {
  return (
    <section className="flex min-h-[420px] items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-white shadow-sm">
      <div className="text-center">
        <h2 className="text-[16px] font-semibold text-[#111827]">
          Resend Invoices
        </h2>

        <p className="mt-2 text-[13px] text-[#64748B]">
          Resend invoice list will connect to backend API later.
        </p>
      </div>
    </section>
  );
}