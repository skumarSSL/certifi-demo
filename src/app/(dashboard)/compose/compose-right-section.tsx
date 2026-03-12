import { useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";

import info from "@public/assets/info.svg";
import WhatsAppPng from "@public/assets/whatsapp.png";

import {
  ComposeSetFields,
  ComposeSendCertifiMail,
  ComposeResetFields,
  ComposeValidateDetails,
} from "@/store/compose/compose-action";
import ConfirmationModal from "./confimation-modal";
import SecureLoader from "../secure-loader";

const ComposeRightSection = (props: any) => {
  const [isSending, setIsSending] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const onChangeCertificateOption = (type: string) => {
    props.Compose_Set_Fields(type, !props[type]);
  };

  const onCertifiSend = () => {
    setIsSending(true);
    props
      .Compose_Send_Certifi_Mail()
      .then(() => {
        props.Compose_Reset_Fields();
        // router.push("/compose");
        setOpenModal(false);
        props.setResetEditor(true);
      })
      .catch(() => {
        setOpenModal(false);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const removeFile = (url: string) => {
    let final_attachments = props.attachments.filter(
      (file: any) => file.url !== url,
    );

    props.Compose_Set_Fields("attachments", final_attachments);
  };

  let total_file_size = props.attachments.reduce(
    (acc: any, curr: any) => acc + curr.size,
    0,
  );

  const allRecipients = () => {
    let recipients = [];
    let cc = props.cc.map(
      (mail: { email: string; mobile: string; type: string }) =>
        (mail = { ...mail, type: "cc" }),
    );
    let certified_cc = props.certified_cc.map(
      (mail: { email: string; mobile: string; type: string }) =>
        (mail = { ...mail, type: "certified_cc" }),
    );

    let to_mail = props.to_mail.map(
      (mail: { email: string; mobile: string; type: string }) =>
        (mail = { ...mail, type: "to_mail" }),
    );

    recipients = [...to_mail, ...cc, ...certified_cc];

    return recipients;
  };

  return (
    <div className="relative col-span-2 border-l-2 border-gray-200 px-3 h-full space-y-5 overflow-y-auto overflow-x-hidden">
      <div
        className={`outline-none mx-auto   py-2 shadow-2xl bg-white flex flex-col px-3 rounded-md ${props.attachments.length > 0 ? `max-h-[calc(100vh-41rem)]` : "h-auto"}`}
      >
        <div className="flex justify-between items-end font-semibold text-lg border-b border-gray-200 text-start sticky top-0 bg-white z-10">
          <p>Attachments</p>
          <div>
            <p className="font-light text-xs">
              Maximum size :{" "}
              <span className="text-xs font-bold text-[#ef9836]">
                ({(total_file_size / 1024 / 1024).toFixed(2)}/5)MB
              </span>
            </p>
            <p className="font-light text-xs">
              Number of files :{" "}
              <span className="text-xs font-bold text-[#ef9836]">
                {props.attachments.length}/10
              </span>
            </p>
          </div>
        </div>

        {props.attachments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No attachments added
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-45 mt-3 overflow-y-auto">
            {props.attachments.map((file: any, i: number) => (
              <div
                key={i}
                className="relative flex bg-gray-200 rounded-md w-full py-2 px-3 items-center justify-between"
              >
                <a
                  href={file.url}
                  target="_blank"
                  className="line-clamp-1 text-sm hover:text-sky-700"
                  download={file.name}
                >
                  {file.name}
                </a>

                <div className="flex justify-center items-center">
                  <p className="text-[10px] text-gray-500 w-15">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <X
                    className="w-6 h-6 rounded-full text-red-400 bg-gray-100 p-1 cursor-pointer hover:bg-red-200"
                    onClick={() => removeFile(file.url)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="outline-none mx-auto  py-3 shadow-2xl bg-white rounded-md">
        <p className="font-semibold text-lg text-gray-800 ml-3 my-3 border-b border-gray-200">
          Certificate Options
        </p>

        <div className="mt-5 flex flex-col items-start justify-center ml-3">
          <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
            <input
              type="checkbox"
              className="w-5 h-5 accent-sky-700 cursor-pointer"
              name="is_bsa"
              checked={props.is_bsa}
              onChange={(e) => onChangeCertificateOption(e.target.name)}
            />
            <div className="flex justify-center items-center text-md font-light text-gray-800">
              <span className="font-semibold">63 BSA format &nbsp;</span>{" "}
              certificate ?
              <div className="relative inline-block group">
                <img src={info.src} className="w-5 h-5 cursor-pointer" />

                {/* Tooltip */}
                <div className="absolute bottom-full right-1/2 translate-x-20 mb-3  opacity-0 scale-95 translate-y-2  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-[99999] pointer-events-none">
                  <div className="relative bg-gray-800 text-white text-sm px-4 py-3 rounded-md shadow-lg  w-[240px]  whitespace-normal break-words leading-relaxed text-center font-medium">
                    Bharatiya Sakshya Adhiniyam, 2023 (BSA), recognizes the
                    significance of electronic or digital records and has
                    dedicated provisions in Chapter 5 to address the
                    admissibility and proof of electronic evidence.
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
            <input
              type="checkbox"
              className="w-5 h-5 accent-sky-700 cursor-pointer"
              name="is_logs"
              checked={props.is_logs}
              onChange={(e) => onChangeCertificateOption(e.target.name)}
            />

            <div className="flex justify-center items-center text-md font-light text-gray-800">
              <span className="text-md font-light text-gray-800">
                Add <span className="font-semibold">forensic audit trail</span>
              </span>
              <div className="relative inline-block group ml-1">
                <img src={info.src} className="w-5 h-5 cursor-pointer" />

                {/* Tooltip */}
                <div className="absolute bottom-full right-1/2 translate-x-20 mb-3  opacity-0 scale-95 translate-y-2  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-[99999] pointer-events-none">
                  <div className="relative bg-gray-800 text-white text-sm px-4 py-3 rounded-md shadow-lg  w-[240px]  whitespace-normal break-words leading-relaxed text-center font-medium">
                    Forensic audit trail certificate have detailed,
                    chronological record of transactions and system activities,
                    ensuring that data is traceable back to its origin.
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        <p className="font-semibold text-lg text-gray-800 ml-3 border-b border-gray-200 mt-5">
          You can also
        </p>

        <div className="mt-5 flex flex-col items-start justify-center ml-3">
          <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition mr-3">
            <input
              type="checkbox"
              name="is_copy_mail"
              checked={props.is_copy_mail}
              className="w-6 h-6 accent-sky-700 cursor-pointer"
              onChange={(e) => onChangeCertificateOption(e.target.name)}
            />
            <span className="text-md font-light text-gray-800">
              Receive a <span className="font-semibold">copy</span> of the{" "}
              <span className="font-semibold">certified communication</span>?
            </span>
          </label>

          <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
            <input
              type="checkbox"
              name="is_whatsApp"
              checked={props.is_whatsApp}
              className="w-5 h-5 accent-sky-700 cursor-pointer"
              onChange={(e) => onChangeCertificateOption(e.target.name)}
            />
            <span className="text-md font-light text-gray-800">
              <span className="font-semibold">WhatsApp</span> Notification
            </span>
            <img src={WhatsAppPng.src} className="w-5 h-5 cursor-pointer" />
          </label>
        </div>
      </div>

      <div className="absolute bottom-0 right-4 flex justify-end items-end z-20 pt-11">
        <div
          onClick={() => {
            if (props.Compose_Validate_Details()) setOpenModal(true);
          }}
          className={`bg-primary px-5 py-2 rounded-md flex items-center gap-2 shadow-lg justify-center
      ${isSending ? "opacity-70 cursor-not-allowed w-40" : "cursor-pointer w-36"}`}
        >
          <span className="compose-text text-white text-lg font-semibold overflow-hidden">
            {isSending ? "Sending..." : "Send"}
          </span>

          {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5 text-white rotate-45" />
          )}
        </div>
      </div>

      {isSending ? (
        <SecureLoader />
      ) : openModal ? (
        <ConfirmationModal
          isOpen={openModal}
          onCancel={() => setOpenModal(false)}
          onConfirm={onCertifiSend}
          recipients={allRecipients()}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  cc: store.compose_store.cc,
  to_mail: store.compose_store.to_mail,
  certified_cc: store.compose_store.certified_cc,
  is_bsa: store.compose_store.is_bsa,
  is_logs: store.compose_store.is_logs,
  error_info: store.compose_store.error_info,
  attachments: store.compose_store.attachments,
  is_whatsApp: store.compose_store.is_whatsApp,
  is_logged_in: store.login_store.is_logged_in,
  // profile_data: store.profile_store.profile_data,
  is_copy_mail: store.compose_store.is_copy_mail,
  //   settings_data: store.login_store.settings_data,
  scan_file_error: store.compose_store.scan_file_error,
  compose_fields_error: store.compose_store.compose_fields_error,
});

const mapDispatchToProps = (dispatch: any) => ({
  Compose_Set_Fields: (name: any, value: any) =>
    dispatch(ComposeSetFields(name, value)),
  Compose_Reset_Fields: () => dispatch(ComposeResetFields()),
  Compose_Send_Certifi_Mail: () => dispatch(ComposeSendCertifiMail()),
  Compose_Validate_Details: () => dispatch(ComposeValidateDetails()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeRightSection);
