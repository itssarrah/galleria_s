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
