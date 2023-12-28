const DropdownList = ({ options, className = "" }) => (
  <select className={`px-5 py-1 bg-transparent ${className}`}>
    {options.map((option) => (
      <option>{option}</option>
    ))}
  </select>
);

export default DropdownList;
