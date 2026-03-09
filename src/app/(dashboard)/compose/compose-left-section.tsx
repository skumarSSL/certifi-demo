import { connect } from "react-redux";

import scanLottie from "@public/lottie/scan.json";
import TiptapEditor from "@/app/(dashboard)/compose/editor";

import {
  ComposeRemoveFields,
  ComposeSetFields,
} from "@/store/compose/compose-action";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import RecipientDropdown from "./recipient-dropdown";
import InputRecipientModal from "./input-recipient-modal";
import RecipientSection from "./recipient-section";
import Lottie from "lottie-react";
import ScanningLoader from "../scanning-loader";

type Contact = {
  email: string;
  mobile: string;
};

const ComposeLeftSection = (props: any) => {
  const [recipientType, setRecipientType] = useState("to_mail");

  const [showInputModal, setShowInputModal] = useState(false);

  const mobileRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const setFields = (e: any) => {
    props.Compose_Set_Fields(e.target.name, e.target.value);
  };

  const addRecipient = (value: string, recipientMails: any[]) => {
    props.Compose_Set_Fields(value, recipientMails);
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

  const onClickOpenModal = (recipient_type: string) => {
    setRecipientType(recipient_type);
    setShowInputModal(true);
  };

  return (
    <div className="relative col-span-6 px-3 space-y-3 bg-white h-full flex flex-col">
      {props.isScanning && (
        <ScanningLoader
          isVisible={props.isScanning}
          isScanningComplete={props.isScanningComplete}
          isScannedError={props.isScannedError}
        />
      )}
      <div className="flex justify-end items-start space-x-2 mt-2">
        <button
          className={`relative text-md font-bold hover:text-white  hover:bg-[#ED9337] px-2 py-1 rounded-md cursor-pointer shadow-2xs ${recipientType === "to_mail" ? "bg-[#ED9337] text-white" : "bg-orange-100 border border-[#ED9337] text-gray-600"}`}
          onClick={() => onClickOpenModal("to_mail")}
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
          onClick={() => onClickOpenModal("cc")}
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
          onClick={() => onClickOpenModal("certified_cc")}
        >
          CERTIFI Cc
          {props.certified_cc.length > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
              {props.certified_cc.length}
            </span>
          )}
        </button>
      </div>

      <RecipientSection
        recipientInfo={props.to_mail}
        recipientType={"to_mail"}
        onClick={onClickOpenModal}
      />
      <RecipientSection
        recipientInfo={props.cc}
        recipientType={"cc"}
        onClick={onClickOpenModal}
      />
      <RecipientSection
        recipientInfo={props.certified_cc}
        recipientType={"certified_cc"}
        onClick={onClickOpenModal}
      />

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
          uploadFile={props.uploadFile}
          onChange={(html) => props.Compose_Set_Fields("mail_body", html)}
        />
      </div>

      {showInputModal && (
        <InputRecipientModal
          isOpenModal={showInputModal}
          recipientType={recipientType}
          onCloseModal={() => {
            setShowInputModal(false);
          }}
          emails={
            recipientType === "to_mail"
              ? props.to_mail
              : recipientType === "cc"
                ? props.cc
                : props.certified_cc
          }
          onAddEmail={addRecipient}
        />
      )}
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
