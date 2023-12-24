import { React, useState } from "react";
import BusinessProfileDetails from "../../components/businessProfile/BusinessProfileDetails";
import data from "./dummy";
import { useParams } from "react-router-dom";
import BusinessProfileStats from "../../components/businessProfile/BusinessProfileStats";
import TabBar from "../../components/ui/TabBar";
import ItemsOnSale from "../../components/businessProfile/ItemsOnSale";
import Insights from "../../components/businessProfile/Insights";
import FeedbackAndReviews from "../../components/businessProfile/FeedbackAndReviews";
import Footer from "../../components/Footer";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const renderTab = (id, activeTab, tabItems) => {
  switch (activeTab) {
    case tabItems[1]:
      return <Insights data={data[id]} />;
    case tabItems[2]:
      return (
        <div className="px-20 mx-auto">
          <FeedbackAndReviews />
        </div>
      );
    default:
      return (
        <div className="px-20 mx-auto">
          <ItemsOnSale products={data[id].products} />
        </div>
      );
  }
};

const BusinessesProfile = () => {
  const { id } = useParams();
  const profileData = data[id];
  const [activeTab, setActiveTab] = useState(null);
  const tabItems = ["ItemsOnSale", "Insights", "Feedback & Reviews"];

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <>
      <div className="w-full">
        <div className="pr-20 mx-auto">
          <BusinessProfileDetails {...profileData} />
          <BusinessProfileStats
            likes={20000}
            date={new Date(2023, 9)}
            sales={21}
          />
        </div>
        <TabBar
          items={tabItems}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          inactiveClassName="text-[#000]"
          activeClassName="text-[#FF9494] bg-none"
        />

        <startTransition>{renderTab(id, activeTab, tabItems)}</startTransition>
      </div>
      <Footer />
    </>
  );
};

export default BusinessesProfile;
