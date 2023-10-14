import React from "react";
import ProductCard from "../../components/product/ProductCard";
import SuggestedProducts from "../../components/product/SuggestedProducts";

// css
import "./product-page.css";

const ProductPage = ({ id }) => {
  return (
    <div className="product-page">
      <ProductCard />
      <SuggestedProducts />
    </div>
  );
};

export default ProductPage;
