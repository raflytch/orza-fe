"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Settings,
  Heart,
  Trash2,
  Upload,
  Camera,
  X,
  MessageCircle,
  Users,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  useGetUserProfile,
  useUpdateUserProfile,
  useRequestDeleteAccount,
  useConfirmDeleteAccount,
  useGetLikedPosts,
} from "@/hooks/use-user";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";
import { BlurFade } from "@/components/magicui/blur-fade";
import { images } from "@/constants/images";

const profileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  password: z.string().optional(),
  avatar: z.any().optional(),
});

const deleteAccountSchema = z.object({
  otp: z.string().length(6, "OTP harus 6 digit"),
});

export default function ProfilePage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  const { data: profile, isLoading: isLoadingProfile } = useGetUserProfile();
  const {
    data: likedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLikedPosts();
  const updateProfileMutation = useUpdateUserProfile();
  const requestDeleteMutation = useRequestDeleteAccount();
  const confirmDeleteMutation = useConfirmDeleteAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: deleteErrors },
    reset: resetDelete,
  } = useForm({
    resolver: zodResolver(deleteAccountSchema),
  });

  useEffect(() => {
    if (profile?.data) {
      reset({
        name: profile.data.name,
        password: "",
      });
      if (profile.data.avatarUrl) {
        setImagePreview(profile.data.avatarUrl);
      }
    }
  }, [profile, reset]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageSelect(files[0]);
    }
  };

  const handleImageSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      setValue("avatar", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("File harus berupa gambar");
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("avatar", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setIsSettingsOpen(false);
      },
    });
  };

  const handleRequestDelete = () => {
    requestDeleteMutation.mutate(undefined, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setIsOtpDialogOpen(true);
      },
    });
  };

  const onSubmitDelete = (data) => {
    confirmDeleteMutation.mutate(data.otp, {
      onSuccess: () => {
        setIsOtpDialogOpen(false);
        resetDelete();
      },
    });
  };

  const allLikedPosts =
    likedPosts?.pages?.flatMap((page) => page.data.posts) || [];

  if (isLoadingProfile) {
    return (
      <main className="min-h-screen bg-gray-50 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <ProfileSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <BlurFade delay={0.1}>
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 bg-white/90 hover:bg-white shadow-sm transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="relative mb-8">
            <div className="relative h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden">
              <Image
                src={images.imageHero}
                alt="Profile Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="absolute -bottom-16 left-6 sm:left-8">
              <div className="relative">
                {profile?.data?.avatarUrl ? (
                  <Image
                    src={profile.data.avatarUrl}
                    alt={profile.data.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center border-4 border-white">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-gray-700 border-0"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Pengaturan Profil</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Foto Profil</Label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                          dragActive
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                        />

                        {imagePreview ? (
                          <div className="relative inline-block">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              width={100}
                              height={100}
                              className="rounded-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                              onClick={removeImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-center">
                              <div className="p-3 bg-gray-100 rounded-full">
                                <Camera className="h-6 w-6 text-gray-600" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Drag & drop foto di sini
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                atau klik tombol di bawah untuk memilih file
                              </p>
                            </div>
                          </div>
                        )}

                        {!imagePreview && (
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Pilih Foto
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Masukkan nama lengkap"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile?.data?.email || ""}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-sm text-gray-500">
                        Email tidak dapat diubah
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password Baru (Opsional)</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...register("password")}
                          placeholder="Masukkan password baru"
                          className={errors.password ? "border-red-500" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <AlertDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus Akun
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              Hapus Akun
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus akun ini? Semua
                              data Anda akan hilang permanen. Kami akan mengirim
                              OTP ke email Anda untuk konfirmasi.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleRequestDelete}
                              disabled={requestDeleteMutation.isPending}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {requestDeleteMutation.isPending ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Mengirim OTP...
                                </>
                              ) : (
                                "Kirim OTP"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {updateProfileMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          "Simpan Perubahan"
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="pt-16 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile?.data?.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    {profile?.data?.email}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {profile?.data?.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Bergabung{" "}
                    {new Date(profile?.data?.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 bg-white">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {likedPosts?.pages?.[0]?.data?.total || 0}
                </div>
                <div className="text-sm text-gray-600">Postingan Disukai</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
                <div className="text-sm text-gray-600">Komentar</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
                <div className="text-sm text-gray-600">Komunitas</div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>

        <BlurFade delay={0.5}>
          <Card className="border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Postingan Disukai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allLikedPosts.length > 0 ? (
                  <>
                    {allLikedPosts.map((post) => (
                      <div
                        key={post.id}
                        className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Link
                          href={`/community/${post.communityId}/${post.id}`}
                        >
                          <h4 className="font-medium text-gray-900 mb-2 hover:text-green-600 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {post.content}
                          </p>
                          {post.imageUrl && (
                            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                              <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.createdAt).toLocaleDateString(
                              "id-ID"
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}

                    {hasNextPage && (
                      <Button
                        variant="outline"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="w-full"
                      >
                        {isFetchingNextPage ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Memuat...
                          </>
                        ) : (
                          "Muat Lebih Banyak"
                        )}
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Belum ada postingan yang disukai
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Mulai jelajahi komunitas dan sukai postingan yang menarik!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Hapus Akun</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmitDelete(onSubmitDelete)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="otp">
                  Masukkan OTP yang dikirim ke email Anda
                </Label>
                <Input
                  id="otp"
                  {...registerDelete("otp")}
                  placeholder="Masukkan 6 digit OTP"
                  maxLength={6}
                  className={deleteErrors.otp ? "border-red-500" : ""}
                />
                {deleteErrors.otp && (
                  <p className="text-red-500 text-sm">
                    {deleteErrors.otp.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOtpDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={confirmDeleteMutation.isPending}
                >
                  {confirmDeleteMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menghapus...
                    </>
                  ) : (
                    "Hapus Akun"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
