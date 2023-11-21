import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import editPersonalInfoSchema from "../../schemas/editPersonalInfoSchema";

const EditPersonalInfo = ({ userEmail, closeModal = () => {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPersonalInfoSchema),
  });

  const handleFormSubmit = (formData) => {
    alert("submitting...");
    console.log(formData);
  };

  const [visibilityStates, setVisibilityStates] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const toggleVisibilityState = (name) => {
    setVisibilityStates({
      ...visibilityStates,
      [name]: !visibilityStates[name],
    });
  };

  return (
    <Overlay>
      <Modal closeModal={closeModal}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="text-center px-5"
        >
          <h1 className="absolute top-0 left-0 pt-7 pl-5 font-black">
            Edit Personal Information
          </h1>
          <fieldset className="mb-5 p-5">
            <legend>Email: </legend>
            <div className="flex flex-col gap-5">
              <div className="relative rounded-full overflow-hidden shadow-md">
                <input
                  defaultValue={userEmail}
                  placeholder="Email"
                  className="px-5 py-3 outline-none w-full"
                  {...register("userEmail")}
                />
                <div className="icon-bg">
                  <MdMail />
                </div>
              </div>
              {errors.userEmail && (
                <span className="error">{errors.userEmail.message}</span>
              )}
            </div>
          </fieldset>
          <fieldset className="p-5">
            <legend>Password: </legend>
            <div className="flex flex-col gap-5">
              <div>
                <div className="relative rounded-full overflow-hidden shadow-md">
                  <input
                    placeholder="Old Password"
                    className="px-5 py-3 outline-none w-full"
                    type={visibilityStates.oldPassword ? "text" : "password"}
                    defaultValue=""
                    {...register("oldPassword")}
                  />
                  <div
                    className="icon-bg"
                    onClick={() => toggleVisibilityState("oldPassword")}
                  >
                    {visibilityStates.oldPassword ? (
                      <MdVisibility />
                    ) : (
                      <MdVisibilityOff />
                    )}
                  </div>
                </div>
                {errors.oldPassword && (
                  <span>{errors.oldPassword.message}</span>
                )}
              </div>
              <div>
                <div className="relative rounded-full overflow-hidden outline-none shadow-md">
                  <input
                    placeholder="New Password"
                    defaultValue=""
                    className="px-5 py-3 outline-none w-full"
                    type={visibilityStates.newPassword ? "text" : "password"}
                    {...register("newPassword")}
                  />
                  <div
                    className="icon-bg"
                    onClick={() => toggleVisibilityState("newPassword")}
                  >
                    {visibilityStates.newPassword ? (
                      <MdVisibility />
                    ) : (
                      <MdVisibilityOff />
                    )}
                  </div>
                </div>
                {errors.newPassword && (
                  <span className="error">{errors.newPassword.message}</span>
                )}
              </div>
              <div>
                <div className="relative rounded-full overflow-hidden outline-none shadow-md">
                  <input
                    placeholder="Confirm New Password"
                    className="px-5 py-3 w-full"
                    defaultValue=""
                    type={
                      visibilityStates.confirmNewPassword ? "text" : "password"
                    }
                    {...register("confirmNewPassword")}
                  />
                  <div
                    className="icon-bg"
                    onClick={() => toggleVisibilityState("confirmNewPassword")}
                  >
                    {visibilityStates.confirmNewPassword ? (
                      <MdVisibility />
                    ) : (
                      <MdVisibilityOff />
                    )}
                  </div>
                </div>
                {errors.confirmNewPassword && (
                  <span className="error">{errors.confirmNewPassword.message}</span>
                )}
              </div>
            </div>
          </fieldset>
          <button className="user-btns p-2 rounded-[8px] w-fit m-auto shadow-xl">
            Submit
          </button>
        </form>
      </Modal>
    </Overlay>
  );
};

export default EditPersonalInfo;
