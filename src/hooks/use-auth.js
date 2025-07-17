import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.status === "success") {
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        toast.success("Login berhasil!");
        router.push("/");
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Login gagal";
      toast.error(errorMessage);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return () => {
    deleteCookie("token");
    router.push("/sign-in");
  };
};
