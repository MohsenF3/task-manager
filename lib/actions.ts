"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "./connect";
import { LoginFormFields } from "./definition";

export const handleGithubLogin = async (formData: FormData) => {
  await signIn("github");
};

export const handleGoogleLogin = async () => {
  await signIn("google");
};

export const handleLogout = async () => {
  await signOut();
};

export const login = async (data: LoginFormFields) => {
  const { name, email, image } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (user) {
      return;
    }

    await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        image: image as string,
      },
    });

    await signIn("credentials", { email });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: "Database Error: Failed to Register",
      };
    }
    throw error;
  }
};
