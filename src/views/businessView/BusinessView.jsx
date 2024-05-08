import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BusinessProfileDetails from "../../components/businessProfile/BusinessProfileDetails";
import BusinessProfileStats from "../../components/businessProfile/BusinessProfileStats";
import TabBar from "../../components/ui/TabBar";
import ItemsOnSale from "../../components/businessProfile/ItemsOnSale";
import FeedbackAndReviewsView from "../../components/businessView/FeedbackAndReviewsView";
import { BACKEND_URL } from "../../config";
import { ClipLoader } from "react-spinners";

//logout
import useBusinessDataById from "../../api/BusinessViewApi/fetchBusinessById";

const BusinessView = () => {
  const { businessId } = useParams();
  console.log(businessId);
  const tabItems = ["Business Products", "Reviews"];
  const [activeTab, setActiveTab] = React.useState("Business Products");

  const renderTab = (activeTab, tabItems) => {
    switch (activeTab) {
      case tabItems[1]:
        return <FeedbackAndReviewsView businessId={businessId} />;
      default:
        return (
          <div className="px-2 mx-auto">
            <ItemsOnSale
              products={businessData.business.products}
              editable={true}
              seller={businessData.business.businessname}
              seller_image={businessData.business.image}
            />
          </div>
        );
    }
  };

  const handleTabClick = (tab) => setActiveTab(tab);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { data: businessData, isLoading } = useBusinessDataById(businessId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  }

  console.log("coucoiuuuuuuu:", businessData);

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

        <TabBar
          items={tabItems}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />

        <div className="flex flex-col items-center justify-center">
          {renderTab(activeTab, tabItems)}
        </div>
      </div>
    </>
  );
};

export default BusinessView;
