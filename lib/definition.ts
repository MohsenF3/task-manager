export interface TaskModalProps {
  open: boolean;
  onOpen: () => void;
  taskType: "edit" | "add";
  id?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AddTaskProps {
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
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

  onDelete: (id: string) => void;
  onAdd: (task: AddTaskProps) => void;
  onEdit: (id: string, task: AddTaskProps) => void;
  updateCompleted: (task: UpdateCompletedProps) => void;
}
