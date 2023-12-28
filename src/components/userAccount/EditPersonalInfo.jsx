import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdMail,
  MdVisibility,
  MdVisibilityOff,
  MdAccountCircle,
} from "react-icons/md";
import { InputWrapper } from "../ui/Inputs";
import { TogglableIconButton } from "../ui/IconButton";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import editPersonalInfoSchema from "../../schemas/editPersonalInfoSchema";

const EditPersonalInfo = ({ userName, userEmail, closeModal = () => {} }) => {
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5">
          <h1 className="absolute top-0 left-0 pt-7 pl-5 font-black">
            Edit Personal Information
          </h1>
          <fieldset className="mb-5 p-5">
            <div className="flex flex-col gap-5">
              <h6>Email: </h6>
              <InputWrapper icon={<MdMail />} errors={errors.userEmail}>
                <input
                  defaultValue={userEmail}
                  placeholder="Email"
                  className="px-5 py-3 outline-none w-full"
                  {...register("userEmail")}
                />
              </InputWrapper>
              <h6>User Name: </h6>
              <InputWrapper icon={<MdAccountCircle />} errors={errors.userName}>
                <input
                  defaultValue={userName}
                  placeholder="User Name :"
                  className="px-5 py-3 outline-none w-full"
                  {...register("userName")}
                />
              </InputWrapper>
            </div>
          </fieldset>
          <fieldset className="p-5">
            <legend>Password: </legend>
            <div className="flex flex-col gap-5">
              <InputWrapper
                icon={
                  <TogglableIconButton
                    icon1={<MdVisibility />}
                    icon2={<MdVisibilityOff />}
                    condition={visibilityStates.oldPassword}
                  />
                }
                onIconClick={() => toggleVisibilityState("oldPassword")}
                errors={errors.oldPassword}
              >
                <input
                  placeholder="Old Password"
                  className="px-5 py-3 outline-none w-full"
                  type={visibilityStates.oldPassword ? "text" : "password"}
                  defaultValue=""
                  {...register("oldPassword")}
                />
              </InputWrapper>

              <InputWrapper
                icon={
                  <TogglableIconButton
                    icon1={<MdVisibility />}
                    icon2={<MdVisibilityOff />}
                    condition={visibilityStates.newPassword}
                  />
                }
                onIconClick={() => toggleVisibilityState("newPassword")}
                errors={errors.newPassword}
              >
                <input
                  placeholder="New Password"
                  className="px-5 py-3 outline-none w-full"
                  type={visibilityStates.newPassword ? "text" : "password"}
                  defaultValue=""
                  {...register("newPassword")}
                />
              </InputWrapper>
              <InputWrapper
                icon={
                  <TogglableIconButton
                    icon1={<MdVisibility />}
                    icon2={<MdVisibilityOff />}
                    condition={visibilityStates.confirmNewPassword}
                  />
                }
                onIconClick={() => toggleVisibilityState("confirmNewPassword")}
                errors={errors.confirmNewPassword}
              >
                <input
                  placeholder="New Password"
                  className="px-5 py-3 outline-none w-full"
                  type={
                    visibilityStates.confirmNewPassword ? "text" : "password"
                  }
                  defaultValue=""
                  {...register("confirmNewPassword")}
                />
              </InputWrapper>
            </div>
          </fieldset>
          {/* <button className="user-btns py-2 px-5 rounded-full w-fit m-auto shadow-xl ">
            Submit
          </button> */}
          <div className="w-fit mx-auto">
            <Button text="Submit" />
          </div>
        </form>
      </Modal>
    </Overlay>
  );
};

export default EditPersonalInfo;
