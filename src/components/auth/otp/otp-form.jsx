"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { images } from "@/constants/images";
import Image from "next/image";
import { useVerifyOtp } from "@/hooks/use-auth";
import { getCookie } from "cookies-next";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP harus 6 digit").max(6, "OTP harus 6 digit"),
});

export default function OtpForm() {
  const [otpValue, setOtpValue] = useState("");
  const verifyOtpMutation = useVerifyOtp();
  const email = getCookie("email");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const handleOtpChange = (value) => {
    setOtpValue(value);
    setValue("otp", value);
    if (value.length === 6) {
      trigger("otp");
    }
  };

  const onSubmit = (data) => {
    verifyOtpMutation.mutate({
      email: email,
      otp: data.otp,
    });
  };

  return (
    <Card className="w-full border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Image
            src={images.orzaLogo}
            alt="Orza Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-green-600">Orza</h1>
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
          Verifikasi OTP
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-gray-600">
          Masukkan kode OTP yang dikirim ke email {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm md:text-base font-medium text-gray-700">
              Kode OTP
            </Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={handleOtpChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && (
              <p className="text-red-500 text-xs text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-sm md:text-base bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
            disabled={verifyOtpMutation.isPending || otpValue.length !== 6}
          >
            {verifyOtpMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              "Verifikasi OTP"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
