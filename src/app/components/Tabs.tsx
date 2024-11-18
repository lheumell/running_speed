"use client";

const Tabs = ({
  items,
  selectedItem,
  onClick,
}: {
  items: { label: string; color: string }[];
  selectedItem: string;
  onClick: (item: string) => void;
}) => {
  return (
    <div className="">
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option selected>Heures</option>
          <option>Allure</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="">
          <nav className="flex">
            {items.map((item) => (
              <a
                onClick={() => onClick(item.label)}
                className={
                  selectedItem === item.label
                    ? `${item.color} cursor-pointer -mb-px shrink-0 rounded-t-lg p-3 text-sm font-medium text-white w-24 text-center`
                    : `${item.color} mt-1 rounded-t-lg cursor-pointer -mb-px shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700 w-24 text-center`
                }
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
