"use client";

import { useMemo, useState } from "react";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";

const orders = [
  {
    id: "ORD-2026-001",
    case: "Smith vs. Johnson Property Dispute",
    status: "Active",
    invoice: "INV 001",
    record: "INV 002",
    company: "Smith & Associates",
    dob: "03/15/1982",
    ssn: "****-****-1234",
    forms: ["H04", "D-253A"],
  },
  {
    id: "ORD-2026-002",
    case: "Martinez Immigration Appeal",
    status: "No Subpoena",
    invoice: "INV 003",
    record: "",
    company: "Martinez Legal Group",
    dob: "07/22/1975",
    ssn: "****-****-5678",
    forms: ["H130", "H485"],
  },
  {
    id: "ORD-2026-003",
    case: "Chen Business Formation",
    status: "Ready to Pickup",
    invoice: "INV 004",
    record: "INV 005",
    company: "Pacific Law Partners",
    dob: "11/08/1990",
    ssn: "****-****-9812",
    forms: ["S14", "253"],
  },
  {
    id: "ORD-2026-004",
    case: "Williams Criminal Defense",
    status: "Active",
    invoice: "INV 007",
    record: "",
    company: "Williams & Co.",
    dob: "05/30/1988",
    ssn: "****-****-3456",
    forms: ["D-253", "D-28"],
  },
  {
    id: "ORD-2026-005",
    case: "Brown Estate Planning",
    status: "Completed",
    invoice: "INV 008",
    record: "INV 009",
    company: "Brown Family Trust",
    dob: "04/12/1955",
    ssn: "****-****-7898",
    forms: ["700", "729"],
  },
  {
    id: "ORD-2026-006",
    case: "Davis Personal Injury Claim",
    status: "Ready",
    invoice: "INV 010",
    record: "",
    company: "Davis Law Firm",
    dob: "01/26/1973",
    ssn: "****-****-2345",
    forms: ["H599", "D-253C"],
  },
  {
    id: "ORD-2026-007",
    case: "Rodriguez Divorce Settlement",
    status: "Cancelled",
    invoice: "INV 011",
    record: "",
    company: "Rodriguez & Partners",
    dob: "04/17/1980",
    ssn: "****-****-6789",
    forms: ["D854", "H485"],
  },
  {
    id: "ORD-2026-008",
    case: "Thompson Contract Dispute",
    status: "No Records",
    invoice: "INV 012",
    record: "INV 013",
    company: "Thompson Industries",
    dob: "08/03/1977",
    ssn: "****-****-0123",
    forms: ["P56", "H4"],
  },
  {
    id: "ORD-2026-009",
    case: "Garcia Employment Litigation",
    status: "Active",
    invoice: "INV 014",
    record: "",
    company: "Garcia Legal Services",
    dob: "12/20/1985",
    ssn: "****-****-4567",
    forms: ["H9", "W4"],
  },
  {
    id: "ORD-2026-010",
    case: "Lee Intellectual Property Filing",
    status: "Write Offs",
    invoice: "INV 015",
    record: "",
    company: "Lee Tech Holdings",
    dob: "09/11/1995",
    ssn: "****-****-8901",
    forms: ["H29", "ITA 0035"],
  },
  {
    id: "ORD-2026-011",
    case: "Anderson Tax Audit Defense",
    status: "Ready to Pickup",
    invoice: "INV 017",
    record: "",
    company: "Anderson Accounting",
    dob: "02/03/1978",
    ssn: "****-****-3457",
    forms: ["248", "R21"],
  },
  {
    id: "ORD-2026-012",
    case: "Taylor Bankruptcy Filing",
    status: "No Subpoena",
    invoice: "INV 018",
    record: "INV 019",
    company: "Taylor Financial Group",
    dob: "10/05/1983",
    ssn: "****-****-7891",
    forms: ["F213", "H-485"],
  },
  {
    id: "ORD-2026-013",
    case: "Walker Insurance Claim",
    status: "Active",
    invoice: "INV 020",
    record: "",
    company: "Walker Legal",
    dob: "06/11/1984",
    ssn: "****-****-1191",
    forms: ["H04"],
  },
  {
    id: "ORD-2026-014",
    case: "Hall Civil Litigation",
    status: "Ready",
    invoice: "INV 021",
    record: "",
    company: "Hall Associates",
    dob: "05/19/1972",
    ssn: "****-****-2210",
    forms: ["D-253A"],
  },
  {
    id: "ORD-2026-015",
    case: "Young Family Custody Review",
    status: "Completed",
    invoice: "INV 022",
    record: "INV 023",
    company: "Young Family Law",
    dob: "03/07/1989",
    ssn: "****-****-3128",
    forms: ["H130", "D-28"],
  },
  {
    id: "ORD-2026-016",
    case: "King Corporate Merger Filing",
    status: "Active",
    invoice: "INV 024",
    record: "",
    company: "King Corporate Counsel",
    dob: "08/28/1979",
    ssn: "****-****-4455",
    forms: ["S14", "H04"],
  },
  {
    id: "ORD-2026-017",
    case: "Wright Real Estate Closing",
    status: "Ready to Pickup",
    invoice: "INV 025",
    record: "INV 026",
    company: "Wright Property Group",
    dob: "01/14/1968",
    ssn: "****-****-7782",
    forms: ["700", "253"],
  },
  {
    id: "ORD-2026-018",
    case: "Lopez Workplace Injury Claim",
    status: "No Records",
    invoice: "INV 027",
    record: "",
    company: "Lopez Legal Office",
    dob: "06/23/1991",
    ssn: "****-****-6099",
    forms: ["H599", "D-253C"],
  },
  {
    id: "ORD-2026-019",
    case: "Scott Medical Records Request",
    status: "No Subpoena",
    invoice: "INV 028",
    record: "",
    company: "Scott & Partners",
    dob: "09/18/1981",
    ssn: "****-****-2301",
    forms: ["H485", "H04"],
  },
  {
    id: "ORD-2026-020",
    case: "Adams Probate Documentation",
    status: "Ready",
    invoice: "INV 029",
    record: "INV 030",
    company: "Adams Estate Services",
    dob: "02/27/1959",
    ssn: "****-****-8841",
    forms: ["729", "700"],
  },
  {
    id: "ORD-2026-021",
    case: "Baker Contract Review",
    status: "Active",
    invoice: "INV 031",
    record: "",
    company: "Baker Legal Group",
    dob: "12/09/1976",
    ssn: "****-****-1408",
    forms: ["P56", "W4"],
  },
  {
    id: "ORD-2026-022",
    case: "Nelson Civil Rights Complaint",
    status: "Cancelled",
    invoice: "INV 032",
    record: "",
    company: "Nelson Justice Law",
    dob: "04/04/1992",
    ssn: "****-****-6635",
    forms: ["D854", "R21"],
  },
  {
    id: "ORD-2026-023",
    case: "Carter Business License Filing",
    status: "Completed",
    invoice: "INV 033",
    record: "INV 034",
    company: "Carter Business Services",
    dob: "07/16/1987",
    ssn: "****-****-4712",
    forms: ["S14", "ITA 0035"],
  },
  {
    id: "ORD-2026-024",
    case: "Mitchell Divorce Mediation",
    status: "Ready to Pickup",
    invoice: "INV 035",
    record: "",
    company: "Mitchell Family Law",
    dob: "11/29/1984",
    ssn: "****-****-9024",
    forms: ["H485", "D-28"],
  },
  {
    id: "ORD-2026-025",
    case: "Perez Immigration Document Review",
    status: "Write Offs",
    invoice: "INV 036",
    record: "INV 037",
    company: "Perez Immigration Counsel",
    dob: "05/13/1994",
    ssn: "****-****-3570",
    forms: ["H130", "H9"],
  },
];

