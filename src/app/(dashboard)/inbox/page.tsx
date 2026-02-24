"use client";

import gsap from "gsap";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import key from "@/assets/key.svg";
import user from "@/assets/user.png";
import phone from "@/assets/phone.png";
import Input from "@/utils/Input";

import { useRouter } from "next/navigation";
import EmailViewSkeleton from "./email-skeleton";
import EmailView from "./email-view";
import { InboxGetViewCertifyMail } from "@/store/inbox/inbox-action";

const CertifyInbox = (props: any) => {
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [viewType, setViewType] = useState<"email" | "mobile">("mobile");

  const certifyInboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode("");
    setMobileNumber("");
  }, []);

  useEffect(() => {
    if (!certifyInboxRef.current) return;

    gsap.to(certifyInboxRef.current, {
      paddingLeft: props.is_sidebar ? 220 : 64,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [props.is_sidebar]);

  const onChangeMobileNumber = (val: string) => {
    let newVal = parseInt(val);
    let preVal = parseInt(mobile_number);

    if (newVal < 1) {
      setMobileNumber(preVal.toString());
    } else {
      setMobileNumber(val);
    }
  };

  const onChangeCode = (e: any) => {
    if (!isNaN(e.target.value.trim()) && e.target.value.trim().length <= 6) {
      setCode(e.target.value.trim());
    }
  };

  const onViewCertify = () => {
    setLoader(true);
    props
      .Inbox_Get_View_Certify_Mail(code, mobile_number, email)
      .then(() => {
        setLoader(false);
        setCode("");
        setMobileNumber("");
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <div
      ref={certifyInboxRef}
      className="relative h-[calc(100vh-120px)] flex flex-col bg-gray-100 pl-55"
    >
      <div className="sticky top-0 z-50 w-full bg-gray-100 border border-gray-200 py-1 shrink-0">
        <div className="flex items-center gap-4 ml-7">
          <span className="px-2 py-1 bg-[#fad390] text-md font-light rounded-md">
            View email with :
          </span>

          <div className="flex bg-white rounded-full shadow-inner p-1">
            <label
              className={`px-4 py-1 rounded-full cursor-pointer text-sm font-semibold transition ${
                viewType === "mobile"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="viewType"
                value="mobile"
                className="hidden"
                checked={viewType === "mobile"}
                onChange={() => setViewType("mobile")}
              />
              Mobile
            </label>

            <label
              className={`px-4 py-1 rounded-full cursor-pointer text-sm font-semibold transition ${
                viewType === "email"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="viewType"
                value="email"
                className="hidden"
                checked={viewType === "email"}
                onChange={() => setViewType("email")}
              />
              Email
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="flex space-x-16 ml-7">
            {viewType === "mobile" && (
              <Input
                name="mobile_number"
                type="text"
                value={mobile_number}
                placeholder="Enter mobile number"
                icon={phone.src}
                width={"w-100"}
                onChange={(e) => onChangeMobileNumber(e.target.value.trim())}
                background={"bg-white"}
              />
            )}

            {viewType === "email" && (
              <Input
                name="email"
                type="text"
                value={email}
                placeholder="Enter email"
                icon={user.src}
                width={"w-100"}
                onChange={(e) => setEmail(e.target.value.trim())}
                background={"bg-white"}
              />
            )}

            <Input
              name="code"
              type="text"
              value={code}
              placeholder="Enter code"
              icon={key.src}
              width={"w-100"}
              background={"bg-white"}
              onChange={onChangeCode}
            />
          </div>

          <button
            className={`bg-primary px-6 py-1 rounded-md flex items-center gap-2 shadow-lg cursor-pointer mr-5 ${loader && "opacity-70"}`}
            onClick={onViewCertify}
            disabled={loader}
          >
            <span className="text-white text-lg font-semibold">View Email</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center h-full overflow-hidden">
        {loader ? (
          <EmailViewSkeleton />
        ) : Object.keys(props.inbox_data).length > 0 ? (
          <EmailView data={props.inbox_data} />
        ) : null}
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
  inbox_data: state.inbox_store.inbox_data,
});

const mapDispatchToProps = (dispatch: any) => ({
  Inbox_Get_View_Certify_Mail: (
    code: string,
    mobile_number: string,
    email: string,
  ) => dispatch(InboxGetViewCertifyMail(code, mobile_number, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CertifyInbox);
