import React, { useState } from "react";
import SavedBar from "./SavedBar";
import UserFavoriteBiz from "../userAccount/UserFavoriteBiz";
import UserWishlist from "../userAccount/UserWishlist";

function Saved() {
  const [selectedOption, setSelectedOption] = useState("saved_products");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <SavedBar
        handleSelectChange={handleSelectChange}
        selectedOption={selectedOption}
      />
      {selectedOption === "saved_products" ? (
        <UserWishlist />
      ) : (
        <UserFavoriteBiz />
      )}
    </>
  );
}

export default Saved;
