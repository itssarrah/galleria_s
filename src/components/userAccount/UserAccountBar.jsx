import React from "react";
import "../../css/userAccount.css";

function UserAccountBar({ activeTab, handleTabClick }) {
  return (
    <div className="w-full bg-white mt-12 h-24 flex justify-around items-center">
      <h1
        className={`account_${
          activeTab === "WishList" ? "active" : "unactive"
        } xl:text-4xl md:text-3xl text-lg px-4 py-2 md:px-12 md:py-5 cursor-pointer`}
        onClick={() => handleTabClick("WishList")}
      >
        WishList
      </h1>
      <h1
        className={`account_${
          activeTab === "FavoriteBiz" ? "active" : "unactive"
        } xl:text-4xl md:text-3xl text-lg px-4 py-2 md:px-12 md:py-5 cursor-pointer`}
        onClick={() => handleTabClick("FavoriteBiz")}
      >
        Favorite Biz
      </h1>
      <h1
        className={`account_${
          activeTab === "Feedback" ? "active" : "unactive"
        } xl:text-4xl md:text-3xl text-lg px-4 py-2 md:px-12 md:py-5 cursor-pointer`}
        onClick={() => handleTabClick("Feedback")}
      >
        Feedback
      </h1>
    </div>
  );
}

export default UserAccountBar;
