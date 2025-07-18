"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import { images } from "@/constants/images";
import Image from "next/image";

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setCookie("token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    }
  }, [searchParams, router]);

  const token = searchParams.get("token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src={images.orzaLogo}
              alt="Orza Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold text-green-600">Orza</h1>
          </div>

          {token ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Login Berhasil!
              </h2>
              <p className="text-gray-600 mb-4">
                Selamat datang kembali di Orza. Anda akan diarahkan ke beranda
                dalam beberapa detik.
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  Mengarahkan ke beranda...
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Login Gagal
              </h2>
              <p className="text-gray-600 mb-4">
                Terjadi kesalahan saat proses login. Anda akan diarahkan ke
                halaman login.
              </p>
              <div className="flex items-center justify-center gap-2 text-red-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  Mengarahkan ke login...
                </span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-4 border-t border-gray-200"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <FaLeaf className="text-green-500" />
              <span>Terima kasih telah menggunakan Orza</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Image
                  src={images.orzaLogo}
                  alt="Orza Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h1 className="text-3xl font-bold text-green-600">Orza</h1>
              </div>
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Memproses...
              </h2>
              <p className="text-gray-600">Mohon tunggu sebentar</p>
            </div>
          </div>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
