"use client";

import { useState } from "react";
import CreateInvoiceModal from "@/components/orders/CreateInvoiceModal";

export default function ReportsOrdersTable({ orders, minimumColumns }) {
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const handleOpenCreateInvoice = (order) => {
    setSelectedInvoiceOrder({
      id: order.orderNo,
      court: "N/A",
      applicant: order.applicant || "N/A",
      company: {
        name: order.provider || "N/A",
      },
    });
  };

  return (
    <>
      <section className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white shadow-sm">
        <div className="h-full max-h-[calc(100vh-225px)] overflow-auto">
          <table
            className={`w-full border-collapse ${
              minimumColumns ? "min-w-[1050px]" : "min-w-[1880px]"
            }`}
          >
            <thead className="sticky top-0 z-20 bg-white">
              <tr className="border-b border-[#E2E8F0] text-left text-[11px] font-semibold text-[#475569]">
                <th className="w-[40px] px-4 py-3">
                  <input type="checkbox" className="h-[13px] w-[13px]" />
                </th>

                <SortableHeader label="Order #" />
                <th className="w-[130px] px-4 py-3">Status</th>
                <th className="w-[120px] px-4 py-3">Invoice</th>

                {!minimumColumns && (
                  <>
                    <SortableHeader label="Subpoena Date" />
                    <SortableHeader label="Date Served" />
                    <SortableHeader label="Applicant" />
                    <SortableHeader label="Case Number" />
                    <SortableHeader label="DOB" />
                    <SortableHeader label="SSN" />
                    <th className="w-[220px] px-4 py-3">
                      Provider on Subpoena
                    </th>
                    <th className="w-[185px] px-4 py-3">Records Requested</th>
                    <SortableHeader label="Doctor" />
                    <th className="w-[230px] px-4 py-3">Address</th>
                  </>
                )}

                <th className="sticky right-0 z-30 w-[126px] min-w-[126px] border-l border-[#E2E8F0] bg-white px-4 py-3 text-center shadow-[-10px_0_14px_-14px_rgba(15,23,42,0.45)]">
                  Rush
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="group border-b border-[#F1F5F9] last:border-b-0 hover:bg-[#F8FBFC]"
                >
                  <td className="px-4 py-6 align-middle">
                    <input type="checkbox" className="h-[13px] w-[13px]" />
                  </td>

                  <td className="px-4 py-6 align-middle">
                    <button
                      type="button"
                      className="text-left text-[12px] font-semibold text-[#007F96] hover:underline"
                    >
                      {order.orderNo}
                    </button>

                    <p className="mt-2 text-[10px] text-[#94A3B8]">
                      {order.subNo}
                    </p>
                  </td>

                  <td className="px-4 py-6 align-top">
                    <StatusBlock status={order.status} />
                  </td>

                  <td className="px-4 py-6 align-middle">
                    {order.invoiced ? (
                      <span className="inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold text-[#059669]">
                        <CheckIcon />
                        Invoiced
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenCreateInvoice(order)}
                        className="inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold text-[#007F96] hover:underline"
                      >
                        <DocumentIcon />
                        Create Invoice
                      </button>
                    )}
                  </td>

                  {!minimumColumns && (
                    <>
                      <TableText>{order.subpoenaDate}</TableText>
                      <TableText>{order.dateServed}</TableText>
                      <TableText>{order.applicant}</TableText>
                      <TableText>{order.caseNumber}</TableText>
                      <TableText>{order.dob}</TableText>
                      <TableText>{order.ssn}</TableText>
                      <TableText>{order.provider}</TableText>
                      <TableText>{order.recordsRequested}</TableText>
                      <TableText>{order.doctor}</TableText>

                      <td className="px-4 py-6 align-middle text-[11px] leading-[16px] text-[#475569]">
                        <div className="max-w-[190px] break-words">
                          {order.address}
                        </div>
                      </td>
                    </>
                  )}

                  <td className="sticky right-0 z-10 w-[126px] min-w-[126px] border-l border-[#E2E8F0] bg-white px-4 py-6 text-center align-middle shadow-[-10px_0_14px_-14px_rgba(15,23,42,0.45)] group-hover:bg-[#F8FBFC]">
                    <RushBadge rush={order.rush} />
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={minimumColumns ? 5 : 15}
                    className="px-5 py-14 text-center text-[13px] text-[#94A3B8]"
                  >
                    No report orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <CreateInvoiceModal
        isOpen={Boolean(selectedInvoiceOrder)}
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </>
  );
}

function RushBadge({ rush }) {
  if (!rush || rush === "–" || rush === "-") {
    return (
      <span className="inline-flex h-[28px] min-w-[72px] items-center justify-center rounded-[6px] px-3 text-[11px] font-semibold leading-none text-[#94A3B8]">
        –
      </span>
    );
  }

  const styles = {
    "Rush 1": "border-[#FDBA74] bg-[#FFF7ED] text-[#EA580C]",
    "Rush 2": "border-[#FDBA74] bg-[#FFF7ED] text-[#EA580C]",
    "Rush 3": "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
  };

  return (
    <span
      className={`inline-flex h-[28px] min-w-[78px] items-center justify-center whitespace-nowrap rounded-[6px] border px-4 text-[11px] font-semibold leading-none ${
        styles[rush] || styles["Rush 1"]
      }`}
    >
      {rush}
    </span>
  );
}

function StatusBlock({ status }) {
  return (
    <div>
      <StatusBadge status={status} />

      <div className="mt-3 space-y-2">
        <StatusAction icon={<CircleIcon />} label="Scan Records" muted />
        <StatusAction icon={<DocumentIcon />} label="Review Subpoena" />
        <StatusAction icon={<DocumentIcon />} label="Review Records" />
        <StatusAction icon={<CircleIcon />} label="Serve Payment" muted />
        <StatusAction icon={<PaymentIcon />} label="Custodian Payment" muted />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "Ready") {
    return (
      <span className="inline-flex h-[24px] items-center rounded-full bg-[#E6F7FA] px-3 text-[10px] font-semibold text-[#007F96]">
        Ready
      </span>
    );
  }

  return (
    <span className="inline-flex h-[24px] items-center rounded-full bg-[#ECFDF5] px-3 text-[10px] font-semibold text-[#059669]">
      Active
    </span>
  );
}

function StatusAction({ icon, label, muted = false }) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 text-left text-[10px] font-semibold ${
        muted ? "text-[#64748B]" : "text-[#0097B2]"
      } hover:underline`}
    >
      {icon}
      {label}
    </button>
  );
}

function TableText({ children }) {
  return (
    <td className="px-4 py-6 align-middle text-[11px] leading-[16px] text-[#475569]">
      {children}
    </td>
  );
}

function SortableHeader({ label }) {
  return (
    <th className="w-[135px] px-4 py-3">
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        {label}
        <span className="text-[9px] text-[#94A3B8]">↕</span>
      </span>
    </th>
  );
}

function CircleIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l5 5v13H7V3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16v10H4V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}