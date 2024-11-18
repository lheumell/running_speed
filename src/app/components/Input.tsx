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
    <label
      htmlFor="UserEmail"
      className={className}
      // className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="number"
        id="UserEmail"
        placeholder={label}
        value={value || undefined}
        className="bg-transparent"
        onChange={(e) => onChange(e.target.value)}
        // className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      />
      <span className="start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
};

export default Input;
