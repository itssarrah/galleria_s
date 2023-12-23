import React from "react";
import "../../css/tab.css";
import "../../css/userAccount.css";

function TabBar({ items, activeTab, handleTabClick }) {
  return (
    <div className="w-full bg-white mt-12 h-24 flex justify-around items-center">
      {items.map((item) => (
        <h1
          className={`account_${
            activeTab === item ? "active" : "unactive"
          } tab-bar`}
          onClick={() => handleTabClick(item)}
        >
          {item}
        </h1>
      ))}
    </div>
  );
}

export default TabBar;
