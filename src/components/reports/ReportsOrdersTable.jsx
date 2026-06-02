"use client";

export default function ReportsOrdersTable({ orders, minimumColumns }) {
  return (
    <section className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white shadow-sm">
      <div className="h-full max-h-[calc(100vh-225px)] overflow-auto">
        <table
          className={`w-full border-collapse ${
            minimumColumns ? "min-w-[1050px]" : "min-w-[1900px]"
          }`}
        >
          <thead className="sticky top-0 z-10 bg-white">
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
                  <th className="w-[230px] px-4 py-3">Provider on Subpoena</th>
                  <th className="w-[190px] px-4 py-3">Records Requested</th>
                  <SortableHeader label="Doctor" />
                  <th className="w-[210px] px-4 py-3">Address</th>
                </>
              )}

              <th className="w-[90px] px-4 py-3">Rush</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#F1F5F9] last:border-b-0 hover:bg-[#F8FBFC]"
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
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#059669]">
                      <CheckIcon />
                      Invoiced
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#007F96] hover:underline"
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
                      {order.address}
                    </td>
                  </>
                )}

                <td className="px-4 py-6 align-middle">
                  {order.rush === "–" ? (
                    <span className="text-[12px] text-[#94A3B8]">–</span>
                  ) : (
                    <span className="inline-flex h-[26px] items-center justify-center rounded-[5px] border border-[#FDBA74] bg-[#FFF7ED] px-3 text-[10px] font-semibold text-[#EA580C]">
                      {order.rush}
                    </span>
                  )}
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
      <span className="inline-flex items-center gap-1">
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