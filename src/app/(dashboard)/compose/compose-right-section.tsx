import { useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";

import WhatsAppPng from "@public/assets/whatsapp.png";
import {
  ComposeSetFields,
  ComposeSendCertifiMail,
  ComposeResetFields,
} from "@/store/compose/compose-action";

const ComposeRightSection = (props: any) => {
  const [isSending, setIsSending] = useState(false);

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
        router.push("/compose");
      })
      .catch(() => {})
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

  return (
    <div className="relative col-span-2 border-l-2 border-gray-200 px-3 h-full space-y-5 overflow-y-auto overflow-x-hidden">
      <div
        className={`outline-none w-80 mx-auto py-2 shadow-2xl bg-white flex flex-col px-3 rounded-md ${props.attachments.length > 0 ? "max-h-60" : "h-auto"}`}
      >
        <p className="font-semibold text-lg border-b border-gray-200 text-start sticky top-0 bg-white z-10">
          Attachments
        </p>

        {props.attachments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No attachments added
          </p>
        ) : (
          <div className="flex flex-col gap-2 mt-3 overflow-y-auto">
            {props.attachments.map((file: any, i: number) => (
              <div
                key={i}
                className="relative flex bg-gray-200 rounded-md w-full py-2 px-3 items-center justify-between"
              >
                <a
                  href={file.url}
                  target="_blank"
                  className="line-clamp-1 text-sm hover:text-sky-700"
                >
                  {file.name}
                </a>

                <X
                  className="w-6 h-6 rounded-full text-red-400 bg-gray-100 p-1 cursor-pointer hover:bg-red-200"
                  onClick={() => removeFile(file.url)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="outline-none w-80 mx-auto py-3 shadow-2xl bg-white rounded-md">
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
            <span className="text-md font-light text-gray-800">
              Include certificate in 63 BSA format?
            </span>
          </label>

          <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
            <input
              type="checkbox"
              className="w-5 h-5 accent-sky-700 cursor-pointer"
              name="is_logs"
              checked={props.is_logs}
              onChange={(e) => onChangeCertificateOption(e.target.name)}
            />
            <span className="text-md font-light text-gray-800">
              Add forensic audit trail to the certificate
            </span>
          </label>
        </div>

        <p className="font-semibold text-lg text-gray-800 ml-3 border-b border-gray-200 mt-11">
          You can also
        </p>

        <div className="mt-5 flex flex-col items-start justify-center ml-3">
          <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
            <input
              type="checkbox"
              name="is_copy_mail"
              checked={props.is_copy_mail}
              className="w-6 h-6 accent-sky-700 cursor-pointer"
              onChange={(e) => onChangeCertificateOption(e.target.name)}
            />
            <span className="text-md font-light text-gray-800">
              Receive a copy of the certified communication?
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
              WhatsApp Notification
            </span>
            <img src={WhatsAppPng.src} className="w-5 h-5 cursor-pointer" />
          </label>
        </div>
      </div>

      <div className="sticky bottom-0 flex justify-end pr-5 z-20 pt-11">
        <div
          onClick={onCertifiSend}
          className={`bg-primary px-5 py-2 rounded-md flex items-center gap-2 shadow-lg justify-center
      ${isSending ? "opacity-70 cursor-not-allowed w-40" : "cursor-pointer w-36"}`}
        >
          <span className="compose-text text-white text-lg font-semibold overflow-hidden">
            {isSending ? "Sending..." : "Send"}
          </span>

          {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: any) => ({
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeRightSection);
