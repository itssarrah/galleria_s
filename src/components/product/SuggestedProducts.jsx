import React from "react";
import { useState } from "react";
import { Card } from "../Landingpage";
import { Link } from "react-router-dom";

import "./product.css";

const SuggestedProducts = ({
  products = [
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
    {
      itemUrl: "/images/carditem.png",
      sellerUrl: "/images/cardseller.png",
      title: "Random Product",
      basePrice: "1000",
      salePrice: "999",
      isOnSale: true,
      isLiked: true,
      seller: "Now you see me",
    },
  ],
}) => {
  const productsCount = products.length;
  const [maxProductDisplay, setMaxProductDisplay] = useState(8);

  return (
    <div className="flex flex-col justify-center align-center">
      <div>
        <h2 className="product-title pb-5">Browse some more : </h2>
        <div className="cards-grid">
          {products.slice(0, maxProductDisplay).map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </div>
      </div>

      {productsCount > maxProductDisplay && (
        <Link
          className="block w-full text-center p-3 link"
          onClick={() =>
            setMaxProductDisplay((prevMax) =>
              Math.min(productsCount, prevMax * 2)
            )
          }
        >
          Load More
        </Link>
      )}
    </div>
  );
};

export default SuggestedProducts;
