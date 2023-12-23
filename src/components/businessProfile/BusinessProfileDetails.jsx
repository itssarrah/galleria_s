import AvatarImage from "../AvatarImage";
import IconList from "../ui/IconList";
import { MdLocationPin, MdStar, MdPhone, MdOutlineEmail } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
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
      <div className="m-auto flex gap-10 w-[30rem] justify-center">
        <AvatarImage imageURL={imageURL} className="w-[20rem]" />
        <div className="flex flex-col gap-3 w-full">
          <h1 className="font-sofia font-thin text-6xl mb-5">{userName}</h1>
          <Elevated>
            <div className="bg-white rounded-full p-1">
              <MdOutlineEmail color="#F1979A" className="text-2xl" />
            </div>
            <p className="font-bold">{email}</p>
          </Elevated>
          <IconList items={info} iconClassName="bg-white">
            <MdLocationPin className="text-white text-2xl" />
            <MdPhone className="text-white text-2xl" />
            <MdStar className="text-white text-2xl" />
            <BsCurrencyDollar className="text-white text-2xl" />
          </IconList>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileDetails;
