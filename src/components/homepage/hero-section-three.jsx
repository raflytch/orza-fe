"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import {
  FaLeaf,
  FaUsers,
  FaBookOpen,
  FaGlobeAsia,
  FaChartLine,
  FaHandsHelping,
  FaRecycle,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const sdgsList = [
  {
    icon: <FaLeaf className="text-green-500 h-5 w-5" />,
    title: "SDG 2: Zero Hunger",
    description: "Mengakhiri kelaparan dan mencapai ketahanan pangan",
  },
  {
    icon: <FaUsers className="text-blue-500 h-5 w-5" />,
    title: "SDG 8: Decent Work & Economic Growth",
    description: "Mendorong pertumbuhan ekonomi yang berkelanjutan",
  },
  {
    icon: <FaBookOpen className="text-yellow-500 h-5 w-5" />,
    title: "SDG 12: Responsible Consumption & Production",
    description: "Memastikan pola konsumsi dan produksi yang berkelanjutan",
  },
];

export default function HeroSectionThree() {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center px-4 md:px-6">
      <BlurFade>
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <div className="flex justify-center items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
              <FaGlobeAsia className="text-white h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h2 className="text-3xl font-extrabold drop-shadow-lg md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Orza
              </span>{" "}
              <span className="text-gray-800 dark:text-white">
                Berdampak Global
              </span>
            </h2>
          </div>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Orza berdampak secara global dengan membantu petani mendeteksi
            penyakit tanaman, membangun komunitas agrikultur, dan menyediakan
            edukasi berkelanjutan. Dengan teknologi dan kolaborasi, Orza
            mendukung pencapaian SDGs di berbagai negara dan memperkuat
            ketahanan pangan dunia.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {sdgsList.map((sdg, i) => (
            <Card
              key={i}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm group hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-gray-100 dark:bg-neutral-700 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/20 transition-colors">
                    {sdg.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                      {sdg.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {sdg.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <FaHandsHelping className="h-5 w-5" />
            Bergabung dengan Misi Global Kami
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
