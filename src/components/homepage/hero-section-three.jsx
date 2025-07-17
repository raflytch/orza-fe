"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import {
  FaLeaf,
  FaUsers,
  FaBookOpen,
  FaGlobeAsia,
  FaHandsHelping,
  FaArrowRight,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const sdgsList = [
  {
    icon: <FaLeaf className="text-green-500 h-5 w-5" />,
    title: "Zero Hunger",
    description:
      "Mengakhiri kelaparan melalui teknologi pertanian berkelanjutan",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    icon: <FaUsers className="text-blue-500 h-5 w-5" />,
    title: "Economic Growth",
    description: "Mendorong pertumbuhan ekonomi dengan memberdayakan petani",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    icon: <FaBookOpen className="text-yellow-500 h-5 w-5" />,
    title: "Sustainable Production",
    description: "Memastikan pola produksi berkelanjutan di sektor pertanian",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
];

export default function HeroSectionThree() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <BlurFade>
        <div className="max-w-5xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg">
              <FaGlobeAsia className="text-white h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Orza
              </span>{" "}
              <span className="text-gray-800 dark:text-white">
                Berdampak Global
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Orza berdampak secara global dengan membantu petani mendeteksi
            penyakit tanaman, membangun komunitas agrikultur, dan menyediakan
            edukasi berkelanjutan. Dengan teknologi dan kolaborasi, Orza
            mendukung pencapaian SDGs di berbagai negara.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl">
          {sdgsList.map((sdg, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 rounded-lg group-hover:from-green-100 group-hover:to-green-200 dark:group-hover:from-green-900/30 dark:group-hover:to-green-800/30 transition-all duration-300">
                    {sdg.icon}
                  </div>
                  <Badge
                    className={`${sdg.color} text-xs sm:text-sm font-semibold px-2 py-1 rounded-full`}
                  >
                    {sdg.title}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {sdg.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            </div>
          ))}
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <button className="group relative overflow-hidden inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <FaHandsHelping className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300 z-10" />
            <span className="whitespace-nowrap z-10">
              Bergabung dengan Misi Global Kami
            </span>
            <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0" />
          </button>
        </div>
      </BlurFade>
    </section>
  );
}
