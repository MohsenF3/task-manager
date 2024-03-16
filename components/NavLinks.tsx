"use client";

import {
  HomeIcon,
  CheckIcon,
  ListBulletIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "All Tasks", href: "/tasks", icon: HomeIcon },
  {
    name: "Important",
    href: "/tasks/important",
    icon: ListBulletIcon,
  },
  { name: "Completed", href: "/tasks/completed", icon: CheckIcon },
  { name: "Do It Now", href: "/tasks/incompleted", icon: DocumentTextIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:dark:bg-[#181818] hover:bg-[#FBF9F1] hover:border-b-8 md:hover:border-r-8 md:hover:border-b-0 hover:border-green-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              pathname === link.href
                ? "dark:bg-[#181818] bg-[#FBF9F1] md:border-b-0 border-b-8  md:border-r-8 border-green-600"
                : ""
            } transition-all duration-200`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
