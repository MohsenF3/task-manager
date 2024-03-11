"use client";

import {
  Dialog,
  DialogHeader,
  Button,
  DialogBody,
  Typography,
  Textarea,
  Input,
} from "./material";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalFormFields, TaskModalProps } from "@/lib/definition";
import { useTasksState } from "@/context/TasksContext";
import { ModalFormSchema } from "@/lib/schema";

export default function TaskModal({
  open,
  onOpen,
  taskType,
  id,
}: TaskModalProps) {
  const { onAdd, onEdit, tasks, isLoading } = useTasksState();

  const task = tasks.filter((task) => task.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalFormFields>({
    defaultValues: {
      title: taskType === "edit" ? task?.[0]?.title : "",
      description: taskType === "edit" ? task?.[0]?.description : "",
      date: taskType === "edit" ? task?.[0]?.date : "",
      isImportant: taskType === "edit" ? task?.[0]?.isImportant : false,
    },
    resolver: zodResolver(ModalFormSchema),
  });

  const onSubmit: SubmitHandler<ModalFormFields> = async (task) => {
    if (taskType === "add") {
      onAdd(task);
    }

    if (id) {
      onEdit(id, task);
    }
  };

  return (
    <Dialog open={open} size="xs" handler={onOpen} placeholder="">
      <div className="flex items-center justify-between">
        <DialogHeader placeholder="" className="flex flex-col items-start">
          <Typography className="mb-1" variant="h4" placeholder="">
            {taskType === "add" ? "Add New Task" : "Edit Task"}
          </Typography>
        </DialogHeader>
        <button
          onClick={onOpen}
          className="grid place-content-center w-10 h-10 mr-2 hover:bg-gray-200 rounded"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
      </div>
      <DialogBody placeholder="">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...register("title")}
              label="Title"
              type="text"
              crossOrigin=""
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Textarea {...register("description")} label="Description" />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("date")}
              label="Date"
              type="date"
              crossOrigin=""
            />
            {errors.date && (
              <p className="text-red-500 mt-2 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h3>Toggle Important:</h3>
            <label className="checkbox-container">
              <input type="checkbox" {...register("isImportant")} />
              <div className="checkmark"></div>
            </label>
          </div>
          <Button
            variant="gradient"
            color="green"
            placeholder=""
            className="flex items-center self-end gap-2 mt-5"
            type="submit"
            loading={taskType === "add" ? isLoading.post : isLoading.put}
          >
            {taskType === "add" && <PlusIcon className="w-4 h-4" />}
            {taskType === "add" ? "Add Task" : "Save Changes"}
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
}
