import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
} from "@/features/slices/auth-slice";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.status === "success") {
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          sameSite: "lax",
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

export const useRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      dispatch(registerStart());
    },
    onSuccess: (data, variables) => {
      if (data.status === "success") {
        setCookie("email", variables.email, {
          maxAge: 60 * 10,
          path: "/",
          sameSite: "lax",
        });

        dispatch(registerSuccess({ email: variables.email }));
        toast.success(data.message);
        router.push("/otp");
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Registrasi gagal";
      dispatch(registerFailure(errorMessage));
      toast.error(errorMessage);
    },
  });
};

export const useVerifyOtp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: authService.verifyOtp,
    onMutate: () => {
      dispatch(verifyOtpStart());
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          sameSite: "lax",
        });

        deleteCookie("email");

        dispatch(verifyOtpSuccess());
        toast.success(data.message);
        router.push("/");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Verifikasi OTP gagal";
      dispatch(verifyOtpFailure(errorMessage));
      toast.error(errorMessage);
    },
  });
};

export const useProfile = () => {
  const token = getCookie("token");

  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogout = () => {
  const router = useRouter();

  return () => {
    deleteCookie("token");
    deleteCookie("email");
    router.push("/sign-in");
  };
};
