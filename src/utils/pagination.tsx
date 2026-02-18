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

export default Pagination;
