import toast from "react-hot-toast";
import { AppUrl } from "@/env";

import {
  profileGetData,
  profileSetFields,
  profileSetPic,
} from "@/store/profile/profile-reducer"; 
import { AppDispatch } from "..";

export const ProfileSetData =
  (name: string, value: string | number | boolean) =>
  (dispatch: AppDispatch) => {
    dispatch(profileSetFields({ name, value }));
  };

export const ProfileGetData = () => (dispatch: AppDispatch) => {
  let session_token = localStorage.getItem("session_token");

  return fetch(AppUrl + "/personal_info/", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: "Token " + session_token,
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((result) => {
      dispatch(profileGetData(result.data));
      if (!result.data.is_child && !result.data.is_corp) {
        toast.error("You are not a corporate user");
        return Promise.reject();
      }
      return Promise.resolve();
    })
    .catch((err) => {
      err instanceof Error
        ? toast.error("An error occurred")
        : err.json().then(() => {
            // toast.error(val.detail ?? val.error ?? val.response);
          });
      return Promise.reject();
    });
};

export const ProfileGetPincodeValidity =
  (pincode: string, state_name: string) => () => {
    //   let session_token = localStorage.getItem("session_token")

    return fetch(AppUrl + "/get_postal_data/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pincode,
        statename: state_name,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        return Promise.resolve(data);
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
      });
  };

export const ProfileUpdateMobileNumber = (mobile: string) => () => {
  let session_token = localStorage.getItem("session_token");

  return fetch(AppUrl + "/setmymobilenum/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + session_token,
    },
    body: JSON.stringify({
      mobile,
    }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => {
      if (data.response == "ok")
        toast.success(
          "Your mobile number has changed! It'll be activated after 24 hours only",
        );
      else toast.error("Something went wrong");
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

export const LoginUpdateProfileData =
  (addr1: string, addr2: string, statecode: string, pincode: string) =>
  (dispatch: AppDispatch, getState: any) => {
    let session_token = localStorage.getItem("session_token");

    let { profile_data } = getState().profile_store;

    return fetch(AppUrl + "/google_user_profile/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + session_token,
      },
      body: JSON.stringify({
        email: profile_data.username,
        address_1: addr1,
        address_2: addr2,
        statename: statecode,
        pincode: pincode,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => {
        let new_profile_data = {
          ...profile_data,
          addr1: addr1,
          addr2: addr2,
          statecode: statecode,
          pincode: pincode,
        };
        dispatch(profileGetData(new_profile_data));
        toast.success("Address Details saved !");
        return Promise.resolve(result);
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

export const ProfileUpdateProfilePic = (data: any) => () => {
  let session_token = localStorage.getItem("session_token");

  fetch(AppUrl + "/uploadmypic/", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: "Token " + session_token,
    },
    body: data,
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((result) => {
      if (result.response == "ok")
        toast.success("Profile updated successfully");
      else toast.error("Something went wrong");
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
    });
};

export const ProfileGetProfilePic = () => (dispatch: any) => {
  let session_token = localStorage.getItem("session_token");

  fetch(AppUrl + "/getmypic/", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: "Token " + session_token,
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((result) => {
      if (result.response == "ok") {
        dispatch(
          profileSetPic(
            `data:${result.data.content_type};base64,${result.data.profile}`,
          ),
        );
      } else toast.error("Something went wrong");
    })
    .catch((err) => {
      err instanceof Error
        ? toast.error("An error occurred")
        : err
            .json()
            .then(() => {
              // toast.error(val.detail ?? val.error ?? val.response);
            })
            .catch(() => {
              toast.error("An error occurred");
            });
    });
};
