"use client";

import { useState } from "react";
import {
  Tooltip,
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
} from "../material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteTask } from "@/lib/actions";

export default function DeleteTaskButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(id);
    setLoading(false);
    handleOpen();
  };

  return (
    <>
      <Tooltip
        content="حذف کردن"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        className="font-medium bg-white text-dark dark:bg-black dark:text-white"
      >
        <button className="group" onClick={handleOpen}>
          <TrashIcon className="w-6 h-6 group-hover:text-red-500" />
        </button>
      </Tooltip>

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
            loading={loading}
            ripple={true}
          >
            <span>حذف کردن</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
