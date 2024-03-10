"use client";

import {
  AddTaskProps,
  Task,
  TasksContextType,
  UpdateCompletedProps,
} from "@/lib/definition";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState({
    get: false,
    put: false,
    post: false,
    delete: false,
  });

  const fetchTasks = async () => {
    setIsLoading((preState) => ({ ...preState, get: true }));
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
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

  const onAdd = async (task: AddTaskProps) => {
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

  const onEdit = async (id: string, task: AddTaskProps) => {
    setIsLoading((preState) => ({ ...preState, put: true }));
    try {
      const response = await axios.put(`/api/tasks/${id}`, task);
      if (response.data.error) {
        alert(response.data.error);
      }
      setIsLoading((preState) => ({ ...preState, put: false }));
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompleted = async (task: UpdateCompletedProps) => {
    try {
      const response = await axios.put("/api/tasks", task);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, isLoading, onDelete, onAdd, onEdit, updateCompleted }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksState = () => useContext(TasksContext) as TasksContextType;
