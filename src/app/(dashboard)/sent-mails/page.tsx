"use client";
import CloudSvg from "@/assets/cloud.svg";
import MessageSvg from "@/assets/message.svg";
import MailInfoSvg from "@/assets/mail-info.svg";
import WhatsAppPng from "@/assets/whatsapp.png";
import DashboardWrapper from "@/app/(dashboard)/layout";

import { FileDownIcon, MessageCircle, Search } from "lucide-react";
import Modal from "@/utils/modal";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

let sent_mails = [
  {
    id: "5cdb99f5-fa37-4e4d-b527-989304a835f7",
    recipient: "vrsaket01@gmail.com",
    is_child: false,
    subject: "Demo mail for demo",
    time: "2026-02-16T00:58:56.122512",
    read_time: null,
    read_status: 0,
    sms_dr_time: null,
    email_dr_time: null,
    email_status: "Pending",
    sms_status: "Pending",
    retry_count: 0,
    recipient_mobile: "9968218499",
    whatsapp_status: "Pending",
    whatsapp_dr_time: null,
  },
];

const SentMails = (props: any) => {
  const [page, setPage] = useState(1);
  const sentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sentRef.current) return;

    if (props.is_sidebar) {
      gsap.to(sentRef.current, {
        paddingLeft: 220,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(sentRef.current, {
        paddingLeft: 64, // w-16
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [props.is_sidebar]);

  return (
    <div
      ref={sentRef}
      className="relative grid gap-2 h-[calc(100vh-130px)] overflow-y-auto"
    >
      <FilterSection />
      <div className="sticky top-0 z-20 grid grid-cols-8 mx-3 my-1 bg-gray-100 text-gray-800 text-[14px] font-semibold border border-gray-200">
        <div className="col-span-2 px-4 py-2 border-r border-gray-300">
          Recipient Information
        </div>

        <div className="col-span-4 px-4 py-2 border-r border-gray-300 mx-5">
          Subject
        </div>

        <div className="col-span-2 px-4 py-2">Certificate Status</div>
      </div>

      <div className="grid grid-cols-8 mx-3 bg-white text-gray-800 text-[14px] border-b border-x border-gray-200 transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md hover:-translate-y-[1px] hover:scale-[1.002] cursor-pointer group">
        {/* Contact Info */}
        <div className="col-span-2 px-4 py-3">
          <div className="flex space-x-3">
            <p className="font-bold group-hover:text-[#0976B1] transition-colors">
              john@example.com
            </p>
          </div>
          <p className="font-medium text-gray-500">9968218499</p>
        </div>

        {/* Subject */}
        <div className="col-span-4 px-4 py-3 flex items-center mx-5">
          <p className="text-gray-700 font-bold line-clamp-2 group-hover:text-gray-900">
            Course Completion Certificate :{" "}
            <span className="text-sm font-normal">
              Hello, I have sent you the certified communication. Please check
              and revert as soon as possible. And also, please check the
              certificate you received.
            </span>
          </p>
        </div>

        {/* Status */}
        <div className="col-span-2 px-4 py-3 flex items-center">
          <span className="px-3 py-1 rounded-md text-md font-light bg-[#ffbe76] text-gray-900 group-hover:bg-[#e67e22]] transition">
            In Progress
          </span>
        </div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
        <div
          key={item}
          className="grid grid-cols-8 mx-3 bg-white text-gray-800 text-[14px] border-b border-x border-gray-200 transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md hover:-translate-y-[1px] hover:scale-[1.002] cursor-pointer group"
        >
          <div className="col-span-2 px-4 py-3">
            <div className="flex space-x-3">
              <p className="font-bold group-hover:text-[#0976B1] transition-colors">
                abc@example.com
              </p>
            </div>
            <p className="font-medium text-gray-500">9968218499</p>
          </div>

          <div className="col-span-4 px-4 py-3 flex items-center mx-5">
            <p className="text-gray-700 font-bold line-clamp-2 group-hover:text-gray-900">
              Course Completion Certificate :{" "}
              <span className="text-sm font-normal">
                Hello, I have sent you the certified communication. Please check
                and revert as soon as possible. And also, please check the
                certificate you received.
              </span>
            </p>
          </div>

          <div className="relative col-span-2 px-4 py-3 flex items-center justify-between align-middle">
            <p className="px-3 py-1 rounded-md text-md font-light bg-[#74b9ff] text-gray-900 group-hover:bg-[#e67e22]] transition">
              Delivered
            </p>

            <div className="">
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
        </div>
      ))}
      <SentTimeModal />
      <Pagination
        currentPage={page}
        totalPages={25}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
});

