import SideNav from "@/components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden p-5">
      <div className="w-full flex-none md:w-60">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto  bg-gray-900 rounded-md shadow-xl md:mx-10">
        {children}
      </div>
    </div>
  );
}