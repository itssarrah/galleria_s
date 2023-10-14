import React from "react";
import ProductCard from "../../components/product/ProductCard";
import { Card } from "../../components/Landingpage";

// css
import "./product-page.css"

const ProductPage = ({ id }) => {
  return (
    <div className="product-page">
      <ProductCard/>
    </div>
  );
};

export default ProductPage;
