import {
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
  DialogBody,
  Typography,
  Textarea,
  Input,
} from "./material";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TaskModal({ open, onOpen, taskType }: TaskModalProps) {
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
        <div className="grid gap-6">
          <Input label="Title" crossOrigin="" />
          <Textarea label="Description" />

          <div className="flex items-center justify-between">
            <h3>Toggle Important:</h3>
            <label className="checkbox-container">
              <input type="checkbox" />
              <div className="checkmark"></div>
            </label>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2" placeholder="">
        <Button
          variant="gradient"
          color="green"
          onClick={onOpen}
          placeholder=""
          className="flex items-center gap-2"
        >
          {taskType === "add" && <PlusIcon className="w-4 h-4" />}
          {taskType === "add" ? "Add Task" : "Save Changes"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
