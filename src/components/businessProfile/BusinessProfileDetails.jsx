import AvatarImage from "../AvatarImage";
import IconList from "../ui/IconList";
import { MdLocationPin, MdStar, MdPhone, MdOutlineEmail } from "react-icons/md";
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
}) => {
  const info = [
    location,
    phoneNumber,
    `${rating} out of 5`,
    `${minPrice}DZD-${maxPrice}DZD`,
  ];
  return (
    <div className="business-profile-hero">
      <div className="flex flex-col md:flex-row gap-10 w-[80%] max-w-[30rem] justify-center items-center">
        <AvatarImage imageURL={imageURL} className="w-[200px] md:w-[25rem]" />
        <div className="flex flex-col gap-3 w-full">
          <h1 className="font-sofia font-thin text-5xl md:text-7xl mb-5 text-center">{userName}</h1>
          <Elevated>
            <div className="bg-white rounded-full p-1">
              <MdOutlineEmail color="#F1979A" className="text-2xl" />
            </div>
            <p className="font-bold text-xl">{email}</p>
          </Elevated>
          <div className="relative">
            <button className="text-white bg-[#F1979A] absolute top-0 right-0 m-1 flex items-center p-1 rounded-xl">
              <TbPencilMinus />
              Edit
            </button>
            <div className="text-xl">
              <IconList items={info} iconClassName="bg-white">
                <MdLocationPin className="text-white text-2xl" />
                <MdPhone className="text-white text-2xl" />
                <MdStar className="text-white text-2xl" />
                <BsCurrencyDollar className="text-white text-2xl" />
              </IconList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileDetails;
