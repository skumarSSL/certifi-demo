"use client";

import gsap from "gsap";

import { useEffect, useRef, useState } from "react";

import WhatsAppPng from "@/assets/whatsapp.png";

import AttachmentsSvg from "@/assets/attachments.svg";
import { connect } from "react-redux";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Tiptap from "./editor";
import TiptapEditor from "./editor";

const ComposePage = (props: any) => {
  const [body, setBody] = useState("");
  const composeRef = useRef<HTMLInputElement>(null);

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
          <div className="w-11 h-11 rounded-full bg-white mr-7 hover:bg-gray-100 cursor-pointer">
            <img
              src={AttachmentsSvg.src}
              alt="attachments"
              className="p-2"
              width={"40px"}
              height={"60px"}
            />
          </div>
        </div>
        <div className="border-t-2 border-gray-200 my-3 mx-5"></div>
        <div className="relative grid grid-cols-8 flex-1 h-full ml-5 mb-5">
          <div className="relative col-span-6 p-3 space-y-3 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm">Recipient Email</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm">
                  Recipient Mobile Number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-1  gap-6 text-gray-800">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm">Subject</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1  gap-6 text-gray-800 mt-11 h-140">
              <TiptapEditor onChange={setBody} />
            </div>
          </div>

          <div className="relative col-span-2 border-l-2 border-gray-200 px-3 h-full space-y-5">
            <div className="outline-none w-80 h-2/5 mx-auto py-2 shadow-2xl bg-white flex flex-col justify-center px-3 rounded-md">
              <p className="font-semibold text-lg border-b border-gray-200 text-start">
                Attachments
              </p>
              <div className="flex flex-wrap space-y-3 items-center space-x-2 mt-3 overflow-scroll">
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <div
                    key={item}
                    className="relative flex  bg-gray-200 rounded-md w-full py-2 px-3 text-center items-center justify-between space-x-1"
                  >
                    <p className="line-clamp-1">
                      Certified Commincation cerificate.pdf
                    </p>
                    <div>
                      <X className="w-6 h-6 rounded-full text-red-400 bg-gray-100 p-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="outline-none w-80 mx-auto py-3 shadow-2xl bg-white rounded-md">
              <p className="font-semibold text-lg text-gray-800 ml-3 my-3 border-b border-gray-200">
                Certificate Type
              </p>

              <div className="mt-5 flex flex-col items-start justify-center ml-3">
                <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                  <input type="checkbox" className="w-5 h-5 accent-sky-700" />
                  <span className="text-md font-light text-gray-800">
                    Include certificate in 63 BSA format?
                  </span>
                </label>

                <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                  <input type="checkbox" className="w-5 h-5 accent-sky-700" />
                  <span className="text-md font-light text-gray-800">
                    Add forensic audit trail to the certificate
                  </span>
                </label>
              </div>

              <p className="font-semibold text-lg text-gray-800 ml-3 border-b border-gray-200 mt-11">
                You can also
              </p>

              <div className="mt-5 flex flex-col items-start justify-center ml-3">
                <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                  <input type="checkbox" className="w-6 h-6 accent-sky-700" />
                  <span className="text-md font-light text-gray-800">
                    Receive a copy of the certified communication?
                  </span>
                </label>

                <label className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                  <input type="checkbox" className="w-5 h-5 accent-sky-700" />
                  <span className="text-md font-light text-gray-800">
                    WhatsApp Notification
                  </span>
                  <img
                    src={WhatsAppPng.src}
                    className="w-5 h-5 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* <div className="bg-gray-300 px-5 py-2 rounded-md flex items-center gap-2 shadow-lg cursor-pointer z-10 justify-center">
              <span className="compose-text text-white text-lg font-semibold overflow-hidden">
                Send
              </span>
              <Send className="w-5 h-5 text-white" />
            </div> */}

            <div className="absolute bottom-10 right-10  bg-primary px-5 py-2 rounded-md flex items-center gap-2 shadow-lg cursor-pointer z-10 justify-center w-36">
              <span className="compose-text text-white text-lg font-semibold overflow-hidden">
                Send
              </span>
              <Send className="w-5 h-5 text-white text-end" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
});

export default connect(mapStateToProps)(ComposePage);
