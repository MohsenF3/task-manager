"use client";

import { useTheme } from "next-themes";
import { ChangeEvent, useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!mounted) return null;
    e.target.checked ? setTheme("light") : setTheme("dark");
  };

  return (
    <label className="switch ">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={theme === "light"}
      />
      <span className="slider dark:bg-[#181818] "></span>
    </label>
  );
}