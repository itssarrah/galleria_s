import AvatarImage from "../AvatarImage";
import IconList from "../ui/IconList";
import {
  MdLocationPin,
  MdStar,
  MdPhone,
  MdOutlineEmail,
  MdCategory,
} from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbPencilMinus } from "react-icons/tb";
import Elevated from "./Elevated";
import "../../css/business.css";

const BusinessProfileDetails = ({
  imageURL,
  userName,
  email,
  location,
  phoneNumber,
  rating,
  minPrice,
  maxPrice,
  category,
  profile = false,
}) => {
  const info = [
    location,
    phoneNumber,
    `${rating} out of 5`,
    `${minPrice}DZD ~ ${maxPrice}DZD`,
    category,
  ];

  return (
    <div className="business-profile-hero">
      <div className="flex flex-col md:flex-row gap-10 w-[90%] justify-center items-center">
        <AvatarImage
          imageURL={imageURL}
          className="w-[200px] h-[200px] md:w-[20rem] md:h-[20rem]"
        />
        <div className="flex flex-col gap-3 w-full md:w-[50%]">
          <h1 className="font-sofia font-thin text-5xl md:text-7xl mb-5 text-center">
            {userName}
          </h1>
          <div className="md:mx-0 mx-auto">
            <Elevated>
              <div className="bg-white rounded-full p-1 ">
                <MdOutlineEmail color="#F1979A" className="text-2xl" />
              </div>
              <p className="font-bold text-xl font-jost">{email}</p>
            </Elevated>
          </div>
          <div className="relative mt-4">
            {profile === true && (
              <button className="text-white font-jost  bg-[#DD6969] absolute top-0 right-0 m-1 flex items-center px-4 py-2 rounded-xl gap-2">
                <TbPencilMinus />
                Edit
              </button>
            )}
            <div className=" text-xl md:text-2xl font-jost ">
              <IconList items={info} iconClassName="bg-white ">
                <MdLocationPin className="text-white text-2xl" />
                <MdPhone className="text-white text-2xl" />
                <MdStar className="text-white text-2xl" />
                <BsCurrencyDollar className="text-white text-2xl" />
                <MdCategory className="text-white text-2xl" />
              </IconList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileDetails;
