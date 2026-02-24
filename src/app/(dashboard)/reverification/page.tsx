"use client";

import gsap from "gsap";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UploadCloud } from "lucide-react";

import user from "@/assets/user.png";
import Input from "@/utils/Input";

import { ComposeScanFiles, fileToBase64 } from "@/store/compose/compose-action";
import {
  ReverifyGetCertificate,
  ReverifyResetFields,
  ReverifyScanFiles,
  ReverifySetFields,
} from "@/store/reverify/reverify-action";
import { useRouter } from "next/navigation";

const ReverificationPage = (props: any) => {
  const [isScanning, setIsScanning] = useState(false);
  const [loader, setLoader] = useState(false);
  const reverificationRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    return () => {
      props.Reverify_Reset_Fields();
    };
  }, []);

  useEffect(() => {
    if (!reverificationRef.current) return;

    gsap.to(reverificationRef.current, {
      paddingLeft: props.is_sidebar ? 220 : 64,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [props.is_sidebar]);

  const onChangeEmail = (e: any) => {
    props.Reverify_Set_Fields("email", e.target.value);
  };

  const onChangeFile = async (e: any) => {
    const selected_file = e.target.files?.[0];
    if (!selected_file) return;

    const base64String = await fileToBase64(selected_file);
    if (!base64String) {
      toast.error("Failed to read file");
      return;
    }

    if (selected_file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1 MB");
      return;
    }

    const finalValue = {
      name: selected_file.name,
      size: selected_file.size,
      type: selected_file.type,
      url: URL.createObjectURL(selected_file),
      file_data: base64String,
      data: `data:${selected_file.type};base64,${base64String}`,
    };

    if (!selected_file || selected_file?.type === "application/pdf") {
      props.Reverify_Set_Fields("file", finalValue);

      if (selected_file) {
        setIsScanning(true);
        props
          .Reverify_Scan_Files([selected_file])
          .then(() => {
            setIsScanning(false);
          })
          .catch(() => {
            setIsScanning(false);
          });
      }
    } else {
      toast.error("Only pdf file is allowed");
    }
  };

  const onVerify = () => {
    setLoader(true);
    props
      .Reverify_Get_Certificate()
      .then(() => {
        setLoader(false);
        router.push("/reverification");
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <div
      ref={reverificationRef}
      className="min-h-[calc(100vh-120px)] bg-gray-100 p-4 md:p-6 flex items-center  justify-center"
    >
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-4 md:p-6 flex flex-col items-start text-left gap-5">
        {/* Upload Section */}
        <div className="w-full">
          <h2 className="text-lg md:text-xl font-semibold mb-3">Upload file</h2>

          <label
            htmlFor="fileUpload"
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-10 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer bg-gray-100 hover:bg-gray-50 transition"
          >
            {props.file ? (
              /* Preview after upload */
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                  <a className="text-red-600 font-bold text-lg" download href={props.file.url}>PDF</a>
                </div>

                <p className="text-gray-800 font-medium">{props.file.name}</p>

                <p className="text-sm text-gray-500">
                  {(props.file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <span className="text-sky-700 text-md font-medium hover:underline">
                  Replace file
                </span>
              </div>
            ) : (
              /* Default UI */
              <>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <UploadCloud className="text-sky-900" size={28} />
                </div>

                <p className="text-gray-800 font-medium">
                  Drag and drop your document here
                </p>

                <span className="text-sky-900 font-medium hover:underline hover:text-sky-600">
                  Choose a file
                </span>
              </>
            )}

            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={onChangeFile}
            />
          </label>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between mt-3 text-sm text-gray-500 gap-1">
            <p>
              Supported Formats:{" "}
              <span className="text-sky-700 font-medium ">PDF</span>
            </p>
            <p>
              Maximum file size:{" "}
              <span className="text-sky-700 font-medium">5MB</span>
            </p>
          </div>
        </div>

        <div className="mt-1">
          <span className="text-md md:text-md font-semibold mb-3">
            Email ID
          </span>
          <Input
            name="user_name"
            type="text"
            value={props.email}
            placeholder="Enter Email ID"
            icon={user.src}
            onChange={onChangeEmail}
          />
        </div>

        {/* Checkbox aligned with upload start */}
        <div className="">
          <label className="flex items-center gap-3 cursor-pointer justify-start">
            <input
              type="checkbox"
              checked={props.is_form66}
              name="is_form66"
              onChange={() =>
                props.Reverify_Set_Fields("is_form66", !props.is_form66)
              }
              className="mt-1 w-5 h-5 accent-sky-700 cursor-pointer"
            />
            <span className="text-md md:text-md font-light text-gray-800">
              Would you like reverification{" "}
              <span className="font-extrabold">certificate</span> under{" "}
              <span className="font-extrabold">Section 63 BSA</span>?
            </span>
          </label>
        </div>

        <div className="flex mx-auto mt-5">
          <button
            onClick={onVerify}
            className={`bg-[#ef9837] text-white font-bold text-xl px-13 py-3 rounded-md cursor-pointer ${loader && "opacity-60 cursor-not-allowed"}`}
          >
            Reverify
          </button>
        </div>
      </div>

      <Toaster
        toastOptions={{
          className:
            "bg-gray-900 text-white rounded-lg px-4 py-3 shadow-lg border border-gray-700",
          success: { className: "bg-green-600 text-white" },
          error: { className: "bg-red-600 text-white font-light text-[15px]" },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
  file: state.reverify_store.file,
  email: state.reverify_store.email,
  is_form66: state.reverify_store.is_form66,
});

const mapDispatchToProps = (dispatch: any) => ({
  Reverify_Reset_Fields: () => dispatch(ReverifyResetFields()),
  Reverify_Get_Certificate: () => dispatch(ReverifyGetCertificate()),
  Reverify_Scan_Files: (files: any) => dispatch(ReverifyScanFiles(files)),
  Reverify_Set_Fields: (name: any, value: any) =>
    dispatch(ReverifySetFields(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReverificationPage);
