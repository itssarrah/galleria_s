<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import UserWishlist from "../../components/userAccount/UserWishlist";

const BusinessProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({});
  const [loading, setLoading] = useState(true);
=======
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
          <ItemsOnSale products={data[id].products} editable={true} />
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
        <div className="mx-auto">
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

        <div className="flex flex-col items-center justify-center">
          <startTransition className="w-full">
            {renderTab(id, activeTab, tabItems)}
          </startTransition>
        </div>
      </div>
      <Footer />
    </>
  );
};
>>>>>>> b86a8f89370ffcfca4dada27d33aa75a1f5e4cfa

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Token not found. Redirecting to login page.");
          // Redirect to login page or handle authentication flow
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
  }, [location.state]); // Adjust dependencies based on your needs

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Business Picture URL:", businessData.businessPictureURL);

  return (
    <>
      {/* Render business profile components using businessData */}
      <div>
        <h2>Business Profile</h2>
        {/* Display business information based on businessData */}
        <p>Business Name: {businessData.businessName}</p>
        <p>Business Email: {businessData.businessEmail}</p>

        <UserWishlist />
        {/* Add more fields as needed */}
      </div>
      {/* Add other components or UI elements as needed */}
    </>
  );
};

export default BusinessProfile;
