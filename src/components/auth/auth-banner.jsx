import { images } from "@/constants/images";
import Image from "next/image";

export default function AuthBanner() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images.imageHero2}
          alt="Orza Agriculture Technology"
          fill
          sizes="50vw"
          className="object-cover object-center w-full h-full"
          priority
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
