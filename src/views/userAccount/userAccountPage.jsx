import React, { useState, useEffect, startTransition } from "react";
import { UserAccountHero } from "../../components/userAccount/UserAccountHero";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import "../../css/userAccount.css";
import UserAccountBar from "../../components/userAccount/UserAccountBar";
import { BACKEND_URL } from "../../config";
import UserWishlist from "../../components/userAccount/UserWishlist";
import UserFavoriteBiz from "../../components/userAccount/UserFavoriteBiz";
import UserFeedback from "../../components/userAccount/UserFeedback";
import { useNavigate } from "react-router-dom";

const UserAccountPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const location = useLocation(); // Use useLocation hook to access location
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("WishList");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token not found. Redirecting to login page.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${BACKEND_URL}api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate(-1);
    }
  };

  useEffect(() => {
    startTransition(() => {
      fetchData();
    });
  }, [location.state, userId, navigate]);

  const handleTabClick = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
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
