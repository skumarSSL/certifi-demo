"use client";

import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

let AppUrl = "https://test-api.certifi.biz";

import {
  loginSetErrors,
  loginDeleteError,
  loginSettingsData,
  loginSetCredentials,
} from "@/store/features/login/loginSlice";

// import { GraphUpdateFolderData } from "~/taskpane/actions/graph-action";

export const LoginSetCredentials =
  (name: string, value: string | number | boolean) => (dispatch: any) => {
    dispatch(loginSetCredentials({ name, value }));
  };

export const LoginDeleteErrors = (name: string) => (dispatch: any) => {
  dispatch(loginDeleteError({ name }));
};

const _validateLoginDetails = () => (dispatch: any, getState: any) => {
  let { user_name, password } = getState().login_store;

  let is_valid = true;

  let email_validator =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let new_error_info: Record<string, string> = {};

  if (!user_name) {
    new_error_info.user_name = "Enter user name";
  }
  if (user_name && !email_validator.test(user_name)) {
    new_error_info.user_name = "Enter valid user name";
  }
  if (!password) {
    new_error_info.password = "Enter password";
  }

  if (Object.keys(new_error_info).length > 0) {
    is_valid = false;
    dispatch(loginSetErrors(new_error_info));
  }

  return is_valid;
};

/**
 * @description action creator to login
 *  @returns Promise
 */
export const LoginGetLoggedIn = () => (dispatch: any, getState: any) => {
  let { user_name, password } = getState().login_store;

  let is_valid = _validateLoginDetails()(dispatch, getState);

  if (is_valid) {
    let form_data = new FormData();

    form_data.append("username", user_name.trim());
    form_data.append("password", CryptoJS.SHA1(password));
    return fetch(`${AppUrl}/login/`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: form_data,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        console.log("login_data", data);
        dispatch(LoginGetSessionExpiry(data?.token));
        dispatch(loginSetCredentials({ name: "is_logged_in", value: true }));
        dispatch(
          loginSetCredentials({ name: "session_expiry", value: data?.token }),
        );

        return Promise.resolve();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Please enter valid credentials");
        return Promise.reject();
      });
  } else {
    return Promise.reject();
  }
};

export const LoginGetSessionExpiry =
  (session_token: string) => (dispatch: any) => {
    return fetch(AppUrl + "/getsessionexpiry/", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Token " + session_token,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        // let expiryTime = moment(data.expiry_at);
        // let now = moment();
        // const time = expiryTime.diff(now, "minutes");
        // console.log(time, "time");

        dispatch(loginSetCredentials({ name: "is_logged_in", value: true }));
        dispatch(loginSetCredentials({ name: "session_expiry", value: data }));

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

export const LoginGetSettingsData =
  (session_token?: string) => (dispatch: any) => {
    return fetch(AppUrl + "/settings/", {
      method: "POST",
      credentials: "include",
      headers: {
        // Authorization: "Token " + session_token,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => {
        dispatch(loginSettingsData(result.data));
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
