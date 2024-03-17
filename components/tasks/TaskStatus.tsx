"use client";

import { updateTaskStatus } from "@/lib/actions";
import { Tooltip, Button } from "../material";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface TaskStatusProps {
  id: string;
  isCompleted: boolean;
}

export default function TaskStatus({ id, isCompleted }: TaskStatusProps) {
  const [isExploding, setIsExploding] = useState(false);
  const [pieces, setPieces] = useState(150);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isExploding) {
      const stopConfetti = setTimeout(() => setPieces(0), 1500);

      return () => {
        clearTimeout(stopConfetti);
      };
    }
  }, [isExploding]);

  const handleUpdateCompleted = async () => {
    setLoading(true);
    const toggleCompleted = !isCompleted;
    await updateTaskStatus({ id, isCompleted: toggleCompleted });
    setIsExploding(!isCompleted ? true : false);
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <>
      <Tooltip
        content={isCompleted ? "Mark as incompleted" : "Mark as completed"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        className="font-medium bg-white text-dark dark:bg-black dark:text-white"
      >
        <Button
          placeholder=""
          size="sm"
          className={`${
            isCompleted ? "bg-green-400" : "bg-red-400"
          } rounded-full capitalize`}
          onClick={handleUpdateCompleted}
          loading={loading}
        >
          {isCompleted ? "Completed" : "Incompleted"}
        </Button>
      </Tooltip>
      {isExploding && <Confetti gravity={0.4} numberOfPieces={pieces} />}
    </>
  );
}
