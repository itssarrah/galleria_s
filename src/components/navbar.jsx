import React, { useState } from "react";
import logo from "../assets/images/logo_typo.png";
import fixedLogo from "../assets/images/logo_nav_fixed.png";
import "../css/navbar.css";
import { FaGlobe } from "react-icons/fa";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function ContributeBtn({ text, importance = "primary", onClick }) {
  let classNames;
  switch (importance) {
    case "primary":
      classNames = "primary bg-primary";
      break;
    case "secondary":
      classNames = "secondary";
      break;
    case "typed":
      classNames = "typed";
      break;
    default:
      classNames = "primary bg-primary";
      break;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`basebtn text-sm md:text-base lg:text-2xl ${classNames}`}
    >
      {text}
    </button>
  );
}

function Nav() {
  const { t } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };
  const { i18n } = useTranslation();

  let Links = [
    {
      name: t("home_link"),
      link: "/",
    },
    {
      name: t("shop_link"),
      link: "/shop",
    },
    {
      name: t("About_link"),
      link: "/#footer",
    },
  ];

  let [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = React.useState(false);
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/businessregistration";

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 350) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex ${
        i18n.language === "ar" ? "sm:flex-row-reverse" : "sm:flex-row"
      } items-start sm:items-center  pt-2 sm:px-8 sm:justify-between px-0 flex-col p-4 z-[100] ${
        !isRegistrationPage && isFixed ? "fixed top-0 bgnav sm:mt-0" : " "
      } ${isOpen ? "bg-white" : ""}`}
    >
      <img
        className="sm:w-42 pl-4 sm:pl-0 z-[100] md:w-48 w-36"
        src={isFixed || isOpen ? fixedLogo : logo}
        alt="Galleria logo"
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 h-7 z-[100] absolute right-8 top-6 cursor-pointer sm:hidden"
      >
        {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
      </div>
      <ul
        className={` sm:flex ${
          i18n.language === "ar" ? "sm:flex-row-reverse" : "sm:flex-row"
        } sm:space-y-0 sm:items-center sm:pb-0 pb-12 sm:space-x-4 md:space-x-4 lg:space-x-20 absolute sm:static space-y-2  left-0  w-full sm:w-auto sm:pl-0 pl-28 transition-all bg-white sm:bg-transparent duration-500 ease-in ${
          isOpen ? "top-[79px]" : "top-[-300px] "
        }`}
      >
        {/* {Links.map((link) => (
          <li className="text-sm md:text-base lg:text-2xl nav__item pr-8 text-center">
            <NavLink to={link.link} activeClassName="active-link">
              {link.name}
            </NavLink>
          </li>
        ))} */}
        {Links.map((link) => (
    <li
        key={link.name}  // It's good practice to add a 'key' prop when mapping over elements
        className={`text-sm md:text-base lg:text-2xl nav__item ${
            location.pathname === link.link ? "active-link" : ""
        }`}
    >
        <Link to={link.link}>{link.name}</Link>
    </li>
))}


        <li>
          <div className="sm:flex-col sm:gap-[0.25rem] items-center flex-row gap-1 flex ">
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
        </li>
        <li>
          <div className={`flex flex-col-reverse sm:flex-row `}>
{/*             <ContributeBtn importance="typed" text={t("log_btn")} /> */}
            <Link to="/businessregistration">
              <ContributeBtn importance="primary" text={t("contribute_btn")} />
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export { Nav, ContributeBtn };
