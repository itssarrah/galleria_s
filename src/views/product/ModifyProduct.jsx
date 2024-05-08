// Import the necessary dependencies
import React, { useState, useEffect } from "react";
import "./product-page.css";
import { ContributeBtn } from "../../components/navbar";
import ProductDetails from "../../components/product/productDetails";
import ProductCategory from "../../components/product/productCategory";
import ProductDiscount from "../../components/product/productDiscount";
import { BACKEND_URL } from "../../config";
import ImageMultipleInput from "../../components/product/ImageMultipleInput";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import validateForm from "../../api/utils/productFormValidation";
function ModifyProduct() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { productId } = useParams(); // Get the product ID from the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    // Initialize the formData state with empty values
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
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}api/product/${productId}`
        );
        const productData = response.data.data;
        console.log("Received:", productData);
        // Map each file to an object with a url property
        const images = productData.images.map((image) => ({ url: image.url }));

        setFormData({
          product_name: productData.product_name,
          product_description: productData.product_description,
          product_price: productData.product_price,
          images: images, // Assign the modified images array
          categories: productData.interests.map((interest) => interest.en_name),
          size: productData.size.size,
          sale_price:
            productData.sale_price == null ? "" : productData.sale_price,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data. Redirecting...");
        setLoading(false);
        navigate("/error");
      }
    };

    fetchProductData();
  }, [productId, navigate]);

  useEffect(() => {
    validateForm(setIsFinishDisabled, t, formData, setErrors);
  }, [formData, setIsFinishDisabled, t, setErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Token not found. Redirecting to login page.");
        window.location.href = "/login";
        return;
      }

      const form = new FormData();
      form.append("product_name", formData.product_name);
      form.append("product_price", formData.product_price);
      form.append("size", formData.size);
      form.append("product_description", formData.product_description);
      form.append("sale_price", formData.sale_price);

      // Append existing image URLs as a separate field
      const existingImages = [];
      console.log(formData.images);
      formData.images.forEach((image, index) => {
        if (image.url && typeof image.url === "string") {
          existingImages.push(image.url);
        } else if (image.src && typeof image.src === "string") {
          // Extract the path from the src property
          const imagePath = image.src.replace(
            /^.*\/product_images\//,
            "product_images/"
          );
          console.log("hi sarra : ", imagePath);
          existingImages.push(imagePath);
        } else {
          form.append(`images[]`, image);
          console.log(image);
        }
      });

      // Append existing image URLs to the form
      if (existingImages.length > 0) {
        form.append("existing_images", existingImages.join(","));
      }

      formData.categories.forEach((category, index) => {
        form.append(`categories[${index}]`, category);
      });

      console.log("Form Data - Images:");
      for (let pair of form.entries()) {
        console.log(pair[0], pair[1]); // Logs each key-value pair in the FormData
      }
      console.log("Existing Images:", existingImages);

      const response = await axios.post(
        `${BACKEND_URL}api/updateproduct/${productId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Product updated successfully") {
        setIsFormSubmitted(true);
      } else {
        console.log("There was an error updating the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error scenarios
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      const timer = setTimeout(() => {
        setIsFormSubmitted(false);
        navigate("/businessprofile"); // Redirect to /businessprofile after 5 seconds
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isFormSubmitted, navigate]);

  return (
    <>
      <div className="w-fit mx-auto product_header mt-8 xl:text-5xl md:text-3xl text-xl mb-[8rem]">
        Modify Product:
      </div>
      {formData.product_name != "" && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Render your form fields */}
          {/* Use the formData state to populate the form fields */}
          <ImageMultipleInput
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            errors={errors}
            modify={true}
          />
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
            modify={true}
          />
          <ProductDiscount
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          <div className="w-fit mx-auto pb-4 scale-125 md:scale-100">
            <ContributeBtn
              importance="primary"
              text="Finish"
              onClick={handleSubmit}
              disabled={isFinishDisabled}
            />
          </div>
          {isFormSubmitted && (
            // <div className="success-message text-green">
            //   Product modified successfully!
            // </div>
            <div className="success-popup">
              <div className="success-message text-green">
                <span role="img" aria-label="Checkmark">
                  &#10004;
                </span>{" "}
                Product modified successfully!
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
}

export default ModifyProduct;
