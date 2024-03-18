import { auth } from "@/auth";
import { Task } from "./definition";

export const getTasks = async (): Promise<Task[]> => {
  const session = await auth();

  const response = await fetch("http://localhost:3000/api/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-ID": session?.user?.id as string,
    },
    cache: "force-cache",
    next: { tags: ["tasks"] },
  });

  if (!response.ok) {
    throw new Error("Failed To Fetch tasks");
  }

  return response.json();
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`http://localhost:3000/api/data/${id}`);

  if (!response.ok) {
    throw new Error("Failed To Fetch task");
  }

  return response.json();
};
