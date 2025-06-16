import { useState } from "react";
import { ArrowDown } from "lucide-react";
 
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="ml-2 relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          {selectedOption || "Выберите группу"} 
          <ArrowDown className="w-4 h-4 ml-1" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        >
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedOption("Группа 1")}}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              1
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedOption("Группа 2")
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              2
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedOption("Группа 3")
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              3
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
