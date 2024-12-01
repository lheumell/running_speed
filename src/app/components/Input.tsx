"use client";

const Input = ({
  value,
  label,
  onChange,
  className,
}: {
  value: number | null;
  label: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center`}>
      <input
        type="number"
        id="UserEmail"
        value={value || undefined}
        className={`${className} bg-transparent border-b border-black text-center w-full`}
        onChange={(e) => onChange(e.target.value)}
      />
      <span>{label}</span>
    </div>
  );
};

export default Input;
