import { ReactNode } from "react";
import { Tooltip } from "./material";

export default function CustomTooltip({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Tooltip
      content={title}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      className="font-medium bg-white text-dark dark:bg-black dark:text-white"
    >
      {children}
    </Tooltip>
  );
}
