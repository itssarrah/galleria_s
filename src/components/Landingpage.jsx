import React from "react";
import { Link } from "react-router-dom";
import "../css/Landingpage.css";
import { ContributeBtn } from "./navbar";
import bgasset from "../assets/images/landingpage_asset2.png";
import rightasset from "../assets/images/landingpage_asset1.png";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { MdLocationOn, MdLocalPhone, MdStar } from "react-icons/md";
import logofull from "../assets/images/logo_full.png";
import { MdEmail } from "react-icons/md";

import { FaInstagram, FaTiktok } from "react-icons/fa";

const Card = ({
  itemUrl = "/images/carditem.png",
  sellerUrl = "/images/cardseller.png",
  title = "Pink Hapiness",
  basePrice = "1000.00",
  salePrice = "500.00",
  isOnSale = true,
  isLiked = false,
  seller = "SweetyPie",
}) => {
  const discountPercentage = isOnSale
    ? Math.round((1 - parseFloat(salePrice) / parseFloat(basePrice)) * 100)
    : 0;
  return (
    <div className="min-h-full relative w-32 sm:w-44 md:w-56 lg:w-64 h-full">
      <div className="cardcontainer">
        <img src={itemUrl} alt="Item" className="rounded-3xl px-2 py-2" />
        {isOnSale && (
          <img
            src="/images/cardasset1.png"
            alt="asset"
            className="absolute  cardasset"
          />
        )}
        {isOnSale && (
          <h1 className="absolute cardtxt">-{discountPercentage}%</h1>
        )}
        <div className="flex w-full justify-between px-2">
          <div>
            <h1 className="item_title text-sm md:text-base lg:text-lg">
              {title}
            </h1>
            <div className="flex space-x-2">
              <h1
                className={`${
                  isOnSale ? "sale_price" : "base_price"
                } text-xs md:text-base lg:text-lg`}
              >
                {basePrice} DA
              </h1>
              {isOnSale && (
                <h1 className="new_price text-xs md:text-base lg:text-lg">
                  {salePrice} DA
                </h1>
              )}
            </div>
          </div>
          {isLiked ? (
            <MdFavorite className="heart text-3xl" />
          ) : (
            <MdFavoriteBorder className="heart text-3xl " />
          )}
        </div>
      </div>
      <div className="circle w-full h-full">
        <h1 className="text-xs sm:text-sm md:text-base lg:text-lg px-2">By</h1>
        <div className="pb-4">
          <img
            alt="seller image"
            src={sellerUrl}
            className="w-8 h-8 rounded-full sm:w-10 sm:h-10 md:w-16 lg:w-24 md:h-16 lg:h-24 mx-auto"
          />
          <h1 className="seller_txt text-xs sm:text-sm md:text-base lg:text-lg text-center	">
            {seller}
          </h1>
        </div>
      </div>
    </div>
  );
};

