const validateForm = (setIsFinishDisabled, t, formData, setErrors) => {
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
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    const invalidTypes = formData.images.some((image) => {
      if (image instanceof File && !allowedTypes.includes(image.type)) {
        return true; // Invalid file type
      }
      if (typeof image === "string") {
        // It's a path fetched from the backend, no need to validate type
        return false;
      }
      return false;
    });

    if (invalidTypes) {
      errorList.images =
        "Invalid image type. Allowed types: JPEG, PNG, JPG, GIF.";
    }

    // Validate image size
    const imageSizeLimit = 5 * 1024 * 1024; // 5MB in bytes
    const exceedsSize = formData.images.some((image) => {
      if (image instanceof File) {
        // It's an image added from the computer, check its size
        return image.size > imageSizeLimit;
      }
      return false; // Skip size validation for images fetched from backend
    });

    if (exceedsSize) {
      errorList.images = "Image size should be less than 5MB.";
    }
  }

  const productPrice = parseFloat(formData.product_price);
  const salePrice = parseFloat(formData.sale_price);

  if (isNaN(productPrice) || productPrice <= 100 || productPrice >= 99999) {
    errorList.product_price = "Product price should be between 100 and 99999.";
  }

  if (formData.sale_price) {
    // Check if sale_price is entered
    if (isNaN(salePrice) || salePrice <= 100 || salePrice >= 99999) {
      errorList.sale_price = "Sale price should be between 100 and 99999.";
    }

    if (
      !isNaN(productPrice) &&
      !isNaN(salePrice) &&
      productPrice <= salePrice
    ) {
      errorList.sale_price = "Sale price should be less than Product price.";
    }
  }

  setErrors(errorList);

  setIsFinishDisabled(Object.keys(errorList).length > 0);

  return Object.keys(errorList).length === 0;
};

export default validateForm;
