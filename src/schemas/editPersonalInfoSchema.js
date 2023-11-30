import { z } from "zod";

const passwordZod = z
  .union([
    z.string().min(8, { message: "Password should have atleast 8 characters" }),
    z.string().length(0, {message: "This field can only be left empty, or of length >= 8"}),
  ])
  .optional()
  .transform((e) => (e === "" ? undefined : e));

const emailZod = z
  .string({ required_error: "Email is Required" })
  .email({ message: "Invalid Email Address" });

const editPersonalInfoSchema = z
  .object({
    userEmail: emailZod,
    oldPassword: passwordZod,
    newPassword: passwordZod,
    confirmNewPassword: passwordZod,
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "The provided passwords don't match",
    path: ["confirmNewPassword"],
  });

export default editPersonalInfoSchema;
