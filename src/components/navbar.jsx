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
  FaUser,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile, useLogout } from "@/hooks/use-auth";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { images } from "@/constants/images";
import NotificationPanel from "@/components/notification-panel";
import { useUnreadCount } from "@/hooks/use-notification";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [token, setToken] = useState(null);
  const { data: profile } = useProfile();
  const logout = useLogout();
  const unreadCount = useUnreadCount();

  useEffect(() => {
    const currentToken = Cookies.get("token");
    setToken(currentToken);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = Cookies.get("token");
      setToken(currentToken);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/otp")
    return null;

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
    setOpen(false);
    setToken(null);
  };

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[96vw] md:w-[90vw] max-w-6xl -translate-x-1/2 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:bg-neutral-900/90 dark:border-neutral-800/50 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 transition-all">
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-green-600 text-xl hover:text-green-700 transition-colors"
        >
          <Image
            src={images.orzaLogo}
            alt="Orza Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          Orza
        </Link>
      </div>

      <div className="lg:hidden flex items-center gap-2">
        {token && profile?.data && <NotificationPanel />}
        <button
          aria-label="Menu"
          className="p-2 rounded-xl text-green-600 hover:bg-green-50 focus:outline-none transition-colors"
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
                <FaTimes size={24} />
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
                <FaBars size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="hidden lg:flex flex-wrap items-center gap-2 lg:gap-6">
        <Link
          href="/predict"
          className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors px-3 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <FaLeaf className="text-green-500" />
          Prediksi
        </Link>
        <Link
          href="/community"
          className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <FaUsers className="text-blue-500" />
          Komunitas
        </Link>
        <Link
          href="/artikel"
          className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-600 transition-colors px-3 py-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
        >
          <FaBookOpen className="text-yellow-500" />
          Artikel
        </Link>

        {token && profile?.data ? (
          <div className="flex items-center gap-3">
            <NotificationPanel />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 rounded-full hover:ring-2 hover:ring-green-200 transition-all"
                >
                  {profile.data.avatarUrl ? (
                    <Image
                      src={profile.data.avatarUrl}
                      alt={profile.data.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <FaUser className="text-green-600 dark:text-green-400 text-sm" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {profile.data.name}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <AlertDialog
                  open={showLogoutDialog}
                  onOpenChange={setShowLogoutDialog}
                >
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        setShowLogoutDialog(true);
                      }}
                      className="text-red-600 dark:text-red-400 cursor-pointer"
                    >
                      <FaSignOutAlt className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin keluar dari akun Anda? Anda akan
                        diarahkan ke halaman login.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Ya, Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="font-medium bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02] shadow-md"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="font-medium text-green-600 bg-white border-2 border-green-500 rounded-lg px-5 py-2 hover:bg-green-50 transition-all transform hover:scale-[1.02] shadow-md"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -32, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed left-1/2 top-20 z-40 -translate-x-1/2 w-[90vw]"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-col gap-1 py-6 px-4 border border-gray-200 dark:border-gray-800"
            >
              <Link
                href="/predict"
                className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors px-4 py-3 rounded-xl text-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => setOpen(false)}
              >
                <FaLeaf className="text-green-500" />
                Prediksi
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors px-4 py-3 rounded-xl text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setOpen(false)}
              >
                <FaUsers className="text-blue-500" />
                Komunitas
              </Link>
              <Link
                href="/artikel"
                className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-600 transition-colors px-4 py-3 rounded-xl text-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                onClick={() => setOpen(false)}
              >
                <FaBookOpen className="text-yellow-500" />
                Artikel
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

              {token && profile?.data ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    {profile.data.avatarUrl ? (
                      <Image
                        src={profile.data.avatarUrl}
                        alt={profile.data.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <FaUser className="text-green-600 dark:text-green-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {profile.data.name}
                      </div>
                    </div>
                  </div>
                  <AlertDialog
                    open={showLogoutDialog}
                    onOpenChange={setShowLogoutDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-3 font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors px-4 py-3 rounded-xl text-lg justify-start hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <FaSignOutAlt className="text-red-500" />
                        Logout
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin keluar dari akun Anda? Anda
                          akan diarahkan ke halaman login.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLogout}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Ya, Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-4">
                  <Link
                    href="/sign-in"
                    className="font-medium bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl transition-all text-lg text-center hover:from-green-600 hover:to-green-700 shadow-md"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="font-medium text-green-600 bg-white border-2 border-green-500 rounded-xl px-4 py-3 transition-all text-lg text-center hover:bg-green-50 shadow-md"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
