import { AppUrl } from "@/env";

import toast from "react-hot-toast";
import { inboxResetFields, inboxSetFields } from "./inbox-reducer";
import { AppDispatch } from "..";

export const InboxResetFields = () => (dispatch: AppDispatch) => {
  dispatch(inboxResetFields());
};
export const InboxGetViewCertifyMail =
  (code: string, mobile_number?: string, email?: string) => (dispatch: any) => {
    let session_token = localStorage.getItem("session_token");

    let email_validator =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let data: any = {
      mob_num: mobile_number,
      receiver_otp: code,
    };

    if (email?.trim()) {
      data = {
        email: email.trim(),
        receiver_otp: code,
      };
    }

    if (Object.keys(data).indexOf("email") > -1 && !data.email) {
      toast.error("Email is required");
      return Promise.reject();
    }

    if (data.email && !email_validator.test(data.email)) {
      toast.error("Invalid email");
      return Promise.reject();
    }

    if (Object.keys(data).indexOf("mob_num") > -1 && !data.mob_num) {
      toast.error("Mobile number is required");
      return Promise.reject();
    }

    if (!data.receiver_otp) {
      toast.error("Code is required");
      return Promise.reject();
    }

    return fetch(AppUrl + "/viewcertify/", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Token " + session_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => {
        dispatch(inboxSetFields({ name: "inbox_data", value: result }));
        return Promise.resolve();
      })
      .catch((err) => {
        err instanceof Error
          ? toast.error("An error occurred")
          : err
              .json()
              .then((val: any) => {
                toast.error(val.detail ?? val.error ?? val.response);
              })
              .catch(() => {
                toast.error("An error occurred");
              });
        return Promise.reject();
      });
  };
