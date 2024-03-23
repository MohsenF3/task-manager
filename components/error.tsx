"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const { refresh } = useRouter();
  return (
    <main className="flex h-[calc(100vh-23vh)] flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-medium">مشکلی پیش آمده!</h2>
      <button
        className="mt-4 rounded-md bg-green-400 px-4 py-2 text-sm text-white transition-colors hover:bg-green-500"
        onClick={() => refresh()}
      >
        دوباره امتحان کنید
      </button>
    </main>
  );
}
