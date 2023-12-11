import { useState, useEffect } from "react";
import { UserAccountHero } from "../../components/userAccount/UserAccountHero";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import "../../css/userAccount.css";
import UserAccountBar from "../../components/userAccount/UserAccountBar";
import { BACKEND_URL } from "../../config";
import UserWishlist from "../../components/userAccount/UserWishlist";

import UserFavoriteBiz from "../../components/userAccount/UserFavoriteBiz";
import UserFeedback from "../../components/userAccount/UserFeedback";

const UserAccountPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("WishList");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/user/${userId}`); // Replace with your actual endpoint
        setUserData(response.data); // Assuming the response is in JSON format
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("User Picture URL:", userData.userPictureURL);

  return (
    <>
      <div className="md:flex md:justify-center block">
        <UserAccountHero
          userId={userId}
          userName={userData.userName}
          userEmail={userData.userEmail}
          userPictureURL={userData.userPictureURL}
        />
      </div>

      <UserAccountBar activeTab={activeTab} handleTabClick={handleTabClick} />

      {/* Conditional rendering based on the active tab */}
      {activeTab === "WishList" && <UserWishlist />}
      {activeTab === "FavoriteBiz" && <UserFavoriteBiz />}
      {activeTab === "Feedback" && <UserFeedback />}
    </>
  );
};

export default UserAccountPage;
