"use client";

import gsap from "gsap";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Repeat, UploadCloud } from "lucide-react";

import user from "@public/assets/user.png";
import info from "@public/assets/info.svg";

import Input from "@/utils/Input";

import { ComposeScanFiles, fileToBase64 } from "@/store/compose/compose-action";
import {
  ReverifyGetCertificate,
  ReverifyResetFields,
  ReverifyScanFiles,
  ReverifySetFields,
} from "@/store/reverify/reverify-action";
import { useRouter } from "next/navigation";
import { ReverifyState } from "@/store/reverify/reverify-reducer";

const ReverificationPage = (props: any) => {
  const [isScanning, setIsScanning] = useState(false);
  const [loader, setLoader] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
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

  useEffect(() => {
    let interval: any;

    if (isScanning) {
      setScanProgress(0);
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 90) return prev; // stop at 90% until scan finishes
          return prev + 5;
        });
      }, 200);
    } else {
      setScanProgress(100);
      setTimeout(() => setScanProgress(0), 500);
    }

    return () => clearInterval(interval);
  }, [isScanning]);

  const onChangeEmail = (e: any) => {
    props.Reverify_Set_Fields("email", e.target.value.replace(",", ""));
  };

  const onChangeFile = async (e: any) => {
    const selected_file = e.target.files?.[0];
    if (!selected_file) return;

    const base64String = await fileToBase64(selected_file);
    if (!base64String) {
      toast.error("Failed to read file");
      return;
    }

    if (selected_file.size > 6 * 1024 * 1024) {
      toast.error("File size exceeds 6 MB");
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
      if (selected_file) {
        setIsScanning(true);
        props
          .Reverify_Scan_Files([selected_file])
          .then(() => {
            props.Reverify_Set_Fields("file", finalValue);
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

  const truncateWords = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <div
      ref={reverificationRef}
      className="min-h-[calc(100vh-120px)] bg-gray-100 p-4 md:p-6 flex items-center  justify-center"
    >
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-4 md:p-6 flex flex-col items-start text-left gap-5">
        <div className="mt-1">
          <span className="text-md md:text-md font-semibold mb-3">Email</span>
          <Input
            name="user_name"
            type="text"
            value={props.email}
            placeholder="Enter email"
            icon={user.src}
            onChange={onChangeEmail}
          />
        </div>

        {/* Upload Section */}
        <div className="w-full">
          {/* <h2 className="text-lg md:text-xl font-semibold mb-3">Upload file</h2> */}

          <label
            htmlFor="fileUpload"
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-10 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer bg-gray-100 hover:bg-gray-50 transition"
          >
            {isScanning ? (
              /* Progress UI */
              <div className="w-full flex flex-col gap-3">
                <p className="text-gray-700 font-medium">Scanning file...</p>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-sky-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500">{scanProgress}%</p>
              </div>
            ) : props.file.name ? (
              /* File Preview Card */
              <div className="w-full flex items-center gap-4 bg-white shadow-sm rounded-lg p-4 relative">
                <div className="w-14 h-14 bg-[#B9E6FF] rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">PDF</span>
                </div>

                <div className="flex justify-between items-center w-full">
                  <div className="flex-1 text-left">
                    <a
                      className="font-medium text-gray-800"
                      href={props.file.url}
                      title={props.file.name}
                      download={props.file.name}
                    >
                      {truncateWords(props.file.name, 40)}
                    </a>
                    <p className="text-sm text-gray-500">
                      {(props.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className=" flex items-center space-x-3 justify-around text-primary-foreground bg-gray-700 px-5 py-2 font-semibold rounded-full cursor-pointer hover:bg-gray-600">
                    <Repeat size={14} />
                    <p>Replace file</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Default Upload UI */
              <>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <UploadCloud className="text-sky-900" size={28} />
                </div>
                <p className="text-gray-600 font-medium text-lg">
                  Upload your{" "}
                  <span className="font-bold">CERTIFI Certificate</span> here
                </p>
                <span className="text-primary-foreground bg-primary px-5 py-2 font-semibold rounded-full cursor-pointer hover:bg-sky-600">
                  Choose file
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
              <span className="text-sky-700 font-medium">6 MB</span>
            </p>
          </div>
        </div>

        {/* Checkbox aligned with upload start */}
        <div className="grid grid-cols-12 w-full justify-between items-center">
          <div
            className="col-span-9 w-full"
            onClick={() =>
              props.Reverify_Set_Fields("is_form66", !props.is_form66)
            }
          >
            <label className="flex items-center gap-1 cursor-pointer justify-start">
              <input
                type="checkbox"
                checked={props.is_form66}
                name="is_form66"
                className="mt-1 w-5 h-5 accent-sky-700 cursor-pointer"
              />
              <p className="text-md md:text-md font-light text-gray-800">
                Would you like reverification{" "}
                <span className="font-extrabold">certificate</span> under{" "}
                <span className="font-extrabold">Section 63 BSA</span>?
              </p>
              <div className="relative inline-block group">
                <img src={info.src} className="w-5 h-5 cursor-pointer" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3  opacity-0 scale-95 translate-y-2  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-[99999]">
                  <div className="relative bg-gray-800 text-white text-sm px-4 py-3 rounded-md shadow-lg  w-[420px] min-w-[350px]  whitespace-normal break-words leading-relaxed text-center font-medium">
                    Bharatiya Sakshya Adhiniyam, 2023 (BSA), recognizes the
                    significance of electronic or digital records and has
                    dedicated provisions in Chapter 5 to address the
                    admissibility and proof of electronic evidence.
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div className="flex w-full justify-end col-span-3">
            <button
              onClick={onVerify}
              disabled={loader}
              className={`bg-[#ef9837] text-white font-bold text-xl px-13 py-3 rounded-md cursor-pointer ${loader && "opacity-60 cursor-not-allowed"}`}
            >
              Reverify
            </button>
          </div>
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
  Reverify_Set_Fields: <K extends keyof ReverifyState>(
    name: K,
    value: ReverifyState[K],
  ) => dispatch(ReverifySetFields(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReverificationPage);
