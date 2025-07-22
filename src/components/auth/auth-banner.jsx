import { images } from "@/constants/images";
import Image from "next/image";

export default function AuthBanner() {
  return (
    <div className="relative min-h-screen h-full w-full overflow-hidden flex">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={images.imageHero2}
          alt="Orza Agriculture Technology"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
