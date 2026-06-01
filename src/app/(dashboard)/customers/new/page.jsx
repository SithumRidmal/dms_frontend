"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";

const initialFormData = {
  customerName: "",
  parentCompany: "Smith & Associates",
  userName: "",
  password: "",
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  zipCode: "",
  city: "",
  state: "",
  phone: "",
  fax: "",
  email: "",

  managerFirstName: "",
  managerMiddleName: "",
  managerLastName: "",
  managerPhone: "",
  managerEmail: "",
  ipAddresses: "",
};

export default function NewCustomerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;

    if (name === "phone" || name === "fax" || name === "managerPhone") {
      nextValue = formatPhone(value);
    }

    if (name === "zipCode") {
      nextValue = value.replace(/\D/g, "").slice(0, 5);
    }

    if (name === "state") {
      nextValue = value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (submitAttempted) {
      const fieldError = validateCustomerField(name, nextValue);

      setErrors((prev) => {
        const nextErrors = { ...prev };

        if (fieldError) {
          nextErrors[name] = fieldError;
        } else {
          delete nextErrors[name];
        }

        return nextErrors;
      });
    }
  };

  const handleSave = () => {
    setSubmitAttempted(true);

    const validationErrors = validateCustomerForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("New customer data:", formData);

    // Later: call create customer API here
    router.push("/customers");
  };

  const getError = (field) => {
    if (!submitAttempted) return "";
    return errors[field] || "";
  };

  return (
    <DashboardShell>
      <div className="flex min-h-[calc(100vh-92px)] min-w-0 flex-col gap-5 overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[18px] font-semibold text-[#111827]">
            Customer Information
          </h1>

          <Link
            href="/customers"
            className="text-[12px] font-semibold text-[#007F96] hover:underline"
          >
            Customers
          </Link>
        </div>

        <section className="rounded-[10px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-sm">
          <div className="mx-auto w-full max-w-[980px]">
            

            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
                <CustomerField
                  label="Customer Name"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  error={getError("customerName")}
                  required
                  hint="Please leave blank spaces between numbers, names or words"
                />

                <CustomerField
                  label="Parent Company"
                  name="parentCompany"
                  value={formData.parentCompany}
                  onChange={handleChange}
                  type="select"
                  options={[
                    "Smith & Associates",
                    "Martinez Legal Group",
                    "Pacific Law Partners",
                    "Williams & Co.",
                    "Brown Family Trust",
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomerField
                  label="User Name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  error={getError("userName")}
                  required
                />

                <CustomerField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  error={getError("password")}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <CustomerField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <CustomerField
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />

                <CustomerField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <CustomerField
                label="Customer Street Address / PO Box"
                name="address"
                value={formData.address}
                onChange={handleChange}
                hint="Please leave blank spaces between numbers, names or words"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[110px_minmax(0,1fr)_90px]">
                <CustomerField
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={getError("zipCode")}
                  inputMode="numeric"
                />

                <CustomerField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />

                <CustomerField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={getError("state")}
                  maxLength={2}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomerField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="XXX-XXX-XXXX"
                  error={getError("phone")}
                  inputMode="numeric"
                />

                <CustomerField
                  label="Fax"
                  name="fax"
                  value={formData.fax}
                  onChange={handleChange}
                  placeholder="XXX-XXX-XXXX"
                  error={getError("fax")}
                  inputMode="numeric"
                />
              </div>

              <CustomerField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                error={getError("email")}
                required
              />

              <div className="h-px w-full bg-[#E2E8F0]" />

              <div>
                <h3 className="mb-4 text-[13px] font-semibold text-[#111827]">
                  Office Manager
                </h3>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <CustomerField
                        label="First Name"
                        name="managerFirstName"
                        value={formData.managerFirstName}
                        onChange={handleChange}
                      />

                      <CustomerField
                        label="Middle Name"
                        name="managerMiddleName"
                        value={formData.managerMiddleName}
                        onChange={handleChange}
                      />

                      <CustomerField
                        label="Last Name"
                        name="managerLastName"
                        value={formData.managerLastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <CustomerField
                        label="Phone"
                        name="managerPhone"
                        value={formData.managerPhone}
                        onChange={handleChange}
                        placeholder="XXX-XXX-XXXX"
                        error={getError("managerPhone")}
                        inputMode="numeric"
                      />

                      <CustomerField
                        label="Email"
                        name="managerEmail"
                        value={formData.managerEmail}
                        onChange={handleChange}
                        error={getError("managerEmail")}
                      />
                    </div>
                  </div>

                  <CustomerField
                    label="IP Addresses"
                    name="ipAddresses"
                    value={formData.ipAddresses}
                    onChange={handleChange}
                    textarea
                    placeholder="WHITE LIST OF IP ADDRESS (ONE IP ADDRESS PER LINE)"
                    hint="one ip address per line"
                  />
                </div>
              </div>

              {submitAttempted && Object.keys(errors).length > 0 && (
                <div className="rounded-[7px] border border-red-200 bg-red-50 px-3 py-3 text-[12px] font-semibold text-red-600">
                  Please fill out all required fields correctly.
                </div>
              )}

              <div className="pt-2">
  <button
    type="button"
    onClick={handleSave}
    className="inline-flex h-[38px] min-w-[74px] items-center justify-center rounded-[6px] bg-[#0097B2] px-5 text-[12px] font-semibold text-white hover:bg-[#0086A0]"
  >
    Save
  </button>
</div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function CustomerField({
  label,
  name,
  value,
  onChange,
  error = "",
  type = "text",
  placeholder = "",
  required = false,
  hint = "",
  options = [],
  textarea = false,
  inputMode,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-[#64748B]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-[102px] w-full resize-none rounded-[6px] border bg-white px-3 py-3 text-[12px] leading-[18px] text-[#111827] outline-none placeholder:text-[#94A3B8] focus:ring-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-[#CBD5E1] focus:border-[#0097B2] focus:ring-[#0097B2]/10"
          }`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="h-[38px] w-full rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-[12px] text-[#111827] outline-none focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          className={`h-[38px] w-full rounded-[6px] border bg-white px-3 text-[12px] text-[#111827] outline-none placeholder:text-[#94A3B8] focus:ring-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-[#CBD5E1] focus:border-[#0097B2] focus:ring-[#0097B2]/10"
          }`}
        />
      )}

      <div className="mt-1 min-h-[15px]">
        {error ? (
          <p className="text-[11px] font-medium text-red-500">{error}</p>
        ) : hint ? (
          <p className="text-[10px] text-[#94A3B8]">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

function validateCustomerForm(data) {
  const errors = {};

  if (!data.customerName.trim()) {
    errors.customerName = "Customer name is required";
  }

  if (!data.userName.trim()) {
    errors.userName = "User name is required";
  }

  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (data.managerEmail && !isValidEmail(data.managerEmail)) {
    errors.managerEmail = "Enter a valid email address";
  }

  if (data.zipCode && data.zipCode.length !== 5) {
    errors.zipCode = "ZIP must be 5 digits";
  }

  if (data.state && data.state.length !== 2) {
    errors.state = "State must be 2 letters";
  }

  if (data.phone && getDigits(data.phone).length !== 10) {
    errors.phone = "Enter a valid 10 digit number";
  }

  if (data.fax && getDigits(data.fax).length !== 10) {
    errors.fax = "Enter a valid 10 digit number";
  }

  if (data.managerPhone && getDigits(data.managerPhone).length !== 10) {
    errors.managerPhone = "Enter a valid 10 digit number";
  }

  return errors;
}

function validateCustomerField(field, value) {
  if (!value.trim()) {
    if (field === "customerName") return "Customer name is required";
    if (field === "userName") return "User name is required";
    if (field === "password") return "Password is required";
    if (field === "email") return "Email is required";
  }

  if (field === "password" && value && value.length < 8) {
    return "Password must be at least 8 characters";
  }

  if ((field === "email" || field === "managerEmail") && value) {
    if (!isValidEmail(value)) return "Enter a valid email address";
  }

  if (field === "zipCode" && value && value.length !== 5) {
    return "ZIP must be 5 digits";
  }

  if (field === "state" && value && value.length !== 2) {
    return "State must be 2 letters";
  }

  if (
    (field === "phone" || field === "fax" || field === "managerPhone") &&
    value &&
    getDigits(value).length !== 10
  ) {
    return "Enter a valid 10 digit number";
  }

  return "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function getDigits(value) {
  return value.replace(/\D/g, "");
}

function formatPhone(value) {
  const digits = getDigits(value).slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}