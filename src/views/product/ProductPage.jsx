import React from "react";
import ProductCard from "../../components/product/ProductCard";
import SuggestedProducts from "../../components/product/SuggestedProducts";
import Rating from "../../components/product/Rating";

// css
import "./product-page.css";

const ProductPage = ({ id }) => {
  return (
    <div className="product-page">
      <ProductCard />
      <SuggestedProducts />
      <Rating/>
    </div>
  );
};

export default ProductPage;
