const Input = ({
  id = null,
  type = "text",
  value = "",
  placeholder = "",
  imageURL = null,
  onClick = () => {},
  extra = {},
}) => (
  <div className="relative rounded-full overflow-hidden outline-none shadow-md">
    <input
      id={id}
      name={id}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="px-5 py-3"
      {...extra}
    />

    {imageURL && (
      <div className="h-full absolute right-0 top-0 bottom-0 p-2 flex justify-center items-center">
        <img
          src={imageURL}
          alt="icon"
          className="max-w-[2.3rem] w-full hover:bg-[#FFEBEE] bg-[#F5EBE0] rounded-full aspect-square p-1"
        />
      </div>
    )}
  </div>
);

export default Input;
