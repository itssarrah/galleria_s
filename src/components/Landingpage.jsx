import React from "react";
import { Link } from "react-router-dom";
import "../css/Landingpage.css";
import { ContributeBtn } from "./navbar";
import bgasset from "../assets/images/landingpage_asset2.png";
import rightasset from "../assets/images/landingpage_asset1.png";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { useTranslation, Trans } from "react-i18next";
import Faq from "react-faq-component";

import TeamCard from "./cards/TeamCard";

import { TrendingItems } from "./Landing/TrendingItems";
import TrendingShops from "./Landing/TrendingShops";

const Hero = () => {
  const { t } = useTranslation("homepage");
  const { i18n } = useTranslation();

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
      <div className="pb-12 px-10">
        <h1 className="primary_txt">{t("items_header")}</h1>
        <h2 className="secondary_txt">{t("items_subheader")}</h2>
      </div>
      <TrendingItems />
      <div className="pb-12 px-10 pt-12">
        <h1 className="primary_txt">{t("shop_header")}</h1>
        <h2 className="secondary_txt">{t("shop_subheader")}</h2>
      </div>
      <TrendingShops className="w-full px-10 pt-12 " />
      <Renderfaq />
      {/* <Team /> */}
    </>
  );
};

export { LandingPage };
