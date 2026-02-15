import RootLayout from "@/app/layout";
import CloudSvg from "@/assets/cloud.svg";
import DashboardWrapper from "@/app/(dashboard)/layout";

import { FileDownIcon, Search } from "lucide-react";
import Modal from "@/utils/modal";

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
  return (
    <RootLayout>
      <div className="grid gap-2">
        <FilterSection />

        <div className="grid grid-cols-8 mx-3 my-1 bg-gray-100 text-gray-800 text-[14px] font-semibold border border-gray-200">
          <div className="col-span-3 px-4 py-2 border-r border-gray-300">
            Recipient Information
          </div>

          <div className="col-span-3 px-4 py-2 border-r border-gray-300">
            Subject
          </div>

          <div className="col-span-2 px-4 py-2">Certificate Status</div>
        </div>

        <div className="grid grid-cols-8 mx-3 bg-white text-gray-800 text-[14px] border-b border-x border-gray-200 transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md hover:-translate-y-[1px] hover:scale-[1.002] cursor-pointer group">
          {/* Contact Info */}
          <div className="col-span-3 px-4 py-3">
            <div className="flex space-x-3">
              <div className="flex items-center gap-2" title="Mail Delivered">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <p className="font-bold group-hover:text-[#0976B1] transition-colors">
                john@example.com
              </p>
            </div>
            <p className="font-medium text-gray-500">9968218499</p>
          </div>

          {/* Subject */}
          <div className="col-span-3 px-4 py-3 flex items-center">
            <p className="text-gray-700 font-bold line-clamp-2 group-hover:text-gray-900">
              Course Completion Certificate :{" "}
              <span className="text-sm font-light">
                Hello, I have sent you the certified communication. Please check
                and revert as soon as possible. And also, please check the
                certificate you received.
              </span>
            </p>
          </div>

          {/* Status */}
          <div className="col-span-2 px-4 py-3 flex items-center">
            <span className="px-3 py-1 rounded-md text-md font-light bg-[#e67e22] text-white group-hover:bg-[#e67e22]] transition">
              In Progress
            </span>
          </div>
        </div>

        <div className="grid grid-cols-8 mx-3 bg-white text-gray-800 text-[14px] border-b border-x border-gray-200 transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md hover:-translate-y-[1px] hover:scale-[1.002] cursor-pointer group">
          {/* Contact Info */}
          <div className="col-span-3 px-4 py-3">
            <div className="flex space-x-3">
              <div className="flex items-center gap-2" title="Mail Read">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-700 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-700"></span>
                </span>
              </div>
              <p className="font-bold group-hover:text-[#0976B1] transition-colors">
                abc@example.com
              </p>
            </div>
            <p className="font-medium text-gray-500">9968218499</p>
          </div>

          {/* Subject */}
          <div className="col-span-3 px-4 py-3 flex items-center">
            <p className="text-gray-700 font-bold line-clamp-2 group-hover:text-gray-900">
              Course Completion Certificate :{" "}
              <span className="text-sm font-light">
                Hello, I have sent you the certified communication. Please check
                and revert as soon as possible. And also, please check the
                certificate you received.
              </span>
            </p>
          </div>

          {/* Status */}
          <div className="col-span-2 px-4 py-3 flex items-center justify-between">
            <span className="px-3 py-1 rounded-md text-md font-light bg-green-600 text-white group-hover:bg-[#e67e22]] transition">
              Delivered
            </span>
            <img
              className="cursor-pointer"
              src={CloudSvg.src}
              alt="edit"
              width="30px"
              height="20px"
            />
          </div>
        </div>
        <SentTimeModal />
      </div>
    </RootLayout>
  );
};

export default SentMails;

const FilterSection = () => {
  // const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between py-2">
      <div className="relative flex h-min w-[250px] ml-3 bg-gray-100">
        <Search className="absolute top-1/2 left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white text-gray-400" />

        <input
          className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          type="search"
          placeholder={"Search email, phone or subject"}
          // value={search}
          // onChange={(e) => {
          //   setSearch(e.target.value);
          // }}
        />
      </div>
      <div className="mr-3">
        <FileDownIcon className="w-8 h-8 text-gray-400" />
      </div>
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
        <div
          className="px-2 rounded-2xl  bg-[#f5f6fa] 
          shadow-[0px_8px_24px_rgba(149,157,165,0.2)] py-1"
        >
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
