"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav className="bg-blue-950 text-white flex justify-between px-4 h-16 items-center">

      {/* Logo */}
      <div className="logo font-bold text-lg justify-center items-center flex">
        <Image
          src="/tea.gif"
          width={44}
          height={44}
          alt="Get me a chai"
          unoptimized
        />

        <span>Get me a chai!</span>
      </div>

      {/* Right Side */}
      <div className="relative">

        {/* Logged In */}
        {session && (
          <>
            {/* Welcome Button */}
            <button
              type="button"
              onClick={() => setDropdown((prev) => !prev)}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Welcome {session.user.name}

              <span className="ml-2 text-xs">
                ▼
              </span>
            </button>

            {/* Dropdown */}
            {dropdown && (
              <div
                className="absolute right-2 top-full mt-1 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50"
                onMouseLeave={() => {
                  setTimeout(() => {
                    setDropdown(false);
                  }, 100);
                }}
              >

                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  onClick={() => setDropdown(false)}
                  className="block px-4 py-3 transition-colors duration-100 hover:bg-gray-200"
                >
                  Dashboard
                </Link>

                <Link href={`/${session.user.name}`}>
                  <button
                    type="button"
                    className="block px-4 py-3 transition-colors duration-100 hover:bg-gray-200"
                  >
                    Your Page
                  </button>
                </Link>


                {/* Logout */}
                <button
                  type="button"
                  onClick={() => {
                    setDropdown(false);
                    signOut();
                  }}
                  className="w-full text-left px-4 py-3 transition-colors duration-100 hover:bg-gray-200"
                >
                  Logout
                </button>

              </div>
            )}
          </>
        )}

        {/* Logged Out */}
        {!session && (
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;