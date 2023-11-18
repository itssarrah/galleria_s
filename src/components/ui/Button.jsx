const Button = ({ text, className = "", onClick = () => {}, extra }) => (
  <button
    className={`p-2 rounded-[8px] w-fit m-auto shadow-xl ${className}`}
    onClick={onClick}
    {...extra}
  >
    {text}
  </button>
);

export default Button;
