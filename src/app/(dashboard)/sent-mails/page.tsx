"use client";

import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap"; 

import { Toaster } from "react-hot-toast";

import SentData from "./sent-data";
import FilterSection from "./sent-filter";
import Pagination from "@/utils/pagination";
import SentDataSkeleton from "./sent-skeleton";

import { SentGetSuccessMails } from "@/store/sent-mails/sent-mails-action";

const SentMails = (props: any) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loader, setLoader] = useState(false);
  const sentRef = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState("");

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

  const selectedCard = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div ref={sentRef} className="relative flex flex-col h-[calc(100vh-120px)]">
      <div className="sticky top-0 z-50 bg-gray-100">
        <FilterSection />
        <div className="grid grid-cols-12 mx-3 my-1 text-gray-800 text-[14px] font-semibold border border-gray-300 bg-gray-200 rounded-md">
          <div className="col-span-3 px-4 py-2 border-r border-gray-300">
            Recipient Information
          </div>
          <div className="col-span-6 flex justify-center items-center border-r  border-gray-300">
            Subject
          </div>
          <div className="col-span-2 border-r border-gray-300 flex justify-center items-center">
            <div>Certificate Status</div>
          </div>
          <div className="col-span-1 px-2 py-2 border-gray-300 text-end mr-3">
            <div>Sent</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1">
        {loader ? (
          <>
            <SentDataSkeleton />
            <SentDataSkeleton />
            <SentDataSkeleton />
          </>
        ) : paginatedData.length > 0 ? (
          paginatedData.map((data: any) => (
            <SentData
              key={data.id}
              data={data}
              onClick={(id: string) => selectedCard(id)}
              selectedMail={selectedId}
            />
          ))
        ) : paginatedData.length == 0 ? (
          <p className="text-center text-gray-400 py-10">No sent mails found</p>
        ) : null}
      </div>

      {props.sent_data.length > 0 && !loader && (
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
