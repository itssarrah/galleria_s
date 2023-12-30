import React, { useState, useEffect } from "react";
import Stars from "../Stars";

// css
import "./review-card.css";
import { useTranslation } from "react-i18next";

const textSizes = {
  600: 162,
  768: 300,
  1200: 162,
  1536: 300,
  1920: 500,
};

const ReviewCard = ({
  title = "Green Poetry Set 4 argile pieces 1lb",
  image = "/images/argile-pieces.png",
  seller = "PottyPot",
  price = 1000,
  stars = 4,
  description = "Et est quae aspernatur commodi officiis sit consectetur sint maxime. Nisi et quis aperiam commodi quis accusamus ipsam. Aut suscipit adipisci quisquam quasi quasi laboriosam explicabo voluptatem. Aliquam illum qui voluptate consequatur maxime a ullam. Eveniet eum nihil possimus sint et numquam. Voluptas quia rem sit.Et est quae aspernatur commodi officiis sit consectetur sint maxime. Nisi et quis aperiam commodi quis accusamus ipsam. Aut suscipit adipisci quisquam quasi quasi laboriosam explicabo voluptatem. Aliquam illum qui voluptate consequatur maxime a ullam. Eveniet eum nihil possimus sint et numquam. Voluptas quia rem sit.Et est quae aspernatur commodi officiis sit consectetur sint maxime. Nisi et quis aperiam commodi quis accusamus ipsam. Aut suscipit adipisci quisquam quasi quasi laboriosam explicabo voluptatem. Aliquam illum qui voluptate consequatur maxime a ullam. Eveniet eum nihil possimus sint et numquam. Voluptas quia rem sit.",
  date = new Date(Date.now()).toLocaleDateString("fr-FR"),
}) => {
  const { t } = useTranslation("product");
  const [size, setSize] = useState();
  const [showFullText, setShowFullText] = useState(false);

  const direction = t("direction");

  const getClosestBreakpoint = () => {
    for (const breakpoint in textSizes)
      if (window.innerWidth < breakpoint) return breakpoint;
    return 1920;
  };

  const handleResize = () => setSize(textSizes[getClosestBreakpoint()]);
  const changeTextSize = () =>
    setShowFullText((prevShowFullText) => !prevShowFullText);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      handleResize();
    });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="rc
      shadow-md
      mx-auto
      bg-[#FDDED2] rounded-2xl overflow-hidden 
      flex flex-col
      max-w-full
      sm:max-w-[80%]
      md:flex-row 
      lg:flex-col 
      xl:flex-row 
      xl:max-w-[100%] "
    >
      {!showFullText && (
        <div
          className="
            object-cover
            overflow-hidden
            aspect-video
            min-w-[12rem]
            md:w-auto 
            lg:w-full 
            xl:w-auto 
            xl:max-w-[40%]"
        >
          <img
            src={image}
            alt="product"
            className="
              w-full h-full
              transition-transform
              ease-in-out delay-100
              hover:scale-125 object-cover cursor-pointer"
          />
        </div>
      )}
      <div className="flex flex-col p-5 justify-between">
        <div>
          <h2 className="font-sofia font-bold text-xl">{title}</h2>
          <div
            className="flex justify-between my-2 text-black/[.55]"
            dir={direction}
          >
            <span>
              {`${t("from")} `} <span className="underline">{seller}</span>
            </span>
            <span className="font-black text-[#7D5C3A] text-md">
              {parseFloat(price.toFixed(2))} {t("dzd")}
            </span>
          </div>
        </div>
        <div>
          <Stars average={stars} totalNumberOfStars={5} />

          {!showFullText && description.length > size ? (
            <p className="bg-white py-3 px-2 my-2 rounded-md">
              {`${description.slice(0, size / 2)} ...`}{" "}
              <span
                className="font-bold text-sky-500 cursor-pointer"
                onClick={changeTextSize}
              >
                {t("show_more")}
              </span>
            </p>
          ) : (
            <p className="bg-white py-3 px-2 my-2 rounded-md ">
              {description}{" "}
              <span
                className="font-bold text-sky-500 cursor-pointer"
                onClick={changeTextSize}
              >
                {t("show_less")}
              </span>
            </p>
          )}
        </div>
        <div className="grid w-full">
          <span className="justify-self-end text-black/[.55]">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
