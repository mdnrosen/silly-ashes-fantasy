import { AiOutlineClose } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";

type Props = {
  setFilterOpen: (open: boolean) => void;
  currentFilter: string | null;
  updateFilter: (newFilter: string) => void;
};

const LeaderboardFilter = ({
  setFilterOpen,
  currentFilter,
  updateFilter,
}: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFilterOpen(false);
    }, 300); // Match animation duration
  };

  const options = [
    { label: "Overall", value: "overall" },
    { label: "Second Test", value: "secondTest" },
    { label: "Third Test", value: "thirdTest" },
    { label: "Fourth Test", value: "fourthTest" },
    { label: "Fifth Test", value: "fifthTest" },
  ];

  const handleClick = (value: string) => {
    updateFilter(value);
    handleClose();
  };

  const renderOption = (option: { label: string; value: string }) => {
    const selected = currentFilter === option.value;
    return (
      <button
        onClick={() => handleClick(option.value)}
        key={option.value}
        className={`${
          selected ? "bg-blue-50" : ""
        } p-4 border-b border-gray-300 w-full text-left`}
      >
        <span className="mr-4">{selected ? "✓" : ""}</span>
        {option.label}
      </button>
    );
  };

  return (
    <div
      className={`p2 z-50 fixed top-0 w-full bg-off-white p-4 border-b-2 ${
        isClosing ? "animate-slide-up" : "animate-slide-down"
      }`}
    >
      <div className="p-2 flex justify-between items-center border-b-2">
        <span className="text-md font-semibold flex items-center uppercase">
          <FaFilter className="mr-4" /> Filter
        </span>
        <button onClick={handleClose}>
          <AiOutlineClose size={24} />
        </button>
      </div>
      <div className="flex flex-col">
        {options.map((option) => renderOption(option))}
      </div>
    </div>
  );
};

export default LeaderboardFilter;
