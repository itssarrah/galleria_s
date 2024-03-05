import React from "react";

function SavedBar({ handleSelectChange, selectedOption }) {
  return (
    <nav className="w-full flex flex-row bg-white px-4 p-4 justify-between items-center z-[9] mt-8 md:px-20 md:gap-0 gap-2">
      <div className="text-[18px]">
        <div className="text-[18px] ">
          <select
            className="cursor-pointer outline-none"
            onChange={handleSelectChange}
            value={selectedOption}
          >
            <option value="saved_products">Saved Products</option>
            <option value="saved_businesses">Saved Businesses</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default SavedBar;
