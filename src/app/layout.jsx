import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import QueryProvider from "@/providers/query-provider";
import ReduxProvider from "@/providers/redux-provider";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Orza - Platform Agritech",
  description: "Platform teknologi pertanian untuk deteksi penyakit tanaman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        <ReduxProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
