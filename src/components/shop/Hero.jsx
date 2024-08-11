import React from "react";
import { Link } from "react-router-dom"; // Import the Link component
import { BACKEND_URL } from "../../config";
import useSmallBusinessOfWeek from "../../api/smallBusinessOfTheWeek";

const Hero = () => {
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
              {data.images && data.images.length > 0 && (
                <div
                  className="flex flex-col items-center"
                  style={{ flex: "0.5" }}
                >
                  {data.images[0] && (
                    <Link to={`/viewbusiness/${data.id}`}>
                      <img
                        src={`${BACKEND_URL}storage/${data.images[0].url}`}
                        alt="product"
                        className="w-[316px] h-[164px] object-cover shadow-xl mb-8"
                      />
                    </Link>
                  )}
                  {data.images[1] && (
                    <Link to={`/viewbusiness/${data.id}`}>
                      <img
                        src={`${BACKEND_URL}storage/${data.images[1].url}`}
                        alt="product"
                        className="w-[316px] h-[317px] object-cover shadow-xl"
                      />
                    </Link>
                  )}
                </div>
              )}

              {data.business_image && (
                <div
                  className="flex flex-col items-center"
                  style={{ flex: "0.5" }}
                >
                  <Link to={`/viewbusiness/${data.id}`}>
                    <img
                      src={`${BACKEND_URL}storage/${data.business_image}`}
                      className="w-[309px] h-[516px] object-cover shadow-xl"
                      alt="product 1"
                    />
                  </Link>
                </div>
              )}

              {data.images && data.images.length > 2 && (
                <div
                  className="flex flex-col items-center"
                  style={{ flex: "0.5" }}
                >
                  {data.images[2] && (
                    <Link to={`/viewbusiness/${data.id}`}>
                      <img
                        src={`${BACKEND_URL}storage/${data.images[2].url}`}
                        alt="product"
                        className="w-[316px] h-[317px] object-cover shadow-xl mb-8"
                      />
                    </Link>
                  )}
                  {data.images[3] && (
                    <Link to={`/viewbusiness/${data.id}`}>
                      <img
                        src={`${BACKEND_URL}storage/${data.images[3].url}`}
                        alt="product"
                        className="w-[316px] h-[206px] object-cover shadow-xl"
                      />
                    </Link>
                  )}
                </div>
              )}
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
