"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaLeaf,
  FaUsers,
  FaBookOpen,
  FaBars,
  FaTimes,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile, useLogout } from "@/hooks/use-auth";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const token = getCookie("token");
  const { data: profile } = useProfile();
  const logout = useLogout();

  if (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/otp")
    return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[96vw] sm:w-[90vw] max-w-5xl -translate-x-1/2 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:bg-neutral-900/80 dark:border-neutral-800 flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 transition-all">
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-green-600 text-lg"
        >
          <FaLeaf className="text-green-500" />
          Orza
        </Link>
      </div>
      <div className="sm:hidden flex items-center">
        <button
          aria-label="Menu"
          className="p-2 rounded-lg text-green-600 focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <FaTimes size={28} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <FaBars size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-4">
        <Link
          href="/predict"
          className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors px-2 py-1 rounded-lg"
        >
          <FaLeaf className="text-green-500" />
          Prediksi
        </Link>
        <Link
          href="/community"
          className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg"
        >
          <FaUsers className="text-blue-500" />
          Komunitas
        </Link>
        <Link
          href="/artikel"
          className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-600 transition-colors px-2 py-1 rounded-lg"
        >
          <FaBookOpen className="text-yellow-500" />
          Artikel
        </Link>

        {token && profile?.data ? (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaBell className="text-gray-600 text-lg" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <Image
                    src={profile.data.avatarUrl || "/images/default-avatar.png"}
                    alt={profile.data.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {profile.data.name}
                </div>
                <div className="px-2 py-1.5 text-xs text-gray-500">
                  {profile.data.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <FaSignOutAlt className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="font-medium bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-4 py-1 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="font-medium text-green-600 bg-white border-2 border-green-400 rounded-lg px-4 py-1 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -32, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="sm:hidden fixed left-1/2 top-20 z-40 -translate-x-1/2 w-[90vw]"
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg flex flex-col gap-2 py-4 px-4"
            >
              <Link
                href="/predict"
                className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors px-3 py-3 rounded-xl text-lg"
                onClick={() => setOpen(false)}
              >
                <FaLeaf className="text-green-500" />
                Prediksi
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-3 py-3 rounded-xl text-lg"
                onClick={() => setOpen(false)}
              >
                <FaUsers className="text-blue-500" />
                Komunitas
              </Link>
              <Link
                href="/artikel"
                className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-600 transition-colors px-3 py-3 rounded-xl text-lg"
                onClick={() => setOpen(false)}
              >
                <FaBookOpen className="text-yellow-500" />
                Artikel
              </Link>

              {token && profile?.data ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3">
                    <Image
                      src={
                        profile.data.avatarUrl || "/images/default-avatar.png"
                      }
                      alt={profile.data.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-700">
                        {profile.data.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {profile.data.email}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 font-medium text-gray-700 hover:text-red-600 transition-colors px-3 py-3 rounded-xl text-lg justify-start"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    <FaSignOutAlt className="text-red-500" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="font-medium bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-4 py-3 rounded-xl transition-colors mt-2 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="font-medium text-green-600 bg-white border-2 border-green-400 rounded-xl px-4 py-3 transition-colors mt-2 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
