import { useState, useEffect } from "react";
import { CustomAreaChart, CustomBarChart } from "./Charts";
import DropdownList from "../ui/DropdownList";
import TabBar from "../ui/TabBar";

const Insights = ({ data }) => {
  const [graphFor, setGraphFor] = useState("sales");

  const sales = {
    data: data.sales,
    label: "Number of Sales",
    unit: "",
    xKey: "x",
    yKey: "sales",
  };

  const profit = {
    data: data.profit,
    label: "Number of Sales",
    unit: "DZD",
    xKey: "x",
    yKey: "profit",
  };

  const bestSeller = {
    data: data.bestSeller,
    label: "Best Seller",
    unit: "",
    isBarChart: true,
    xKey: "x",
    yKey: "bestSeller",
  };

  const typeToData = {
    sales: sales,
    profit: profit,
    bestSeller: bestSeller,
  };

  const [graphInfo, setGraphInfo] = useState(sales);
  useEffect(() => {
    setGraphInfo(typeToData[graphFor]);
  }, [graphFor]);

  const handleTabClick = (graph) => setGraphFor(graph);

  return (
    <div>
      <div className="w-screen bg-white my-12 h-24 flex justify-around items-center">
        <DropdownList options={["Last week"]} />
        <div>
          <TabBar
            items={Object.keys(typeToData)}
            activeTab={graphFor}
            handleTabClick={handleTabClick}
            activeClassName="text-[#FF9494] bg-none"
            inactiveClassName="text-[#000]"
            className="text-lg font-sunflower"
          />
        </div>
      </div>
      <div className="flex justify-center p-10 w-full h-full">
        {graphInfo.isBarChart ? (
          <CustomBarChart {...graphInfo} />
        ) : (
          <CustomAreaChart {...graphInfo} />
        )}
      </div>
    </div>
  );
};

export default Insights;
