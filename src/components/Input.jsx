const Input = ({
  id = null,
  type = "text",
  value = "",
  imageURL = null,
  onClick = () => {},
  extra = {}
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
      <div className="absolute right-0 top-1">
        <img src={imageURL} alt="icon" className="w-[80%] p-2 hover:bg-[#FFEBEE] bg-[#F5EBE0] rounded-full aspect-square" />
      </div>
    )}
  </div>
);

export default Input;
