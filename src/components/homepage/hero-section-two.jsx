"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaLeaf,
  FaUsers,
  FaBookOpen,
  FaArrowRight,
  FaPlay,
} from "react-icons/fa";
import { images } from "@/constants/images";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";

function highlightOrza(text) {
  return text.split(/(Orza)/gi).map((part, i) =>
    part.toLowerCase() === "orza" ? (
      <span
        key={i}
        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent font-black"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

const features = [
  {
    icon: <FaLeaf className="h-6 w-6 text-green-500" />,
    title: "Deteksi Penyakit Tanaman",
    description:
      "Gunakan AI untuk mendeteksi penyakit pada tanaman secara cepat dan akurat",
    image: images.imageHero,
    badge: "AI Powered",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    linkText: "Mulai Deteksi",
    linkColor: "text-green-600",
  },
  {
    icon: <FaUsers className="h-6 w-6 text-blue-500" />,
    title: "Komunitas Agritech",
    description:
      "Bergabung dengan komunitas petani dan pakar agritech untuk berbagi pengalaman",
    image: images.imageHero2,
    badge: "Community",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    linkText: "Gabung Komunitas",
    linkColor: "text-blue-600",
  },
  {
    icon: <FaBookOpen className="h-6 w-6 text-yellow-500" />,
    title: "Artikel Edukasi",
    description:
      "Baca artikel terbaru seputar teknologi pertanian dan inovasi agritech",
    image: images.imageHero3,
    badge: "Educational",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    linkText: "Baca Artikel",
    linkColor: "text-yellow-600",
  },
];

export default function HeroSectionTwo() {
  return (
    <section className="w-full py-24 sm:py-24 md:py-24 lg:py-30 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <BlurFade>
        <div className="max-w-4xl text-center mb-10 sm:mb-12 md:mb-16 mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 drop-shadow-lg">
            {highlightOrza("Selamat Datang di Orza")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            {highlightOrza(
              "Orza adalah aplikasi agritech untuk deteksi penyakit tanaman, komunitas petani, dan artikel edukasi."
            )}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
            <Button
              size="lg"
              className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-0 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <FaPlay className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform duration-300 z-10" />
              <span className="z-10">Mulai Sekarang</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="z-10">Pelajari Lebih Lanjut</span>
              <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 z-10" />
            </Button>
          </div>
        </div>
      </BlurFade>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {features.map((feature, i) => (
            <BlurFade key={i} delay={0.1 + i * 0.1}>
              <div className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 rounded-lg group-hover:from-green-100 group-hover:to-green-200 dark:group-hover:from-green-900/30 dark:group-hover:to-green-800/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <Badge
                      className={`${feature.badgeColor} text-xs font-semibold px-2 py-1 rounded-full`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={320}
                      height={180}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="flex justify-center">
                    <button
                      className={`group/link ${feature.linkColor} font-bold text-sm sm:text-base flex items-center gap-1 hover:gap-2 transition-all duration-300 z-10`}
                    >
                      <span className="z-10">{feature.linkText}</span>
                      <FaArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform duration-300 z-10" />
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
