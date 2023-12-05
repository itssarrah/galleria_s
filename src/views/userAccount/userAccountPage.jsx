import { useState, useEffect } from "react";
import { UserAccountHero } from "../../components/userAccount/UserAccountHero";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import "../../css/userAccount.css";

import { BACKEND_URL } from "../../config";

const UserAccountPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("User Picture URL:", userData.userPictureURL);

  return (
    <div className="flex justify-around w-full">
      <UserAccountHero
        userId={userId}
        userName={userData.userName}
        userEmail={userData.userEmail}
        userPictureURL={userData.userPictureURL}
      />
    </div>
  );
};

export default UserAccountPage;
