import React from "react";

function WilayaSelector({
  selectedWilayas,
  searchTerm,
  searchResults,
  wilayasList,
  setSearchTerm,
  setSearchResults,
  setSelectedWilayas,
  searchInputRef,
}) {
  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredWilayas = wilayasList.filter((wilaya) =>
      wilaya.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredWilayas);
  };

  const handleWilayaSelection = (wilaya) => {
    if (!selectedWilayas.includes(wilaya)) {
      setSelectedWilayas([...selectedWilayas, wilaya]);
      setSearchResults([]);
      setSearchTerm("");
    } else {
      setSearchTerm("");
    }
  };

  const removeWilaya = (indexToRemove) => {
    setSelectedWilayas((prevSelectedWilayas) =>
      prevSelectedWilayas.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <>
      <p className="text-black font-sofia text-[22px] text-left">Wilaya :</p>
      <div className="pb-[10rem] filter-container">
        <div className="flex flex-col filter-container ">
          <div className="search-input-container">
            <div className="relative flex flex-row items-start justify-center">
              <input
                type="search"
                list="wilayas"
                placeholder="type..."
                className="w-52 h-9 rounded-lg border border-[#FF9494] bg-[#F5EBE0] focus:outline-none px-3 py-2 mb-5 ml-1"
                ref={searchInputRef}
                onChange={handleSearchInputChange}
                value={searchTerm}
              />
            </div>
          </div>
          {searchTerm && searchResults.length > 0 && (
            <div className="absolute bg-white w-[80%] border border-gray-300 mt-8 shadow-md filter-container">
              <ul className="list-none pl-4 space-y-1">
                {searchResults.map((wilaya, index) => (
                  <li
                    key={index}
                    className="text-black font-sunflower text-18px text-left space-x-20 px-2 cursor-pointer"
                    onClick={() => handleWilayaSelection(wilaya.name)}
                  >
                    <span className="font-sunflower text-18px">
                      {wilaya.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {selectedWilayas.length > 0 && (
          <div className="filter-container">
            <ul className="list-none pl-4 space-y-1  pb-[2rem]">
              {selectedWilayas.map((wilaya, index) => (
                <li
                  key={index}
                  className="inline-flex items-center bg-[#FF9494] rounded-lg px-3 py-1 mr-2 mb-2"
                >
                  <span className="text-gray-700 mr-2">{wilaya}</span>
                  <button
                    className="text-[#744638] font-bold focus:outline-none"
                    onClick={() => removeWilaya(index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default WilayaSelector;
