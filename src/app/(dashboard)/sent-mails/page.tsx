"use client";

import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import SentData from "./sent-data";
import SentTimeModal from "./sent-time-modal";
import FilterSection from "./sent-filter";
import Pagination from "@/utils/pagination";
import { Toaster } from "react-hot-toast";
import { SentGetSuccessMails } from "@/store/sent-mails/sent-mails-action";

const SentMails = (props: any) => {
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const sentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoader(true);
    props
      .Sent_Get_Success_Mails()
      .then(() => {
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    if (!sentRef.current) return;

    if (props.is_sidebar) {
      gsap.to(sentRef.current, {
        marginLeft: 220,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(sentRef.current, {
        marginLeft: 64, // w-16
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [props.is_sidebar]);

  console.log("sent_data", props.sent_data);

  return (
    <div ref={sentRef}>
      <FilterSection />
      <div className="relative grid gap-2 overflow-y-auto h-[calc(100vh-120px)]">
        {props.sent_data.length > 0 ? (
          <>
            <div className="sticky top-0 z-20 grid grid-cols-10 mx-3 my-1 bg-gray-100 text-gray-800 text-[14px] font-semibold border border-gray-200">
              <div className="col-span-2 px-4 py-2 border-r border-gray-300">
                Recipient Information
              </div>

              <div className="col-span-6 px-4 py-2 border-r border-gray-300">
                Subject
              </div>

              <div className="col-span-2 px-4 py-2">Certificate Status</div>
            </div>
            <div className="min-h-[200px] space-y-1">
              {props.sent_data.length > 0 ? (
                props.sent_data.map((data: any) => (
                  <SentData key={data.id} data={data} />
                ))
              ) : (
                <p className="text-center text-gray-400 py-10">
                  No sent mails found
                </p>
              )}
            </div>
            <SentTimeModal />
          </>
        ) : null}
      </div>
      {props.sent_data.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={25}
          onPageChange={(p) => setPage(p)}
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
