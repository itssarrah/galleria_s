import "../../css/ui/modal.css";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ children, closeModal = () => {} }) => (
  <div className="modal py-20 lg:px-[6rem] xl:px-[8rem] shadow-xl">
    <div className="absolute top-0 right-0 p-5">
      <AiFillCloseCircle
        className="text-white text-3xl cursor-pointer"
        onClick={closeModal}
      />
    </div>
    {children}
  </div>
);

export default Modal;
