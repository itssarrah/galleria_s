import React from "react";
import logo from "../assets/images/logo_typo.png";
import "../css/navbar.css";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";

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

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  let active = "text-3xl";
  return (
    <>
      <nav className="sm:flex-row mt-2 sm:justify-between mx-8 flex-col">
        <img className="sm:flex hidden" src={logo} alt="Galleria logo" />
        <ul className="sm:flex hidden">
          <a href="#">
            <li className="text-sm md:text-base lg:text-3xl nav__item">Home</li>
          </a>
          <a href="#">
            <li className="text-sm md:text-base lg:text-2xl nav__item">
              Our Shops
            </li>
          </a>
          <a href="#">
            <li className="text-sm md:text-base lg:text-2xl nav__item">
              About us
            </li>
          </a>
        </ul>
        <div className="nav__languages sm:flex hidden">
          <FaGlobe />
          <h2 className="nav__txt">English</h2>
        </div>
        <div className={`nav__btns sm:flex hidden`}>
          <ContributeBtn importance="typed" text="Log In" />
          <ContributeBtn importance="primary" text="Contribute" />
        </div>
      </nav>

      <div className="sm:hidden mt-2 mx-8 flex items-center justify-between">
        <img className="w-36" src={logo} alt="Galleria logo" />
        <button
          className="sm:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="cursor-pointer" />
          ) : (
            <FaBars className="cursor-pointer" />
          )}
        </button>
      </div>
      <div
        className={`sm:hidden mobile py-4 items-center flex flex-col space-y-4 ${
          isOpen ? "block" : ""
        }`}
      >
        <ul className="flex flex-col h-24 justify-between ">
          <a href="#">
            <li className="text-lg nav__item">Home</li>
          </a>
          <a href="#">
            <li className="text-lg nav__item">Our Shops</li>
          </a>
          <a href="#">
            <li className="text-lg nav__item">About us</li>
          </a>
        </ul>
        <div className="flex items-center space-x-2">
          <FaGlobe />
          <h2 className="nav__txt">English</h2>
        </div>
        <div className="flex flex-col-reverse">
          <ContributeBtn importance="typed" text="Log In" />
          <ContributeBtn importance="primary" text="Contribute" />
        </div>
      </div>
    </>
  );
}

export { Navbar, ContributeBtn };
