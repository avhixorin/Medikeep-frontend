import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

interface DropdownProps {
  handleMonthSelect: (month: string) => void;
  selectedMonth: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  handleMonthSelect,
  selectedMonth,
}) => {
  const [options] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center rounded-lg">
      <button
        className="w-full gap-2 py-1 px-2 text-zinc-700 rounded-lg border-2 border-slate-300 active:border-white duration-300 active:text-white-100 flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedMonth}
        {isOpen ? (
          <AiOutlineCaretUp size={14} />
        ) : (
          <AiOutlineCaretDown size={14} />
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-12 bg-slate-100 w-full border-2 rounded-lg flex flex-col justify-center items-center pointer-events-auto z-30 overflow-y-auto scrollbar-webkit">
          {options.map((month, index) => (
            <button
              key={index}
              onClick={() => {
                handleMonthSelect(month);
                setIsOpen(false);
              }}
              className="w-full text-zinc-700 py-2 px-4  hover:bg-slate-200 rounded-r-lg hover:border-l-4 hover:border-black"
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
