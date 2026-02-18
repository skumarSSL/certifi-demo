"use client";

import gsap from "gsap";
import { connect } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

import AttachmentsSvg from "@/assets/attachments.svg";

import ComposeLeftSection from "@/app/(dashboard)/compose/compose-left-section";
import ComposeRightSection from "@/app/(dashboard)/compose/compose-right-section";
import toast from "react-hot-toast";
import {
  ComposeResetFields,
  ComposeScanFiles,
  ComposeSetFields,
  fileToBase64,
} from "@/store/compose/compose-action";

const ComposePage = (props: any) => {
  const [isScanning, setIsScanning] = useState(false);
  const composeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      props.Compose_Reset_Fields();
    };
  }, []);

  useEffect(() => {
    if (!composeRef.current) return;

    if (props.is_sidebar) {
      gsap.to(composeRef.current, {
        paddingLeft: 220,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(composeRef.current, {
        paddingLeft: 64, // w-16
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [props.is_sidebar]);

  const uploadFile = async (e: any) => {
    const file = e.target.files?.[0];

    if (!file) return;

    let base64String;

    if (file.base64) {
      base64String = file.base64;
    } else {
      base64String = await fileToBase64(file);
    }

    if (!base64String) {
      toast.error("Failed to read file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5 MB");
      return;
    }

    const finalValue = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.base64 ? null : URL.createObjectURL(file),
      file_data: base64String,
      data: `data:${file.type};base64,${base64String}`,
    };

    setIsScanning(true);

    await props.Compose_Scan_Files(finalValue);

    setIsScanning(false);
    return;
  };

  return (
    <div
      ref={composeRef}
      className="relative flex h-[calc(100vh-120px)] justify-center items-center bg-gray-100"
    >
      <div className="w-full shadow-2xl mx-5 bg-white rounded-md">
        <div className="flex items-center justify-between mt-7 ">
          <p className="px-3  text-xl text-gray-800 font-medium w-52 h-7 text-center flex items-center justify-center ml-3 py-5">
            New Certified Email
          </p>
          <div className="relative group">
            <label
              htmlFor="fileUpload"
              className="w-11 h-11 rounded-full bg-white mr-7 hover:bg-gray-100 cursor-pointer flex items-center justify-center shadow transition"
            >
              <img
                src={AttachmentsSvg.src}
                alt="attachments"
                className="w-6 h-6"
              />
            </label>

            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={uploadFile}
            />
          </div>
        </div>
        <div className="border-t-2 border-gray-200 my-3 mx-5"></div>
        <div className="relative grid grid-cols-8 flex-1 h-full ml-5 mb-5">
          {/* // left section */}
          <ComposeLeftSection />

          {/* // right section */}
          <ComposeRightSection />
        </div>
      </div>
      <Toaster
        toastOptions={{
          className:
            "bg-gray-900 text-white rounded-lg px-4 py-3 shadow-lg border border-gray-700",
          success: {
            className: "bg-green-600 text-white",
          },
          error: {
            className: "bg-red-600 text-white font-light text-[15px]",
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
});

const mapDispatchToProps = (dispatch: any) => ({
  Compose_Scan_Files: (files: any) => dispatch(ComposeScanFiles(files)),
  Compose_Set_Fields: (name: any, value: any) =>
    dispatch(ComposeSetFields(name, value)),
  Compose_Reset_Fields: () => dispatch(ComposeResetFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposePage);
