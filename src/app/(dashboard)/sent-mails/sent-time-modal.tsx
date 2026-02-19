import Modal from "@/utils/modal";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SentTimeModal = ({
  onCloseModal,
  email_dr_time,
  sms_dr_time,
  read_time,
  subject,
  recipient,
  whatsapp_dr_time,
}: any) => {
  const [is_open_modal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setIsOpenModal(true);
  }, []);

  const onClose = () => {
    onCloseModal && onCloseModal();
    setIsOpenModal(false);
  };

  return (
    <Modal size="medium" is_open_modal={is_open_modal} onClose={onClose}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
              S
            </div>
            <div>
              <p className="font-semibold text-gray-900">{recipient}</p>
              <p className="text-sm text-gray-400">20 May 2023</p>
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
            <span className="text-gray-600">📧 Email Delivered</span>
            <span className="font-medium">{email_dr_time}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">📱 SMS Delivered</span>
            <span className="font-medium">{sms_dr_time}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">💬 WhatsApp Delivered</span>
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
