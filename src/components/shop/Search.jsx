import SearchIcon from "../../assets/icons/searchIcon";

function Search({ searchTerm, handleSearch, setSearchTerm }) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className=" border border-main__pink rounded-full py-3 px-[20px] w-3/4 shadow-md mb-4"
      />
      <button
        className="relative  h-5 w-10 rounded-full bg-main__pink text-white flex items-start  cursor-pointer right-12 bottom-1"
        onClick={() => {
          setSearchTerm("");
        }}
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Search;
