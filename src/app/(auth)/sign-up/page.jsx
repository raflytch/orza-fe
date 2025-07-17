import AuthBanner from "@/components/auth/auth-banner";
import RegisterForm from "@/components/auth/sign-up/register-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="h-screen flex">
      <div className="w-1/2">
        <AuthBanner />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/sign-in"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
