import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "../../css/product.css";
import { BACKEND_URL } from "../../config";
import defaultImage from "../../assets/images/authbiz.png";

import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

function ImageMultipleInput({
  formData,
  setFormData,
  setErrors,
  errors,
  modify = false,
}) {
  const [imageSrcList, setImageSrcList] = useState([]);

  // useEffect(() => {
  //   if (imageSrcList.length > 0 && modify === true) {
  //     const newImageSrcList = imageSrcList.map((image) => {
  //       if (typeof image === "string") {
  //         // It's a path fetched from the backend
  //         return { src: `${BACKEND_URL}storage/${image}` };
  //       } else {
  //         // console.log("rendering", image);
  //         return { src: image.src }; // Keep the file object for further processing
  //       }
  //     });

  //     // console.log("coucou", imageSrcList);
  //   }
  // }, [imageSrcList]]);

  // useEffect(() => {
  //   // Check if imageSrcList is not empty and modify is true
  //   if (imageSrcList.length > 0 && modify === true) {
  //     // Map each image in imageSrcList
  //     const newImageSrcList = imageSrcList.map((image) => {
  //       if (typeof image === "string") {
  //         // It's a path fetched from the backend
  //         return { src: `${BACKEND_URL}storage/${image}` };
  //       } else {
  //         // It's already a file object, keep it as it is
  //         return { src: image.src };
  //       }
  //     });
  //   }
  // }, [imageSrcList, setImageSrcList]);

  useEffect(() => {
    // Populate images from formData
    if (formData.images.length > 0 && modify === true) {
      setImageSrcList(
        formData.images.map((image) => ({
          src: `${BACKEND_URL}storage/${image.url}`,
        }))
      );
    }
  }, []);

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (files && imageSrcList.length < 5 && !modify) {
      const newImages = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ file, src: URL.createObjectURL(file) });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then((newImageSrcArray) => {
        const updatedImageSrcList = [
          ...imageSrcList,
          ...newImageSrcArray.slice(0, 5 - imageSrcList.length),
        ];

        setImageSrcList(updatedImageSrcList);

        const imageFiles = updatedImageSrcList.map((image) => image.file);

        setFormData((prev) => ({
          ...prev,
          images: imageFiles,
        }));

        setErrors((prev) => ({ ...prev, images: undefined }));
      });
    } else if (files && modify && formData.images.length < 5) {
      const updatedImageSrcList = [...imageSrcList];
      const updatedFormDataImages = [...formData.images];

      const newImages = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Generate Blob URL
            resolve({ file, src: URL.createObjectURL(file) });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then((newImageSrcArray) => {
        const appendedImages = newImageSrcArray.slice(
          0,
          5 - updatedImageSrcList.length
        );

        updatedImageSrcList.push(...appendedImages);
        updatedFormDataImages.push(
          ...appendedImages.map((image) => image.file)
        );
        // console.log(imageSrcList);
        setImageSrcList(updatedImageSrcList);
        setFormData((prev) => ({ ...prev, images: updatedFormDataImages }));
        setErrors((prev) => ({ ...prev, images: undefined }));
      });
    }
  };

  const handleRemoveImage = (imageSrc) => {
    if (!modify) {
      const updatedImageSrcList = imageSrcList.filter(
        (url) => url !== imageSrc
      );

      setImageSrcList(updatedImageSrcList);
      setFormData((prev) => ({
        ...prev,
        images: updatedImageSrcList.map((image) => image.file),
      }));
    } else {
      // console.log("image list before removal", imageSrcList);
      const updatedImageSrcList = imageSrcList.filter(
        (url) => url !== imageSrc
      );

      setImageSrcList(updatedImageSrcList);
      setFormData((prev) => ({
        ...prev,
        images: updatedImageSrcList,
      }));
      // console.log("formdata images", formData.images);
    }
  };

  const isUploadButtonDisabled = imageSrcList.length >= 5;

  return (
    <div className="flex flex-col items-center">
      {imageSrcList.length > 0 && (
        <Splide options={{ perPage: 1, pagination: true }} className="w-full">
          {imageSrcList.map((image, index) => (
            <SplideSlide
              key={`${image.src}-${index}`}
              className="w-full relative"
            >
              <img
                className="w-[85vw] h-[40vh] md:w-9/12 md:h-[65vh] object-cover rounded-lg pb-2"
                src={image.src}
                alt={`User input ${index + 1}`}
              />
              <button
                type="button"
                className="absolute top-[4vh] right-[16vw] xl:right-[8vw] bg-red-500 text-white rounded-full p-2 cursor-pointer"
                onClick={() => handleRemoveImage(image)}
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
            </SplideSlide>
          ))}
        </Splide>
      )}

      {imageSrcList.length === 0 && (
        <img
          className="w-56 rounded-full pb-2 object-cover h-56 md:scale-150"
          src={defaultImage}
          alt="User input"
        />
      )}

      <div className="flex flex-col items-center mt-8 mb-4">
        <label
          htmlFor="fileInput"
          className={`label-button-up rounded-3xl w-fit cursor-pointer px-4 py-2 text-lg md:text-xl xl:text-2xl md:mt-10 mb-2  ${
            isUploadButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          + Upload
        </label>
        {errors.images && (
          <div className="flex items-center text-red-500 text-xs mb-2">
            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
            <span>{errors.images}</span>
          </div>
        )}
        <span className="text-s text-gray-500 font-sunflower">
          {imageSrcList.length <= 4
            ? `${imageSrcList.length}/5 images uploaded`
            : "You’ve Reached The limit of 5 pictures."}
        </span>
      </div>

      <input
        name="images"
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        disabled={isUploadButtonDisabled}
      />
    </div>
  );
}

export default ImageMultipleInput;
