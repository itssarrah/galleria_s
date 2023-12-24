import React from "react";
import ProductCard from "../../components/product/ProductCard";
import Ratings from "../../components/product/Ratings";
import Reviews from "../../components/product/Reviews";
import Footer from "../../components/Footer";
import * as data from "./dummy-data";

// css
import "./product-page.css";
import ProductsContainer from "../../components/product/ProductsContainer";

const ProductPage = ({ id }) => {
  return (
    <>
      <div className="product-page py-5 px-10 md:py-8 md:px-10 xl:py-[8rem] xl:px-[10rem]">
        <ProductCard {...data.item} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Ratings ratings={data.ratings} />
          <Reviews title={data.title} reviews={data.reviews} />
        </div>
        <ProductsContainer products={data.products} />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
