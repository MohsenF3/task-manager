"use client";

import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import { Tooltip } from "../material";
import { useTasksState } from "@/context/TasksContext";
import { Task } from "@/lib/definition";
import { formatDate } from "@/lib/utils";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function TaskCard({
  id,
  date,
  description,
  isCompleted,
  isImportant,
  title,
}: Task) {
  const { updateCompleted, showConfetti } = useTasksState();
  const [pieces, setPieces] = useState(150);

  useEffect(() => {
    const stopConfetti = setTimeout(() => setPieces(0), 1500);

    return () => {
      clearTimeout(stopConfetti);
    };
  }, [showConfetti]);

  const handleUpdateCompleted = () => {
    const toggleCompleted = !isCompleted;
    updateCompleted({ id, isCompleted: toggleCompleted });
  };

  return (
    <>
      <div className="dark:bg-[#181818] bg-[#FBF9F1] relative rounded-md p-4 flex flex-col justify-between min-h-48">
        <p className="absolute left-1 -top-6 text-sm   font-bold">
          {formatDate(date)}
        </p>
        <div className="mb-7">
          {/* title */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">{title}</h3>
            {isImportant && (
              <Tooltip
                content="Important"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="font-medium bg-white text-dark dark:bg-black dark:text-white"
              >
                <span className=" mx-auto mt-1 block h-4 w-4 animate-pulse rounded-full bg-green-900 content-[''] absolute top-0 right-1" />
              </Tooltip>
            )}
          </div>

          {/* description */}
          <p className="text-[13px] mt-2">{description}</p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between">
          {/* left */}

          <Tooltip
            content={isCompleted ? "Mark as incompleted" : "Mark as completed"}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="font-medium bg-white text-dark dark:bg-black dark:text-white"
          >
            <button
              className={`${
                isCompleted ? "bg-green-400" : "bg-red-400"
              } rounded-full px-2 py-1 text-sm`}
              onClick={handleUpdateCompleted}
            >
              {isCompleted ? "Completed" : "Incompleted"}
            </button>
          </Tooltip>

          {/* right */}
          <div className="flex items-center gap-3">
            <EditTaskButton id={id} />

            <DeleteTaskButton id={id} />
          </div>
        </div>
      </div>
      {showConfetti && <Confetti gravity={0.4} numberOfPieces={pieces} />}
    </>
  );
}
