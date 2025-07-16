"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { FaLeaf, FaUsers, FaBookOpen, FaGlobeAsia } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Globe } from "@/components/magicui/globe";

const sdgsList = [
  {
    icon: <FaLeaf className="text-green-500 h-5 w-5" />,
    title: "SDG 2: Zero Hunger",
  },
  {
    icon: <FaUsers className="text-blue-500 h-5 w-5" />,
    title: "SDG 8: Decent Work & Economic Growth",
  },
  {
    icon: <FaBookOpen className="text-yellow-500 h-5 w-5" />,
    title: "SDG 12: Responsible Consumption & Production",
  },
];

export default function HeroSectionThree() {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center px-2 md:px-4">
      <BlurFade>
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <FaGlobeAsia className="text-green-600 h-8 w-8 md:h-10 md:w-10" />
            <h2 className="text-2xl font-extrabold drop-shadow-lg md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Orza
              </span>{" "}
              Berdampak Global
            </h2>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium">
            Orza berdampak secara global dengan membantu petani mendeteksi
            penyakit tanaman, membangun komunitas agrikultur, dan menyediakan
            edukasi berkelanjutan. Dengan teknologi dan kolaborasi, Orza
            mendukung pencapaian SDGs di berbagai negara dan memperkuat
            ketahanan pangan dunia.
          </p>
        </div>
      </BlurFade>
      <BlurFade delay={0.1}>
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 md:mb-10">
          {sdgsList.map((sdg, i) => (
            <Badge
              key={sdg.title}
              className="px-3 py-2 text-[0.75rem] md:text-xs font-semibold flex items-center gap-2 bg-white dark:bg-neutral-900 border border-green-200 dark:border-green-900"
            >
              {sdg.icon}
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                {sdg.title}
              </span>
            </Badge>
          ))}
        </div>
      </BlurFade>
      <BlurFade delay={0.2}>
        <div className="w-full flex items-center justify-center">
          <Globe className="relative w-full max-w-[700px] h-[300px] md:h-[450px] lg:h-[600px]" />
        </div>
      </BlurFade>
    </section>
  );
}
