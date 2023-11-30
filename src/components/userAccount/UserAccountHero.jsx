import { useState } from "react";
import DuoTonePenIcon from "../../assets/icons/duotone-pen.svg";
import AvatarImage from "../AvatarImage";
import Button from "../ui/Button";
import { MdOutlineMail } from "react-icons/md";
import EditPersonalInfo from "./EditPersonalInfo";

export const UserAccountHero = ({
  userId,
  userPictureURL,
  userName,
  userEmail,
}) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col w-auto gap-5 p-10 md:flex-row md:text-xl">
      <div className="flex flex-col justify-center gap-1">
        <AvatarImage
          imageURL={userPictureURL}
          className="w-[10rem] md:w-[12rem] m-auto shadow-md"
        />
        <Button text="edit" className="user-btns rounded-full px-5" />
      </div>

      <div className="px-10 pt-5 flex flex-col justify-between h-full">
        <div>
          <div className="relative rounded-full overflow-hidden outline-none shadow-md">
            <input type="email" value={userEmail} className="px-5 py-3" readOnly />
            <div className="icon-bg">
              <img
                src={DuoTonePenIcon}
                alt="icon"
                className="max-w-[2.3rem] w-full hover:bg-[#FFEBEE] bg-[#F5EBE0] rounded-full aspect-square p-1"
              />
            </div>
          </div>

          <p className="p-4 mb-2 text-lg">
            <MdOutlineMail className="text-[#FF9494] inline-block mr-2" />
            {userEmail}
          </p>
        </div>

        <Button
          text="edit personal information"
          className="user-btns mb-0 rounded-full px-5"
          onClick={openModal}
        />
      </div>
      {showModal && (
        <EditPersonalInfo userEmail={userEmail} closeModal={closeModal} />
      )}
    </div>
  );
};
