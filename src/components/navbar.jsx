import React from "react";
import logo from "../assets/images/logo_typo.png";
import fixedLogo from "../assets/images/logo_nav_fixed.png";
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

  const [topPosition, setTopPosition] = React.useState(0);
  const menuButtonRef = React.useRef(null);
  const handleMenuClick = () => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setTopPosition(rect.bottom + window.scrollY);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`sm:flex-row mt-2  sm:px-8 sm:justify-between sm:mx-0 mx-8 flex-col ${
          isFixed ? "fixed top-0 bgnav sm:mt-0" : " "
        }`}
      >
        <img
          className="sm:flex hidden"
          src={isFixed ? fixedLogo : logo}
          alt="Galleria logo"
        />
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

      <div
        className={` sm:hidden pt-2 px-8 w-full flex items-center justify-between  ${
          isFixed ? "fixed bgnav top-0 " : ""
        }`}
      >
        <img
          className="w-36"
          src={isFixed ? fixedLogo : logo}
          alt="Galleria logo"
        />
        <button
          ref={menuButtonRef}
          className="sm:hidden transition-opacity duration-300"
          onClick={handleMenuClick}
        >
          {isOpen ? (
            <FaTimes className="cursor-pointer" />
          ) : (
            <FaBars className="cursor-pointer" />
          )}
        </button>
      </div>

      <div
        style={{ top: `${topPosition}px` }}
        className={`sm:hidden mobile py-4 items-center flex flex-col space-y-4 ${
          isOpen ? "block" : "hidden"
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
  return (
    <nav
      className={`sm:flex-row pt-2  sm:px-8 sm:justify-between  px-0 flex-col bg-white`}
    >
      <img className="sm:flex " src={logo} alt="Galleria logo" />
      <ul className="sm:flex-row flex sm:space-x-16 md:space-x-4  flex-col">
        {Links.map((link) => (
          <li className="text-sm md:text-base lg:text-2xl nav__item">
            <a href="/">{link.name}</a>
          </li>
        ))}
        <div className="nav__languages sm:flex ">
          <FaGlobe />
          <h2 className="nav__txt">English</h2>
        </div>
        <div className={`nav__btns sm:flex `}>
          <ContributeBtn importance="typed" text="Log In" />
          <ContributeBtn importance="primary" text="Contribute" />
        </div>
      </ul>
    </nav>
  );
}

export { Navbar, Nav, ContributeBtn };
