import React from "react";
import ProductCard from "../../components/product/ProductCard";
import SuggestedProducts from "../../components/product/SuggestedProducts";
import Ratings from "../../components/product/Ratings";
import Reviews from "../../components/product/Reviews";
import ReviewCard from "../../components/reviews/ReviewCard";
import Footer from "../../components/Footer";
import * as data from "./dummy-data";

// css
import "./product-page.css";

const ProductPage = ({ id }) => {
  return (
    <>
      <div className="product-page py-5 px-10 md:py-8 md:px-10 xl:py-[8rem] xl:px-[10rem]">
        <ProductCard {...data.item} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Ratings ratings={data.ratings} />
          <Reviews title={data.title} reviews={data.reviews} />
        </div>
        <SuggestedProducts products={data.products} />

        <div className="grid grid-cols-1 bg-white gap-3 lg:grid-cols-2">
          {[...Array(8)].map((_) => (
            <ReviewCard />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
