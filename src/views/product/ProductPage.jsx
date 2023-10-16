import React from "react";
import ProductCard from "../../components/product/ProductCard";
import SuggestedProducts from "../../components/product/SuggestedProducts";
import Ratings from "../../components/product/Ratings";
import Reviews from "../../components/product/Reviews";
import Footer from "../../components/Footer";

// css
import "./product-page.css";

const ProductPage = ({ id }) => {
  return (
    <>
      <div className="product-page">
        <ProductCard />
        <div className="grid grid-cols-2 gap-6">
          <Ratings />
          <Reviews />
        </div>
        <SuggestedProducts />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
