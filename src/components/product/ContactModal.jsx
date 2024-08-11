import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../ui/Modal";

const ContactModal = ({
  isOpen,
  onClose,
  phoneNumber,
  instagramLink,
  seller,
}) => {
  if (!isOpen) return null;

  const handleInstagramMessage = () => {
    if (instagramLink) {
      const message = `Hey, I am interested in this product ${window.location.href} and would like more info about it.`;
      navigator.clipboard
        .writeText(message)
        .then(() => {
          toast.info(
            <div>
              <p>
                <strong>Your message has been copied to your clipboard!</strong>
              </p>
              <p>
                We will redirect you to <strong>Instagram</strong> shortly.
                Please paste the copied message in the conversation with the
                seller.
              </p>
            </div>
          );

          // Redirect to Instagram after 2 seconds
          setTimeout(() => {
            window.open(instagramLink, "_blank");
          }, 2000); // 2000 milliseconds = 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy message: ", err);
          toast.error("Failed to copy the message. Please try again.");
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]">
      <div className="bg-white p-6 rounded-xl w-[80%] max-w-lg">
        <h2 className=" text-2xl md:text-4xl mb-4 font-sofia text-[#DD6969]">
          Contact {seller}
        </h2>
        <div className="mb-4">
          <h3 className="text-lg text-gray-400 font-jost">
            Call via Phone Number :
          </h3>
          <p className="text-xl">
            <a href={`tel:${phoneNumber}`} className="text-blue-500 underline">
              {phoneNumber}
            </a>
          </p>
        </div>
        {instagramLink && (
          <div className="mb-4">
            <h3 className="text-lg text-gray-400 font-jost">On Instagram :</h3>
            <button
              onClick={handleInstagramMessage}
              className="text-blue-500 underline text-lg"
            >
              Message on Instagram
            </button>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-300 px-4 py-2 rounded hover:bg-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
