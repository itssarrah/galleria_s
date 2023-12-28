export const IconButton = ({ children, onClick }) => (
  <div className="icon-bg" onClick={onClick}>
    {children}
  </div>
);

export const TogglableIconButton = ({
  icon1,
  icon2,
  condition = true,
}) => (condition ? icon1 : icon2);