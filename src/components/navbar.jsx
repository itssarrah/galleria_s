import React, { useState } from "react";
import logo from "../assets/images/logo_typo.png";
import fixedLogo from "../assets/images/logo_nav_fixed.png";
import "../css/navbar.css";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

function ContributeBtn({ text, importance = "primary" }) {
  let classNames;
  switch (importance) {
    case "primary":
      classNames = "primary";
      break;
    case "secondary":
      classNames = "secondary";
      break;
    case "typed":
      classNames = "typed";
      break;
    default:
      classNames = "primary";
      break;
  }

  return (
    <button
      className={`basebtn text-sm md:text-base lg:text-2xl ${classNames}`}
    >
      {text}
    </button>
  );
}

function Nav() {
  let Links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Our Shops",
      link: "/",
    },
    {
      name: "About us",
      link: "/",
    },
  ];

  let [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = React.useState(false);
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
      className={`sm:flex-row flex items-start sm:items-center  pt-2 sm:px-8 sm:justify-between px-0 flex-col p-4 z-[100] ${
        isFixed ? "fixed top-0 bgnav sm:mt-0" : " "
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
        className={` sm:flex sm:items-center sm:pb-0 pb-12 sm:space-x-4 md:space-x-4 lg:space-x-16 absolute sm:static space-y-2  left-0 z-[10] w-full sm:w-auto sm:pl-0 pl-28 transition-all bg-white sm:bg-transparent duration-500 ease-in ${
          isOpen ? "top-[79px]" : "top-[-300px]"
        }`}
        hhkdfk
      >
        {Links.map((link) => (
          <li className="text-sm md:text-base lg:text-2xl nav__item">
            <a href="/">{link.name}</a>
          </li>
        ))}
        <li>
          <div className="sm:flex-col sm:gap-0 items-center flex-row gap-1 flex ">
            <FaGlobe />
            <h2 className="nav__txt">English</h2>
          </div>
        </li>
        <li>
          <div className={`flex flex-col-reverse sm:flex-row `}>
            <ContributeBtn importance="typed" text="Log In" />
            <ContributeBtn importance="primary" text="Contribute" />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export { Nav, ContributeBtn };
