 function EmailViewSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      </div>

      {/* Body */}
      <div className="space-y-3">
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>

      {/* Attachments */}
      <div className="border-t pt-4 space-y-3">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>

        <div className="flex gap-4 flex-wrap">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 border rounded-lg p-3 w-56"
            >
              <div className="w-10 h-10 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmailViewSkeleton
