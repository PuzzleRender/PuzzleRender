"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-[10vh] bg-white flex items-center justify-center p-8">
      <div className="flex justify-between w-full">
        <div>LOGO</div>
        <div className="flex gap-4 ml-4">
          <Link href={"/"}>
            <h4>Home</h4>
          </Link>
          <Link href={"/puzzles"}>
            <h4>Puzzles</h4>
          </Link>
          <Link href={"/account"}>
            <h4>Account</h4>
          </Link>
          <Link href={"/dashboard"}>
            <h4>Dashboard</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
