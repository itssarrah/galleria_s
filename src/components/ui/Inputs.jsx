import "../../css/ui/input.css";
import { IconButton } from "./IconButton";

export const InputWrapper = ({
  icon,
  children,
  onIconClick = null,
  errors = null,
}) => (
  <div className="text-left">
    <div className="input-container">
      {children}
      <IconButton onClick={onIconClick}>{icon}</IconButton>
    </div>
    {errors && <span className="error">{errors.message}</span>}
  </div>
);
