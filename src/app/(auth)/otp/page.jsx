import AuthBanner from "@/components/auth/auth-banner";
import OtpForm from "@/components/auth/otp/otp-form";

export default function OtpPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 min-h-screen">
        <AuthBanner />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="w-full max-w-sm lg:max-w-md">
          <OtpForm />
        </div>
      </div>
    </div>
  );
}
