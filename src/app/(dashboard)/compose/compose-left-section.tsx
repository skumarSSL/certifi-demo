import { connect } from "react-redux";

import TiptapEditor from "@/app/(dashboard)/compose/editor";

import {
  ComposeRemoveFields,
  ComposeSetFields,
} from "@/store/compose/compose-action";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import RecipientDropdown from "./recipient-dropdown";

type Contact = {
  email: string;
  mobile: string;
};

const ComposeLeftSection = (props: any) => {
  const [recipientType, setRecipientType] = useState("to_mail");
  const [toRecipient, setToRecipient] = useState<Contact[]>([]);
  const [ccRecipient, setCCRecipient] = useState<Contact[]>([]);
  const [certifiCCRecipient, setCertifiCCRecipient] = useState<Contact[]>([]);

  const mobileRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

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
    props.Compose_Set_Fields(value, {
      email: props.to_sent,
      mobile: props.mobile_number,
    });
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      addRecipient(recipientType);
    }
  };

  const removeRecipient = (recipient_type: string, email: string) => {
    let new_recipients = [];
    if (recipient_type === "to_mail") {
      new_recipients = props.to_mail.filter((item: any) => item.email != email);
    } else if (recipient_type === "cc") {
      new_recipients = props.cc.filter((item: any) => item.email != email);
    } else {
      new_recipients = props.certified_cc.filter(
        (item: any) => item.email != email,
      );
    }

    props.Compose_Remove_Fields(recipient_type, new_recipients);
  };

  const emailFocus = () => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  };

  return (
    <div className="relative col-span-6 px-3 space-y-3 bg-white h-full flex flex-col">
      <div className="flex justify-end items-start space-x-2 mt-2">
        <button
          className={`relative text-md font-bold hover:text-white  hover:bg-[#ED9337] px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "to_mail" ? "bg-[#ED9337] text-white" : "bg-orange-100 border border-[#ED9337] text-gray-600"}`}
          onClick={() => setRecipientType("to_mail")}
        >
          To
          {props.to_mail.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {props.to_mail.length}
            </span>
          )}
        </button>
        <button
          className={`relative text-md font-bold hover:text-white hover:bg-[#ED9337] px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "cc" ? "bg-[#ED9337] text-white" : "bg-orange-100 border border-[#ED9337] text-gray-600"}`}
          onClick={() => setRecipientType("cc")}
        >
          Cc
          {props.cc.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {props.cc.length}
            </span>
          )}
        </button>
        <button
          className={`relative text-md font-bold hover:text-white bg-[#EF9837] hover:bg-[#ED9337] px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "certified_cc" ? "bg-[#ED9337] text-white" : "bg-orange-100 border border-[#ED9337] text-gray-600"}`}
          onClick={() => setRecipientType("certified_cc")}
        >
          CERTIFI Cc
          {props.certified_cc.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {props.certified_cc.length}
            </span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-gray-800">
        <div className="grid grid-cols-12 col-span-1">
          <label className="font-semibold text-md col-span-2">
            Email<span className="text-red-400">*</span>
          </label>
          <input
            ref={emailRef}
            type="text"
            name="to_sent"
            value={props.to_sent}
            className={`w-full col-span-10 border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
            onChange={setFields}
          />
        </div>

        <div className="flex space-x-3 items-end col-span-1">
          <div className="grid grid-cols-12 gap-1 w-full">
            <label className="font-semibold text-md col-span-2 ">
              Mobile<span className="text-red-400">*</span>
            </label>
            <input
              ref={mobileRef}
              type="text"
              name="mobile_number"
              value={props.mobile_number}
              className={`w-full col-span-10 border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
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
        className={`grid grid-cols-12  ${ props.to_mail.length == 0 && "h-10"}`}
        onClick={() => {
          setRecipientType("to_mail");
          emailFocus();
        }}
      >
        <div className="col-span-1">
          <label className="font-semibold text-sm">
            To<span className="text-red-400">*</span>
          </label>
        </div>

        <div className="col-span-11 flex flex-wrap gap-2 mt-1 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded">
          {props.to_mail.map((item: any, i: number) => (
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
                onClick={() => removeRecipient("to_mail", item.email)}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`grid grid-cols-12 ${ props.cc.length == 0 && "h-10"}`}
        onClick={() => {
          setRecipientType("cc");
          emailFocus();
        }}
      >
        <div className="col-span-1">
          <label className="font-semibold text-sm">Cc</label>
        </div>

        <div className="col-span-11 flex flex-wrap gap-2 mt-1 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded">
          {props.cc.map((item: any, i: number) => (
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

      <div
        className={`grid grid-cols-12 ${props.certified_cc.length == 0 && "h-10"}`}
        onClick={() => {
          setRecipientType("certified_cc");
          emailFocus();
        }}
      >
        <div className="col-span-1">
          <label className="font-semibold text-sm">CERTIFI Cc</label>
        </div>

        <div className="col-span-11 flex flex-wrap gap-2 mt-1 border-b border-gray-300 py-1 bg-gray-100 px-1 rounded">
          {props.certified_cc.map((item: any, i: number) => (
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
  cc: store.compose_store.cc,
  to_mail: store.compose_store.to_mail,
  to_sent: store.compose_store.to_sent,
  subject: store.compose_store.subject,
  certified_cc: store.compose_store.certified_cc,
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
  Compose_Remove_Fields: (name: any, value: any) =>
    dispatch(ComposeRemoveFields(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposeLeftSection);
