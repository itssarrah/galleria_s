import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import InteractableStartsInput from "../InteractableStartsInput";
import { BACKEND_URL } from "../../config";

const AddReviewModal = ({
  title,
  closeModal,
  t = null,
  addReview,
  productId,
}) => {
  const [reviewContent, setReviewContent] = useState("");
  const [reviewTitle, setReviewTitle] = useState(""); // Define reviewTitle state

  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const handleAddReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to the login page if token is not present
      window.location.href = "/login";
      return;
    }
    const errors = {};
    if (!reviewTitle.trim()) {
      errors.title = "Review title is required";
    }
    if (!reviewContent.trim()) {
      errors.content = "Review content is required";
    }
    if (rating === 0) {
      errors.rating = "Please select a rating";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}api/product-ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          product_id: productId, // Assuming productId is defined somewhere in your component
          title: reviewTitle,
          rate_txt: reviewContent,
          stars: rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      // Optionally handle success response
      console.log("Review added successfully");
      setSuccessMessage("Review added successfully");
      // Clear form inputs
      setReviewTitle("");
      setReviewContent("");
      setRating(0);
      setTimeout(() => {
        setSuccessMessage("");
        closeModal();
      }, 1500);
    } catch (error) {
      console.error("Error adding review:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="modal-overlay px-5 md:px-[5rem] lg:px-[8rem] xl:px-[10rem]">
      <div className="reviews-modal py-10 lg:px-[6rem] xl:px-[8rem]">
        <AiFillCloseCircle
          className="text-white text-5xl lg:text-7xl absolute top-[3rem] right-[2rem] cursor-pointer"
          onClick={closeModal}
        />
        <div className="text-center p-2">
          <p className="text-2xl text-black/[.55] font-bold font-sofia">
            Rate This Product :
          </p>
          <h2 className="product-title font-jost text-gray-400">{title}</h2>
        </div>
        <form
          onSubmit={handleAddReview}
          className="p-4 flex flex-col h-full items-center gap-8"
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="reviewTitle"
              className="text-lg font-bold mb-2 font-jost"
            >
              Review Title :
            </label>
            <input
              type="text"
              id="reviewTitle"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className="input_txt font-jost rounded-2xl shadow-md text-lg px-2 py-4"
              placeholder="Enter review title..."
            />
            {errors.title && (
              <div className="flex items-center">
                <AiOutlineExclamationCircle className="text-red-500 mr-2" />
                <p className="text-red-500">{errors.title}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="reviewDescription"
              className="text-lg font-bold font-jost mb-2"
            >
              Review Description :
            </label>
            <textarea
              id="reviewDescription"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="input_txt font-jost rounded-2xl shadow-md text-lg resize-none px-2 py-4"
              placeholder="Write your review here..."
              rows={4} // Increase the number of rows (height)
              cols={50} // Increase the number of columns (width)
              maxLength={500}
            />
            {errors.content && (
              <div className="flex items-center">
                <AiOutlineExclamationCircle className="text-red-500 mr-2" />
                <p className="text-red-500">{errors.content}</p>
              </div>
            )}
          </div>
          <div>
            <InteractableStartsInput
              average={rating} // Pass the value of rating
              onChange={setRating} // Pass the function to update the rating
              totalNumberOfStars={5} // Pass the total number of stars
            />
            {errors.rating && (
              <div className="flex items-center">
                <AiOutlineExclamationCircle className="text-red-500 mr-2" />
                <p className="text-red-500">{errors.rating}</p>
              </div>
            )}
          </div>
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <button
            type="submit"
            className="bg-[#dd6969] text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 font-[500] font-jost"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
