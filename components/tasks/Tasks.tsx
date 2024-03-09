"use client";

import { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import AddTaskButton from "./AddTaskButton";

export default function Tasks() {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
      {/* carts */}

      <div className="bg-[#181818] rounded-md p-4 flex flex-col justify-between">
        <div className="mb-7">
          {/* title */}
          <h3 className="text-xl font-medium">Lorem ipsum dolor sit amet.</h3>

          {/* description */}
          <p className="text-[13px] mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            deleniti perferendis illo delectus, nam veritatis?
          </p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between">
          {/* left */}

          <button
            onClick={toggleCompleted}
            className={`${
              completed ? "bg-green-400" : "bg-red-400"
            } rounded-full px-2 py-1 text-sm`}
          >
            {completed ? "Completed" : "Incompleted"}
          </button>

          {/* right */}
          <div className="flex items-center gap-3">
            <EditTaskButton />

            <DeleteTaskButton />
          </div>
        </div>
      </div>

      {/* add task */}

      <AddTaskButton style="flex min-h-48 items-center text-gray-400 hover:text-white transition-all duration-150 justify-center rounded-md border border-gray-500 border-dashed">
        <PlusIcon className="w-7 h-7" />
        <span>Add New Task</span>
      </AddTaskButton>
    </div>
  );
}
