import { z } from "zod";
import { LoginFormSchema, ModalFormSchema } from "./schema";

export interface TaskModalProps {
  open: boolean;
  onOpen: () => void;
  taskType: "edit" | "add";
  id?: string;
  task?: Task;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface UpdateCompletedProps {
  id: string;
  isCompleted: boolean;
}

export interface TasksContextType {
  tasks: Task[];
  isLoading: {
    get: boolean;
    put: boolean;
    post: boolean;
    delete: boolean;
  };
  showConfetti: boolean;
  onDelete: (id: string) => void;
  onAdd: (task: ModalFormFields) => void;
  onEdit: (id: string, task: ModalFormFields) => void;
  updateCompleted: (task: UpdateCompletedProps) => void;
}

export type ModalFormFields = z.infer<typeof ModalFormSchema>;
export type LoginFormFields = z.infer<typeof LoginFormSchema>;
