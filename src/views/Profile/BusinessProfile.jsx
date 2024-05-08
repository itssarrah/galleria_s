import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import BusinessProfileDetails from "../../components/businessProfile/BusinessProfileDetails";
import BusinessProfileStats from "../../components/businessProfile/BusinessProfileStats";
import TabBar from "../../components/ui/TabBar";
import ItemsOnSale from "../../components/businessProfile/ItemsOnSale";
import Insights from "../../components/businessProfile/Insights";
import FeedbackAndReviews from "../../components/businessProfile/FeedbackAndReviews";
import Footer from "../../components/Footer";
import { BACKEND_URL } from "../../config";
import { ClipLoader } from "react-spinners";
//dummy
import data from "./dummy";
//logout
import axios from "axios";
import UserWishlist from "../../components/userAccount/UserWishlist";
import Saved from "../../components/businessProfile/Saved";
import useBusinessData from "../../api/fetchBusinessData";

// const fetchBusinessData = async (token) => {
//   const response = await fetch(`${BACKEND_URL}api/business/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     if (response.status === 401) {
//       // Redirect to login page if unauthorized
//       console.error("Unauthorized. Redirecting to login page.");
//       window.location.href = "/login";
//     } else {
//       throw new Error("Failed to fetch business data");
//     }
//   }

//   return response.json();
// };

const BusinessProfile = () => {
  const { id } = useParams();
  const businessId = localStorage.getItem("user_id");
  const tabItems = ["My Products", "Insights", "Reviews", "Saved"];
  // const tabItems = ["My Products", "Insights", "Feedback & Reviews"];
  const [activeTab, setActiveTab] = React.useState("My Products");

  const renderTab = (id, activeTab, tabItems) => {
    switch (activeTab) {
      case tabItems[1]:
        return <Insights data={data[0]} />;
      case tabItems[2]:
        return <FeedbackAndReviews profile={true} />;
      case tabItems[3]:
        return <Saved />;
      default:
        return (
          <div className="px-2 mx-auto">
            <ItemsOnSale
              products={businessData.business.products}
              editable={true}
              seller={businessData.business.businessname}
              seller_image={businessData.business.image}
              sellerId={businessId}
            />
          </div>
        );
    }
  };

  const handleTabClick = (tab) => setActiveTab(tab);
  // const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { data: businessData, isLoading } = useBusinessData(token);

  // const { data: businessData, isLoading } = useQuery(
  //   ["businessData", id],
  //   async () => {

  //     if (!token) {
  //       console.error("Token not found. Redirecting to login page.");
  //       navigate("/login");
  //       throw new Error("No token");
  //     }

  //     return fetchBusinessData(token);
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     staleTime: 60000,
  //   }
  // );

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(`${BACKEND_URL}api/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_id");
      window.location.href = "/login";
      // navigate("/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  }

  console.log("Business:", businessData);

  return (
    <>
      <div className="w-full">
        <div className="mx-auto">
          <BusinessProfileDetails
            imageURL={`${BACKEND_URL}storage/${businessData.business.image}`}
            userName={businessData.business.fullname}
            email={businessData.business.email}
            location={businessData.business.wilaya.name}
            phoneNumber={businessData.business.phone}
            rating={businessData.business.averageRating}
            minPrice={businessData.business.minPrice}
            maxPrice={businessData.business.maxPrice}
            category={businessData.business.category.en_name}
            profile={true}
          />
          <BusinessProfileStats
            likes={businessData.business.likes}
            date={new Date(businessData.business.created_at)}
            sales={
              businessData.business.products
                ? businessData.business.products.length
                : 0
            }
          />
        </div>
        <div className="w-fit mx-auto">
          <button
            className="text-xl underline text-red-600 font-jost mt-6 "
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
        <TabBar
          items={tabItems}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />

        <div className="flex flex-col items-center justify-center">
          {renderTab(id, activeTab, tabItems)}
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;
