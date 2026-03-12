import { Share2, ArrowRight, Trash2, Download } from "lucide-react";
import moment from "moment";

function EmailView({ data }: { data: any }) {
  const stringToGradient = (str: string) => {
    const colors = ["#6366f1", "#22c55e", "#f97316", "#ec4899"];
    let hash = str.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return `linear-gradient(135deg, ${colors[hash % colors.length]}, ${
      colors[(hash + 1) % colors.length]
    })`;
  };

  const fileColor = (str: string) => {
    const colors = ["#6366f1", "#22c55e", "#f97316", "#ec4899"];
    let hash = str.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return `${colors[hash % colors.length]}, ${
      colors[(hash + 1) % colors.length]
    })`;
  };

  const formatDate = (inputDate: string, isSameDay = true) => {
    const date = moment(inputDate);
    if (!date.isValid()) return "N/A";

    const today = moment();
    return date.isSame(today, "day") && isSameDay
      ? date.format("HH:mm:ss")
      : date.format("MMM DD, YYYY");
  };

  const getFileType = (file_name: string) => {
    let file_arr = file_name.split(".");
    return file_arr[file_arr.length - 1];
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  };

  const fileBlob = (base64: string, mimeType: string) => {
    return base64ToBlob(base64, mimeType);
  };

  const fileUrl = (base64: string, mimeType: string) => {
    const blob = base64ToBlob(base64, mimeType);
    return URL.createObjectURL(blob);
  };

  const truncateWords = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <div className="max-w-5xl md:max-w-7xl xl:max-w-9xl w-full bg-white rounded-xl shadow p-6 space-y-6  max-h-[calc(100vh-18rem)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold uppercase"
            style={{
              background: stringToGradient(data.FROM.substring(0, 2)),
            }}
          >
            {data.FROM.substring(0, 2)}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{data.FROM}</h2>
            <p className="text-sm text-gray-500">{formatDate(data.TIME)}</p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div>
        {/* <p className="text-sm text-gray-400">07:42 AM</p> */}
        <h3 className="font-semibold text-lg mt-1">{data.SUBJECT}</h3>
        <p className="text-sm text-gray-500 mt-1">
          <span className="text-gray-800 font-bold">To</span>:{" "}
          {data.TO_ADDRESSES.split(",").map((text: string, i: number) => {
            const cleanText = text.replace(/<[^>]*>/g, "");
            return (
              <span>
                {i !== 0 && ","}
                {text.includes("<b>") ? <b>{cleanText}</b> : text}
              </span>
            );
          })}
        </p>
        {data.CC_ADDRESSES && (
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-gray-800 font-bold">Cc</span>:{" "}
            {data.CC_ADDRESSES.split(",").map((text: string, i: number) => {
              const cleanText = text.replace(/<[^>]*>/g, "");
              return (
                <span>
                  {i !== 0 && ","}
                  {text.includes("<b>") ? <b>{cleanText}</b> : text}
                </span>
              );
            })}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto space-y-4 text-gray-700 leading-relaxed pr-2">
        <p>{data.BODY}</p>
      </div>

      {/* Attachments */}
      <div className="border-t pt-4 items-center space-x-2.5">
        <h4 className="flex col-span-2 items-center gap-2 text-gray-600 font-medium mb-1">
          📎 Attachment ({data.ATTACH.length})
        </h4>

        <div className="flex gap-4 flex-wrap h-18 overflow-scroll col-span-10">
          {/* File Card */}
          {data.ATTACH.map((file: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-gray-300 rounded-lg py-1 px-3"
            >
              <div
                className={`w-8 h-5 bg-blue-100 rounded flex items-center justify-center ${fileColor(getFileType(file.filename))} font-bold uppercase`}
              >
                <div
                  className="hover:underline hover:text-sky-800 px-1 text-[10px]"
                  title={file.title}
                >
                  {getFileType(file.filename)}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium w-40 truncate">
                  {truncateWords(file.filename, 20)}{" "}
                  <span className="text-[10px] text-gray-500">
                    (
                    {(
                      fileBlob(file.data, file.ctype).size /
                      1024 /
                      1024
                    ).toFixed(2)}
                    MB)
                  </span>
                </p>
                <p className="text-xs text-gray-500"></p>
              </div>
              <a
                href={fileUrl(file.data, file.ctype)}
                download={file.filename}
                title={file.title}
              >
                <Download
                  size={18}
                  className="text-gray-400 cursor-pointer hover:text-sky-700"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmailView;
