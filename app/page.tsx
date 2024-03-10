import LoginForm from "@/components/home/LoginForm";
import SocialLinks from "@/components/home/SocialLinks";

export default function Home() {
  return (
    <div className=" w-full h-full pattern-container relative overflow-hidden px-5 md:p-0">
      <div className="flex items-center justify-center flex-col gap-10 h-screen">
        <h1 className="text-4xl font-semibold lg:text-5xl text-blue-600 text-center">
          Join Us For Free And Manage Your Tasks!
        </h1>

        <LoginForm />
      </div>

      <div className="flex flex-col gap-5 md:gap-0 md:flex-row  items-center justify-between px-20 absolute bottom-10 left-0 right-0">
        <h3>
          Created With <span className="text-red-500">&#10084;</span> By Mohsen
        </h3>

        <SocialLinks />
      </div>
    </div>
  );
}
