"use client";

import { login } from "@/lib/actions";
import { Input, Button } from "../material";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/lib/schema";
import { LoginFormFields } from "@/lib/definition";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: {
      name: "",
      email: "",
      image: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    await login(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="Name"
          type="text"
          {...register("name")}
          crossOrigin=""
          color="purple"
          className="text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          crossOrigin=""
          color="purple"
          className="text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

      <input type="text" className="hidden" {...register("image")} />

      <Button
        variant="gradient"
        color="purple"
        type="submit"
        placeholder=""
        loading={isSubmitting}
        className="justify-center"
      >
        Enter
      </Button>

      <div className="flex items-center justify-between gap-2 mt-2 mb-6">
        <span className="block w-full bg-gray-200 h-[1px]"></span>
        <span className="font-bold whitespace-nowrap">OR WITH</span>
        <span className="block w-full bg-gray-200 h-[1px]"></span>
      </div>
    </form>
  );
}
