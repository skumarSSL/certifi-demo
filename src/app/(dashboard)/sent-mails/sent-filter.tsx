import { Search } from "lucide-react";

const FilterSection = ({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (e: any) => void;
}) => { 

  return (
    <div className="flex items-center justify-between my-3 ">
      <div className="relative flex h-min w-[250px] ml-3 bg-gray-200 border border-gray-200 rounded-md">
        <Search className="absolute top-1/2 left-[4px] mr-2 h-5 w-7 -translate-y-1/2 transform cursor-pointer dark:text-white text-gray-400" />

        <input
          className="w-full rounded-md border-none bg-white p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          type="search"
          placeholder={"Search email, phone or subject"}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {/* <div className="mr-3">
        <FileDownIcon className="w-8 h-8 text-gray-400" />
      </div> */}
    </div>
  );
};

export default FilterSection;
