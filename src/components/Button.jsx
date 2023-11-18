const Button = ({ text, className = "", onClick = () => {} }) => (
  <button className={`p-2 rounded-[8px] w-fit m-auto shadow-xl ${className}`}>
    {text}
  </button>
);

export default Button;
