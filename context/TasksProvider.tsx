"use client";

import { addTask, deleteTask, editTask, updateTaskStatus } from "@/lib/actions";
import { BASE_API_URL } from "@/lib/constants";
import { ModalFormFields, Task, TasksContextType } from "@/lib/definition";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTasks = async () => {
    if (!BASE_API_URL && !tasks) return null;
    const response = await fetch(`${BASE_API_URL}/api/data`);

    if (!response.ok) {
      setError(true);
    }

    setTasks(await response.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addOptimisticTask = async (data: ModalFormFields) => {
    const { date, description, isImportant, title } = data;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      date: date as unknown as string,
      description,
      isImportant,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: crypto.randomUUID(),
    };

    setTasks((preState) => [newTask, ...preState]);
    await addTask(data);
  };

  const deleteOptimisticTask = async (id: string) => {
    setTasks((preState) => preState.filter((task) => task.id !== id));
    await deleteTask(id);
  };

  const editOptimisticTask = async (id: string, data: ModalFormFields) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            ...data,
            date: data.date as unknown as string,
          };
        }
        return task;
      });
    });
    await editTask(id, data);
  };

  const editOptimisticStatus = async (id: string, isCompleted: boolean) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted,
          };
        }
        return task;
      });
    });
    await updateTaskStatus({ id, isCompleted });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        error,
        isLoading,
        addOptimisticTask,
        deleteOptimisticTask,
        editOptimisticTask,
        editOptimisticStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksState = () => useContext(TasksContext) as TasksContextType;
