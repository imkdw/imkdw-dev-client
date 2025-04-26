import { SearchIcon } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative w-1/3 min-w-[240px]">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-[#3C3C3D] text-gray-300 px-10 py-1 rounded-md border border-gray-500 focus:outline-none text-center placeholder:text-gray-300"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">
        <SearchIcon />
      </div>
    </div>
  );
}
