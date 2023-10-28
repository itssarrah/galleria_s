import React from "react";
import logofull from "../../assets/images/logo_typo.png";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/auth.css";
function Choice() {
  const { t } = useTranslation("auth");
  const { i18n } = useTranslation();
  const changeLanguage = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };
  return (
    <>
      <div className="flex justify-around">
        <Link to="/">
          <img
            className="my-4 sm:w-42 md:pl-4 pl-0 sm:pl-0 z-[100] md:w-56 w-36 md:mx-auto mx-0 cursor-pointer"
            src={logofull}
            alt="Galleria logo"
          />
        </Link>

        <div className="md:mx-4 mx-0 md:mr-20 mr-2 my-8 sm:gap-[0.25rem] items-center flex-col gap-1 flex ">
          <FaGlobe />
          <select
            className="nav__txt bg-transparent cursor-pointer outline-none"
            onChange={changeLanguage}
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>
      <div className="choice text-center my-12">{t("Choice_title")}</div>
      <div className="text-black font-sunflower opacity-50 text-center my-0 md:my-2">
        {t("Choice_sub")}
      </div>
      <div className="w-screen h-fit flex items-center gap-6 md:gap-0 md:justify-around mt-8 flex-col md:flex-row">
        <Link to="/businessregistration">
          <div className="bg-white circle-left rounded-[100%] xl:w-[35rem] xl:h-[35rem] lg:w-[30rem] lg:h-[30rem] md:w-[25rem] md:h-[25rem] w-[15rem] h-[15rem]  cursor-pointer relative  transform transition-transform duration-300 hover:scale-105">
            <div className=" h-[2rem] md:h-[3.5rem] w-[95%] rounded   absolute bottom-[30%] left-[3%] flex items-center justify-center">
              <div className="w-full h-full bg-black opacity-40 absolute  "></div>
              <h1 className="text-bold text-white font-sofia text-base md:text-4xl absolute py-2 ">
                {t("biz_acc")}
              </h1>
            </div>
          </div>
        </Link>
        <Link to="/userregistration">
          <div className="bg-white circle-right rounded-[100%] xl:w-[35rem] xl:h-[35rem] lg:w-[30rem] lg:h-[30rem] md:w-[25rem] md:h-[25rem] w-[15rem] h-[15rem] cursor-pointer relative  transform transition-transform duration-300 hover:scale-105">
            <div className=" h-[2rem] md:h-[3.5rem] w-[95%] rounded   absolute bottom-[30%] left-[3%] flex items-center justify-center">
              <div className="w-full h-full bg-black opacity-40 absolute  "></div>
              <h1 className="text-bold text-white font-sofia text-base md:text-4xl absolute py-2 ">
                {t("customer_acc")}
              </h1>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Choice;
