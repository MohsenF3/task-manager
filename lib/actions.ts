"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "./connect";
import {
  LoginFormFields,
  ModalFormFields,
  UpdateCompletedProps,
} from "./definition";
import { revalidateTag } from "next/cache";

export const deleteTask = async (id: string) => {
  try {
    await prisma.task.delete({
      where: {
        id,
      },
    });
    revalidateTag("tasks");
  } catch (error) {
    console.log("Error While Deleting Task");
  }
};

export const addTask = async (task: ModalFormFields) => {
  const { title, description, date, isImportant } = task;
  const session = await auth();

  if (!session) {
    return;
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        date,
        isImportant,
        isCompleted: false,
        userId: session?.user?.id as string,
      },
    });
    revalidateTag("tasks");
  } catch (error) {
    console.log("Error While Creating Task", error);
  }
};

export const editTask = async (id: string, task: ModalFormFields) => {
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: task,
    });
    revalidateTag("tasks");
  } catch (error) {
    console.log("Error While Updating Task");
  }
};

export const updateTaskStatus = async (task: UpdateCompletedProps) => {
  const { id, isCompleted } = task;
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted: isCompleted,
      },
    });
    revalidateTag("tasks");
  } catch (error) {
    console.log("Error While Updating Task");
  }
};

export const handleGithubLogin = async () => {
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
      await signIn("credentials", { email });
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
