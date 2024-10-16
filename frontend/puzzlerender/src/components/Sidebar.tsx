"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoTimeOutline, IoBookOutline } from "react-icons/io5";
import { FiCreditCard } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { puzzles } from "@/app/(pages)/dashboard/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarContent {
  title: string;
  icon: any;
  link: string;
}

const sidebarContent: SidebarContent[] = [
    {
      title: "Dashboard",
      icon: MdOutlineSpaceDashboard,
      link: "/dashboard",
    },
    {
      title: "History",
      icon: IoTimeOutline,
      link: "/history",
    },
    {
      title: "Library",
      icon: IoBookOutline,
      link: "/library",
    },
    {
      title: "Pricing",
      icon: FiCreditCard,
      link: "/pricing",
    },
    {
      title: "Export",
      icon: GoShareAndroid,
      link: "/export",
    },
  ];

const Sidebar = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // const filteredPuzzles = puzzles.filter(
  //   (puzzle) =>
  //     puzzle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     puzzle.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  

  return (
    <div className="w-[31vw] min-h-screen border-r border-r-gray-300 flex items-start justify-start pt-6 flex-col space-y-3">
      <div className="w-full flex justify-between items-center font-medium text-xl px-3">
        <div className="flex w-full gap-2">
          <Avatar title="Your avatar">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <Select>
            <SelectTrigger className="w-2/3 border-none focus:ring-0 focus:border-none text-xl active:border-none" title="Your name">
              <SelectValue placeholder="Chad Bosewick" className="text-2xl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <FaRegBell className="font-bold text-2xl" title="Notifications" />
      </div>
      <div className="w-full p-2 relative font-medium">
        <CiSearch className="absolute inset-y-0 left-3 flex items-center pointer-events-none mt-5 ml-2 text-2xl text-[#5A5A5A]" />
        <input
          type="search"
          placeholder="Search for anything"
          title="Search for anything"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#F5F5F5] w-full p-3 rounded-md outline-none pl-12 text-[#5A5A5A]"
        />
      </div>

      <div className="pt-10 w-full space-y-2">
        {sidebarContent.map((menuItem, index) => (
          <div
            key={index}
            title={menuItem.title}
            className={`hover:bg-slate-100 w-full px-3 ${
              menuItem.link === pathname ? "bg-slate-100" : ""
            }`}
          >
            <Link
              href={menuItem.link}
              className={`w-full p-3 flex items-center gap-4  hover:text-[#212121] ${
                menuItem.link === pathname ? "text-[#212121]" : "text-[#757575]"
              }`}
            >
              <menuItem.icon className="text-2xl" />
              <p>{menuItem.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
