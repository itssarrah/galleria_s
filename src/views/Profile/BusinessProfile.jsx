import { React, useState } from "react";
import BusinessProfileDetails from "../../components/businessProfile/BusinessProfileDetails";
import data from "./dummy";
import { useParams } from "react-router-dom";
import BusinessProfileStats from "../../components/businessProfile/BusinessProfileStats";
import TabBar from "../../components/ui/TabBar";
import ItemsOnSale from "../../components/businessProfile/ItemsOnSale";
import Insights from "../../components/businessProfile/Insights";
import FeedbackAndReviews from "../../components/businessProfile/FeedbackAndReviews";

const BusinessesProfile = () => {
  const { id } = useParams();
  const profileData = data[id];
  const [activeTab, setActiveTab] = useState(null);
  const tabItems = ["ItemsOnSale", "Insights", "Feedback & Reviews"];

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div className="flex flex-col items-center justify-center px-20">
      <BusinessProfileDetails {...profileData} />
      <BusinessProfileStats likes={20000} date={new Date(2023, 9)} sales={21} />
      <TabBar
        items={tabItems}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      {activeTab === tabItems[0] && <ItemsOnSale />}
      {activeTab === tabItems[1] && <Insights />}
      {activeTab === tabItems[2] && <FeedbackAndReviews />}
    </div>
  );
};

export default BusinessesProfile;
