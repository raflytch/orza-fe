import AuthBanner from "@/components/auth/auth-banner";
import LoginForm from "@/components/auth/sign-in/login-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="h-screen flex">
      <div className="w-1/2">
        <AuthBanner />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/sign-up"
                className="text-green-600 hover:text-green-700 font-semibold"
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
