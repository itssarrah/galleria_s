import React from "react";
import "../../css/tab.css";
import "../../css/userAccount.css";

function TabBar({
  items,
  handleTabClick,
  activeTab,
  inactiveClassName = "account_unactive",
  activeClassName = "account_active",
  className = "xl:text-4xl md:text-3xl text-lg font-sofia",
}) {
  return (
    <div className="w-full bg-white my-12 h-24 flex justify-around items-center">
      {items.map((item) => (
        <h1
          className={`tab-bar ${
            item == activeTab ? activeClassName : inactiveClassName
          } ${className}`}
          onClick={() => handleTabClick(item)}
        >
          {item}
        </h1>
      ))}
    </div>
  );
}

export default TabBar;
