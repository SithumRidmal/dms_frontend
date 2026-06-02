"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const invoiceTypes = [
  "Create Invoice",
  "Create Insurance Bill",
  "Create Custodian Invoice",
];

const initialFormData = {
  invoiceDate: "2026-06-02",
  serviceDate: "",
  servedAmount: "10.00",
  serviceFee: "250.00",
  custodianFee: "100.00",
  xrayFee: "0.00",
  mileage: "0.00",
  parking: "0.00",
  pages: "0",
  other: "0.00",
  notes: "",
  sendOrderDetails: false,
  rushOrder: false,
};

export default function CreateInvoiceModal({ isOpen, order, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [activeType, setActiveType] = useState("Create Invoice");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setActiveType("Create Invoice");
    setFormData(initialFormData);
    setErrors({});
  }, [isOpen, order]);

  const totalAmount = useMemo(() => {
    return (
      toNumber(formData.servedAmount) +
      toNumber(formData.serviceFee) +
      toNumber(formData.custodianFee) +
      toNumber(formData.xrayFee) +
      toNumber(formData.mileage) +
      toNumber(formData.parking) +
      toNumber(formData.other)
    );
  }, [formData]);

  if (!mounted || !isOpen || !order) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleMoneyChange = (e) => {
    const { name, value } = e.target;

    const cleanValue = value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/^(\d*\.\d{0,2}).*$/, "$1");

    setFormData((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const validationErrors = validateInvoiceForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("Create invoice:", {
      type: activeType,
      order,
      formData,
      totalAmount,
    });

    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-[2px]">
      <section className="flex w-full max-w-[760px] flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl">
        <div className="flex h-[48px] shrink-0 items-center justify-between border-b border-[#E2E8F0] px-5">
          <h2 className="text-[15px] font-semibold text-[#111827]">
            Create Invoice
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] text-[17px] leading-none text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#334155]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="shrink-0 border-b border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px]">
            <InfoItem label="Order ID:" value={order.id} />
            <InfoItem label="WCAB:" value={order.court || "N/A"} />
            <InfoItem label="Client:" value={order.applicant} />
            <InfoItem
              label="Company:"
              value={order.company?.name || "N/A"}
              linkStyle
            />
          </div>
        </div>

        <div className="shrink-0 border-b border-[#E2E8F0] px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {invoiceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`h-[32px] rounded-[5px] px-4 text-[11px] font-semibold transition ${
                  activeType === type
                    ? "bg-[#0097B2] text-white"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[calc(100vh-300px)] overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <DateField
              label="Invoice Date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              error={errors.invoiceDate}
            />

            <DateField
              label="Service Date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              error={errors.serviceDate}
            />

            <MoneyField
              label="Served Amount"
              name="servedAmount"
              value={formData.servedAmount}
              onChange={handleMoneyChange}
              error={errors.servedAmount}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MoneyField
              label="Service Fee"
              name="serviceFee"
              value={formData.serviceFee}
              onChange={handleMoneyChange}
              error={errors.serviceFee}
            />

            <MoneyField
              label="Custodian Fee"
              name="custodianFee"
              value={formData.custodianFee}
              onChange={handleMoneyChange}
              error={errors.custodianFee}
            />

            <MoneyField
              label="X-Ray Fee"
              name="xrayFee"
              value={formData.xrayFee}
              onChange={handleMoneyChange}
              error={errors.xrayFee}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MoneyField
              label="Mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleMoneyChange}
              error={errors.mileage}
            />

            <MoneyField
              label="Parking"
              name="parking"
              value={formData.parking}
              onChange={handleMoneyChange}
              error={errors.parking}
            />

            <NumberField
              label="Pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              error={errors.pages}
            />

            <MoneyField
              label="Other"
              name="other"
              value={formData.other}
              onChange={handleMoneyChange}
              error={errors.other}
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[11px] font-semibold text-[#475569]">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Invoice notes..."
              rows={3}
              className="h-[52px] w-full resize-none rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2 text-[12px] text-[#111827] outline-none placeholder:text-[#94A3B8] focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/10"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-8">
            <CheckboxField
              label="Send Order Details"
              name="sendOrderDetails"
              checked={formData.sendOrderDetails}
              onChange={handleChange}
            />

            <CheckboxField
              label="Rush Order"
              name="rushOrder"
              checked={formData.rushOrder}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-4 border-t border-[#E2E8F0] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-semibold text-[#111827]">
            Total Amount:{" "}
            <span className="text-[22px] font-bold text-[#007F96]">
              {formatMoney(totalAmount)}
            </span>
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[36px] rounded-[6px] px-5 text-[12px] font-semibold text-[#475569] hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="h-[36px] rounded-[6px] bg-[#0097B2] px-6 text-[12px] font-semibold text-white hover:bg-[#0086A0]"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}

function InfoItem({ label, value, linkStyle = false }) {
  return (
    <p className="text-[#64748B]">
      {label}{" "}
      <span
        className={`font-semibold ${
          linkStyle ? "text-[#007F96]" : "text-[#334155]"
        }`}
      >
        {value}
      </span>
    </p>
  );
}

function DateField({ label, name, value, onChange, error = "" }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-[#475569]">
        {label}
      </label>

      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className={`h-[36px] w-full rounded-[6px] border bg-white px-3 text-[12px] text-[#111827] outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-[#CBD5E1] focus:border-[#0097B2] focus:ring-[#0097B2]/10"
        }`}
      />

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function MoneyField({ label, name, value, onChange, error = "" }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-[#475569]">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#94A3B8]">
          $
        </span>

        <input
          type="text"
          inputMode="decimal"
          name={name}
          value={value}
          onChange={onChange}
          className={`h-[36px] w-full rounded-[6px] border bg-white pl-7 pr-3 text-[12px] text-[#111827] outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-[#CBD5E1] focus:border-[#0097B2] focus:ring-[#0097B2]/10"
          }`}
        />
      </div>

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function NumberField({ label, name, value, onChange, error = "" }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-[#475569]">
        {label}
      </label>

      <input
        type="number"
        min="0"
        name={name}
        value={value}
        onChange={onChange}
        className={`h-[36px] w-full rounded-[6px] border bg-white px-3 text-[12px] text-[#111827] outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-[#CBD5E1] focus:border-[#0097B2] focus:ring-[#0097B2]/10"
        }`}
      />

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function CheckboxField({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-[11px] text-[#64748B]">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-[13px] w-[13px] rounded border-[#CBD5E1] accent-[#0097B2]"
      />
      {label}
    </label>
  );
}

function validateInvoiceForm(data) {
  const errors = {};

  if (!data.invoiceDate) {
    errors.invoiceDate = "Required";
  }

  const moneyFields = [
    "servedAmount",
    "serviceFee",
    "custodianFee",
    "xrayFee",
    "mileage",
    "parking",
    "other",
  ];

  moneyFields.forEach((field) => {
    if (data[field] === "") {
      errors[field] = "Required";
    } else if (Number.isNaN(Number(data[field]))) {
      errors[field] = "Invalid";
    }
  });

  if (data.pages === "") {
    errors.pages = "Required";
  } else if (Number(data.pages) < 0) {
    errors.pages = "Invalid";
  }

  return errors;
}

function toNumber(value) {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
}

function formatMoney(value) {
  return `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}