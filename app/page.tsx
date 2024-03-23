import { GithubButton, GoogleButton } from "@/components/home/Button";
import LoginForm from "@/components/home/LoginForm";
import SocialLinks from "@/components/home/SocialLinks";

export default async function Home() {
  return (
    <div className=" w-full h-full pattern-container relative overflow-hidden px-5 md:p-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center flex-col gap-10 h-screen">
          <h1 className="text-4xl font-semibold lg:text-5xl text-blue-600 text-center ">
            به صورت رایگان به ما بپیوندید و وظایف خود را مدیریت کنید!
          </h1>

          <div className="form-container max-w-sm  w-full">
            <LoginForm />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
              <GoogleButton />

              <GithubButton />
            </div>
          </div>
        </div>

        <div className="flex  gap-5 md:gap-0 flex-row px-5 items-center justify-between absolute bottom-6 left-0 right-0 max-w-7xl mx-auto">
          <h3 className="font-semibold text-white">
            ! ساخته شده با <span className="text-red-500">&#10084;</span> توسط
            محسن !
          </h3>

          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