export default connect(mapStateToProps)(SentMails);

const FilterSection = () => {
  // const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between">
      <div className="relative flex h-min w-[250px] ml-5 bg-gray-100">
        <Search className="absolute top-1/2 left-[4px] mr-2 h-5 w-7 -translate-y-1/2 transform cursor-pointer dark:text-white text-gray-400" />

        <input
          className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          type="search"
          placeholder={"Search email, phone or subject"}
        />
      </div>
      {/* <div className="mr-3">
        <FileDownIcon className="w-8 h-8 text-gray-400" />
      </div> */}
    </div>
  );
};

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

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="sticky bottom-0 z-40 flex items-center justify-center gap-2  bg-gray-100 px-4 py-2 shadow-md">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 text-gray-600 hover:text-sky-600 disabled:opacity-40 cursor-pointer"
      >
        ‹ Previous
      </button>

      {/* Pages */}
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-700">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 rounded-md text-sm font-medium
              ${
                currentPage === page
                  ? "bg-blue-100 text-sky-700"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 text-gray-600 hover:text-sky-600 disabled:opacity-40 cursor-pointer"
      >
        Next ›
      </button>
    </div>
  );
};

const SentTimeModal = ({
  onCloseModal,
  email_dr_time,
  sms_dr_time,
  read_time,
  subject,
  recipient,
  whatsapp_dr_time,
}: any) => {
  // const [is_open_modal, setIsOpenModal] = useState(false);

  // useEffect(() => {
  //   setIsOpenModal(true);
  // }, []);

  // const onClose = () => {
  //   onCloseModal && onCloseModal();
  //   setIsOpenModal(false);
  // };

  return (
    <Modal height={"40%"}>
      <div className="-mt-3">
        <div className="px-2 rounded-2xl  bg-[#f5f6fa] shadow-[0px_8px_24px_rgba(149,157,165,0.2)] py-1">
          <p className="text-xs text-[#0E6DBD] font-semibold">{recipient}</p>
          <p className="text-gray-600">
            Subject:{" "}
            <span className="font-bold">{"Course Completion Certificate"}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-gray-600">
          Email Delivered Time:{" "}
          <span className="font-bold">{"16 Feb, 2026 12:11:23"}</span>
        </p>
        <p className="text-gray-600">
          SMS Delivered Time:{" "}
          <span className="font-bold"> {"16 Feb, 2026 12:11:23"}</span>
        </p>
        <p className="text-gray-600">
          WhatsApp Delivered At:{" "}
          <span className="font-bold"> {"16 Feb, 2026 12:11:23"}</span>
        </p>
        <p className="text-gray-600">
          Read Time:{" "}
          <span className="font-bold"> {"16 Feb, 2026 12:11:23"}</span>
        </p>
      </div>
    </Modal>
  );
};

export function TooltipModal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Target Element */}
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Hover Me
      </button>

      {/* Tooltip Modal */}
      <div
        className={`absolute bottom-full left-1/2 mb-3 -translate-x-1/2
        transition-all duration-300 ease-out
        ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"}
        `}
      >
        {/* Content */}
        <div className="relative bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl">
          This is a Tailwind Tooltip Modal
          {/* Arrow */}
          <div className="absolute left-1/2 -bottom-1 w-3 h-3 bg-gray-900 rotate-45 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}
