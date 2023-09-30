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
import Footer from "./Footer";
import { useTranslation, Trans } from "react-i18next";
import Faq from "react-faq-component";
import { useEffect, useState } from "react";

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
  const { t } = useTranslation("homepage");
  return (
    <div {...props}>
      <div className="pb-12">
        <h1 className="primary_txt">{t("shop_header")}</h1>
        <h2 className="secondary_txt">{t("shop_subheader")}</h2>
      </div>
      <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
        {t("category_production")} Cakes
        {/* <img
          className="category_asset"
          src="/images/categoryasset.png"
          alt="category asset"
        /> */}
      </h1>
      <ShopCardSlider />
      <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
        {t("category_production")} Accessories
        {/* <img
          className="category_asset"
          src="/images/categoryasset.png"
          alt="category asset"
        /> */}
      </h1>
      <ShopCardSlider />
      <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
        {t("category_production")} Embroidery
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
  const { t } = useTranslation("homepage");
  return (
    <div {...props}>
      <div className="pb-12">
        <h1 className="primary_txt">{t("items_header")}</h1>
        <h2 className="secondary_txt">{t("items_subheader")}</h2>
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
  const { t } = useTranslation("homepage");
  const { i18n } = useTranslation();
  console.log(
    "HEY SARRA THISIS THE TEXT UR LOOKIN FOR AND THIS IS THE INITIAL LANGUAGE :",
    i18n.language
  );

  return (
    <div
      className={`landingall w-full pt-4 px-10 justify-around items-center flex flex-col-reverse ${
        i18n.language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <img
        src={bgasset}
        alt="background"
        className={`landingbg right-0 ${
          i18n.language === "ar" ? "lg:left-0 lg:rotate-180" : "lg:right-0"
        } `}
      />
      <img
        src={bgasset}
        alt="background"
        className="landingbgmobile left-0 bottom-5 lg:hidden "
      />
      <div className="left_side w-10/12 md:w-1/2 space-y-6">
        <h1 className="left_Title  text-xl  sm:text-3xl  md:text-5xl md:leading-normal lg:text-6xl lg:leading-normal ">
          {t("hero_title")}
          <div className="txtoverlay w-36 sm:w-48 md:w-62 lg:w-72 lg:leading-4 "></div>
        </h1>

        <h1 className="slogan text-base sm:text-lg md:text-xl lg:text-3xl lg:py-4 py-0 text-center">
          {t("homepage:slogan")}
        </h1>
        <p className="landing_paragraph text-sm sm:text-base md:text-lg lg:text-2xl  lg:w-10/12">
          <Trans
            i18nKey="homepage:hero_desc_short"
            components={{ bold: <span className="font-bold" /> }}
          />
        </p>
        <div className="flex flex-col items-center">
          <Link to="/businessregistration">
            <ContributeBtn
              importance="primary"
              text={`${t("common:contribute_btn")} >>`}
            />
          </Link>
        </div>
      </div>
      <div className="right_side w-1/2">
        <img className="rightasset" src={rightasset} alt="right asset" />
      </div>
    </div>
  );
};

const LandingPageOfficial = () => {
  return (
    <>
      <Hero />
      <TrendingItems className="w-full px-10 pt-12" />
      <TrendingShops className="w-full px-10 pt-12 " />
      <Footer />
    </>
  );
};

function useData() {
  const { t } = useTranslation("homepage");
  return {
    rows: [
      {
        title: t("faq_q1"),
        content: t("faq_a1"),
      },
      {
        title: t("faq_q2"),
        content: t("faq_a2"),
      },
      {
        title: t("faq_q3"),
        content: t("faq_a3"),
      },
      {
        title: t("faq_q4"),
        content: t("faq_a4"),
      },
    ],
  };
}

const styles = {
  bgColor: "none",
  arrowColor: "white",
  rowContentPaddingBottom: "10px",
  rowContentPaddingLeft: "50px",
};
const config = {
  animate: true,
  tabFocus: true,
};
const Renderfaq = () => {
  const { t } = useTranslation("homepage");
  const data = useData();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const flexDirection =
    currentLanguage == "ar" ? "flex-row-reverse" : "flex-row";
  const textAlign = currentLanguage === "ar" ? "text-right" : "text-left";
  return (
    <>
      <div className="py-12 px-12 ">
        <h1 className={`primary_txt ${textAlign}`}>FAQ</h1>
        <h2 className={`secondary_txt ${textAlign}`}>{t("faq_subheader")}</h2>
      </div>
      <div className={`flex justify-around items-start ${flexDirection}`}>
        <Faq data={data} styles={styles} config={config} />
        <img className="w-4/12 hidden md:block" src="/images/ask.png" />
      </div>
    </>
  );
};

const TeamCard = ({ name, role, source }) => {
  return (
    <>
      <div className="flex flex-col items-center Team_container mx-auto my-8 mb-14">
        <img
          src={source}
          className="rounded-full w-[150px] h-[150px] avatar mt-12 object-cover"
        />
        <div className="eclipse_one"></div>
        <div className="eclipse_two"></div>
        <h1 className="feedback_txt md:text-5xl pt-4 text-4xl">{name}</h1>
        <h1 className="team_sub w-10/12 text-xl lg:text-2xl pt-2">{role}</h1>
      </div>
    </>
  );
};

const TeamSlider = () => {
  return (
    <>
      <Splide
        className="h-2/4 py-8 mx-auto"
        options={{
          type: "loop",
          perPage: 3,
          width: "80%",
          height: "50%",
          gap: "2rem",
          autoplay: true,
          interval: 3000,
          pauseOnHover: true,
          perMove: 1,
          speed: 4500,
          breakpoints: {
            1280: {
              perPage: 2,
              gap: "1rem",
            },
            1080: {
              type: "slide",
              focus: "center",
              pagination: true,
              autoplay: false,
              perPage: 1,
            },
            450: {
              width: "90%",
            },
          },
        }}
      >
        <SplideSlide>
          <TeamCard
            source="/images/oldme.png"
            name="Sarra Arab"
            role="Project Manager , Full-Stack Developer"
          />
        </SplideSlide>
         <SplideSlide>
          <TeamCard
            source="/images/amira.jpg"
            name="Amira Boudaoud"
            role="Backend Manager,Backend Developer"
          />
        </SplideSlide>
        <SplideSlide>
          <TeamCard
            source="/images/nes.jpg"
            name="Nessrine Abdelhak"
            role="Backend Developer"
          />
        </SplideSlide>
        <SplideSlide>
          <TeamCard
            source="/images/sarah.jpg"
            name="Sarah Mahmoudi"
            role="Backend Developer"
          />
        </SplideSlide>
        <SplideSlide>
          <TeamCard
            source="/images/hana.jpg"
            name="Hana Afra"
            role="Social Media Manager"
          />
        </SplideSlide>
        <SplideSlide>
          <TeamCard
            source="/images/lyes.jpeg"
            name="Elyas Hadjar"
            role="Design Manager"
          />
        </SplideSlide>
        <SplideSlide>
          <TeamCard
            source="/images/default.png"
            name="Djomana BenChabane"
            role="Documents Manager"
          />
        </SplideSlide>
       
        <SplideSlide>
          <TeamCard
            name="Larbi Said-Cheikh"
            role="Front-end Developer"
            source="/images/larvi.jpg"
          />
        </SplideSlide>
      </Splide>
    </>
  );
};

const Team = () => {
  const { t } = useTranslation("homepage");
  const { i18n } = useTranslation();

  return (
    <>
      <div className={`py-12 px-12 `}>
        <h1
          className={`primary_txt ${
            i18n.language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t("team_title")}
        </h1>
        <h2
          className={`secondary_txt ${
            i18n.language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t("team_subtitle")}
        </h2>
      </div>
      <TeamSlider />
    </>
  );
};

const LandingPage = () => {
  const { t } = useTranslation("homepage");
  return (
    <>
      <Hero />
      <h1 className="slogan text-base sm:text-lg md:text-2xl lg:text-4xl pt-8 text-center opacity-60">
        {t("title_coming")}
      </h1>
      <Renderfaq />
      <Team />
      <Footer />
    </>
  );
};

export { LandingPage, TrendingItems, Card };
