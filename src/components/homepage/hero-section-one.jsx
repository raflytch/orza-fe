"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
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
import { useRouter } from "next/navigation";

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
    icon: <FaLeaf className="h-5 w-5 text-green-500" />,
    title: "Deteksi Penyakit Tanaman",
    description:
      "Gunakan AI untuk mendeteksi penyakit pada tanaman secara cepat dan akurat.",
    image: images.imageHero,
    badge: "AI Powered",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    linkText: "Mulai Deteksi",
    linkColor: "text-green-600",
    link: "/predict",
  },
  {
    icon: <FaUsers className="h-5 w-5 text-blue-500" />,
    title: "Komunitas Agritech",
    description:
      "Bergabung dengan komunitas petani dan pakar agritech untuk berbagi pengalaman.",
    image: images.imageHero2,
    badge: "Community",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    linkText: "Gabung Komunitas",
    linkColor: "text-blue-600",
    link: "/community",
  },
  {
    icon: <FaBookOpen className="h-5 w-5 text-yellow-500" />,
    title: "Artikel Edukasi",
    description:
      "Baca artikel terbaru seputar teknologi pertanian dan inovasi agritech.",
    image: images.imageHero3,
    badge: "Educational",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    linkText: "Baca Artikel",
    linkColor: "text-yellow-600",
    link: "/article",
  },
];

export default function HeroSectionOne() {
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    setHasToken(!!token);
  }, []);

  const handleStart = () => {
    if (hasToken) {
      router.push("/predict");
    } else {
      router.push("/sign-in");
    }
  };

  const handleFeatureClick = (link) => {
    router.push(link);
  };

  return (
    <section className="w-full py-14 sm:py-16 md:py-18 flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8">
      <BlurFade>
        <div className="max-w-3xl text-center mb-7 sm:mb-8 md:mb-10 mx-auto flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 flex flex-col items-center gap-2">
            <span>{highlightOrza("Selamat Datang di Orza")}</span>
            <span>
              <Image
                src={images.orzaLogo}
                alt="Orza Logo"
                width={44}
                height={44}
                className="inline-block rounded-lg"
                priority
              />
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-5 font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
            {highlightOrza(
              "Orza adalah aplikasi agritech untuk deteksi penyakit tanaman, komunitas petani, dan artikel edukasi."
            )}
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleStart}
              className="group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-0 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <FaPlay className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300 z-10" />
              <span className="z-10">Mulai Sekarang</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-full z-0 pointer-events-none" />
            </button>
          </div>
        </div>
      </BlurFade>

      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
          {features.map((feature, i) => (
            <BlurFade key={i} delay={0.1 + i * 0.1}>
              <div
                className="group relative overflow-hidden rounded-lg bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border border-gray-200 dark:border-neutral-700 hover:ring-2 hover:ring-green-300 transition-all duration-300 hover:-translate-y-1 hover:scale-102 cursor-pointer"
                onClick={() => handleFeatureClick(feature.link)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleFeatureClick(feature.link);
                }}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 rounded-md group-hover:from-green-100 group-hover:to-green-200 dark:group-hover:from-green-900/30 dark:group-hover:to-green-800/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <Badge
                      className={`${feature.badgeColor} text-[10px] font-semibold px-2 py-0.5 rounded-full`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    {feature.description}
                  </p>

                  <div className="relative mb-3 overflow-hidden rounded-md">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={240}
                      height={120}
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                  </div>

                  <div className="flex justify-center">
                    <button
                      tabIndex={-1}
                      className={`group/link ${feature.linkColor} font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all duration-300 z-10 pointer-events-none`}
                    >
                      <span className="z-10">{feature.linkText}</span>
                      <FaArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform duration-300 z-10" />
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0" />
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
