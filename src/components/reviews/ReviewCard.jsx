import React from "react";
import Stars from "../Stars";

const ReviewCard = ({
  title = "Green Poetry Set 4 argile pieces 1lb",
  image = "/images/argile-pieces.png",
  seller = "PottyPot",
  price = 1000,
  stars = 4,
  description = "Et est quae aspernatur commodi officiis sit consectetur sint maxime. Nisi et quis aperiam commodi quis accusamus ipsam. Aut suscipit adipisci quisquam quasi quasi laboriosam explicabo voluptatem. Aliquam illum qui voluptate consequatur maxime a ullam. Eveniet eum nihil possimus sint et numquam. Voluptas quia rem sit.",
  date = new Date(Date.now()).toLocaleDateString("fr-FR"),
}) => {
  return (
    <div className="bg-[#FDDED2] rounded-2xl overflow-hidden flex flex-col max-w-[80%] md:flex-row lg:flex-col xl:flex-row xl:max-w-[100%]">
      <img
        src={image}
        alt="product"
        className="w-full md:h-full md:w-auto lg:w-full xl:w-auto xl:max-w-[40%]"
      />
      <div className="p-5 justify-between">
        <div>
          <h2 className="font-sofia font-bold text-xl">{title}</h2>
          <div className="flex justify-between my-2 text-black/[.55]">
            <span>
              From <span className="underline">{seller}</span>
            </span>
            <span className="font-black text-[#7D5C3A] text-md">
              {parseFloat(price.toFixed(2))} DZD
            </span>
          </div>
        </div>
        <div>
          <Stars average={stars} totalNumberOfStars={5} />
          <p className="bg-white py-3 px-2 my-2 rounded-md">{description}</p>
        </div>
        <div className="grid w-full">
          <span className="justify-self-end text-black/[.55]">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
