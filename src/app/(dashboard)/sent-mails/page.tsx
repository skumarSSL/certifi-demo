"use client";

import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import moment from "moment";

import SentData from "./sent-data";
import FilterSection from "./sent-filter";
import Pagination from "@/utils/pagination";
import { Toaster } from "react-hot-toast";
import { SentGetSuccessMails } from "@/store/sent-mails/sent-mails-action";
import SentTimeModal from "./sent-time-modal";

const SentMails = (props: any) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loader, setLoader] = useState(false);
  const sentRef = useRef<HTMLDivElement>(null);

  const [selectedMail, setSelectedMail] = useState<any | null>(null);

  useEffect(() => {
    setLoader(true);
    props.Sent_Get_Success_Mails().finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    if (!sentRef.current) return;

    gsap.to(sentRef.current, {
      marginLeft: props.is_sidebar ? 220 : 64,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [props.is_sidebar]);

  const startIndex = (page - 1) * pageSize;
  let paginatedData = props.sent_data.slice(startIndex, startIndex + pageSize);

  // paginatedData = [...paginatedData, ...paginatedData];

  const openSentModal = (id: string) => {
    const data = props.sent_data.find((item: any) => item.id === id);
    if (data) setSelectedMail(data);
  };

  const closeModal = () => setSelectedMail(null);

  const formatDate = (inputDate: string, isSameDay = true) => {
    const date = moment(inputDate);
    if (!date.isValid()) return "N/A";

    const today = moment();
    return date.isSame(today, "day") && isSameDay
      ? date.format("HH:mm:ss")
      : date.format("MMM DD, YYYY");
  };

  return (
    <div ref={sentRef} className="relative flex flex-col h-[calc(100vh-120px)]">
       
      <div className="sticky top-0 z-50 bg-gray-100">
        <FilterSection />
        <div className="grid grid-cols-12 mx-3 my-1 text-gray-800 text-[14px] font-semibold border border-gray-300 bg-gray-200 rounded-md">
          <div className="col-span-3 px-4 py-2 border-r border-gray-300">
            Recipient Information
          </div>
          <div className="col-span-7 px-4 py-2 border-r mx-5 border-gray-300">
            Subject
          </div>
          <div className="col-span-2 px-4 py-2">Certificate Status</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1">
        {paginatedData.length > 0 ? (
          paginatedData.map((data: any) => (
            <SentData
              key={data.id}
              data={data}
              onClick={(id: string) => openSentModal(id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 py-10">No sent mails found</p>
        )}
      </div>

  
      {props.sent_data.length > 0 && (
        <div className="sticky bottom-0 bg-white z-40 border-t border-gray-200">
          <Pagination
            currentPage={page}
            totalCount={props.sent_data.length}
            pageSize={pageSize}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      )}

      <Toaster
        toastOptions={{
          className:
            "bg-gray-900 text-white rounded-lg px-4 py-3 shadow-lg border border-gray-700",
          success: { className: "bg-green-600 text-white" },
          error: { className: "bg-red-600 text-white font-light text-[15px]" },
        }}
      />

      {/* Modal */}
      {selectedMail && (
        <SentTimeModal
          id={selectedMail.id}
          isOpenModal={true}
          onCloseModal={closeModal}
          time={formatDate(selectedMail.time)}
          email_dr_time={formatDate(selectedMail.email_dr_time)}
          sms_dr_time={formatDate(selectedMail.sms_dr_time)}
          read_time={formatDate(selectedMail.read_time)}
          whatsapp_dr_time={formatDate(selectedMail.whatsapp_dr_time)}
          subject={selectedMail.subject}
          recipient={selectedMail.recipient}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  is_sidebar: state.login_store.is_sidebar,
  sent_data: state.sent_store.sent_data,
});

const mapDispatchToProps = (dispatch: any) => ({
  Sent_Get_Success_Mails: () => dispatch(SentGetSuccessMails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SentMails);
