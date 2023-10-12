import React from "react";
import image1 from "../../assets/images/PottyPot1.png";
import image2 from "../../assets/images/PottyPot2.png";
import image3 from "../../assets/images/PottyPot3.png";
import image4 from "../../assets/images/PottyPot4.png";
import image5 from "../../assets/images/PottyPot5.png";

const Hero = () => {
  const Data = [
    {
      title: "PottyPlot",
      images: [image1, image2, image3, image4, image5],
      description:
        "Lorem ipsum dolor sit amet consectetur. Quisque mauris condimentum in mauris sed.",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center w-full px-[10px] lg:px-[50px]">
        <p className="font-sofia text-center text-[24px] md:text-[42px] lg:text-[42px] mt-4 font-normal">
          Small business of the week
        </p>
        {Data.map((item, index) => (
          <p
            key={index}
            className="font-sunflower text-[#FF9494] font-medium text-[24px] md:text-[42px] lg:text-[42px]"
          >
            {item.title}
          </p>
        ))}
        <div className="flex flex-row items-center justify-center gap-[15px] lg:gap-[30px]  ">
          <div className="flex flex-col items-center  " style={{ flex: "0.5" }}>
            <img src={Data[0].images[0]} alt="Image" className="" />
            <img src={Data[0].images[3]} alt="Image" className="" />
          </div>
          <div className="flex flex-col items-center " style={{ flex: "0.5" }}>
            <img src={Data[0].images[1]} alt="Image 1" />
          </div>
          <div className="flex flex-col items-center  " style={{ flex: "0.5" }}>
            <img src={Data[0].images[2]} alt="Image" className="" />
            <img src={Data[0].images[4]} alt="Image" className="" />
          </div>
        </div>
        {Data.map((item, index) => (
          <p
            key={index}
            className="font-sunflower px-0 md:px-20 lg:px-[100px] text-center text-black font-normal mt-[20px] text-[16px] md:text-[24px] lg:text-[32px]"
          >
            {item.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Hero;
