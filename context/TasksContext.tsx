"use client";

import {
  ModalFormFields,
  Task,
  TasksContextType,
  UpdateCompletedProps,
} from "@/lib/definition";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState({
    get: false,
    put: false,
    post: false,
    delete: false,
  });
  const pathname = usePathname();

  const fetchTasks = async () => {
    setIsLoading((preState) => ({ ...preState, get: true }));
    try {
      const response = await axios.get("/api/tasks");
      const sortedData = response.data.sort((a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sortedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((preState) => ({ ...preState, get: false }));
    }
  };

  const onDelete = async (id: string) => {
    setIsLoading((preState) => ({ ...preState, delete: true }));
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      setIsLoading((preState) => ({ ...preState, delete: false }));
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = async (task: ModalFormFields) => {
    setIsLoading((preState) => ({ ...preState, post: true }));
    try {
      const response = await axios.post("/api/tasks", task);
      if (response.data.error) {
        alert(response.data.error);
      }
      setIsLoading((preState) => ({ ...preState, post: false }));
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = async (id: string, task: ModalFormFields) => {
    setIsLoading((preState) => ({ ...preState, put: true }));
    try {
      const response = await axios.put(`/api/tasks/${id}`, task);
      if (response.data.error) {
        console.log(response.data.error);
      }
      setShowConfetti(false);
      setIsLoading((preState) => ({ ...preState, put: false }));
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompleted = async (task: UpdateCompletedProps) => {
    try {
      const response = await axios.put("/api/tasks", task);
      setShowConfetti(task.isCompleted ? true : false);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setShowConfetti(false);
  }, [pathname]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        onDelete,
        onAdd,
        onEdit,
        updateCompleted,
        showConfetti,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksState = () => useContext(TasksContext) as TasksContextType;
