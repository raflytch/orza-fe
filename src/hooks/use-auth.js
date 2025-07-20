import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setCookie, deleteCookie, getCookie } from "cookies-next/client";
import { authService } from "@/services/auth.service";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  clearError,
} from "@/features/slices/auth-slice";

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      dispatch(clearError());
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });

        toast.success(data.message);
        window.location.href = "/";
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
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
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
          maxAge: 60 * 60 * 24,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });

        deleteCookie("email");

        dispatch(verifyOtpSuccess());
        toast.success(data.message);
        window.location.href = "/";
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
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProfile = () => {
  return useProfile();
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => Promise.resolve(),
    onSuccess: () => {
      deleteCookie("token", { path: "/" });
      dispatch(clearError());
      queryClient.clear();
      toast.success("Berhasil logout");
      window.location.href = "/sign-in";
    },
    onError: (error) => {
      toast.error("Gagal logout");
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: authService.resendOtp,
    onSuccess: (data) => {
      toast.success(data.message || "OTP berhasil dikirim ulang");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal mengirim ulang OTP";
      toast.error(errorMessage);
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Link reset password berhasil dikirim");
      setCookie("resetEmail", variables.email, {
        maxAge: 60 * 30,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      router.push("/reset-password");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal mengirim link reset password";
      toast.error(errorMessage);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password berhasil direset");
      deleteCookie("resetEmail");
      router.push("/sign-in");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal reset password";
      toast.error(errorMessage);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password berhasil diubah");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal mengubah password";
      toast.error(errorMessage);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profil berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui profil";
      toast.error(errorMessage);
    },
  });
};
