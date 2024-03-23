"use client";

import {
  Dialog,
  DialogHeader,
  Button,
  DialogBody,
  Typography,
  Textarea,
  Input,
} from "../material";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalFormFields, TaskModalProps } from "@/lib/definition";
import { ModalFormSchema } from "@/lib/schema";
import { addTask, editTask } from "@/lib/actions";

import DateInput from "./DateInput";
import { DateObject } from "react-multi-date-picker";
import { formatDate } from "@/lib/utils";

export default function TaskModal({
  open,
  onOpen,
  taskType,
  task,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ModalFormFields>({
    defaultValues: {
      title: taskType === "edit" ? task?.title : "",
      description: taskType === "edit" ? task?.description : "",
      date:
        taskType === "edit"
          ? formatDate(task?.date as string)
          : new DateObject(),
      isImportant: taskType === "edit" ? task?.isImportant : false,
    },
    resolver: zodResolver(ModalFormSchema),
  });

  const onSubmit: SubmitHandler<ModalFormFields> = async (taskData) => {
    const formatDate = taskData.date.format() as any;

    if (taskType === "add") {
      await addTask({
        ...taskData,
        date: formatDate,
      });
    }

    if (task?.id) {
      await editTask(task.id, {
        ...taskData,
        date: formatDate,
      });
    }

    onOpen();
    reset();
  };

  const handleModal = () => {
    if (taskType === "add") {
      reset();
    }
    onOpen();
  };

  return (
    <Dialog
      open={open}
      size="xs"
      handler={handleModal}
      placeholder=""
      className="dark:bg-[#181818] bg-[#FBF9F1] dark:text-white"
    >
      <div className="flex items-center justify-between">
        <DialogHeader placeholder="" className="flex flex-col items-start">
          <Typography
            className="mb-1 dark:text-white"
            variant="h4"
            placeholder=""
          >
            {taskType === "add" ? "اضافه کنید" : "ویرایش کنید"}
          </Typography>
        </DialogHeader>
        <button
          onClick={onOpen}
          className="grid place-content-center w-10 h-10 mr-2 dark:hover:bg-gray-600 hover:bg-gray-200 rounded"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
      </div>
      <DialogBody placeholder="">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* title input */}
          <div>
            <Input
              {...register("title")}
              label="عنوان"
              type="text"
              crossOrigin=""
              labelProps={{
                className: "dark:!text-white !font-bold",
              }}
              variant="standard"
              className="dark:text-white dark:placeholder:text-white"
              error={errors.title?.message ? true : false}
            />
            {errors.title && (
              <p className="text-red-500 font-medium text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* description input */}
          <div>
            <Textarea
              {...register("description")}
              labelProps={{
                className: "dark:!text-white !font-bold",
              }}
              variant="standard"
              className="dark:text-white dark:placeholder:text-white"
              label="توضیحات"
              error={errors.description?.message ? true : false}
            />
            {errors.description && (
              <p className="text-red-500 font-medium text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* date input */}
          <div>
            <DateInput control={control} />
          </div>

          {/* important status */}
          <div className="flex items-center justify-between">
            <h3 className="dark:text-white font-normal">
              علامت زدن به عنوان مهم:
            </h3>
            <label className="checkbox-container">
              <input type="checkbox" {...register("isImportant")} />
              <div className="checkmark"></div>
            </label>
          </div>

          {/* submit burron */}
          <Button
            variant="gradient"
            color="green"
            placeholder=""
            className="flex items-center self-start gap-2 mt-5"
            type="submit"
            loading={isSubmitting}
          >
            {taskType === "add" && <PlusIcon className="w-4 h-4" />}
            {taskType === "add" ? "اضافه کردن" : "ذخیره کردن"}
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
}
