const Button = ({ text, className = "user-btns", onClick = () => {}, extra }) => (
  <button
    className={`py-2 px-5 rounded-full w-fit m-auto shadow-lg ${className}`}
    onClick={onClick}
    {...extra}
  >
    {text}
  </button>
);

export default Button;
