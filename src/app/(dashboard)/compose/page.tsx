"use client";

import gsap from "gsap";
import { connect } from "react-redux";
import { Toaster } from "react-hot-toast";

import { useEffect, useRef, useState } from "react";

import AttachmentsSvg from "@public/assets/attachments.svg";

import ComposeLeftSection from "@/app/(dashboard)/compose/compose-left-section";
import ComposeRightSection from "@/app/(dashboard)/compose/compose-right-section";
import toast from "react-hot-toast";
import {
  ComposeResetFields,
  ComposeScanFiles,
  ComposeSetFields,
  fileToBase64,
} from "@/store/compose/compose-action";
import Toolbar from "./toolbar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SecureLoader from "../secure-loader";
import ScanningLoader from "../scanning-loader";

const ComposePage = (props: any) => {
  const [isScanning, setIsScanning] = useState(false);
  const composeRef = useRef<HTMLInputElement>(null);
  const [isScanningComplete, setIsScanningComplete] = useState(false);
  const [isScannedError, setIsScannedError] = useState(false);
  const [resetEditor, setResetEditor] = useState(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    let timeout = setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);

  let content = "";
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Write your message here...",
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[200px] p-3 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      () => {};
    },
  });

  useEffect(() => {
    props.Compose_Reset_Fields();
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

    if (props.attachments.length >= 10) {
      toast.error("Number of files limit exceeds");
      return;
    }

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

    let total_file_size = props.attachments.reduce(
      (acc: any, curr: any) => acc + curr.size,
      0,
    );

    if (file.size > 5 * 1024 * 1024 || total_file_size > 5 * 1024 * 1024) {
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

    props
      .Compose_Scan_Files(finalValue)
      .then(() => {
        setIsScanningComplete(true);
      })
      .catch(() => {
        setIsScannedError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsScanningComplete(false);
          setIsScannedError(false);
          setIsScanning(false);
        }, 2000);
      });
  };

  return (
    <div
      ref={composeRef}
      className="relative flex h-[calc(100vh-120px)] bg-gray-100 p-5 overflow-hidden"
    >
      {loader ? (
        <SecureLoader />
      ) : (
        <div className="relative w-full h-full shadow-2xl bg-white rounded-md flex flex-col mx-5">
          <div className="grid grid-cols-8 items-center justify-between mt-2">
            <div className="px-3 col-span-6  space-x-5 text-xl text-gray-800 font-medium w-full h-7 text-center flex items-center justify-start ml-3 py-2">
              <p> New Certified Email</p>
              {/* <Toolbar editor={editor} /> */}
            </div>
            <div className="relative col-span-2 group flex justify-end px-3">
              <label
                htmlFor="fileUpload"
                className="w-11 h-11 rounded-full bg-white mr-7 hover:bg-gray-100 cursor-pointer flex items-center justify-center shadow transition"
              >
                <img
                  src={AttachmentsSvg.src}
                  alt="attachments"
                  className="w-6 h-6 fill-[#0E6DBD]"
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
          <div className="border-t-2 border-gray-200 mt-1 my-1 mx-5"></div>

          <div className="relative grid grid-cols-8 flex-1 overflow-y-hidden px-5 pb-5">
            {/* // left section */}

            <ComposeLeftSection
              uploadFile={uploadFile}
              isScanning={isScanning}
              isScanningComplete={isScanningComplete}
              isScannedError={isScannedError}
              resetEditor={resetEditor}
            />

            {/* // right section */}
            <ComposeRightSection setResetEditor={setResetEditor} />
          </div>
        </div>
      )}
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
  attachments: state.compose_store.attachments,
});

const mapDispatchToProps = (dispatch: any) => ({
  Compose_Scan_Files: (files: any) => dispatch(ComposeScanFiles(files)),
  Compose_Set_Fields: (name: any, value: any) =>
    dispatch(ComposeSetFields(name, value)),
  Compose_Reset_Fields: () => dispatch(ComposeResetFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposePage);
