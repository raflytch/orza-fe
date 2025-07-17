import { FaLeaf } from "react-icons/fa";
import { images } from "@/constants/images";
import Image from "next/image";

export default function AuthBanner() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white p-8">
      <div className="text-center space-y-6 max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaLeaf className="text-5xl" />
          <h1 className="text-5xl font-bold">Orza</h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">
            Selamat Datang di Platform Agritech
          </h2>
          <p className="text-green-100 text-xl">
            Bergabunglah dengan ribuan petani yang menggunakan teknologi AI
            untuk mendeteksi penyakit tanaman dan meningkatkan hasil panen.
          </p>
        </div>

        <div className="mt-8">
          <Image
            src={images.imageHero}
            alt="Orza Agriculture Technology"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8 text-center">
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-green-100 text-sm">Petani Terdaftar</div>
          </div>
          <div>
            <div className="text-3xl font-bold">95%</div>
            <div className="text-green-100 text-sm">Akurasi Deteksi</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-green-100 text-sm">Dukungan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
