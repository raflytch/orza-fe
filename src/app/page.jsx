import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ShimmerButton>Click Me</ShimmerButton>
      <InteractiveHoverButton>Get started with Orza</InteractiveHoverButton>
    </div>
  );
}
