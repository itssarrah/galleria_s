import React from "react";
import "../css/Landingpage.css";
import "../css/auth.css";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const ComingSoon = () => {
  const { t } = useTranslation("auth");
  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center">
        <img
          src="/images/undercs.png"
          alt="under construction"
          className="w-6/12 md:w-4/12 lg:w-3/12"
        />
        <h1 className="primary_txt text-base md:text2xl lg:text-4xl h-[40px]">
          {t("under_dev")}
        </h1>
        <div className=" pt-2 md:pt-4">
          <h1 className="flex auth_header text-base md:text-3xl">
            {t("success_follow")}
          </h1>
          <div className="flex gap-2 md:gap-8">
            <a
              href="https://www.instagram.com/ma3ridy.dz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="heart md:w-12 md:h-12 w-7 h-7" />
            </a>
            <a
              href="https://www.tiktok.com/@galleria_ma3ridy?_t=8fcmZiJ7W9V&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="heart md:w-12 md:h-12 w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
