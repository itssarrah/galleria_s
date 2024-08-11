import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { BACKEND_URL } from "../../config";
import useBusinessData from "../../api/fetchBusinessData";
import { Businessinfo } from "../auth/BusinessInfo";
import { AccountInformation } from "../auth/AccountInfo";
import { PersonalInfo } from "../auth/PersonalInfo";
import "../../css/verification.css";
import ExternalLinks from "../auth/ExternalLinks";

const updateBusinessData = async ({ formData, token }) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BACKEND_URL}api/update-business-profile`,
    formData,
    config
  );

  return response.data;
};

const UpdateBusinessProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { data: businessData, isLoading } = useBusinessData(token);
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullname: "",
    businessname: "",
    businessdesc: "",
    minPrice: 0,
    maxPrice: 0,
    businessType: "",
    wilaya: "",
    confirmNewPassword: "",
    oldPassword: "",
    newPassword: "",
    image: null,
    instagramLink: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSection, setSelectedSection] = useState("business");
  useEffect(() => {
    const fragment = window.location.hash.replace("#", "");
    if (fragment) {
      setSelectedSection(fragment);
    }
  }, []);

  useEffect(() => {
    if (businessData) {
      const initialData = {
        email: businessData.business.email,
        phone: businessData.business.phone,
        fullname: businessData.business.fullname,
        businessname: businessData.business.businessname,
        businessdesc: businessData.business.businessdesc,
        minPrice: businessData.business.minPrice,
        maxPrice: businessData.business.maxPrice,
        businessType: businessData.business.category.en_name,
        wilaya: businessData.business.wilaya.id,
        image: null,
        instagramLink: businessData.business.instagram_link,
      };

      setFormData(initialData);
      setInitialFormData(initialData);
      setPreviewImage(`${BACKEND_URL}storage/${businessData.business.image}`);
    }
  }, [businessData]);

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(formData.image);
    } else if (businessData) {
      setPreviewImage(`${BACKEND_URL}storage/${businessData.business.image}`);
    } else {
      setPreviewImage(null);
    }
  }, [formData.image, businessData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedSection === "account" || selectedSection === "business") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid";
      }

      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      }
    }

    if (selectedSection === "personal" || selectedSection === "business") {
      if (!formData.fullname) {
        newErrors.fullname = "Full name is required";
      }

      if (!formData.businessname) {
        newErrors.businessname = "Business name is required";
      }

      if (!formData.businessdesc) {
        newErrors.businessdesc = "Business description is required";
      }

      if (formData.minPrice <= 0) {
        newErrors.minPrice = "Minimum price should be greater than zero";
      }

      if (formData.maxPrice <= 0) {
        newErrors.maxPrice = "Maximum price should be greater than zero";
      } else if (formData.maxPrice < formData.minPrice) {
        newErrors.maxPrice =
          "Maximum price should be greater than minimum price";
      }

      if (!formData.businessType) {
        newErrors.businessType = "Business type is required";
      }

      if (!formData.wilaya) {
        newErrors.wilaya = "Wilaya is required";
      }
    }

    if (selectedSection === "account") {
      if (
        formData.newPassword ||
        formData.confirmNewPassword ||
        formData.oldPassword
      ) {
        if (!formData.oldPassword) {
          newErrors.oldPassword = "Old password is required";
        }
        if (!formData.newPassword) {
          newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 8) {
          newErrors.newPassword =
            "New password must be at least 8 characters long";
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
          newErrors.confirmNewPassword =
            "New password and confirmation do not match";
        }
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const checkUniqueEmailAndPhone = async (formData) => {
    let emailAvailable = true;
    let phoneAvailable = true;

    // Check email uniqueness if it has changed
    if (formData.email && formData.email !== initialFormData.email) {
      try {
        await axios.post(`${BACKEND_URL}api/check-email-u`, {
          email: formData.email,
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          emailAvailable = false;
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is already taken",
          }));
        } else {
          console.error("Error checking email uniqueness:", error);
        }
      }
    }

    // Check phone uniqueness if it has changed
    if (formData.phone && formData.phone !== initialFormData.phone) {
      try {
        await axios.post(`${BACKEND_URL}api/check-phone-u`, {
          phone: formData.phone,
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          phoneAvailable = false;
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "Phone number is already taken",
          }));
        } else {
          console.error("Error checking phone uniqueness:", error);
        }
      }
    }

    return emailAvailable && phoneAvailable;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!(await checkUniqueEmailAndPhone(formData))) {
      return;
    }

    const data = new FormData();
    let emailChanged = false;
    for (const key in formData) {
      if (formData[key] !== initialFormData[key]) {
        data.append(key, formData[key]);
        if (key === "email") {
          emailChanged = true;
        }
      }
    }

    try {
      await updateBusinessData({ formData: data, token });
      if (emailChanged) {
        setSuccessMessage(
          "Profile updated successfully! We've sent you an email to verify your new email address."
        );
      } else {
        setSuccessMessage("Profile updated successfully!");
      }
      // Show the success message as a pop-up notification
      const notification = document.createElement("div");
      notification.className = "notification-popup show";
      notification.textContent = "Profile updated successfully!";
      document.body.appendChild(notification);

      // Hide the notification and navigate after 5 seconds
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(notification);
          navigate("/businessprofile");
        }, 500);
      }, 5000);
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.error === "Old password is incorrect") {
          setErrorMessage("The old password you entered is incorrect.");
        } else {
          setErrorMessage(error.response.data.message);
        }
      } else {
        setErrorMessage("Failed to update profile. Please Try Again.");
      }
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center update-business-profile ">
      <h1 className="font-sofia pt-10 pb-10 text-lg md:text-4xl">
        Update Business Profile
      </h1>
      <div className="flex flex-col items-center justify-center">
        {previewImage && (
          <>
            <img
              src={previewImage}
              className="rounded-full h-[20rem] w-[20rem] object-cover"
              alt="Preview"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
          </>
        )}
      </div>

      <div className="flex gap-4 pt-10 justify-center items-center">
        <button
          className={`rounded-lg  py-2 px-4 ${
            selectedSection === "business"
              ? "bg-[#ff9494] text-white"
              : "bg-[#ff9494] opacity-50 text-white"
          }`}
          onClick={() => setSelectedSection("business")}
        >
          Business Information
        </button>
        <button
          className={`rounded-lg  py-2 px-4 ${
            selectedSection === "personal"
              ? "bg-[#ff9494] text-white"
              : "bg-[#ff9494] opacity-50 text-white"
          }`}
          onClick={() => setSelectedSection("personal")}
        >
          Personal Information
        </button>
        <button
          className={`rounded-lg py-2 px-4 ${
            selectedSection === "account"
              ? "bg-[#ff9494] text-white"
              : "bg-[#ff9494] opacity-50 text-white"
          }`}
          onClick={() => setSelectedSection("account")}
        >
          Account Information
        </button>
        <button
          className={`rounded-lg py-2 px-4 ${
            selectedSection === "external"
              ? "bg-[#ff9494] text-white"
              : "bg-[#ff9494] opacity-50 text-white"
          }`}
          onClick={() => setSelectedSection("external")}
        >
          External Links
        </button>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 mt-4"
      >
        {selectedSection === "business" && (
          <div id="business">
            <Businessinfo
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
            />
          </div>
        )}

        {selectedSection === "personal" && (
          <div id="personal">
            <PersonalInfo
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
            />
          </div>
        )}

        {selectedSection === "account" && (
          <div id="account">
            <AccountInformation
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
              update={true}
            />
          </div>
        )}
        {selectedSection === "external" && (
          <div id="external">
            <ExternalLinks
              id="external"
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[#ff9494] rounded-lg w-[9rem] md:w-[20rem] h-[4rem] font-jost text-white font-[400] text-xl mb-10"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateBusinessProfile;
