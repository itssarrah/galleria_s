import DuoTonePenIcon from "../../assets/icons/duotone-pen.svg";
import AvatarImage from "../AvatarImage";
import Button from "../Button";
import Input from "../Input";
import { MdOutlineMail } from "react-icons/md";

export const UserAccountHero = ({
  userId,
  userPictureURL,
  userName,
  userEmail,
}) => {
  return (
    <div className="flex flex-col w-auto gap-5 p-10 md:flex-row">
      <div className="flex flex-col justify-center gap-1">
        <AvatarImage imageURL={userPictureURL} className="w-[10rem] m-auto" />
        <Button text="edit" className="user-btns" />
      </div>

      <div className="px-10 pt-5 flex flex-col justify-between h-full">
        <div>
          <Input
            value={userName}
            imageURL={DuoTonePenIcon}
            className="pointer-events-none w-full"
          />

          <p className="p-4 mb-2 text-lg">
            <MdOutlineMail className="text-[#FF9494] inline-block mr-2" />
            {userEmail}
          </p>
        </div>

        <Button text="edit personal information" className="user-btns mb-0" />
      </div>
    </div>
  );
};
