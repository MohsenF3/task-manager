import { z } from "zod";

export const ModalFormSchema = z.object({
  title: z.string().min(1, " Title Is Required"),
  description: z.string().min(1, " Description Is Required"),
  date: z.string().min(1, " Date Is Required"),
  isImportant: z.boolean(),
});

export const LoginFormSchema = z.object({
  name: z.string().min(1, " Name Is Required"),
  email: z.string().min(1, " Email Is Required").email("Invalid Email!"),
  image: z.string(),
});
