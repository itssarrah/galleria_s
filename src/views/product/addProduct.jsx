import React, { useState, useEffect } from "react";
import "./product-page.css";
import { ContributeBtn } from "../../components/navbar";

import ProductDetails from "../../components/product/productDetails";
import ProductCategory from "../../components/product/productCategory";
import ProductDiscount from "../../components/product/productDiscount";
import { BACKEND_URL } from "../../config";
import ImageMultipleInput from "../../components/product/ImageMultipleInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";
import validateForm from "../../api/utils/productFormValidation";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    images: [],
    categories: [],
    size: "",
    sale_price: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isFinishDisabled, setIsFinishDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Token not found. Redirecting to login page.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BACKEND_URL}api/current_user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const currentUserType = response.data.user_type;
        setUserType(currentUserType);

        if (currentUserType !== "business") {
          setError("User is not a business. Redirecting to unauthorized page.");
          setLoading(false);
          navigate(-1);
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Redirecting to login page.");
        setLoading(false);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    validateForm(setIsFinishDisabled, t, formData, setErrors);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    console.log("Starting form submission...");
    setIsSubmitting(true);
    // console.log("you are about to send: ", formData);

    try {
      const form = new FormData();
      form.append("product_name", formData.product_name);
      form.append("product_description", formData.product_description);
      form.append("product_price", formData.product_price);
      form.append("size", formData.size);
      form.append("sale_price", formData.sale_price);

      formData.images.forEach((image, index) => {
        form.append("images[]", image);
      });

      formData.categories.forEach((category, index) => {
        form.append(`categories[${index}]`, category);
      });

      const token = localStorage.getItem("authToken");

      const response = await axios.post(`${BACKEND_URL}api/addproduct`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Make sure to include this header for FormData
        },
      });

      toast.success("Product registered successfully!");
      setIsFormSubmitted(true);
      setTimeout(() => {
        navigate("/businessprofile");
      }, 5000);
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Error submitting product.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen w-full">
          <ClipLoader color="#DD6969" size={50} />
        </div>
      </>
    );
  }

  if (error) {
    // You can render an error message if there was an issue fetching user data
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-fit mx-auto product_header mt-8 xl:text-5xl md:text-3xl text-xl">
        Add a New Product :
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row items-center gap-6 md:gap-0 justify-around mt-20 pb-12">
          <div>
            <ImageMultipleInput
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
              errors={errors}
            />
          </div>
          <div className="w-full px-8 md:px-0 md:w-6/12 md:pr-8 pr-8">
            <ProductDetails
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
            />
            <ProductCategory
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
            />
            <ProductDiscount
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        </div>
        <div className="w-fit mx-auto pb-4 scale-125 md:scale-100">
          <ContributeBtn
            importance="primary"
            text="Finish"
            onClick={handleSubmit}
            disabled={isFinishDisabled || isSubmitting}
          />
        </div>

        <ToastContainer />
      </form>
    </>
  );
}

export default AddProduct;
