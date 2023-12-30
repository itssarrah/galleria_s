import React from "react";
import "../../css/ui/tab.css";
import "../../css/userAccount.css";

function TabBar({
  items,
  handleTabClick,
  activeTab,
  inactiveClassName = "account_unactive",
  activeClassName = "account_active",
}) {
  return (
    <div className="w-full bg-white my-12 h-24 flex justify-around items-center">
      {items.map((item) => (
        <h1
          className={`${
            item === activeTab ? activeClassName : inactiveClassName
          } xl:text-4xl md:text-3xl text-lg px-4 py-2 md:px-12 md:py-5 cursor-pointer `}
          onClick={() => handleTabClick(item)}
        >
          {item}
        </h1>
      ))}
    </div>
  );
}

export default TabBar;
