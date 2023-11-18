import { UserAccountHero } from "../../components/userAccount/UserAccountHero";
import { useParams } from "react-router-dom";
import data from "./dummy";
import userPicture from "../../assets/images/PottyPot5.png";

const UserAccountPage = () => {
  const { userId } = useParams();
  const { userName, userEmail } = data[userId];

  return (
    <div className="flex justify-around w-full">
      <UserAccountHero
        userId={userId}
        userName={userName}
        userEmail={userEmail}
        userPictureURL={userPicture}
      />
    </div>
  );
};

export default UserAccountPage;
