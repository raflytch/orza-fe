"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FaUser,
  FaMobile,
  FaBrain,
  FaCheckCircle,
  FaCapsules,
} from "react-icons/fa";

const timelineSteps = [
  {
    id: 1,
    title: "Ambil Foto",
    subtitle: "Langkah 1",
    description: "Petani memotret daun tanaman yang bermasalah.",
    icon: <FaUser className="h-4 w-4" />,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    title: "Upload",
    subtitle: "Langkah 2",
    description: "Foto diunggah ke aplikasi Orza.",
    icon: <FaMobile className="h-4 w-4" />,
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    iconBg: "bg-cyan-500",
  },
  {
    id: 3,
    title: "Analisa AI",
    subtitle: "Langkah 3",
    description: "AI menganalisis foto dan mendeteksi penyakit tanaman.",
    icon: <FaBrain className="h-4 w-4" />,
    color: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-500",
  },
  {
    id: 4,
    title: "Solusi & Saran",
    subtitle: "Langkah 4",
    description:
      "Petani mendapat solusi, saran perawatan, dan rekomendasi produk obat.",
    icon: <FaCapsules className="h-4 w-4" />,
    color: "bg-pink-50 border-pink-200 text-pink-700",
    iconBg: "bg-pink-500",
  },
  {
    id: 5,
    title: "Sembuh",
    subtitle: "Langkah 5",
    description: "Tanaman sehat kembali dengan bantuan Orza.",
    icon: <FaCheckCircle className="h-4 w-4" />,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconBg: "bg-emerald-500",
  },
];

export default function HeroSectionFour() {
  return (
    <section className="py-12 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Cara Kerja Orza
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Bagaimana{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Orza
              </span>{" "}
              Membantu Petani
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Proses mudah untuk mendapatkan solusi, saran perawatan, dan
              rekomendasi produk obat terbaik bagi tanaman Anda
            </p>
          </div>
        </BlurFade>

        <div className="relative w-full">
          <div
            className="absolute left-6 right-6 md:left-0 md:right-0 top-1/2 h-0.5 bg-gray-200 z-0"
            style={{
              transform: "translateY(-50%)",
            }}
          ></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 lg:gap-0 relative z-10">
            {timelineSteps.map((step, index) => (
              <BlurFade key={step.id} delay={0.2 + index * 0.12}>
                <div className="flex flex-col items-center text-center w-full max-w-[180px] mx-auto relative">
                  <div className="relative mb-4 z-10">
                    <div
                      className={`w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center text-white border-4 border-white shadow-sm`}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="hidden md:block absolute top-1/2 left-full w-[calc(50%-24px)] h-0.5 bg-gray-300 z-0"
                      style={{
                        display:
                          index === timelineSteps.length - 1
                            ? "none"
                            : undefined,
                        transform: "translateY(-50%)",
                      }}
                    ></div>
                  </div>
                  <Card className="border-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 w-full">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {step.title}
                      </h3>
                      <Badge
                        className={`text-xs px-2 py-0.5 ${step.color} font-medium mb-2`}
                      >
                        {step.subtitle}
                      </Badge>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index !== timelineSteps.length - 1 && (
                    <div className="block md:hidden w-0.5 h-8 bg-gray-300 mx-auto"></div>
                  )}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        <BlurFade delay={0.8}>
          <div className="mt-12 text-center">
            <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Mudah & Cepat Digunakan
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <span className="font-medium text-blue-600">Foto</span> →{" "}
                    <span className="font-medium text-cyan-600">Upload</span> →{" "}
                    <span className="font-medium text-green-600">
                      Analisis AI
                    </span>{" "}
                    →{" "}
                    <span className="font-medium text-pink-600">
                      Solusi & Produk Obat
                    </span>{" "}
                    →{" "}
                    <span className="font-medium text-emerald-600">
                      Tanaman Sehat
                    </span>
                  </p>
                  <p>
                    Dalam hitungan detik, Anda akan mendapatkan informasi
                    lengkap tentang penyakit tanaman, saran perawatan, dan
                    rekomendasi produk obat yang sesuai dengan bantuan teknologi
                    AI.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
