import Modal from "@/utils/modal";
import { Check, Plus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Contact = {
  email: string;
  mobile?: string;
};

type Error = {
  to_sent?: string;
  mobile?: string;
};

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const InputRecipientModal = ({
  isOpenModal,
  recipientType,
  cc,
  certified_cc,
  onCloseModal,
  emails = [],
  onAddEmail,
}: any) => {
  const [toSent, setToSent] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<Error>({});
  const [previousMails, setPreviousMails] = useState<Contact[]>([]);
  const [recipientInfo, setRecipientInfo] = useState<Contact[]>([]);

  useEffect(() => {
    setPreviousMails(emails);
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
    let prevMailIndex = previousMails.findIndex(
      (item: any) => item.email === toSent,
    );
    let new_error: Error = {};
    if (!toSent) {
      new_error.to_sent = "Email is mandatory";
    }

    if (toSent && !emailRegExp.test(toSent)) {
      new_error.to_sent = "Please provide the valid email";
      toast.error(new_error.to_sent);
    }

    if (recipientType !== "cc" && !mobile) {
      new_error.mobile = "Mobile is mandatory";
    }

    if (recipientType !== "cc" && mobile && mobile.trim().length < 10) {
      new_error.mobile = "Please provide the valid mobile number";
      toast.error(new_error.mobile);
    }

    if (Object.keys(new_error).length > 0) {
      setError(new_error);
      return;
    }

    if (recipientType === "to_mail" && recipientInfo.length >= 5) {
      toast.error("Only 5 recipients allowed");
      return;
    } else if (
      (recipientType === "cc" || recipientType === "certified_cc") &&
      cc.length + certified_cc.length >= 10
    ) {
      toast.error("Atmost 10 combined cc and certified cc are allowed");
      return;
    } else if (index > -1 || prevMailIndex > -1) {
      toast.error("No Duplicate entry allowed !!");
      return;
    }

    let new_recipients: any = [];
    if (recipientType !== "cc") {
      new_recipients = [...recipientInfo, { email: toSent, mobile: mobile }];
    } else {
      new_recipients = [...recipientInfo, { email: toSent }];
    }

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
    new_recipients = previousMails.filter((item: any) => item.email != email);
    setPreviousMails(new_recipients);
  };

  const removeRecentEmail = (email: string) => {
    let new_recipients = [];
    new_recipients = recipientInfo.filter((item: any) => item.email != email);
    setRecipientInfo(new_recipients);
  };

  const onConfirm = () => {
    let new_error: Error = {};
    if (mobile && !toSent) {
      new_error.to_sent = "Mobile is mandatory";
    }

    if (toSent && !emailRegExp.test(toSent)) {
      new_error.to_sent = "Please provide the valid email";
      toast.error(new_error.to_sent);
    }

    if (toSent && recipientType !== "cc" && !mobile) {
      new_error.mobile = "Mobile is mandatory";
    }

    if (recipientType !== "cc" && mobile && mobile.trim().length < 10) {
      new_error.mobile = "Please provide the valid mobile number";
      toast.error(new_error.mobile);
    }

    if (Object.keys(new_error).length > 0) {
      setError(new_error);
      return;
    }

    let index = recipientInfo.findIndex((item: any) => item.email === toSent);
    let prevMailIndex = previousMails.findIndex(
      (item: any) => item.email === toSent,
    );

    if (recipientType === "to_mail" && recipientInfo.length >= 5) {
      toast.error("Only 5 recipients allowed");
      return;
    } else if (
      (recipientType === "cc" || recipientType === "certified_cc") &&
      cc.length + certified_cc.length >= 10
    ) {
      toast.error("Atmost 10 combined cc and certified cc are allowed");
      return;
    } else if (index > -1 || prevMailIndex > -1) {
      toast.error("No Duplicate entry allowed !!");
      return;
    }

    setToSent("");
    setMobile("");
    onAddEmail(recipientType, [...previousMails, ...recipientInfo]);
    onClose();
  };

  const changeTickColor = () => {
    let is_valid = true;

    if (!toSent || (recipientType !== "cc" && mobile.trim().length < 10)) {
      is_valid = false;
    }

    if (toSent && !emailRegExp.test(toSent)) {
      is_valid = false;
    }

    return is_valid;
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

        {(previousMails.length > 0 || recipientInfo.length > 0) && (
          <div className="space-y-3 bg-gray-200 p-2 rounded-xl">
            <div className="flex flex-wrap gap-2 text-sm">
              {previousMails.map((item: any) => (
                <div className="relative group inline-block">
                  {/* Recently Added label */}
                  {/* <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-sky-900 uppercase opacity-0 group-hover:opacity-100 z-20 pointer-events-none p-2 rounded-full">
                    Recently Added
                  </span> */}

                  <div
                    key={item.email}
                    className="flex space-x-2 text-gray-800 rounded-full  justify-center items-center bg-orange-300"
                  >
                    <p className="flex space-x-2 text-gray-800 rounded-full p-2 bg-white justify-center items-center transition">
                      <span>
                        {item.email}
                        {recipientType !== "cc" && ","}
                      </span>

                      <span className="font-medium">{item.mobile}</span>
                    </p>

                    <X
                      onClick={() => removeRecentEmail(item.email)}
                      className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0 relative mr-2"
                    />
                  </div>
                </div>
              ))}

              {recipientInfo.map((item: any) => (
                <div className="relative group inline-block">
                  {/* Recently Added label */}
                  {/* <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-sky-900 uppercase opacity-0 group-hover:opacity-100 z-20 pointer-events-none p-2 rounded-full">
                    Recently Added
                  </span> */}

                  <div
                    key={item.email}
                    className="flex space-x-2 text-gray-800 rounded-full  justify-center items-center bg-orange-300"
                  >
                    <p className="flex space-x-2 text-gray-800 rounded-full p-2 bg-white justify-center items-center transition">
                      <span>
                        {item.email}
                        {recipientType !== "cc" && ","}
                      </span>

                      <span className="font-medium">{item.mobile}</span>
                    </p>

                    <X
                      onClick={() => removeRecentEmail(item.email)}
                      className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0 relative mr-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {recipientInfo.length > 0 && (
          <div>
            <p>Recently Added</p>
            <div className="space-y-3 bg-gray-200 p-2 rounded-xl">
              <div className="flex flex-wrap gap-2 text-sm">
                {recipientInfo.map((item: any) => (
                  <p
                    key={item.email}
                    className="flex space-x-2 text-gray-800 rounded-full p-2 bg-white justify-center items-center"
                  >
                    <span>
                      {item.email}
                      {recipientType !== "cc" && ","}
                    </span>
                    <span className="font-medium">{item.mobile}</span>
                    <X
                      onClick={() => removeRecentEmail(item.email)}
                      className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0"
                    />
                  </p>
                ))}
              </div>
            </div>
          </div>
        )} */}

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-gray-800 mt-11">
          <div className="grid grid-cols-12 col-span-1">
            <label className="font-semibold text-md col-span-2">
              Email<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="toSent"
              value={toSent}
              className={`w-full col-span-10 border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary ${error.to_sent && "border-red-600"}`}
              onChange={(e) => setToSent(e.target.value)}
              onFocus={() => {
                let error_info = { ...error };
                delete error_info.to_sent;
                setError(error_info);
              }}
            />
          </div>

          <div className="flex space-x-3 items-end col-span-1">
            <div className="grid grid-cols-12 gap-5 w-full">
              {recipientType !== "cc" && (
                <>
                  <label className="font-semibold text-md col-span-2 ">
                    Mobile<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={mobile}
                    className={`w-full col-span-8 border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary ${error.mobile && "border-red-600"}`}
                    onChange={onChangeMobile}
                    onKeyDown={onKeyPress}
                    onFocus={() => {
                      let error_info = { ...error };
                      delete error_info.mobile;
                      setError(error_info);
                    }}
                  />
                </>
              )}
              <span
                onClick={onAdd}
                className={`w-10 h-10 col-span-2 text-2xl rounded-full p-2 bg-green-600 ${changeTickColor() ? "opacity-100" : "opacity-50"} text-white  cursor-pointer flex justify-center items-center font-extrabold`}
              >
                ✓
              </span>
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
            onClick={onConfirm}
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
