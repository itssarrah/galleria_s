import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ children, closeModal = () => {} }) => {
  useEffect(() => {
    // Handle the Esc key press
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleEsc);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  // Handle clicks outside the modal
  const handleOverlayClick = (event) => {
    // Close the modal if the click is on the overlay
    if (event.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      onClick={handleOverlayClick}
    >
      <div className="modal py-20 lg:px-[6rem] xl:px-[8rem] shadow-xl relative bg-white rounded-lg">
        <div className="absolute top-0 right-0 p-5">
          <AiFillCloseCircle
            className="text-white text-3xl cursor-pointer"
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
