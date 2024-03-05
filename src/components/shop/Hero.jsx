import React from "react";
import image1 from "../../assets/images/PottyPot1.png";
import image2 from "../../assets/images/PottyPot2.png";
import image3 from "../../assets/images/PottyPot3.png";
import image4 from "../../assets/images/PottyPot4.png";
import image5 from "../../assets/images/PottyPot5.png";

import { BACKEND_URL } from "../../config";

import useSmallBusinessOfWeek from "../../api/smallBusinessOfTheWeek";

const Hero = () => {
  const Data = [
    {
      title: "PottyPlot",
      images: [image1, image2, image3, image4, image5],
      description:
        "Lorem ipsum dolor sit amet consectetur. Quisque mauris condimentum in mauris sed.",
    },
  ];

  const { data, isLoading, isError, error } = useSmallBusinessOfWeek();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="w-full mb-4">
      <div className="flex flex-col items-center justify-center w-full px-[10px] lg:px-[50px]">
        <p className="font-sofia text-center text-[24px] md:text-[42px] lg:text-[42px] mt-4 font-normal mb-[2rem]">
          Small business of the week
        </p>
        {data && (
          <>
            <p className="font-sunflower text-[#FF9494] font-medium text-[24px] md:text-[42px] lg:text-[42px]">
              {data.business_name}
            </p>

            <div className="flex flex-row items-center justify-center gap-[15px] lg:gap-[30px]">
              <div
                className="flex flex-col items-center"
                style={{ flex: "0.5" }}
              >
                <img
                  src={`${BACKEND_URL}storage/${data.images[0].url}`}
                  alt="product"
                  className="w-[316px] h-[164px] object-cover shadow-xl mb-8"
                />
                <img
                  src={`${BACKEND_URL}storage/${data.images[1].url}`}
                  alt="product"
                  className="w-[316px] h-[317px] object-cover shadow-xl "
                />
              </div>
              <div
                className="flex flex-col items-center"
                style={{ flex: "0.5" }}
              >
                <img
                  src={`${BACKEND_URL}storage/${data.business_image}`}
                  className="w-[309px] h-[516px] object-cover shadow-xl "
                  alt="product 1"
                />
              </div>
              <div
                className="flex flex-col items-center"
                style={{ flex: "0.5" }}
              >
                <img
                  src={`${BACKEND_URL}storage/${data.images[2].url}`}
                  alt="product"
                  className="w-[316px] h-[317px] object-cover shadow-xl mb-8"
                />
                <img
                  src={`${BACKEND_URL}storage/${data.images[3].url}`}
                  alt="product"
                  className="w-[316px] h-[206px] object-cover shadow-xl"
                />
              </div>
            </div>

            <p className="font-sunflower px-0 md:px-20 lg:px-[100px] text-center text-black font-normal mt-[20px] text-[16px] md:text-[24px] lg:text-[32px] mb-[2rem]">
              {data.business_description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
