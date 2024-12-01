"use client";

const Select = ({ items }: { items: string[] }) => {
  return (
    <div>
      <label
        htmlFor="HeadlineAct"
        className="block text-sm font-medium text-gray-900"
      >
        {" "}
        Headliner{" "}
      </label>

      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        {items.map((item) => (
          <option key={item} value={items}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
