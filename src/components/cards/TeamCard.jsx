import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdLocationOn, MdLocalPhone, MdStar } from "react-icons/md";
import "../../css/Landingpage.css";

function TeamCard({ name, role, source }) {
  return (
    <>
      <div className="flex flex-col items-center Team_container mx-auto my-8 mb-14">
        <img
          src={source}
          className="rounded-full w-[150px] h-[150px] avatar mt-12 object-cover"
        />
        <div className="eclipse_one"></div>
        <div className="eclipse_two"></div>
        <h1 className="feedback_txt md:text-5xl pt-4 text-4xl">{name}</h1>
        <h1 className="team_sub w-10/12 text-xl lg:text-2xl pt-2">{role}</h1>
      </div>
    </>
  );
}

export default TeamCard;
