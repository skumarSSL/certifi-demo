const Modal = (props: any) => {
  let {
    onClose,
    is_open_modal,
    size = "",
    close = true,
    height = "40%",
  } = props;

  //   const [height, setHeight] = useState("40%");

  //   useEffect(() => {
  //     if (size === "small") {
  //       setHeight("55%");
  //     } else if (size === "medium") {
  //       setHeight("70%");
  //     } else if (size === "large") {
  //       setHeight("80%");
  //     }
  //   }, [size]);

  return (
    <div
      className={`${
        !is_open_modal
          ? "hidden"
          : "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
      }`}
    >
      <div className="relative w-[500px] max-w-[90vw]">
        {close && (
          <button
            onClick={onClose}
            className="absolute top-1 right-1 bg-white text-md rounded-full shadow-md text-red-400 hover:bg-red-100 hover:scale-110 transition p-1 z-999 cursor-pointer w-7 h-7 text-center"
          >
            ✕
          </button>
        )}

        <div
          style={{ height }}
          className="relative bg-white p-6 rounded-lg shadow-lg overflow-y-auto"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
