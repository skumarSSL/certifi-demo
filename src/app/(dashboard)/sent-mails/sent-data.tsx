import { connect } from "react-redux";
import gsap from "gsap";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import CloudSvg from "@public/assets/cloud.svg";
import MessageSvg from "@public/assets/message.svg";
import MailInfoSvg from "@public/assets/mail-info.svg";
import CalenderSvg from "@public/assets/calender.svg";
import WhatsAppPng from "@public/assets/whatsapp.png";
import ReceiptSvg from "@public/assets/receipt.svg";
import { SentGetDownloadViewCert } from "@/store/sent-mails/sent-mails-action";

const SentData = (props: any) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLInputElement>(null);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    const composeButton = document.querySelector(".compose");
    const spanComposeBtn = composeButton?.querySelector("span");
    const card = cardRef.current;

    if (!card || !spanComposeBtn) return;
    const rect = card?.getBoundingClientRect();
    const distanceFromBottom = window.innerHeight - rect.bottom;

    console.log("distanceFromBottom", distanceFromBottom);

    const onEnter = (e: any) => {
      e.stopPropagation();
      gsap.to(composeButton, {
        opacity: 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = (e: any) => {
      e.stopPropagation();
      gsap.to(composeButton, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    if (distanceFromBottom <= 30) {
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    }
  }, []);

  const downloadAttachment = () => {
    setIsDownloading(true);
    props
      .Sent_Get_Download_View_Cert(props.data.id)
      .then(() => {
        setIsDownloading(false);
      })
      .catch(() => {
        setIsDownloading(false);
      });
  };

  const getDeliveredTime = () => {
    gsap.to(`#deliveredTime${props.data.id}`, {
      scale: 1,
      display: "flex",
      duration: 1,
      paddingTop: 1,
      paddingBottom: 1,
      stagger: 2,
      ease: "sine.inOut",
    });
  };

  const hideDeliveredTime = () => {
    gsap.to(`#deliveredTime${props.data.id}`, {
      scale: 0.2,
      display: "none",
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      ease: "sine.inOut",
    });
  };

  useEffect(() => {
    if (showTime) {
      getDeliveredTime();
    } else {
      hideDeliveredTime();
    }
  }, [showTime]);

  // const formatDate = (inputDate: string, isSameDay = true) => {
  //   // Create a moment object for the input date
  //   const date = moment(inputDate);

  //   // Check if the date is valid
  //   if (!date.isValid()) {
  //     return "N/A"; // Return empty string if the date is invalid
  //   }

  //   // Create a moment object for today's date
  //   const today = moment();

  //   // Check if the input date is the same as today
  //   if (date.isSame(today, "day") && isSameDay) {
  //     // Return only the time if it's today
  //     return date.format("HH:mm:ss");
  //   } else {
  //     // Otherwise, return the full date and time
  //     return date.format("MMM DD, YYYY");
  //   }
  // };

  const formatDate = (inputDate: string, isSameDay = true) => {
    const date = moment(inputDate);
    if (!date.isValid()) return "N/A";

    const today = moment();
    return date.isSame(today, "day") && isSameDay
      ? date.format("HH:mm:ss")
      : date.format("MMM DD, YYYY");
  };

  return (
    <div
      ref={cardRef}
      key={props.data.id}
      className="grid grid-cols-12 mx-3 bg-white text-gray-800 text-[14px] border-b border-x border-gray-200 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md hover:-translate-y-[1px] hover:scale-[1.002] cursor-pointer group rounded-md"
      // onClick={() => props.onClick(props.data.id)}
    >
      <div className="col-span-3 px-4 py-3">
        <div className="flex space-x-3">
          <p className="font-bold group-hover:text-[#0976B1] transition-colors">
            {props.data.recipient}
          </p>
        </div>
        <p className="font-medium text-gray-500">
          {" "}
          {props.data.recipient_mobile}
        </p>
      </div>

      <div className="col-span-7 px-4 py-1 flex items-center mx-5">
        <p className="text-gray-700 font-bold line-clamp-2 group-hover:text-gray-900">
          {props.data.subject} :{" "}
          <span className="text-sm font-normal">{props.data.body}</span>
        </p>
      </div>

      <div className="relative col-span-2 px-4 py-1 flex items-center justify-between align-middle">
        <p
          className={`px-3 py-1 rounded-md text-md font-light ${props.data.cert_req ? "bg-sky-100 text-blue-900 border border-sky-700" : "bg-orange-100 border border-orange-600 text-orange-600"}  text-gray-900 group-hover:bg-[#e67e22]] transition`}
        >
          {props.data.cert_req ? "Delivered" : "In Progress"}
        </p>

        <p className="absolute top-1 right-1 text-sm text-gray-500 font-medium">
          {formatDate(props.data.time)}
        </p>

        <div className="mt-7 flex space-x-3">
          <div onClick={() => setShowTime(!showTime)}>
            <IconWithTooltip
              src={ReceiptSvg.src}
              text="Message Deliver info"
              widthHeight={"w-6 h-6"}
            />
          </div>
          {props.data.cert_req && (
            <div
              className={`${isDownloading && "opacity-30"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDownloading) downloadAttachment();
              }}
            >
              <IconWithTooltip src={CloudSvg.src} text="Download Certificate" />
            </div>
          )}
        </div>

        {/* Cloud */}
        {/* <div className="absolute top-1 right-1">
            <IconWithTooltip src={CloudSvg.src} text="Download Certificate" />
          </div>

          <div className="absolute bottom-1 right-1 flex space-x-3">
            <IconWithTooltip src={MessageSvg.src} text="View Message" />
            <IconWithTooltip src={MailInfoSvg.src} text="Mail Info" />
            <IconWithTooltip src={WhatsAppPng.src} text="WhatsApp Status" />
          </div> */}
      </div>
      <div
        id={`deliveredTime${props.data.id}`}
        className="col-span-12 items-center justify-around text-sm bg-[#ffeaa7] text-gray-900 rounded-b-md space-x-3 hidden"
      >
        <div className="flex justify-between space-x-2 text-sm">
          <p className="flex space-x-1 text-gray-600">
            <img src={MailInfoSvg.src} className="w-5 h-5 cursor-pointer" />
            <span>Email Delivered</span>
          </p>
          <p className="font-medium">{formatDate(props.data.email_dr_time)}</p>
        </div>

        <div className="flex justify-between text-sm space-x-2 ">
          <p className="flex space-x-2 text-gray-600">
            <img src={MessageSvg.src} className="w-5 h-5 cursor-pointer" />
            <span>SMS Delivered</span>
          </p>
          <span className="font-medium">
            {formatDate(props.data.sms_dr_time)}
          </span>
        </div>

        <div className="flex justify-between text-sm space-x-2 ">
          <p className="flex space-x-2 text-gray-600">
            <img src={WhatsAppPng.src} className="w-5 h-5 cursor-pointer" />
            <span>WhatsApp Delivered</span>
          </p>
          <span className="font-medium">
            {formatDate(props.data.whatsapp_dr_time)}
          </span>
        </div>

        <div className="flex justify-between text-sm space-x-2 ">
          <span className="text-gray-600">👁 Read Time</span>
          <span className="font-medium">
            {formatDate(props.data.read_time)}
          </span>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  Sent_Get_Download_View_Cert: (id: string) =>
    dispatch(SentGetDownloadViewCert(id)),
});

export default connect(null, mapDispatchToProps)(SentData);

const IconWithTooltip = ({
  src,
  text,
  widthHeight,
}: {
  src: string;
  text: string;
  widthHeight?: string;
}) => {
  return (
    <div className="relative inline-block group/icon overflow-visible">
      <img
        src={src}
        className={`${widthHeight ? widthHeight : "w-7 h-7"} cursor-pointer`}
      />

      {/* Tooltip */}
      <div className="absolute right-full top-1/2 mr-2 -translate-y-1/2 opacity-0 scale-95 translate-x-1 group-hover/icon:opacity-100 group-hover/icon:scale-100 group-hover/icon:translate-x-0 transition-all duration-200 ease-out pointer-events-none z-[9999] max-w-[220px]">
        <div className="relative bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
          {text}

          {/* Arrow (pointing right) */}
          <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 bg-gray-900 rotate-45 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};
