import Modal from "@/utils/modal";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Contact = {
  email: string;
  mobile: string;
};

const InputRecipientModal = ({
  isOpenModal,
  recipientType,
  onCloseModal,
  emails = [],
  onAddEmail,
}: any) => {
  const [toSent, setToSent] = useState("");
  const [mobile, setMobile] = useState("");
  const [recipientInfo, setRecipientInfo] = useState<Contact[]>([]);

  useEffect(() => {
    setRecipientInfo(emails);
  }, []);

  const onClose = () => {
    onCloseModal();
  };

  const onChangeMobile = (e: any) => {
    const key_name = e.target.name;
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (key_name === "mobile") {
      let newVal = parseInt(val);
      let preVal = parseInt(mobile);

      setMobile(
        newVal < 1 || newVal.toString().length > 10 ? preVal.toString() : val,
      );
    }
  };

  const onAdd = () => {
    let index = recipientInfo.findIndex((item: any) => item.email === toSent);
    if (index > -1) {
      toast.error("No Duplicate entry allowed !!");
      return;
    }
    let new_recipients = [...recipientInfo, { email: toSent, mobile: mobile }];
    setRecipientInfo(new_recipients);
    setToSent("");
    setMobile("");
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  const removeEmail = (email: string) => {
    let new_recipients = [];
    new_recipients = recipientInfo.filter((item: any) => item.email != email);
    setRecipientInfo(new_recipients);
  };

  return (
    <Modal
      is_open_modal={isOpenModal}
      size="large"
      onClose={onClose}
      close={false}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3 justify-end w-full">
            <div className="flex space-x-3 justify-between items-center w-full">
              <p className="font-medium text-gray-800 text-lg">
                Add Recipients
              </p>
              <button
                className={`relative text-md font-bold hover:text-white hover:bg-[#ED9337] px-2 py-1 rounded-md cursor-pointer shadow-2xs bg-[#ED9337] text-white `}
              >
                {recipientType === "certified_cc"
                  ? "CERTIFI Cc"
                  : recipientType === "to_mail"
                    ? "To"
                    : "Cc"}
              </button>
            </div>
          </div>

          {/* <button
            onClick={onCloseModal}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button> */}
        </div>

        {recipientInfo.length > 0 && (
          <div className="space-y-3 bg-gray-200 p-2 rounded-xl">
            <div className="flex flex-wrap gap-2 text-sm">
              {recipientInfo.map((item: any) => (
                <p
                  key={item.email}
                  className="flex space-x-2 text-gray-800 rounded-full p-2 bg-white justify-center items-center"
                >
                  <span>{item.email},</span>
                  <span className="font-medium">{item.mobile}</span>
                  <X
                    onClick={() => removeEmail(item.email)}
                    className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0"
                  />
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-gray-800 mt-11">
          <div className="grid grid-cols-12 col-span-1">
            <label className="font-semibold text-md col-span-2">
              Email<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="toSent"
              value={toSent}
              className={`w-full col-span-10 border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
              onChange={(e) => setToSent(e.target.value)}
            />
          </div>

          <div className="flex space-x-3 items-end col-span-1">
            <div className="grid grid-cols-12 gap-5 w-full">
              <label className="font-semibold text-md col-span-2 ">
                Mobile<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                value={mobile}
                className={`w-full col-span-8 border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
                onChange={onChangeMobile}
                onKeyDown={onKeyPress}
              />
              <Plus
                onClick={onAdd}
                className="w-10 h-10 col-span-2 rounded-full p-2 bg-[#0976B1] text-white hover:bg-sky-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-11 text-lg font-medium">
          <button
            className="text-gray-800 bg-gray-100 px-11 py-1 rounded-4xl hover:bg-gray-200 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAddEmail(recipientType, recipientInfo);
              onClose();
            }}
            className="text-white bg-[#E98937] px-11 py-1 rounded-4xl hover:bg-orange-400 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InputRecipientModal;
