"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { images } from "@/constants/images";
import Image from "next/image";
import { useRegister } from "@/hooks/use-auth";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "raflygamers65@gmail.com",
      password: "password",
      name: "Rafly Aziz Abdillah",
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
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
          Daftar Akun
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-gray-600">
          Daftar dengan email dan password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm md:text-base font-medium text-gray-700"
            >
              Nama
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nama lengkap"
              {...register("name")}
              className={`h-10 text-sm md:text-base border-2 transition-colors ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm md:text-base font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register("email")}
              className={`h-10 text-sm md:text-base border-2 transition-colors ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm md:text-base font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`h-10 text-sm md:text-base pr-10 border-2 transition-colors ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-sm md:text-base bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Daftar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
