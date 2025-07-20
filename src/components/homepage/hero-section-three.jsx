import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function HeroSectionThree() {
  return (
    <section className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Pertanyaan yang Sering Diajukan (FAQ) – Orza</h2>
      <div className="rounded-xl shadow-sm bg-white/90 border border-gray-200 p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="bg-gray-50 rounded-lg mb-2">
            <AccordionTrigger className="font-semibold text-gray-800 px-5">Apa itu Orza?</AccordionTrigger>
            <AccordionContent className="text-gray-700 px-5">
              Orza adalah platform agritech yang membantu petani mendeteksi penyakit tanaman, berbagi pengalaman, dan mengakses artikel edukasi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-gray-50 rounded-lg mb-2">
            <AccordionTrigger className="font-semibold text-gray-800 px-5">Bagaimana cara kerja AI Detection?</AccordionTrigger>
            <AccordionContent className="text-gray-700 px-5">
              AI Orza menganalisis foto daun tanaman yang diunggah pengguna untuk mendeteksi penyakit secara otomatis dan akurat.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-gray-50 rounded-lg mb-2">
            <AccordionTrigger className="font-semibold text-gray-800 px-5">Apa saja fitur utama Orza?</AccordionTrigger>
            <AccordionContent className="text-gray-700 px-5">
              Fitur utama: Deteksi AI, Komunitas Petani, Artikel Edukasi, Riwayat Prediksi, dan Dashboard Statistik.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-gray-50 rounded-lg mb-2">
            <AccordionTrigger className="font-semibold text-gray-800 px-5">Apakah Orza gratis digunakan?</AccordionTrigger>
            <AccordionContent className="text-gray-700 px-5">
              Ya, Orza dapat digunakan secara gratis oleh petani, pelajar, dan masyarakat umum.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="bg-gray-50 rounded-lg mb-2">
            <AccordionTrigger className="font-semibold text-gray-800 px-5">Bagaimana cara bergabung komunitas?</AccordionTrigger>
            <AccordionContent className="text-gray-700 px-5">
              Klik menu "Gabung Komunitas" di halaman utama untuk berdiskusi dan berbagi pengalaman dengan petani lain.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="bg-gray-50 rounded-lg">
            <AccordionTrigger className="font-semibold text-gray-800 px-5">Bagaimana mengakses riwayat prediksi?</AccordionTrigger>
            <AccordionContent className="text-gray-700 px-5">
              Riwayat prediksi dapat diakses melalui dashboard setelah login, lengkap dengan detail hasil analisis.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}