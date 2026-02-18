import toast from "react-hot-toast";
import { AppUrl, ProjectUrl } from "@/env";
import { _cashfreeCheckOut } from "@/store/common/common-action";

import {
  composeSetErrors,
  composeSetFields,
  composeResetFields,
} from "@/store/compose/composeSlice";

import type { RootState, AppDispatch } from "@/store";
import type { ComposeState } from "@/store/compose/composeSlice";

const contactRegex = /^[1-9]\d{9}$/;
const refCodeRegex = /^[a-zA-Z0-9]{6}$/;
const pincodeRegex = /^(?=.*?[0-9])\d{6}$/;
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ComposeSetFields =
  <K extends keyof ComposeState>(name: K, value: ComposeState[K]) =>
  (dispatch: AppDispatch) => {
    dispatch(composeSetFields({ name, value }));
  };

export const ComposeResetFields = () => (dispatch: AppDispatch) => {
  dispatch(composeResetFields());
};

export const ComposeScanFiles =
  (file: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { attachments } = getState().compose_store;
    const session_token = localStorage.getItem("session_token");

    console.log("session_token", session_token);

    const filePayload = {
      file_list: [{ filename: file.name, file_base64: file.file_data }],
    };

    try {
      const res = await fetch(`${AppUrl}/file_security_scan/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session_token,
        },
        body: JSON.stringify(filePayload),
      });

      if (!res.ok) throw res;
      const result = await res.json();

      let file_error = result.data
        .filter((file: any) => !file.result)
        .map((item: any) => `${item.filename}: virus detected`)
        .join("\n");

      if (file_error) {
        dispatch(
          composeSetFields({
            name: "scan_file_error",
            value: file_error || "",
          }),
        );
        toast.error(file_error);
        return Promise.reject();
      } else {
        dispatch(
          composeSetFields({
            name: "attachments",
            value: [...attachments, file],
          }),
        );
      }
      return Promise.resolve();
    } catch (err: any) {
      toast.error("File scan failed");
      return Promise.reject();
    }
  };

export const ComposeSendCertifiMail =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const is_valid = _validateComposeDetails()(dispatch, getState);
    if (!is_valid) return Promise.reject();

    const {
      mobile_number,
      subject,
      attachments,
      to_sent,
      is_bsa,
      is_logs,
      is_copy_mail,
      is_whatsApp,
      mail_body,
    } = getState().compose_store;

    const session_token = localStorage.getItem("session_token");
    const attachment_data = attachments.map(
      (attachment) =>
        (attachment = { name: attachment.name, data: attachment.data }),
    );

    const jsonObject = {
      purpose: "1",
      return_url: `${ProjectUrl}compose-mail?orderId=`,
      notify_url: `${ProjectUrl}compose-mail?orderId=`,
      To_mail: to_sent,
      mobile: mobile_number,
      subject,
      mail_body,
      attachments: attachment_data,
      bsa: is_bsa,
      logs: is_logs,
      whatsapp: is_whatsApp,
      copy_mail: is_copy_mail,
    };

    try {
      const response = await fetch(`${AppUrl}/beforePayment/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${session_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      });

      const result = await response.json();

      //   if (!is_corp && result?.order_id) {
      //     _cashfreeCheckOut(result.id, result.order_id);
      //   } else if (result.respCode === 200) {
      //     toast.success(result.response);
      //   }

      if (result?.order_id) {
        _cashfreeCheckOut(result.id, result.order_id);
      } else if (result.respCode === 200) {
        toast.success(result.response);
      }

      return Promise.resolve();
    } catch (error) {
      toast.error("Submission error");
      return Promise.reject();
    }
  };

export const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else reject("File reading failed");
    };
    reader.onerror = (error) => reject(error);
  });
};

export const _validateComposeDetails =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    let { subject, mobile_number, mail_body, to_sent } =
      getState().compose_store;

    let error_obj = {
      to_sent: "",
      subject: "",
      mobile_number: "",
      mail_body: "",
    };
    let is_valid = true;

    if (!to_sent.trim()) {
      error_obj.to_sent = "Recipient email is mandatory";
      toast.error(error_obj.to_sent);
      return (is_valid = false);
    } else if (!emailRegExp.test(to_sent)) {
      error_obj.to_sent = "Invalid recipient email";
      toast.error(error_obj.to_sent);
      return (is_valid = false);
    }

    if (!mobile_number.trim()) {
      error_obj.mobile_number = "Recipient mobile number is mandatory";
      toast.error(error_obj.mobile_number);
      return (is_valid = false);
    }

    if (!subject.trim()) {
      error_obj.subject = "Subject is mandatory";
      toast.error(error_obj.subject);
      return (is_valid = false);
    }

    if (!mail_body.trim()) {
      error_obj.mail_body = "Please provide mail body";
      toast.error(error_obj.mail_body);
      return (is_valid = false);
    }

    return is_valid;
  };
