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

// delete task action
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

// add task action
export const addTask = async (task: ModalFormFields) => {
  const { title, description, date, isImportant } = task;
  const session = await auth();

  if (!session) {
    throw new Error("User not authenticated!");
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        date: date as unknown as string,
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

// edit task action
export const editTask = async (id: string, task: ModalFormFields) => {
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: task as unknown as string,
    });
    revalidateTag("tasks");
  } catch (error) {
    console.log("Error While Updating Task");
  }
};

// update isCompleted status of the task action
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

// login with github
export const handleGithubLogin = async () => {
  await signIn("github");
};

// login with google
export const handleGoogleLogin = async () => {
  await signIn("google");
};

// logout action
export const handleLogout = async () => {
  await signOut();
};

// login action
export const login = async (data: LoginFormFields) => {
  const { name, email, image } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    // if user exist signIn
    if (user) {
      await signIn("credentials", { email });
      return;
    }

    // if user not exist create one and sign in
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
