"use client";

import { X } from "lucide-react";

const RecipientSection = ({ recipientInfo, recipientType, onClick }: any) => {
  const MAX_VISIBLE = 2;

  const visibleCc = recipientInfo.slice(0, MAX_VISIBLE);
  const remaining = recipientInfo.length - MAX_VISIBLE;

  return (
    <div
      className={`grid grid-cols-12 ${recipientInfo.length == 0 && "h-10"}`}
      onClick={() => onClick(recipientType)}
    >
      <div className="col-span-1">
        <label className="font-semibold text-sm">
          {recipientType === "certified_cc"
            ? "CERTIFI Cc"
            : recipientType === "to_mail"
              ? "To"
              : "Cc"}{" "}
          {recipientType === "to_mail" && (
            <span className="text-red-400">*</span>
          )}
        </label>
      </div>

      <div className="col-span-11 flex items-center gap-2 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded overflow-hidden">
        {visibleCc.map((item: any, i: number) => (
          <div
            key={i}
            className="flex items-center bg-white text-sm rounded-full px-2 py-1 shrink-0"
          >
            <p className="truncate max-w-[300px]">
              {item.email}, <span>{item.mobile}</span>
            </p>

            {/* <X className="w-4 h-4 ml-1 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200" /> */}
          </div>
        ))}

        {remaining > 0 && (
          <div className="text-sm bg-gray-200 rounded-full px-2 py-1 text-gray-700 shrink-0 ml-5">
            +{remaining}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientSection;
