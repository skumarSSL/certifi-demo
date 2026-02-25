import { AppUrl, ProjectUrl } from "@/env";

import toast from "react-hot-toast";
import { _cashfreeCheckOut } from "@/store/common/common-action";
import {
  reverifyResetFields,
  reverifySetFields,
} from "@/store/reverify/reverify-reducer";
import { AppDispatch, RootState } from "..";
import type { ReverifyState } from "@/store/reverify/reverify-reducer";

export const ReverifySetFields =
  <K extends keyof ReverifyState>(name: K, value: ReverifyState[K]) =>
  (dispatch: AppDispatch) => {
    dispatch(reverifySetFields({ name, value }));
  };

export const ReverifyResetFields = () => (dispatch: AppDispatch) => {
  dispatch(reverifyResetFields());
};

export const ReverifyGetCertificate =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    let is_valid = dispatch(_validateReverifyDetails());

    if (is_valid) {
      let { email, file, is_form66 } = getState().reverify_store;
      const file_res = [
        {
          name: file.name,
          data: `data:${file.type};base64,${file.file_data}`,
        },
      ];

      // const orderId = uuidv4();
      const jsonObject = {
        purpose: "2",
        // orderid: orderId,
        // return_url: `${Redirection_url}/reverify-certificate?orderId=${orderId}`,
        // notify_url: `${Redirection_url}/reverify-certificate?orderId=${orderId}`,
        return_url: `${ProjectUrl}reverify?orderId=`,
        notify_url: `${ProjectUrl}reverify?orderId=`,
        mailid: email.trim(),
        form66: is_form66 ? "1" : "0",
        attachments: file_res,
      };

      let session_token = localStorage.getItem("session_token");

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Token ${session_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      };

      try {
        const response = await fetch(
          `${AppUrl}/beforePayment/`,
          requestOptions,
        );
        const contentType = response.headers.get("Content-Type");
        const rawText = await response.text();
        let result = contentType?.includes("application/json")
          ? JSON.parse(rawText)
          : { response: rawText };

        if (result?.order_id) {
          let return_url = `${ProjectUrl}reverify?orderId=${result.order_id}`;
          _cashfreeCheckOut(result.id, result.order_id, return_url);
        } else {
          console.log("No Payment deduction needed, email sent directly");
          // setTimeout(() => {
          //   window.location.reload();
          // }, 5000);
          if (result.respCode == 200) toast.success(result.response);
        }
        //   if (profile_data)
        //     dispatch(
        //       profileSetFields({
        //         name: "postpaid_credits",
        //         value: profile_data.postpaid_credits - 1,
        //       })
        //     );
        dispatch(reverifyResetFields());
        return Promise.resolve();
      } catch (error: any) {
        toast.error("Submission Error:", error);
        return Promise.reject();
      }
    } else {
      return Promise.reject();
    }
  };

export const ReverifyScanFiles =
  (files: any) => async (dispatch: AppDispatch) => {
    let session_token = localStorage.getItem("session_token");

    let base64 = await _fileToBase64(files[0]);

    const filePayload = {
      file_list: files.map((attachment: any) => ({
        filename: attachment.name,
        file_base64:
          attachment.name == "Briefcase.svg" // for testing
            ? "WDVPIVAlQEFQWzRcUFpYNTQoUF4pN0NDKTd9JEVJQ0FSLVNUQU5EQVJELUFOVElWSVJVUy1URVNULUZJTEUhJEgrSCo="
            : base64,
      })),
    };

    return fetch(AppUrl + "/file_security_scan/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + session_token,
      },
      body: JSON.stringify(filePayload),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => {
        let file_error = "";
        if (result?.respCode == 200) {
          console.log("File scan result", result?.data);
          file_error = result.data
            .filter((file: any) => !file.result)
            .map((item: any) => `${item.filename} : ${"virus detected"}`)
            .join("\n");
        }

        if (file_error) {
          toast.error(file_error);
        }

        dispatch(
          reverifySetFields({ name: "scan_file_error", value: file_error }),
        );
        return Promise.resolve(file_error);
      })
      .catch((err) => {
        err instanceof Error
          ? toast.error("An error occurred")
          : err
              .json()
              .then((val: any) => {
                toast.error(val.detail ?? val.error ?? val.response);
                dispatch(
                  reverifySetFields({
                    name: "scan_file_error",
                    value: val.detail ?? val.error ?? val.response,
                  }),
                );
              })
              .catch(() => {
                toast.error("Server error occurred");
              });
        return Promise.reject();
      });
  };

const _fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log("reader_result", reader.result.split(",")[1]);
        resolve(reader.result.split(",")[1]);
      } else reject("File reading failed");
    };
    reader.onerror = (error) => reject(error);
  });
};

const _validateReverifyDetails =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    let { email, file, scan_file_error } = getState().reverify_store;

    let is_valid = true;

    let email_validator =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let new_error_info: Record<string, string> = {};

    if (!email) {
      toast.error("Email is required");
      new_error_info.email = "Enter your registered email id";
    } else if (email && !email_validator.test(email)) {
      toast.error("Enter valid email id");
      new_error_info.email = "Enter valid email id";
    } else if (!file.name) {
      toast.error("Please upload file");
      new_error_info.file = "Please upload file";
    } else if (Number(file.size) > 5 * 1024 * 1024) {
      toast.error("Total file size should be less than 5MB");
      new_error_info.file = "Total file size should be less than 5MB";
    } else if (scan_file_error) {
      toast.error(scan_file_error);
      new_error_info.scan_file_error = scan_file_error;
    }

    if (Object.keys(new_error_info).length > 0) is_valid = false;

    return is_valid;
  };
