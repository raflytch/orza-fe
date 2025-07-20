import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function HeroSectionThree() {
  return (
    <section className="max-w-xl mx-auto py-8 px-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600 bg-clip-text text-transparent">
          Pertanyaan Umum Orza
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          Pertanyaan yang sering diajukan tentang fitur dan penggunaan Orza
        </p>
      </div>
      <div className="rounded-xl bg-white/95 dark:bg-neutral-900/90 border border-green-100 dark:border-green-900 p-2 sm:p-4">
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            className="mb-2 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-neutral-900/60"
          >
            <AccordionTrigger className="font-medium text-green-800 dark:text-green-200 px-4 py-3 text-base hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              Apa itu Orza?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-200 px-4 pb-3 text-sm">
              Orza adalah platform agritech yang membantu petani mendeteksi
              penyakit tanaman, berbagi pengalaman, dan mengakses artikel
              edukasi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="mb-2 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-neutral-900/60"
          >
            <AccordionTrigger className="font-medium text-green-800 dark:text-green-200 px-4 py-3 text-base hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              Bagaimana cara kerja deteksi kecerdasan buatan?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-200 px-4 pb-3 text-sm">
              Orza menganalisis foto daun tanaman yang diunggah pengguna untuk
              mendeteksi penyakit secara otomatis dan akurat.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="mb-2 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-neutral-900/60"
          >
            <AccordionTrigger className="font-medium text-green-800 dark:text-green-200 px-4 py-3 text-base hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              Apa saja fitur utama Orza?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-200 px-4 pb-3 text-sm">
              Fitur utama: Deteksi kecerdasan buatan, Komunitas Petani, Artikel
              Edukasi, Riwayat Prediksi, dan Dashboard Statistik.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="mb-2 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-neutral-900/60"
          >
            <AccordionTrigger className="font-medium text-green-800 dark:text-green-200 px-4 py-3 text-base hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              Apakah Orza gratis digunakan?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-200 px-4 pb-3 text-sm">
              Untuk saat ini, Orza dapat digunakan secara gratis oleh petani,
              pelajar, dan masyarakat umum.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-5"
            className="mb-2 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-neutral-900/60"
          >
            <AccordionTrigger className="font-medium text-green-800 dark:text-green-200 px-4 py-3 text-base hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              Bagaimana cara bergabung dengan komunitas?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-200 px-4 pb-3 text-sm">
              Klik menu{" "}
              <span className="font-semibold text-green-700 dark:text-green-300">
                Gabung Komunitas
              </span>{" "}
              di halaman utama untuk berdiskusi dan berbagi pengalaman dengan
              petani lain.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-6"
            className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-neutral-900/60"
          >
            <AccordionTrigger className="font-medium text-green-800 dark:text-green-200 px-4 py-3 text-base hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              Bagaimana mengakses riwayat prediksi?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-200 px-4 pb-3 text-sm">
              Riwayat prediksi dapat diakses melalui dashboard setelah login,
              lengkap dengan detail hasil analisis.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
