import { connect } from "react-redux";
import gsap from "gsap";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import CloudSvg from "@/assets/cloud.svg";
import MessageSvg from "@/assets/message.svg";
import MailInfoSvg from "@/assets/mail-info.svg";
import WhatsAppPng from "@/assets/whatsapp.png";
import { SentGetDownloadViewCert } from "@/store/sent-mails/sent-mails-action";
import SentTimeModal from "./sent-time-modal";

const SentData = (props: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const composeButton = document.querySelector(".compose");
    const spanComposeBtn = composeButton?.querySelector("span");
    const card = cardRef.current;

    if (!card || !spanComposeBtn) return;
    const rect = card?.getBoundingClientRect();
    const distanceFromBottom = window.innerHeight - rect.bottom;

    console.log("distanceFromBottom", distanceFromBottom);

    const onEnter = () => {
      gsap.to(composeButton, {
        scale: 0.5,
        opacity: 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(composeButton, {
        scale: 1,
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

  const formatDate = (inputDate: string, isSameDay = true) => {
    // Create a moment object for the input date
    const date = moment(inputDate);

    // Check if the date is valid
    if (!date.isValid()) {
      return "N/A"; // Return empty string if the date is invalid
    }

    // Create a moment object for today's date
    const today = moment();

    // Check if the input date is the same as today
    if (date.isSame(today, "day") && isSameDay) {
      // Return only the time if it's today
      return date.format("HH:mm:ss");
    } else {
      // Otherwise, return the full date and time
      return date.format("MMM DD, YYYY");
    }
  };

  //   console.log("data", data);

  return (
    <div
      ref={cardRef}
      key={props.data.id}
      className="grid grid-cols-12 mx-3 bg-white text-gray-800 text-[14px] border-b border-x border-gray-200 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md hover:-translate-y-[1px] hover:scale-[1.002] cursor-pointer group rounded-md"
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

      <div className="col-span-7 px-4 py-3 flex items-center mx-5">
        <p className="text-gray-700 font-bold line-clamp-2 group-hover:text-gray-900">
          {props.data.subject} :{" "}
          <span className="text-sm font-normal">{props.data.body}</span>
        </p>
      </div>

      <div className="relative col-span-2 px-4 py-3 flex items-center justify-between align-middle">
        <p
          className={`px-3 py-1 rounded-md text-md font-light ${props.data.cert_req ? "bg-[#74b9ff]" : "bg-[#ffbe76]"} text-gray-900 group-hover:bg-[#e67e22]] transition`}
        >
          {props.data.cert_req ? "Delivered" : "In Progress"}
        </p>

        <p className="absolute top-1 right-1 text-sm text-gray-500 font-medium">
          {formatDate(props.data.time)}
        </p>

        <div
          className={`mt-5 ${isDownloading && "opacity-30"}`}
          onClick={() => !isDownloading && downloadAttachment()}
        >
          <IconWithTooltip src={CloudSvg.src} text="Download Certificate" />
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
      {isOpenModal && (
        <SentTimeModal
          onCloseModal={() => setIsOpenModal(false)}
          email_dr_time={formatDate(props.email_dr_time)}
          sms_dr_time={formatDate(props.sms_dr_time)}
          read_time={formatDate(props.read_time)}
          whatsapp_dr_time={formatDate(props.whatsapp_dr_time)}
          subject={props.subject}
          recipient={props.recipient}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  Sent_Get_Download_View_Cert: (id: string) =>
    dispatch(SentGetDownloadViewCert(id)),
});

export default connect(null, mapDispatchToProps)(SentData);

const IconWithTooltip = ({ src, text }: { src: string; text: string }) => {
  return (
    <div className="relative inline-block group/icon overflow-visible">
      <img src={src} className="w-8 h-8 cursor-pointer" />

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
