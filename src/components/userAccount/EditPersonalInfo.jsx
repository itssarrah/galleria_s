import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import { z } from "zod";

const passwordZod = z
  .string()
  .min(8, { message: "Password Lenght must be at least 8" });

const editPersonalInfoSchema = z
  .object({
    userEmail: z
      .string({ required_error: "Email is Required" })
      .email({ message: "Invalid Email Address" }),
    oldPassword: passwordZod,
    newPassword: passwordZod,
    confirmNewPassword: passwordZod,
  })
  .refine((data) => data.confirmNewPassword == data.newPassword, {
    message: "Provided Passwords don't match",
  });

const EditPersonalInfo = ({ closeModal = () => {} }) => (
  <Overlay>
    <Modal closeModal={closeModal}>
      <div></div>
    </Modal>
  </Overlay>
);

export default EditPersonalInfo;
