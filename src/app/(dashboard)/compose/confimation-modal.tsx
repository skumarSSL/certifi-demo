"use client";

import React, { useState, useMemo } from "react";
import { Check, ShieldCheck, Mail, Users, Info } from "lucide-react";

interface Recipient {
  email: string;
  mobile: string;
  type: "to_mail" | "cc" | "certified_cc";
}

interface ConfirmationModalProps {
  isOpen: boolean;
  recipients: Recipient[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  recipients,
  onConfirm,
  onCancel,
}) => {
  // Track confirmed categories
  const [confirmedCategories, setConfirmedCategories] = useState<Set<string>>(
    new Set(),
  );

  const grouped = useMemo(
    () => ({
      to: recipients.filter((r) => r.type === "to_mail"),
      cc: recipients.filter((r) => r.type === "cc"),
      certified: recipients.filter((r) => r.type === "certified_cc"),
    }),
    [recipients],
  );

  // Only categories that actually have people in them need to be confirmed
  const activeCategoryKeys = useMemo(() => {
    return Object.keys(grouped).filter(
      (key) => grouped[key as keyof typeof grouped].length > 0,
    );
  }, [grouped]);

  const toggleCategory = (key: string) => {
    const newSet = new Set(confirmedCategories);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setConfirmedCategories(newSet);
  };

  const isAllConfirmed = activeCategoryKeys.every((key) =>
    confirmedCategories.has(key),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[8888] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Final Confirmation
            </h2>
          </div>
          {/* <p className="text-slate-500 text-sm">
            Review your recipient groups and confirm to start the certified delivery.
          </p> */}
        </div>

        {/* Scrollable Content */}
        <div className="px-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/30">
          {activeCategoryKeys.map((key) => {
            const list = grouped[key as keyof typeof grouped];
            const isConfirmed = confirmedCategories.has(key);

            return (
              <div
                key={key}
                className={`group transition-all duration-300 rounded-2xl border-2 overflow-hidden ${
                  isConfirmed
                    ? "border-sky-500 bg-white shadow-md"
                    : "border-slate-200 bg-white"
                }`}
              >
                {/* Category Header / Toggle */}
                <button
                  onClick={() => toggleCategory(key)}
                  className={`w-full flex items-center justify-between px-4 py-2 transition-colors ${
                    isConfirmed
                      ? "bg-sky-500 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {key === "certified" ? (
                      <ShieldCheck size={18} />
                    ) : (
                      <Users size={18} />
                    )}
                    <span className="font-bold uppercase tracking-wider text-sm">
                      Confirm {key === "certified" ? "CERTIFI Cc" : key.replace("_", " ")} list ({list.length})
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isConfirmed
                        ? "bg-white border-white scale-110"
                        : "border-slate-300"
                    }`}
                  >
                    {isConfirmed && (
                      <Check
                        size={14}
                        className="text-sky-500"
                        strokeWidth={4}
                      />
                    )}
                  </div>
                </button>

                {/* Recipient List (Read Only) */}
                <div className="px-3 py-1 bg-white space-y-1">
                  {list.map((person, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-2 py-1.5"
                    >
                      <Mail size={14} className="text-slate-300 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-600 font-medium">
                          {person.email}
                        </span>
                        {person.mobile && (
                          <span className="text-[12px] text-slate-500 tracking-normal">
                            SMS: {person.mobile}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 p-4 bg-amber-50 rounded-xl border border-amber-100 mt-3 mx-1">
          <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-700 leading-tight">
            By confirming these groups, you acknowledge that all these
            recipients details are correct.
          </p>
        </div>
        {/* Footer */}
        <div className="p-6 bg-white   border-slate-100 flex flex-col gap-3">
          <button
            onClick={onConfirm}
            disabled={!isAllConfirmed}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-[0.98] ${
              isAllConfirmed
                ? "bg-sky-600 shadow-lg shadow-sky-200 hover:bg-sky-700"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            Proceed to Certified Communication
          </button>
          <button
            onClick={onCancel}
            className="w-full py-1 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Go back and Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
