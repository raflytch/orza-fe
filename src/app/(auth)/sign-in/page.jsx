import AuthBanner from "@/components/auth/auth-banner";
import LoginForm from "@/components/auth/sign-in/login-form";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2">
        <AuthBanner />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="w-full max-w-sm lg:max-w-md">
          <div className="mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Kembali ke Beranda
            </Link>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Belum punya akun?{" "}
              <Link
                href="/sign-up"
                className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2 transition-colors"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
