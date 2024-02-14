import { useState } from "react";
import DuoTonePenIcon from "../../assets/icons/duotone-pen.svg";
import AvatarImage from "../AvatarImage";
import Button from "../ui/Button";
import { MdOutlineMail } from "react-icons/md";
import EditPersonalInfo from "./EditPersonalInfo";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
export const UserAccountHero = ({
  userId,
  userPictureURL,
  userName,
  userEmail,
}) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(`${BACKEND_URL}api/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("authToken");
      navigate("/login");
      window.location.reload();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col w-auto gap-5 p-10 md:flex-row md:text-xl items-center  ">
      <div className="flex flex-col justify-center gap-2">
        <AvatarImage
          imageURL={userPictureURL}
          className="w-[10rem] md:w-[12rem] m-auto shadow-md"
        />
        <Button text="edit" className="user-btns rounded-full px-5" />
      </div>

      <div className="px-8 md:px-12 pt-5 flex flex-col justify-between h-full">
        <div>
          <div className="relative rounded-full overflow-hidden outline-none shadow-md">
            <input
              type="text"
              value={userName}
              className="px-5 py-3 text-sm md:text-lg lg:text-xl outline-none"
              readOnly
            />
            <div className="icon-bg cursor-pointer" onClick={openModal}>
              <img
                src={DuoTonePenIcon}
                alt="icon"
                className="max-w-[2.3rem] w-full hover:bg-[#FFEBEE] bg-[#F5EBE0] rounded-full aspect-square p-1"
              />
            </div>
          </div>

          <p className="p-4 mb-2 text-sm md:text-lg">
            <MdOutlineMail className="text-[#FF9494] inline-block mr-2" />
            {userEmail}
          </p>
        </div>

        <Button
          text="Edit personal information"
          className="user-btns mb-0 rounded-full px-5"
          onClick={openModal}
        />
        <button
          className="underline text-red-600 font-sunflower mt-4"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      {showModal && (
        <EditPersonalInfo
          userName={userName}
          userEmail={userEmail}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
