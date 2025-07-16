import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { RocketIcon, PersonIcon, FileTextIcon } from "@radix-ui/react-icons";

export default function HeroSectionTwo() {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-background via-white to-slate-100 dark:from-background dark:via-neutral-900 dark:to-neutral-950 flex flex-col items-center">
      <div className="max-w-3xl text-center mb-14">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 drop-shadow-lg">
          Selamat Datang di Orza
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
          Orza adalah aplikasi agritech untuk deteksi penyakit tanaman,
          komunitas petani, dan artikel edukasi.
        </p>
        <div className="flex justify-center gap-6">
          <Button size="lg" className="shadow-xl shadow-primary/20">
            Mulai Sekarang
          </Button>
          <Button variant="outline" size="lg" className="shadow-lg">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
      <div className="w-full max-w-6xl px-4">
        <BentoGrid className="gap-8">
          <BentoCard
            name="Deteksi Penyakit Tanaman"
            description="Gunakan AI untuk mendeteksi penyakit pada tanaman secara cepat dan akurat."
            Icon={RocketIcon}
            href="#"
            cta="Coba Deteksi"
            className="col-span-3 lg:col-span-1 bg-white dark:bg-neutral-900 shadow-2xl shadow-green-200/40 dark:shadow-green-900/30 border border-green-100 dark:border-green-900"
          />
          <BentoCard
            name="Komunitas Agritech"
            description="Bergabung dengan komunitas petani dan pakar agritech untuk berbagi pengalaman dan solusi."
            Icon={PersonIcon}
            href="#"
            cta="Gabung Komunitas"
            className="col-span-3 lg:col-span-1 bg-white dark:bg-neutral-900 shadow-2xl shadow-blue-200/40 dark:shadow-blue-900/30 border border-blue-100 dark:border-blue-900"
          />
          <BentoCard
            name="Artikel Edukasi"
            description="Baca artikel terbaru seputar teknologi pertanian, tips, dan inovasi agritech."
            Icon={FileTextIcon}
            href="#"
            cta="Baca Artikel"
            className="col-span-3 lg:col-span-1 bg-white dark:bg-neutral-900 shadow-2xl shadow-yellow-200/40 dark:shadow-yellow-900/30 border border-yellow-100 dark:border-yellow-900"
          />
        </BentoGrid>
      </div>
    </section>
  );
}
