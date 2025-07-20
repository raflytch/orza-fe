"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import {
  FaLeaf,
  FaUsers,
  FaIndustry,
  FaRobot,
  FaHandsHelping,
  FaArrowRight,
  FaChartLine,
  FaSeedling,
  FaGraduationCap,
} from "react-icons/fa";
import { Safari } from "../magicui/safari";
import { Card, CardContent } from "@/components/ui/card";
import { images } from "@/constants/images";
import Link from "next/link";

const benefitsList = [
  {
    icon: <FaLeaf className="text-green-500 h-5 w-5" />,
    title: "Sektor Pertanian",
    description:
      "Meningkatkan produktivitas petani dengan deteksi dini penyakit tanaman dan pencegahan kerugian panen yang signifikan",
  },
  {
    icon: <FaIndustry className="text-blue-500 h-5 w-5" />,
    title: "Industri Agribisnis",
    description:
      "Mengoptimalkan rantai pasok dan mengurangi risiko bisnis melalui prediksi penyakit yang akurat dan real-time",
  },
  {
    icon: <FaChartLine className="text-purple-500 h-5 w-5" />,
    title: "Ekonomi Nasional",
    description:
      "Mengurangi kerugian ekonomi akibat gagal panen dan meningkatkan ketahanan pangan nasional",
  },
  {
    icon: <FaSeedling className="text-orange-500 h-5 w-5" />,
    title: "Lingkungan Berkelanjutan",
    description:
      "Mengurangi penggunaan pestisida berlebihan dengan diagnosis yang tepat sasaran dan ramah lingkungan",
  },
  {
    icon: <FaGraduationCap className="text-indigo-500 h-5 w-5" />,
    title: "Edukasi & Penelitian",
    description:
      "Menyediakan data berharga untuk penelitian akademik dan pengembangan teknologi pertanian masa depan",
  },
  {
    icon: <FaUsers className="text-pink-500 h-5 w-5" />,
    title: "Komunitas Petani",
    description:
      "Membangun jaringan petani yang saling berbagi pengetahuan dan pengalaman dalam mengatasi masalah tanaman",
  },
];

export default function HeroSectionThree() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <BlurFade>
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
          <div className="flex justify-center items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <FaRobot className="text-white h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black">
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                AI Detection
              </span>{" "}
              <span className="text-gray-800 dark:text-white">
                Revolusi Pertanian
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-semibold mb-3 leading-relaxed">
              Deteksi Penyakit Tanaman Berbasis AI dengan Teknologi Machine
              Learning & Artificial Intelligence
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              Fitur inti yang memungkinkan pengguna mengunggah foto daun
              tanaman. Model Machine Learning akan melakukan analisis gambar
              untuk identifikasi awal, yang kemudian disempurnakan oleh
              Artificial Intelligence untuk memberikan diagnosis yang lebih
              akurat dan deskriptif.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { label: "Akurasi AI", value: "95%", color: "text-green-600" },
              { label: "Waktu Deteksi", value: "<3s", color: "text-blue-600" },
              {
                label: "Jenis Tanaman",
                value: "50+",
                color: "text-purple-600",
              },
              {
                label: "Diagnosis Penyakit",
                value: "200+",
                color: "text-orange-600",
              },
            ].map((stat, index) => (
              <Card key={index} className="border bg-white/80 backdrop-blur-sm">
                <CardContent className="p-3 text-center">
                  <div
                    className={`text-lg sm:text-xl font-bold ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="w-full max-w-6xl mx-auto mb-8 sm:mb-12">
          <Safari
            url="https://orza-fe.vercel.app"
            className="w-full"
            imageSrc="https://ik.imagekit.io/72mu50jam/ai-detection.png?updatedAt=1753013906609"
            width={1200}
            height={750}
          />
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Manfaat untuk Berbagai Sektor
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Teknologi AI Detection kami memberikan dampak positif yang luas
              untuk berbagai sektor dan stakeholder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefitsList.map((benefit, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg hover:bg-white/95 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 rounded-lg group-hover:from-green-100 group-hover:to-green-200 dark:group-hover:from-green-900/30 dark:group-hover:to-green-800/30 transition-all duration-300">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-2">
                        {benefit.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.4}>
        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/predict">
            <button className="group relative overflow-hidden inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:text-white">
              <span className="relative z-10 flex items-center gap-3">
                <FaHandsHelping className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Mulai Deteksi AI Sekarang</span>
                <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </button>
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}
