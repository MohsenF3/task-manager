"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogFooter, Button } from "../material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useTasksState } from "@/context/TasksProvider";
import CustomTooltip from "../CustomTooltip";

export default function DeleteTaskButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { deleteOptimisticTask } = useTasksState();

  const handleOpen = () => setOpen(!open);

  // delete the task and close the modal
  const handleDelete = async () => {
    deleteOptimisticTask(id);
    handleOpen();
  };

  return (
    <>
      <CustomTooltip title="حذف کردن">
        <button className="group" onClick={handleOpen}>
          <TrashIcon className="w-6 h-6 group-hover:text-red-500" />
        </button>
      </CustomTooltip>

      <Dialog
        open={open}
        size="xs"
        handler={handleOpen}
        placeholder=""
        className="dark:bg-[#181818] bg-[#FBF9F1] dark:text-white"
      >
        <DialogHeader placeholder="" className="dark:text-white">
          آیا مطمئن هستید؟
        </DialogHeader>

        <DialogFooter placeholder="">
          <Button
            placeholder=""
            variant="text"
            onClick={handleOpen}
            className="ml-2 dark:text-white dark:hover:bg-gray-800"
            ripple={true}
          >
            <span>بازگشت</span>
          </Button>

          <Button
            placeholder=""
            variant="gradient"
            color="red"
            onClick={handleDelete}
            ripple={true}
          >
            <span>حذف کردن</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
