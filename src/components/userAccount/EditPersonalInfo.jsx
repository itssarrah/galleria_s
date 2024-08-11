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
import { BACKEND_URL } from "../../config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditPersonalInfo = ({ userName, userEmail, closeModal = () => {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPersonalInfoSchema),
    defaultValues: {
      userEmail,
      userName,
    },
  });

  const [visibilityStates, setVisibilityStates] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const { t } = useTranslation("auth");
  const handleFormSubmit = async (formData) => {
    const { newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      setMessageType("error");
      setMessage("New password and confirm new password do not match.");
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BACKEND_URL}api/update-profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessageType("success");
        setMessage("Profile updated successfully!");

        // Hide success message after 5 seconds
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);

        const detailedErrorMessage = Object.entries(errorData.errors || {})
          .map(([key, value]) => `${key}: ${value.join(", ")}`)
          .join("; ");

        setMessageType("error");
        setMessage(`Error: ${errorData.message}. ${detailedErrorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setMessage(`Error: ${error.message}`);
    }
  };

  const toggleVisibilityState = (name) => {
    setVisibilityStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <Overlay>
      <Modal closeModal={closeModal}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5">
          <h1 className="absolute top-0 left-0 pt-7 pl-10 font-sofia text-3xl">
            Edit Personal Information
          </h1>
          <fieldset className="mb-5 p-5">
            <div className="flex flex-col gap-5">
              <h6>Email: </h6>
              <InputWrapper icon={<MdMail />} errors={errors.userEmail}>
                <input
                  placeholder="Email"
                  className="px-5 py-3 outline-none w-full"
                  {...register("userEmail")}
                />
              </InputWrapper>
              <h6>User Name: </h6>
              <InputWrapper icon={<MdAccountCircle />} errors={errors.userName}>
                <input
                  placeholder="User Name"
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
                  placeholder="Confirm New Password"
                  className="px-5 py-3 outline-none w-full"
                  type={
                    visibilityStates.confirmNewPassword ? "text" : "password"
                  }
                  {...register("confirmNewPassword")}
                />
              </InputWrapper>
            </div>
            <Link
              to="/forgot-password"
              className="underline text-blue-900 text-base md:text-lg font-sunflower font-bold"
            >
              {t("forgot_pass")}
            </Link>
          </fieldset>
          {message && (
            <p
              className={
                messageType === "success" ? "text-green-500" : "text-red-500"
              }
            >
              {message}
            </p>
          )}
          <div className="w-fit mx-auto">
            <Button text="Submit" />
          </div>
        </form>
      </Modal>
    </Overlay>
  );
};

export default EditPersonalInfo;
