const IconList = ({ children, items, className = "" }) => (
  <div className={className}>
    {items.map((item, index) => {
      return (
        <div className={`flex items-center gap-1 space-y-1`}>
          {children[index] && children[index]}
          <p className="font-jost ">{item}</p>
        </div>
      );
    })}
  </div>
);

export default IconList;
