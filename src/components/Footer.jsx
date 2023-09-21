import React from "react";
import logofull from "../assets/images/logo_full.png";
import { MdEmail } from "react-icons/md";
import { ContributeBtn } from "./navbar";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = (props) => {
  const { t } = useTranslation("footer");
  return (
    <div id="footer" className="footer w-full relative space-y-4 pt-12">
      <div className="flex flex-col items-center justify-around feedback_box py-4 px-2 w-1/2 lg:w-1/3 h-44 lg:h-72 xl:h-80 bg-white rounded-2xl mx-auto">
        <div>
          <h1 className="feedback_txt text-base md:text-lg lg:text-2xl xl:text-4xl">
            {t("fbk_title")}
          </h1>
          <h1 className="feedback_subtxt text-xs md:text-base lg:text-lg xl:text-2xl">
            {t("fbk_subtitle")}
          </h1>
        </div>
        <input
          type="text"
          placeholder={t("fbk_placeholder")}
          className="input_txt p-4  lg:p-8 w-11/12 h-4"
        />
        <ContributeBtn text={t("fbk_btn")} importance="secondary" />
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
              {t("abt_title")}
            </h1>
            <p className="footer_txt text-lg md:text-sm lg:text-lg xl:text-2xl">
              {t("abt_desc")}
            </p>
          </div>
          <div className="contact space-y-4 md:w-1/4 px-4 flex flex-col items-center">
            <h1 className="footer_header text-xl md:text-2xl lg:text-3xl">
              {t("contact_title")}
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
              {t("follow_title")}
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

export default Footer;
