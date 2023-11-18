const Input = ({
  id = null,
  type = "text",
  value = "",
  imageURL = null,
  onClick = () => {},
  extra = {},
}) => (
  <div className="relative rounded-full overflow-hidden outline-none shadow-lg">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      className="px-5 py-3"
      {...extra}
    />

    {imageURL && (
      <div className="h-full absolute right-0 top-0 bottom-0 p-2 flex justify-center items-center">
        <img
          src={imageURL}
          alt="icon"
          className="w-full hover:bg-[#FFEBEE] bg-[#F5EBE0] rounded-full aspect-square p-1"
        />
      </div>
    )}
  </div>
);

export default Input;