const ShopCard = ({
  imageUrl = "https://i.pinimg.com/236x/54/bb/7f/54bb7f2ceeeef406e9ab2ac08ac549d7.jpg",
  title = "Bloom Perfume",
  likes = 233,
  isLiked = false,
  location = "Bejaia",
  phoneNumber = "5 56 78 99 17",
  rating = "4.2",
}) => {
  return (
    <>
      <div className="cursor-pointer shopcardcontainer w-44 md:w-52 lg:w-56 rounded-b-3xl rounded-t-lg relative">
        <img className="shopimg rounded-t-lg" src={imageUrl} alt="Shop Image" />
        <div>
          <div className="shopinfo rounded-b-3xl flex w-full px-2 justify-between pt-2 items-center">
            <h1 className="shopname text-sm md:text-base lg:text-lg">
              {title}
            </h1>
            <div>
              {isLiked ? (
                <MdFavorite className="shopheart text-3xl" />
              ) : (
                <MdFavoriteBorder className="shopheart text-3xl " />
              )}
              <h1 className="shoplikes text-sm md:text-base lg:text-lg font-bold">
                {likes}
              </h1>
            </div>
          </div>
          <div className="additional-text space-y-2 ">
            <div className="w-full flex items-center">
              <MdLocationOn className="shopicon text-3xl" />
              <h1>{location}</h1>
            </div>
            <div className="w-full flex items-center">
              <MdLocalPhone className="shopicon text-3xl" />
              <h1>+213{phoneNumber}</h1>
            </div>
            <div className="w-full flex items-center">
              <MdStar className="shopicon text-3xl" />
              {rating} out of 5
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ShopCardSlider = () => {
  return (
    <Splide
      className="h-2/4 py-8"
      options={{
        type: "loop",
        perPage: 7, // Number of cards shown at once. Adjust as needed.
        width: "100%",
        height: "50%",
        gap: "0.2rem",
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 1000,
        pauseOnHover: true,
        perMove: 1,
        speed: 2500,
        breakpoints: {
          1280: {
            perPage: 4,
            gap: "1rem",
          },
          1024: {
            perPage: 3,
            gap: "1rem",
          },
          640: {
            perPage: 2,
            gap: "1rem",
          },
          435: {
            type: "slide",
            arrows: true,
            focus: "center",
            pagination: true,
            autoplay: false,
            perPage: 1,
          },
          768: {
            perPage: 3,
            gap: "1rem",
          },
          1536: {
            perPage: 5,
            gap: "1rem",
          },
          1720: {
            perPage: 6,
            gap: "1rem",
          },
        },
      }}
    >
      <SplideSlide>
        <ShopCard />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/ed/6a/fe/ed6afed9777848d32e6cd3978dd93076.jpg"
          title="Cindy CO."
          likes="1120"
          location="Tizi Ouzou"
          rating="4.9"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/8e/32/51/8e3251968c24c0ef5dfaf75c202d8eac.jpg"
          title="FIRERA."
          likes="8.9k"
          location="Algiers"
          rating="4.7"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/48/b9/64/48b9641a1d013c03b9837d299f177361.jpg"
          title="CafeCihno"
          likes="81k"
          location="Algiers"
          rating="3.7"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/6d/19/97/6d1997b88c28e663f236a26a527c65fe.jpg"
          title="Doce Magia"
          likes="1.3k"
          location="Oran"
          rating="4.7"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/6b/ad/48/6bad4859c63872911d751a58f23f4e7b.jpg"
          title="Papa's Cupcakeria"
          likes="199"
          location="Bejaia"
          rating="4.0"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/11/28/4c/11284cffedf0139adc3a570d0b310b0f.jpg"
          title="MariCrochet"
          likes="6.8k"
          location="Mostaghanem"
          rating="4.5"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/bc/b9/d4/bcb9d4ff55d46eb1a415e3c9eb8ceb13.jpg"
          title="Luna's Planners"
          likes="98k"
          location="Medea"
          rating="5.0"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl="https://i.pinimg.com/236x/43/ea/f2/43eaf210081a41c4863c9897d6aa6601.jpg"
          title="Goovy Store"
          likes="18k"
          location="Jijel"
          rating="4.1"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl=" https://i.pinimg.com/236x/4a/04/b9/4a04b9584a49eb21f33c52022655d2cc.jpg"
          title="Bouquet."
          likes="13k"
          rating="4.9"
        />
      </SplideSlide>
      <SplideSlide>
        <ShopCard
          imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
          title="Adelia co."
          likes="123k"
          rating="4.7"
        />
      </SplideSlide>
    </Splide>
  );
};

const TrendingShops = (props) => {
  return (
    <div {...props}>
      <div className="pb-12">
        <h1 className="primary_txt">Trending Shops:</h1>
        <h2 className="secondary_txt">Top #3 trending categories this week:</h2>
      </div>
      <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
        For Cakes
        {/* <img
          className="category_asset"
          src="/images/categoryasset.png"
          alt="category asset"
        /> */}
      </h1>
      <ShopCardSlider />
      <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
        For Accessories
        {/* <img
          className="category_asset"
          src="/images/categoryasset.png"
          alt="category asset"
        /> */}
      </h1>
      <ShopCardSlider />
      <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
        For Embroidery
        {/* <img
          className="category_asset"
          src="/images/categoryasset.png"
          alt="category asset"
        /> */}
      </h1>
      <ShopCardSlider />
    </div>
  );
};

const TrendingItems = (props) => {
  return (
    <div {...props}>
      <div className="pb-12">
        <h1 className="primary_txt">Trending Items:</h1>
        <h2 className="secondary_txt">This week's best sellers :</h2>
      </div>
      <Splide
        className="mx-auto "
        options={{
          type: "loop",
          gap: "1rem",
          width: "75%",
          perPage: 4,
          perMove: 1,
          autoplay: true,
          interval: 2000,
          pauseOnHover: true,
          speed: 2500,
          breakpoints: {
            640: {
              perPage: 2,
              autoplay: false,
              width: "100%",
            },
            1280: {
              perPage: 2,
            },
            1440: {
              perPage: 3,
            },
            435: {
              perPage: 1,
              gap: "0.1rem",
            },
          },
        }}
      >
        <SplideSlide className="flex justify-center items-center h-full">
          <Card
            itemUrl="https://i.pinimg.com/236x/15/9f/fe/159ffe8950c40cf3772ea9aaa2b4707a.jpg"
            sellerUrl="https://i.pinimg.com/236x/c9/2f/f8/c92ff81bf52804cd4adbe0f36ae519e7.jpg"
            title="Beige combo"
            basePrice="970.00"
            isOnSale={false}
            isLiked={false}
            seller="CozyJewels"
          />
        </SplideSlide>
        <SplideSlide className="flex justify-center items-center h-full">
          <Card
            itemUrl="https://i.pinimg.com/236x/d3/79/e1/d379e14e2be8b11ffb8981e555b04dbb.jpg"
            sellerUrl="https://i.pinimg.com/236x/c9/2f/f8/c92ff81bf52804cd4adbe0f36ae519e7.jpg"
            title="Sunnies trio"
            basePrice="2970.00"
            salePrice="2500.00"
            isOnSale={true}
            isLiked={true}
            seller="CozyJewels"
          />
        </SplideSlide>
        <SplideSlide className="flex justify-center items-center h-full">
          <Card
            itemUrl="https://i.pinimg.com/236x/b7/4e/ff/b74efffdbede2e482cad12bed2d9a75a.jpg"
            sellerUrl="https://i.pinimg.com/236x/7f/ea/4c/7fea4c8cd25ec60d360a927ddf45290f.jpg"
            title="Butterfly heaven"
            basePrice="990.00"
            isOnSale={false}
            isLiked={true}
            seller="Heavenly"
          />
        </SplideSlide>
        <SplideSlide className="flex justify-center items-center h-full">
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
        </SplideSlide>
        <SplideSlide className="flex justify-center items-center h-full">
          <Card />
        </SplideSlide>
      </Splide>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="landingall w-full pt-4 px-10 flex flex-col-reverse justify-around items-center lg:flex-row">
      <img
        src={bgasset}
        alt="background"
        className="landingbg right-0 lg:right-0 "
      />
      <img
        src={bgasset}
        alt="background"
        className="landingbgmobile left-0 bottom-5 lg:hidden "
      />
      <div className="left_side w-1/2 space-y-6">
        <h1 className="left_Title leading-10 text-2xl  sm:text-3xl  md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal ">
          Your Gallery Of Algerian Artisans & Small Businesses
          <div className="txtoverlay w-36 sm:w-48 md:w-62 lg:w-72 lg:leading-4 "></div>
        </h1>

        <p className="landing_paragraph text-sm sm:text-base md:text-lg lg:text-2xl hidden 2xl:block">
          At Galleria, we deeply value the role of small businesses in Algeria.
          Our mission to <span className="font-bold">unite</span> them under one
          digital roof ! providing a dedicated platform where their diverse
          offerings can be showcased to the world. We're committed to supporting
          and uplifting the Algerian entrepreneurial spirit, ensuring that every
          small business gets the <span className="font-bold">visibility </span>
          it deserves.
        </p>
        <p className="landing_paragraph text-sm sm:text-base md:text-lg lg:text-xl  2xl:hidden">
          At Galleria, we deeply value the role of small businesses in Algeria.
          Our mission to <span className="font-bold">unite</span> them under one
          digital roof !
        </p>
        <div className="flex flex-col items-center">
          <Link to="/businessregistration">
            <ContributeBtn importance="primary" text="Contribute >>" />
          </Link>
        </div>
      </div>
      <div className="right_side w-1/2">
        <img className="rightasset" src={rightasset} alt="right asset" />
      </div>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div className="footer w-full relative space-y-4 pt-12">
      <div className="flex flex-col items-center justify-around feedback_box py-4 px-2 w-1/2 lg:w-1/3 h-44 lg:h-72 xl:h-80 bg-white rounded-2xl mx-auto">
        <div>
          <h1 className="feedback_txt text-base md:text-lg lg:text-2xl xl:text-4xl">
            Feedback
          </h1>
          <h1 className="feedback_subtxt text-xs md:text-base lg:text-lg xl:text-2xl">
            How was your experience ?
          </h1>
        </div>
        <input
          type="text"
          placeholder="it was amazing .."
          className="input_txt p-4  lg:p-8 w-11/12 h-4"
        />
        <ContributeBtn text="Send" importance="secondary" />
      </div>
      <div className="footer_overlay items-center flex flex-col md:flex-row md:justify-around w-full">
        <img
          src={logofull}
          alt="logo full"
          className="p-8 h-60 w-full md:w-1/4 object-contain lg:h-96"
        />
        <div className="flex flex-col md:flex-row md:justify-around w-full">
          <div className="about space-y-4 px-4 flex flex-col items-center md:w-1/4">
            <h1 className="footer_header text-xl md:text-2xl lg:text-3xl ">
              About us
            </h1>
            <p className="footer_txt text-lg md:text-sm lg:text-lg xl:text-2xl">
              Galleria or معرضي is a digital platform that aims to gather
              Algeria’s small businesses in one aesthetic place where one can
              shop peacfuly !
            </p>
          </div>
          <div className="contact space-y-4 md:w-1/4 px-4 flex flex-col items-center">
            <h1 className="footer_header text-xl md:text-2xl lg:text-3xl">
              Contact
            </h1>
            <div className="flex">
              <MdEmail size={32} className="heart" />
              <h1 className="footer_txt text-base md:text-lg lg:text-2xl">
                galleria@support.dz
              </h1>
            </div>
          </div>
          <div className="follow space-y-4 md:w-1/4 px-4 flex flex-col items-center">
            <h1 className="footer_header text-xl md:text-2xl lg:text-3xl">
              Follow us
            </h1>
            <div className="flex gap-2">
              <a
                className="hover:scale-110 transition-transform duration-300"
                href="#"
              >
                <FaInstagram size={32} className="heart " />
              </a>
              <a
                className="hover:scale-110 transition-transform duration-300"
                href="#"
              >
                <FaTiktok size={32} className="heart " />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <Hero />
      <TrendingItems className="w-full px-10 pt-12" />
      <TrendingShops className="w-full px-10 pt-12 " />
      <Footer />
    </>
  );
};

export { LandingPage, TrendingItems, Card };
