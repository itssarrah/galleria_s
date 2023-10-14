import React from "react";
import { useState } from "react";
import { Card } from "../Landingpage";
import { Link } from "react-router-dom";

import "./product.css";
import { min } from "date-fns";

const SuggestedProducts = ({
  products = [
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/",
      sellerUrl: "/",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
    {
      itemUrl: "/images/carditem.png",
      sellerUrl: "/images/cardseller.png",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Anonymous",
    },
  ],
}) => {
  const productsCount = products.length;
  const [maxProductDisplay, setMaxProductDisplay] = useState(8);

  // TODO: fix cards' height

  return (
    <>
      <div className="cards-container">
        {products.slice(0, 8).map((product, index) => (
          <div>
            <Card key={index} {...products} />
          </div>
        ))}
      </div>
      {productsCount > maxProductDisplay && (
        <Link
          onClick={() =>
            setMaxProductDisplay((prevMax) => min(productsCount, prevMax * 2))
          }
        >
          Load More
        </Link>
      )}
    </>
  );
};

export default SuggestedProducts;
