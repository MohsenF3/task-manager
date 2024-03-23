import { DateObject } from "react-multi-date-picker";
import { z } from "zod";

export const ModalFormSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
  date: z.instanceof(DateObject),
  isImportant: z.boolean(),
});

export const LoginFormSchema = z.object({
  name: z.string().min(1, "نام الزامی است"),
  email: z.string().min(1, "ایمیل الزامی است").email("فرمت ایمیل نادرست است"),
  image: z.string(),
});
