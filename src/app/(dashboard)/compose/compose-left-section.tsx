import { connect } from "react-redux";

import TiptapEditor from "@/app/(dashboard)/compose/editor";

import { ComposeSetFields } from "@/store/compose/compose-action";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import RecipientDropdown from "./recipient-dropdown";

type Contact = {
  email: string;
  mobile: string;
};

const ComposeLeftSection = (props: any) => {
  const [recipientType, setRecipientType] = useState("to");
  const [toRecipient, setToRecipient] = useState<Contact[]>([]);
  const [ccRecipient, setCCRecipient] = useState<Contact[]>([]);
  const [certifiCCRecipient, setCertifiCCRecipient] = useState<Contact[]>([]);

  const onChangeMobile = (e: any) => {
    const key_name = e.target.name;
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (key_name === "mobile_number") {
      let newVal = parseInt(val);
      let preVal = parseInt(props.mobile_number);

      props.Compose_Set_Fields(
        e.target.name,
        newVal < 1 || newVal.toString().length > 10 ? preVal.toString() : val,
      );
    }
  };

  const setFields = (e: any) => {
    props.Compose_Set_Fields(e.target.name, e.target.value);
  };

  const addRecipient = (value: string) => {
    setRecipientType(value);
    let new_recipients = [];
    if (value === "to") {
      new_recipients = [
        ...toRecipient,
        { email: props.to_sent, mobile: props.mobile_number },
      ];
      setToRecipient(new_recipients);
    } else if (value === "cc") {
      new_recipients = [
        ...ccRecipient,
        { email: props.to_sent, mobile: props.mobile_number },
      ];
      setCCRecipient(new_recipients);
    } else {
      new_recipients = [
        ...certifiCCRecipient,
        { email: props.to_sent, mobile: props.mobile_number },
      ];
      setCertifiCCRecipient(new_recipients);
    }

    props.Compose_Set_Fields("to_sent", "");
    props.Compose_Set_Fields("mobile_number", "");
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      addRecipient(recipientType);
    }
  };

  const removeRecipient = (recipient_type: string, email: string) => {
    let new_recipients = [];
    if (recipient_type === "to") {
      new_recipients = toRecipient.filter((item, i) => item.email != email);
      setToRecipient(new_recipients);
    } else if (recipient_type === "cc") {
      new_recipients = ccRecipient.filter((item, i) => item.email != email);
      setCCRecipient(new_recipients);
    } else {
      new_recipients = certifiCCRecipient.filter(
        (item, i) => item.email != email,
      );
      setCertifiCCRecipient(new_recipients);
    }
  };

  return (
    <div className="relative col-span-6 px-3 space-y-3 bg-white h-full flex flex-col">
      <div className="flex justify-end items-start space-x-2 mt-2">
        <button
          className={`relative text-sm font-bold text-white  hover:bg-orange-400 px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "to" ? "bg-orange-400" : "bg-[#EF9837]"}`}
          onClick={() => setRecipientType("to")}
        >
          TO
          {toRecipient.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {toRecipient.length}
            </span>
          )}
        </button>
        <button
          className={`relative text-sm font-bold text-white bg-[#EF9837] hover:bg-orange-400 px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "cc" ? "bg-orange-400" : "bg-[#EF9837]"}`}
          onClick={() => setRecipientType("cc")}
        >
          CC
          {ccRecipient.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {ccRecipient.length}
            </span>
          )}
        </button>
        <button
          className={`relative text-sm font-bold text-white bg-[#EF9837] hover:bg-orange-400 px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "certifi_cc" ? "bg-orange-400" : "bg-[#EF9837]"}`}
          onClick={() => setRecipientType("certifi_cc")}
        >
          CERTIFI CC
          {certifiCCRecipient.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {certifiCCRecipient.length}
            </span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 -mt-5">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">
            Recipient Email<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="to_sent"
            value={props.to_sent}
            className={`w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
            onChange={setFields}
          />
        </div>

        <div className="flex space-x-3 items-end">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-sm">
              Recipient Mobile Number<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="mobile_number"
              value={props.mobile_number}
              className={`w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
              onChange={onChangeMobile}
              onKeyDown={onKeyPress}
            />
          </div>
          <RecipientDropdown
            recipientType={recipientType}
            onSelect={(value: string) => addRecipient(value)}
          />
        </div>
      </div>

      <div
        className={`grid grid-cols-12 ${Object.keys(toRecipient).length == 0 && "h-10"}`}
      >
        <div className="col-span-1">
          <label className="font-semibold text-sm">
            TO<span className="text-red-400">*</span>
          </label>
        </div>

        <div className="col-span-11 flex flex-wrap gap-2 mt-1 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded">
          {toRecipient.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-white text-sm rounded-full px-2 py-1 max-w-full"
            >
              {/* Email text */}
              <p className="flex-1 truncate whitespace-nowrap overflow-hidden pr-2">
                {item.email}, <span>{item.mobile}</span>
              </p>

              {/* Close button */}
              <X
                className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0"
                onClick={() => removeRecipient("to", item.email)}
              />
            </div>
          ))}
        </div>
      </div>
      {recipientType === "cc" ? (
        <div
          className={`grid grid-cols-12 ${Object.keys(ccRecipient).length == 0 && "h-10"}`}
        >
          <div className="col-span-1">
            <label className="font-semibold text-sm">CC</label>
          </div>

          <div className="col-span-11 flex flex-wrap gap-2 mt-1 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded">
            {ccRecipient.map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white text-sm rounded-full px-2 py-1 max-w-full"
              >
                {/* Email text */}
                <p className="flex-1 truncate whitespace-nowrap overflow-hidden pr-2">
                  {item.email}, <span>{item.mobile}</span>
                </p>

                {/* Close button */}
                <X className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ) : recipientType === "certifi_cc" ? (
        <div
          className={`grid grid-cols-12 ${Object.keys(certifiCCRecipient).length == 0 && "h-10"}`}
        >
          <div className="col-span-1">
            <label className="font-semibold text-sm">CERTIFI CC</label>
          </div>

          <div className="col-span-11 flex flex-wrap gap-2 mt-1 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded">
            {certifiCCRecipient.map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white text-sm rounded-full px-2 py-1 max-w-full"
              >
                {/* Email text */}
                <p className="flex-1 truncate whitespace-nowrap overflow-hidden pr-2">
                  {item.email}, <span>{item.mobile}</span>
                </p>

                {/* Close button */}
                <X className="w-4 h-4 text-gray-500 hover:text-red-400 bg-gray-100 rounded-full p-0.5 cursor-pointer hover:bg-red-200 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-12  gap-2 text-gray-800">
        <div className="col-span-1">
          <label className="font-semibold text-sm">
            Subject<span className="text-red-400">*</span>
          </label>
        </div>
        <div className="col-span-11">
          <input
            type="text"
            name="subject"
            value={props.subject}
            className={`w-full border-b border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
            onChange={setFields}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <TiptapEditor
          content={props.mail_body ?? ""}
          onChange={(html) => props.Compose_Set_Fields("mail_body", html)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  to_sent: store.compose_store.to_sent,
  subject: store.compose_store.subject,
  mail_body: store.compose_store.mail_body,
  error_info: store.compose_store.error_info,
  // profile_data: store.profile_store.profile_data,
  //   settings_data: store.login_store.settings_data,
  mobile_number: store.compose_store.mobile_number,
  compose_fields_error: store.compose_store.compose_fields_error,
});

const mapDispatchToProps = (dispatch: any) => ({
  Compose_Set_Fields: (name: any, value: any) =>
    dispatch(ComposeSetFields(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposeLeftSection);
