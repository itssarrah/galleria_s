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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

const BusinessProfileDetails = ({
  imageURL,
  userName,
  businessname,
  desc,
  email,
  location,
  phoneNumber,
  rating,
  minPrice,
  maxPrice,
  category,
  profile = false,
  instagramLink,
}) => {
  const info = [
    location,
    phoneNumber,
    `${rating} out of 5`,
    `${minPrice}DZD ~ ${maxPrice}DZD`,
    category,
  ];
  const navigate = useNavigate();

  const [showInstagramReminder, setShowInstagramReminder] = useState(false);

  useEffect(() => {
    if (profile && !instagramLink) {
      setShowInstagramReminder(true);
    }
  }, [profile, instagramLink]);

  const handleUpdateProfileClick = () => {
    navigate("/update-business-profile#external");
  };

  return (
    <>
      {showInstagramReminder && (
        <div className="bg-yellow-300 text-black p-2 rounded flex items-center justify-around gap-2 font-jost">
          <p>
            Reminder: Link your Instagram account to help customers contact you
            easily!
          </p>
          <button
            onClick={handleUpdateProfileClick}
            className="bg-[#DD6969] text-white px-4 py-2 rounded-lg font-jost"
          >
            Add Instagram Link
          </button>
        </div>
      )}
      <div className="business-profile-hero">
        <div className="flex flex-col md:flex-row gap-10 w-[90%] justify-center items-center">
          <AvatarImage
            imageURL={imageURL}
            className="w-[200px] h-[200px] md:w-[20rem] md:h-[20rem]"
          />
          <div className="flex flex-col gap-3 w-full md:w-[50%]">
            <h1 className="font-sofia font-thin text-5xl md:text-7xl  text-center">
              {businessname}
            </h1>
            <h1 className="font-jost font-thin text-xl md:text-3xl mb-5 text-center text-gray-400">
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
            <div className="md:mx-0 mx-auto">
              <p className="font-jost md:text-xl text-md text-gray-600 pl-4">
                {desc}
              </p>
            </div>
            <div className="relative mt-4">
              {profile === true && (
                <button
                  className="text-white font-jost  bg-[#DD6969] absolute top-0 right-0 m-1 flex items-center px-4 py-2 rounded-xl gap-2"
                  onClick={() => navigate("/update-business-profile")}
                >
                  <TbPencilMinus />
                  Edit
                </button>
              )}
              {instagramLink && (
                <div className="absolute top-[3.5rem] right-0 ">
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-jost bg-[#DD6969] flex items-center px-4 py-2 rounded-xl gap-2"
                  >
                    <FaInstagram />
                    Instagram
                  </a>
                </div>
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
    </>
  );
};

export default BusinessProfileDetails;
