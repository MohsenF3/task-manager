import { z } from "zod";
import { LoginFormSchema, ModalFormSchema } from "./schema";

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

export interface TaskModalProps {
  open: boolean;
  onOpen: () => void;
  taskType: "edit" | "add";
  task?: Task;
}

export interface UpdateCompletedProps {
  id: string;
  isCompleted: boolean;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: ReadonlyArray<string>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

export type ModalFormFields = z.infer<typeof ModalFormSchema>;
export type LoginFormFields = z.infer<typeof LoginFormSchema>;
