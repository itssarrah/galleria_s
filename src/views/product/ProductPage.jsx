import React from "react";
import { useQuery } from "react-query";
import ProductCard from "../../components/product/ProductCard";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import "./product-page.css";
import * as data from "./dummy-data";
import Ratings from "../../components/product/Ratings";
import Reviews from "../../components/product/Reviews";

const fetchProduct = async (productId) => {
  const response = await fetch(`${BACKEND_URL}api/product/${productId}`);
  if (!response.ok) {
    throw new Error("Error fetching product data");
  }
  const data = await response.json();
  console.log("Product Data:", data);
  return data.data;
};

const ProductPage = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["product", productId], () => fetchProduct(productId), {
    enabled: !!productId,
    staleTime: 10000, // 10 seconds stale time
  });

  if (isError) {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <h1>Loading..</h1>
      </>
    );
  }

  return (
    <>
      <div className="product-page py-5 px-10 md:py-8 md:px-10 xl:py-[8rem] xl:px-[10rem]">
        {product && product.images && product.images.length > 0 && (
          <ProductCard
            productId={product.id}
            itemUrl={`${BACKEND_URL}storage/${product.images[0].url}`}
            sellerUrl={`${BACKEND_URL}storage/${product.business.image}`}
            title={product.product_name}
            salePrice={product.sale_price}
            productPrice={product.product_price}
            isOnSale={
              parseFloat(product.sale_price) < parseFloat(product.product_price)
            }
            images={product.images}
            description={product.product_description}
            location={product.business.wilaya.name}
            phoneNumber={product.business.phone}
            seller={product.business.businessname}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Ratings ratings={data.ratings} />
          <Reviews title={data.title} reviews={data.reviews} />
        </div>
        {/* <ProductsContainer products={data.products} /> */}
      </div>
    </>
  );
};

export default ProductPage;
