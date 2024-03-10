"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();

  useEffect(() => {
    const button = document.querySelector("#menu-button");
    const menu = document.querySelector("#menu");
    const toggleMenu = () => {
      menu.classList.toggle("hidden");
    };
    button.addEventListener("click", toggleMenu);
    return () => {
      button.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <header className="fixed w-full">
      <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-300 bg-opacity-50 bg-[#1b1818]">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src="/logo.png" width={40} height={40} alt="logo" />
          </Link>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span>Online players: 2</span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu">
          <ul className="pt-4 text-base text-gray-300 md:flex md:justify-between md:pt-0">
            <li>
              <Link
                href="/"
                className={`md:p-4 py-2 block hover:text-white ${
                  pathname === "/" ? "text-green-500" : ""
                }`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={`md:p-4 py-2 block hover:text-white ${
                  pathname === "/shop" ? "text-green-500" : ""
                }`}>
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className={`md:p-4 py-2 block hover:text-white ${
                  pathname === "/team" ? "text-green-500" : ""
                }`}>
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/rules"
                className={`md:p-4 py-2 block hover:text-white ${
                  pathname === "/rules" ? "text-green-500" : ""
                }`}>
                Rules
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className={`md:p-4 py-2 block hover:text-white ${
                  pathname === "/leaderboard" ? "text-green-500" : ""
                }`}>
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
