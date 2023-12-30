import "../css/avatar.css";

const AvatarImage = ({ imageURL, className }) => (
  <div className={`avatar-container `}>
    <img
      src={imageURL}
      className={`object-cover aspect-square ${className} rounded-full`}
    />
  </div>
);

export default AvatarImage;
