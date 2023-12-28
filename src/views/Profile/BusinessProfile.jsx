import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BusinessProfileDetails from "../../components/businessProfile/BusinessProfileDetails";
import BusinessProfileStats from "../../components/businessProfile/BusinessProfileStats";
import TabBar from "../../components/ui/TabBar";
import ItemsOnSale from "../../components/businessProfile/ItemsOnSale";
import Insights from "../../components/businessProfile/Insights";
import FeedbackAndReviews from "../../components/businessProfile/FeedbackAndReviews";
import Footer from "../../components/Footer";
import { BACKEND_URL } from "../../config"; // Assuming you have a config file

const BusinessProfile = () => {
  const { id } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const tabItems = ["ItemsOnSale", "Insights", "Feedback & Reviews"];
  const navigate = useNavigate();

  const renderTab = (id, activeTab, tabItems) => {
    switch (activeTab) {
      case tabItems[1]:
        return <Insights data={businessData} />;
      case tabItems[2]:
        return (
          <div className="px-20 mx-auto">
            <FeedbackAndReviews />
          </div>
        );
      default:
        return (
          <div className="px-20 mx-auto">
            <ItemsOnSale products={businessData.products} editable={true} />
          </div>
        );
    }
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Token not found. Redirecting to login page.");
          // Redirect to login page or handle authentication flow
          navigate("/login");
          return;
        }

        const response = await axios.get(`${BACKEND_URL}api/business/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBusinessData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business data:", error);
        navigate(-1);
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Business Picture URL:", businessData.businessPictureURL);

  return (
    <>
      <div className="w-full">
        <div className="mx-auto">
          <BusinessProfileDetails {...businessData} />
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

        <div className="flex flex-col items-center justify-center">
          {renderTab(id, activeTab, tabItems)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessProfile;