const ORDERS_PER_PAGE = 12;

export default function OrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    return orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [currentPage]);

  return (
    <section className="flex min-h-[420px] flex-1 flex-col overflow-hidden rounded-[9px] border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-[#F1F5F9] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[13px] font-semibold text-[#111827]">
          All Orders
        </h2>

        <p className="text-[11px] text-[#94A3B8]">
          Last updated: 5/29/2026
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-4">
        <table className="w-full min-w-[1050px] border-collapse">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-[#F1F5F9] text-left text-[11px] font-medium text-[#64748B]">
              <th className="py-[11px] pr-4">Order ID</th>
              <th className="py-[11px] pr-4">Case</th>
              <th className="py-[11px] pr-4">Status</th>
              <th className="py-[11px] pr-4">Invoice Records</th>
              <th className="py-[11px] pr-4">Company</th>
              <th className="py-[11px] pr-4">DOB / SSN</th>
              <th className="py-[11px] pr-4">Forms</th>
              <th className="py-[11px] text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#F8FAFC] text-[12px] text-[#334155]"
              >
                <td className="whitespace-nowrap py-[10px] pr-4">
                  <span className="rounded-[4px] bg-[#DDF6FA] px-[7px] py-[3px] text-[11px] font-semibold text-[#007F96]">
                    {order.id}
                  </span>
                </td>

                <td className="max-w-[230px] truncate py-[10px] pr-4">
                  {order.case}
                </td>

                <td className="whitespace-nowrap py-[10px] pr-4">
                  <OrderStatusBadge status={order.status} />
                </td>

                <td className="whitespace-nowrap py-[10px] pr-4">
                  <div className="space-y-[4px]">
                    <p className="w-fit rounded bg-[#F1F5F9] px-[6px] py-[2px] text-[10px] text-[#64748B]">
                      {order.invoice}
                    </p>
                    {order.record && (
                      <p className="w-fit rounded bg-[#F1F5F9] px-[6px] py-[2px] text-[10px] text-[#64748B]">
                        {order.record}
                      </p>
                    )}
                  </div>
                </td>

                <td className="max-w-[180px] truncate py-[10px] pr-4 font-medium">
                  {order.company}
                </td>

                <td className="whitespace-nowrap py-[10px] pr-4">
                  <p>{order.dob}</p>
                  <p className="text-[#94A3B8]">{order.ssn}</p>
                </td>

                <td className="whitespace-nowrap py-[10px] pr-4">
                  <div className="flex flex-wrap gap-[4px]">
                    {order.forms.map((form) => (
                      <span
                        key={form}
                        className="rounded bg-[#F1F5F9] px-[6px] py-[2px] text-[10px] text-[#64748B]"
                      >
                        {form}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="whitespace-nowrap py-[10px] text-right">
                  <div className="flex justify-end gap-3 text-[#94A3B8]">
                    <button type="button" className="hover:text-[#0097B2]">
                      <ViewIcon />
                    </button>
                    <button type="button" className="hover:text-[#0097B2]">
                      <EditIcon />
                    </button>
                    <button type="button" className="hover:text-red-500">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#F1F5F9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-[#64748B]">
          Showing {currentOrders.length} of {orders.length} orders
        </p>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-[26px] min-w-[26px] items-center justify-center rounded-[5px] px-2 text-[11px] font-medium ${
                  currentPage === page
                    ? "bg-[#111827] text-white"
                    : "border border-[#E2E8F0] bg-white text-[#334155] hover:bg-[#F8FAFC]"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function ViewIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 7l1 14h10l1-14" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 7V4h6v3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}