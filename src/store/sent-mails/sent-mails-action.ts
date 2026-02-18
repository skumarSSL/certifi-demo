import { AppUrl } from "@/env";

import toast from "react-hot-toast";
import { sentSetFields } from "./sent-mails-reducer";

export const SentGetSuccessMails = () => (dispatch: any) => {
  let session_token = localStorage.getItem("session_token");

  return fetch(AppUrl + "/getsuccessmails/", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: "Token " + session_token,
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((result) => {
      dispatch(sentSetFields({ name: "sent_data", value: result.data }));
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

export const SentGetDownloadViewCert = (id: number | string) => async () => {
  let session_token = localStorage.getItem("session_token");

  const response = await fetch(AppUrl + "/viewcert/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + session_token,
    },
    body: JSON.stringify({ id: [id], type: "email" }),
  });

  // Check the response content type
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    // If response is JSON, parse it as JSON
    const jsonResponse = await response.json();
    return jsonResponse;
  } else if (contentType && contentType.includes("application/pdf")) {
    // If response is PDF, handle it as a blob or binary data

    // Access the Content-Disposition header
    const contentDisposition = response.headers.get("Content-Disposition");
    console.log("Content-Disposition:", contentDisposition);

    const pdfBlob = await response.blob();
    // Extract filename if present
    let fileName = "downloaded-file";
    if (contentDisposition && contentDisposition.includes("filename=")) {
      fileName = contentDisposition.split("filename=")[1].replace(/["']/g, ""); // remove quotes
    }

    const pdfUrl = URL.createObjectURL(pdfBlob);
    // Optionally: Automatically open the PDF in a new tab
    const link = document.getElementById(`${id}`);
    const new_anchor_tag = document.createElement("a");
    new_anchor_tag.href = pdfUrl;
    new_anchor_tag.download = fileName;

    // Prevent bubbling when programmatically clicked
    new_anchor_tag.addEventListener("click", (event) => {
      // event.preventDefault();
      event.stopPropagation();
    });

    link?.appendChild(new_anchor_tag);
    new_anchor_tag.click();
    link?.removeChild(new_anchor_tag);
    URL.revokeObjectURL(pdfUrl);

    // Return or handle the PDF blob as needed
    return pdfBlob;
  } else {
    throw new Error("Unsupported response type");
  }
};
