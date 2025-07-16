import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaLeaf, FaUsers, FaBookOpen, FaArrowRight } from "react-icons/fa";
import { images } from "@/constants/images";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";

function highlightOrza(text) {
  return text.split(/(Orza)/gi).map((part, i) =>
    part.toLowerCase() === "orza" ? (
      <span
        key={i}
        className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent font-bold"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function HeroSectionTwo() {
  return (
    <section className="w-full py-24 flex flex-col items-center px-2 md:px-4">
      <BlurFade>
        <div className="max-w-3xl text-center mb-14 mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg text-primary">
            {highlightOrza("Selamat Datang di Orza")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium text-muted-foreground">
            {highlightOrza(
              "Orza adalah aplikasi agritech untuk deteksi penyakit tanaman, komunitas petani, dan artikel edukasi."
            )}
          </p>
          <div className="flex justify-center gap-6 mb-10">
            <Button
              size="lg"
              className="shadow-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-0"
            >
              Mulai Sekarang
            </Button>
            <Button variant="outline" size="lg" className="shadow">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </BlurFade>
      <div className="w-full max-w-6xl mx-auto px-1 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <BlurFade delay={0.1}>
            <Card className="overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow border flex flex-col h-full w-full justify-between border-green-100 dark:border-green-900">
              <CardHeader className="flex flex-col items-center gap-2">
                <FaLeaf className="h-12 w-12 text-green-500" />
                <CardTitle className="text-center text-xl md:text-2xl font-bold">
                  Deteksi Penyakit Tanaman
                </CardTitle>
                <CardDescription className="text-center text-base md:text-lg">
                  Gunakan AI untuk mendeteksi penyakit pada tanaman secara cepat
                  dan akurat.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-4 gap-4">
                <Image
                  src={images.imageHero}
                  alt="Deteksi Penyakit"
                  width={160}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="w-full flex justify-center mt-2">
                  <span className="text-green-600 underline underline-offset-4 font-medium flex items-center gap-2 cursor-pointer text-base md:text-lg">
                    Mulai Deteksi <FaArrowRight className="inline-block" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
          <BlurFade delay={0.2}>
            <Card className="overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow border flex flex-col h-full w-full justify-between border-blue-100 dark:border-blue-900">
              <CardHeader className="flex flex-col items-center gap-2">
                <FaUsers className="h-12 w-12 text-blue-500" />
                <CardTitle className="text-center text-xl md:text-2xl font-bold">
                  Komunitas Agritech
                </CardTitle>
                <CardDescription className="text-center text-base md:text-lg">
                  Bergabung dengan komunitas petani dan pakar agritech untuk
                  berbagi pengalaman dan solusi.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-4 gap-4">
                <Image
                  src={images.imageHero2}
                  alt="Komunitas Agritech"
                  width={160}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="w-full flex justify-center mt-2">
                  <span className="text-blue-600 underline underline-offset-4 font-medium flex items-center gap-2 cursor-pointer text-base md:text-lg">
                    Gabung Komunitas <FaArrowRight className="inline-block" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
          <BlurFade delay={0.3}>
            <Card className="overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow border flex flex-col h-full w-full justify-between border-yellow-100 dark:border-yellow-900">
              <CardHeader className="flex flex-col items-center gap-2">
                <FaBookOpen className="h-12 w-12 text-yellow-500" />
                <CardTitle className="text-center text-xl md:text-2xl font-bold">
                  Artikel Edukasi
                </CardTitle>
                <CardDescription className="text-center text-base md:text-lg">
                  Baca artikel terbaru seputar teknologi pertanian, tips, dan
                  inovasi agritech.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-4 gap-4">
                <Image
                  src={images.imageHero3}
                  alt="Artikel Edukasi"
                  width={160}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="w-full flex justify-center mt-2">
                  <span className="text-yellow-600 underline underline-offset-4 font-medium flex items-center gap-2 cursor-pointer text-base md:text-lg">
                    Baca Artikel <FaArrowRight className="inline-block" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
