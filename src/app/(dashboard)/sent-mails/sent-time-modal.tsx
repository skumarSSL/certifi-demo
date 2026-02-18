import Modal from "@/utils/modal";

const SentTimeModal = ({
  onCloseModal,
  email_dr_time,
  sms_dr_time,
  read_time,
  subject,
  recipient,
  whatsapp_dr_time,
}: any) => {
  // const [is_open_modal, setIsOpenModal] = useState(false);

  // useEffect(() => {
  //   setIsOpenModal(true);
  // }, []);

  // const onClose = () => {
  //   onCloseModal && onCloseModal();
  //   setIsOpenModal(false);
  // };

  return (
    <Modal height={"40%"}>
      <div className="-mt-3">
        <div className="px-2 rounded-2xl  bg-[#f5f6fa] shadow-[0px_8px_24px_rgba(149,157,165,0.2)] py-1">
          <p className="text-xs text-[#0E6DBD] font-semibold">{recipient}</p>
          <p className="text-gray-600">
            Subject:{" "}
            <span className="font-bold">{"Course Completion Certificate"}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-gray-600">
          Email Delivered Time:{" "}
          <span className="font-bold">{"16 Feb, 2026 12:11:23"}</span>
        </p>
        <p className="text-gray-600">
          SMS Delivered Time:{" "}
          <span className="font-bold"> {"16 Feb, 2026 12:11:23"}</span>
        </p>
        <p className="text-gray-600">
          WhatsApp Delivered At:{" "}
          <span className="font-bold"> {"16 Feb, 2026 12:11:23"}</span>
        </p>
        <p className="text-gray-600">
          Read Time:{" "}
          <span className="font-bold"> {"16 Feb, 2026 12:11:23"}</span>
        </p>
      </div>
    </Modal>
  );
};

export default SentTimeModal;
