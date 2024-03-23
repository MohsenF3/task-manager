import SideNav from "@/components/SideNav";
import { TasksProvider } from "@/context/TasksProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:gap-0 gap-5 md:flex-row md:overflow-hidden p-5 max-w-[1500px] mx-auto w-full">
      <div className="w-full flex-none md:w-60">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto dark:bg-gray-900 bg-[#E5E1DA] rounded-md shadow-xl md:mr-10">
        <TasksProvider>{children}</TasksProvider>
      </div>
    </div>
  );
}
