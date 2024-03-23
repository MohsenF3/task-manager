import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { handleLogout } from "@/lib/actions";
import defaultImage from "../public/default-user.svg";
import { auth } from "@/auth";
import SwitchTheme from "./ThemeSwitcher";

export default async function SideNav() {
  const session = await auth();

  return (
    <div className="flex h-full shadow-xl flex-col px-3 py-4 md:px-2 dark:bg-gray-900 bg-[#E5E1DA] rounded-md ">
      {/* top */}
      <div className="mb-2 flex flex-row justify-between items-center md:flex-col md:justify-normal md:items-baseline   gap-3 h-20 rounded-md text-white  p-3 md:h-40">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative">
            <Image
              src={session?.user?.image ? session.user.image : defaultImage}
              alt="User Image"
              fill
              className="rounded-xl object-contain"
            />
          </div>
          <span className="text-lg font-medium dark:text-white text-black">
            {session?.user?.name}
          </span>
        </div>

        {/* switch theme button on mobile screen */}
        <div className="block md:hidden">
          <SwitchTheme />
        </div>
      </div>

      {/* links */}
      <div className="flex grow flex-row  justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>

        {/* switch theme button on desktop screen */}
        <div className="md:block hidden">
          <SwitchTheme />
        </div>

        {/* auth button */}
        <form action={handleLogout}>
          <button
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:dark:bg-[#181818] hover:border-b-8 hover:border-green-600 hover:bg-[#FBF9F1] md:hover:border-r-8 md:hover:border-b-0  md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-200"
            type="submit"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">خارج شدن</div>
          </button>
        </form>
      </div>
    </div>
  );
}
