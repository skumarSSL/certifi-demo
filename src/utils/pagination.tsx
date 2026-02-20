import React from "react";

type Props = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxVisiblePages = 5;

  const getPages = () => {
    const pages: (number | string)[] = [];

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="sticky bottom-0 z-40 flex items-center justify-between bg-gray-100 px-4 py-2 shadow-md">
      {/* Page Size */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-200 rounded px-2 py-1 text-sm outline-none cursor-pointer"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size} className="bg-white">
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 text-gray-600 hover:text-sky-600 disabled:opacity-40"
        >
          ‹ Previous
        </button>

        {getPages().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2 text-gray-600">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 rounded-md text-sm font-medium
                ${
                  currentPage === page
                    ? "bg-sky-700 text-white opacity-80"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 text-gray-600 hover:text-sky-600 disabled:opacity-40"
        >
          Next ›
        </button>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
