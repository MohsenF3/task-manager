interface TaskModalProps {
  open: boolean;
  onOpen: () => void;
  taskType: "edit" | "add";
}
