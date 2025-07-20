"use client";

import { images } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaHeart, FaCode, FaLeaf } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const developers = [
  {
    name: "Rafly",
    role: "Full Stack Developer",
    instagram: "https://www.instagram.com/raflytch?igsh=MTgyd2U0YXk4cHlrOA==",
    username: "@raflytch",
  },
  {
    name: "Haikal",
    role: "Full Stack Developer",
    instagram:
      "https://www.instagram.com/mhaikalbintang?igsh=MTY1c3pva3B2cTN6bg==",
    username: "@mhaikalbintang",
  },
  {
    name: "Haekal",
    role: "Machine Learning Engineer",
    instagram:
      "https://www.instagram.com/haekall.hasan?igsh=MWs3eGw1M2J2ZG5jMA==",
    username: "@haekall.hasan",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Image
                src={images.orzaLogo}
                alt="Orza Logo"
                width={40}
                height={40}
                className="rounded-lg ring-2 ring-white/20"
              />
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Orza
                </span>
                <p className="text-xs text-gray-300">Platform Agritech</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                v1.1.0
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                AI Powered
              </Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className="bg-green-500/20 text-green-400 border-0 text-xs flex items-center gap-1">
                <FaLeaf className="h-3 w-3" />
                AI Detection
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-0 text-xs flex items-center gap-1">
                <FaCode className="h-3 w-3" />
                Modern Tech
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border-0 text-xs flex items-center gap-1">
                <FaHeart className="h-3 w-3" />
                Community
              </Badge>
            </div>
            <div className="flex gap-4">
              <Link
                href="/predict"
                className="text-xs hover:text-green-400 transition-colors"
              >
                AI Detection
              </Link>
              <Link
                href="/community"
                className="text-xs hover:text-green-400 transition-colors"
              >
                Komunitas
              </Link>
              <Link
                href="/article"
                className="text-xs hover:text-green-400 transition-colors"
              >
                Artikel
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {developers.map((dev, idx) => (
              <Link
                key={idx}
                href={dev.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium transition-all"
              >
                <FaInstagram className="h-3 w-3" />
                <span>{dev.name}</span>
                <span className="text-gray-400">{dev.role}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
              © {new Date().getFullYear()} Orza. Dibuat dengan
              <FaHeart className="inline h-3 w-3 text-red-500 mx-1" />
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
