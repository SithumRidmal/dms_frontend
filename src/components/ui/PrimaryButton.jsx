export default function PrimaryButton({
  children,
  type = "button",
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`h-[36px] w-full rounded-[6px] text-[13px] font-medium text-white transition-all ${
        disabled
          ? "cursor-not-allowed bg-[#2563EB]/45"
          : "bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF]"
      }`}
    >
      {children}
    </button>
  );
}