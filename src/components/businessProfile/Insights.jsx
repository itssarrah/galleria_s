import { useState, useEffect } from "react";
import { CustomAreaChart, CustomBarChart } from "./Charts";
import DropdownList from "../ui/DropdownList";
import TabBar from "../ui/TabBar";

const getSummary = (data, xKey, yKey) => {
  if (yKey === "bestSeller") {
    return data.reduce((a, b) => (a[yKey] < b[yKey] ? b : a))[xKey];
  }

  let total = 0;
  data.forEach((i) => (total += i[yKey]));
  return total;
};

const Insights = ({ data }) => {
  const [graphFor, setGraphFor] = useState("sales");
  const [summary, setSummary] = useState("");

  const sales = {
    data: data.sales,
    label: "Number of Sales",
    unit: "",
    xKey: "x",
    yKey: "sales",
    summary: "Total Sales of the week: ",
  };

  const profit = {
    data: data.profit,
    label: "Number of Sales",
    unit: "DZD",
    xKey: "x",
    yKey: "profit",
    summary: "Total Profit of the week: ",
  };

  const bestSeller = {
    data: data.bestSeller,
    label: "Best Seller",
    unit: "",
    isBarChart: true,
    xKey: "x",
    yKey: "bestSeller",
    summary: "Best Seller of the week: ",
  };

  const typeToData = {
    sales: sales,
    profit: profit,
    bestSeller: bestSeller,
  };

  const [graphInfo, setGraphInfo] = useState(sales);
  useEffect(() => {
    setGraphInfo(typeToData[graphFor]);

    let _summary = typeToData[graphFor].summary;
    _summary += `${getSummary(
      typeToData[graphFor].data,
      typeToData[graphFor].xKey,
      typeToData[graphFor].yKey
    )}.`;
    setSummary(_summary);
  }, [graphFor]);

  const handleTabClick = (graph) => setGraphFor(graph);

  return (
    <div>
      <div className="w-full bg-white my-12 h-24 flex justify-around items-center">
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

      {graphInfo.isBarChart ? (
        <CustomBarChart {...graphInfo} />
      ) : (
        <CustomAreaChart {...graphInfo} />
      )}

      <p className="text-center"> {summary} </p>
    </div>
  );
};

export default Insights;
