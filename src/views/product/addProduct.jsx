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

  const validateForm = () => {
    let errorList = {};

    if (formData.product_name === "") {
      errorList.product_name = t("empty_error");
    }
    if (formData.product_description.trim().length < 10) {
      errorList.product_description =
        "Description should be at least 10 characters.";
    }

    if (formData.product_name.trim().length < 5) {
      errorList.product_name = "Product name should be at least 5 characters.";
    }
    if (formData.product_name.trim().length > 20) {
      errorList.product_name = "Product name should not exceed 20 characters.";
    }

    if (formData.images.length === 0) {
      errorList.images = t("empty_error");
    }
    if (formData.product_description === "") {
      errorList.product_description = t("empty_error");
    }
    if (formData.product_price === "") {
      errorList.product_price = t("empty_error");
    }
    if (formData.categories.length === 0) {
      errorList.categories = t("empty_error");
    }
    if (formData.size === "") {
      errorList.size = t("empty_error");
    }

    if (formData.images.length > 0) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];

      const invalidTypes = formData.images.some(
        (image) => !allowedTypes.includes(image.type)
      );

      if (invalidTypes) {
        errorList.images =
          "Invalid image type. Allowed types: JPEG, PNG, JPG, GIF.";
      }

      // Validate image size
      const imageSizeLimit = 5 * 1024 * 1024; // 5MB in bytes
      const exceedsSize = formData.images.some(
        (image) => image.size > imageSizeLimit
      );

      if (exceedsSize) {
        errorList.images = "Image size should be less than 5MB.";
      }
    }

    const productPrice = parseFloat(formData.product_price);
    const salePrice = parseFloat(formData.sale_price);
    if (isNaN(productPrice) || productPrice <= 100 || productPrice >= 99999) {
      errorList.product_price =
        "Product price should be between 100 and 99999.";
    }

    if (isNaN(salePrice) || salePrice <= 100 || salePrice >= 99999) {
      errorList.sale_price = "Sale price should be between 100 and 99999.";
    }
    if (
      !isNaN(productPrice) &&
      !isNaN(salePrice) &&
      productPrice <= salePrice
    ) {
      errorList.sale_price = "Sale price should be Less than Product price.";
    }

    setErrors(errorList);

    setIsFinishDisabled(Object.keys(errorList).length > 0);

    return Object.keys(errorList).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting form submission...");
    console.log("you are about to send: ", formData);

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

      console.log("Product submitted successfully:", response.data);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  if (loading) {
    // You can render a loading state while waiting for the user type
    return <div>Loading...</div>;
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
            disabled={isFinishDisabled}
          />
        </div>
        {isFormSubmitted && (
          <div className="success-message text-green">
            Product registered successfully!
          </div>
        )}
      </form>
    </>
  );
}

export default AddProduct;
