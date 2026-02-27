const SentDataSkeleton = () => {
  return (
    <div className="grid grid-cols-12 mx-3 bg-white border-b border-x border-gray-200 rounded-md p-3 animate-pulse">
      {/* Left column */}
      <div className="col-span-3 px-4 py-3 space-y-2">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Middle column */}
      <div className="col-span-7 px-4 py-3 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-3 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Right column */}
      <div className="col-span-2 px-4 py-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>

        <div className="flex space-x-3 mt-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Bottom expandable section skeleton */}
      <div className="col-span-12 mt-3 bg-gray-100 rounded-md p-3 space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-40 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="flex justify-between">
          <div className="h-3 w-40 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="flex justify-between">
          <div className="h-3 w-40 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SentDataSkeleton;
