import "../css/avatar.css";

const AvatarImage = ({ imageURL, className='w-[10rem]'}) => (

  <div className={`avatar-container ${className}`}>
    <img src={imageURL} className="aspect-square w-full rounded-full" />
  </div>
);

export default AvatarImage;
