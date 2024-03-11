import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { handleLogout } from "@/lib/actions";
import defaultImage from "../public/default-user.svg";
import { auth } from "@/auth";

export default async function SideNav() {
  const session = await auth();

  return (
    <div className="flex h-full shadow-xl flex-col px-3 py-4 md:px-2 bg-gray-900 rounded-md ">
      {/* tops */}
      <div className="mb-2 flex items-center gap-3 h-20 rounded-md text-white  p-3 md:h-40">
        <div className="w-16 h-16 relative  ">
          <Image
            src={session?.user?.image ? session.user.image : defaultImage}
            alt="User Image"
            fill
            className="rounded-xl object-contain"
          />
        </div>
        <span className="text-lg font-medium">{session?.user?.name}</span>
      </div>

      {/* links */}
      <div className="flex grow flex-row  justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>

        {/* auth button */}
        <form action={handleLogout}>
          <button
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-[#181818] hover:border-b-8 hover:border-green-600 md:hover:border-r-8 md:hover:border-b-0  md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-200"
            type="submit"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
