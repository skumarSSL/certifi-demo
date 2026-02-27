import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";

export default function RecipientDropdown({ recipientType, onSelect }: any) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => {
          //   setOpen(!open);
          onSelect(recipientType);
        }}
        className="rounded-md h-10 w-20 px-2 text-md font-medium text-white bg-primary hover:font-semibold hover:bg-[#0777B2] cursor-pointer flex items-center justify-evenly space-x-5 border border-sky-800"
      >
        <span className="uppercase">
          {/* {recipientType ? recipientType.replace("_", " ") : "Add"} */} ADD
        </span>
        {/* <ChevronDown className="h-4 w-4" /> */}
      </button>

      {/* Dropdown
      {open && (
        <div className="absolute right-0 mt-2 w-34 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              onSelect("to");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            TO
          </button>

          <button
            onClick={() => {
              onSelect("cc");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            CC
          </button>

          <button
            onClick={() => {
              onSelect("certifi_cc");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            CERTIFI CC
          </button>
        </div>
      )} */}
    </div>
  );
}
