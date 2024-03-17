import { auth } from "@/auth";
import prisma from "./connect";
import { Task } from "./definition";
import { cache } from "react";

export const getAllTasks = cache(async () => {
  try {
    const session = await auth();

    if (!session) {
      return;
    }

    const tasks = await prisma.task.findMany({
      where: { userId: session?.user?.id },
    });

    const sortedTasks = tasks.sort((a: Task, b: Task) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sortedTasks;
  } catch (error) {
    console.log(error);
  }
});

export const getTask = cache(async (id: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return task;
  } catch (error) {
    console.log(error);
  }
});
