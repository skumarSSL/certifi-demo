import Modal from "@/utils/modal";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import MessageSvg from "@/assets/message.svg";
import MailInfoSvg from "@/assets/mail-info.svg";
import WhatsAppPng from "@/assets/whatsapp.png";

const SentTimeModal = ({
  id,
  isOpenModal,
  onCloseModal,
  time,
  email_dr_time,
  sms_dr_time,
  read_time,
  subject,
  recipient,
  whatsapp_dr_time,
}: any) => {
  const onClose = () => {
    onCloseModal();
  };

  const stringToGradient = (str: string) => {
    const colors = ["#6366f1", "#22c55e", "#f97316", "#ec4899"];
    let hash = str.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return `linear-gradient(135deg, ${colors[hash % colors.length]}, ${
      colors[(hash + 1) % colors.length]
    })`;
  };

  return (
    <Modal
      id={id}
      size="large"
      is_open_modal={isOpenModal}
      onClose={onClose}
      close={false}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold uppercase"
              style={{
                background: stringToGradient(recipient.substring(0, 2)),
              }}
            >
              {recipient.substring(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{recipient}</p>
              <p className="text-sm text-gray-400">{time}</p>
            </div>
          </div>

          <button
            onClick={onCloseModal}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Subject</p>
          <p className="font-semibold text-lg text-gray-800">
            {subject || "Course Completion Certificate"}
          </p>
        </div>

        {/* Delivery Info */}
        <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
          <div className="flex justify-between text-sm">
            <p className="flex space-x-2 text-gray-600">
              <img src={MailInfoSvg.src} className="w-5 h-5 cursor-pointer" />
              <span>Email Delivered</span>
            </p>
            <span className="font-medium">{email_dr_time}</span>
          </div>

          <div className="flex justify-between text-sm">
            <p className="flex space-x-2 text-gray-600">
              <img src={MessageSvg.src} className="w-5 h-5 cursor-pointer" />
              <span>SMS Delivered</span>
            </p>
            <span className="font-medium">{sms_dr_time}</span>
          </div>

          <div className="flex justify-between text-sm">
            <p className="flex space-x-2 text-gray-600">
              <img src={WhatsAppPng.src} className="w-5 h-5 cursor-pointer" />
              <span>WhatsApp Delivered</span>
            </p>
            <span className="font-medium">{whatsapp_dr_time}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">👁 Read Time</span>
            <span className="font-medium">{read_time}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SentTimeModal;
