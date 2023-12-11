import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "../../css/auth.css";
import cancelIcon from "../../assets/icons/cancel.svg";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useTranslation } from "react-i18next";

const InterestCard = ({ backgroundImage, title, onSelect }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardStyle = {
    background: `url('${backgroundImage}') center center / cover no-repeat`,
  };

  const spinnerStyle = css`
    display: block;
    margin: 0 auto;
    border-color: red; /* Change the color if needed */
  `;

  const handleClick = () => {
    setIsClicked(!isClicked);
    onSelect(!isClicked);
  };

  return (
    <>
      <div
        className="relative w-[180px] h-[180px] md:w-[250px] md:h-[250px] xl:w-[290px] xl:h-[290px] mb-4 xl:mb-12 lg:mb-8 mx-auto rounded-lg cursor-pointer interest_card_box_shadow"
        style={cardStyle}
        onClick={handleClick}
      >
        {imageLoaded ? (
          <>
            <div
              className={`hidden md:flex rounded-lg absolute w-full h-full  ${
                isClicked
                  ? "opacity-100 hover:opacity-100 bg_b"
                  : "opacity-0 hover:opacity-100 bg_w"
              } transition duration-300 flex justify-center items-center `}
            >
              {isClicked ? (
                <img src={cancelIcon} alt="Cancel Icon" className="w-8 h-8" />
              ) : (
                <p className="subtxt rounded-lg px-4 py-1 font-sunflower text-base lg:text-xl xl:text-xl font-bold ">
                  {title}
                </p>
              )}
            </div>
            <div
              className={`flex md:hidden rounded-lg absolute w-full h-full  ${
                isClicked ? " bg_b" : "bg_w_mobile"
              } transition duration-300 flex justify-center items-center `}
            >
              {isClicked ? (
                <img src={cancelIcon} alt="Cancel Icon" className="w-8 h-8" />
              ) : (
                <p className="subtxt rounded-lg px-4 py-1 font-sunflower text-base lg:text-xl xl:text-xl font-bold ">
                  {title}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <ClipLoader
              color={"#ffffff"}
              loading={!imageLoaded}
              css={spinnerStyle}
              size={35}
            />
          </div>
        )}
        <img
          src={backgroundImage}
          alt="Interest Background"
          className="hidden"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </>
  );
};

const InterestSelection = ({ onSelectedIdsChange }) => {
  const [interests, setInterests] = useState([]);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/interests`);
        setInterests(response.data.interests);
      } catch (error) {
        console.error("Error fetching interests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);

  useEffect(() => {
    // Call the callback after the component has rendered
    onSelectedIdsChange(selectedIds);
  }, [selectedIds, onSelectedIdsChange]);

  const handleInterestSelect = (id, isSelected) => {
    setSelectedIds((prevSelectedIds) =>
      isSelected
        ? [...prevSelectedIds, id]
        : prevSelectedIds.filter((selectedId) => selectedId !== id)
    );
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full ">
          <ClipLoader loading={loading} size={50} color="#DD6969" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-8">
          {interests.map((interest) => (
            <InterestCard
              key={interest.id}
              backgroundImage={interest.image_url}
              title={
                i18n.language === "ar"
                  ? interest.ar_name
                  : i18n.language === "fr"
                  ? interest.fr_name
                  : interest.en_name
              }
              onSelect={(isSelected) =>
                handleInterestSelect(interest.id, isSelected)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestSelection;
