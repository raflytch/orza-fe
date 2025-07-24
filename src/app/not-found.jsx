"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen py-30 px-4 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6"
            >
              <FaExclamationTriangle className="h-16 w-16 text-white" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">?</span>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            >
              404
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl font-semibold text-gray-800"
            >
              Halaman Tidak Ditemukan
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-md mx-auto"
            >
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin
              halaman tersebut telah dipindahkan atau tidak tersedia.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          >
            <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm hover:border-green-300 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Beranda</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Kembali ke halaman utama
                </p>
                <Link href="/">
                  <Button className="w-full bg-green-600 hover:bg-green-700 border-0">
                    Ke Beranda
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Prediksi AI
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Deteksi penyakit tanaman
                </p>
                <Link href="/predict">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 border-0">
                    Mulai Prediksi
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm hover:border-purple-300 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Komunitas</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Bergabung dengan petani
                </p>
                <Link href="/community">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 border-0">
                    Gabung Komunitas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-8"
          >
            <p className="text-sm text-gray-500">
              Butuh bantuan? Hubungi tim support kami
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
