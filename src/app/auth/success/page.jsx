"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { Loader2 } from "lucide-react";

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setCookie("token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      router.push("/");
    } else {
      router.push("/sign-in");
    }
  }, [searchParams, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Memproses login...</p>
      </div>
    </div>
  );
}
