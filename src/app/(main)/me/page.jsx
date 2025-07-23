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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Mail,
  Calendar,
  Shield,
  Settings,
  Heart,
  Trash2,
  Upload,
  Camera,
  X,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
  UserCheck,
  RefreshCw,
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
  const [otpValue, setOtpValue] = useState("");
  const fileInputRef = useRef(null);

  const { data: profile, isLoading: isLoadingProfile } = useGetUserProfile();
  const {
    data: likedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchLikedPosts,
    isLoading: isLoadingLikedPosts,
    isRefetching: isRefetchingLikedPosts,
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
    handleSubmit: handleSubmitDelete,
    formState: { errors: deleteErrors },
    reset: resetDelete,
    setValue: setDeleteValue,
    trigger,
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

  const handleOtpChange = (value) => {
    setOtpValue(value);
    setDeleteValue("otp", value);
    if (value.length === 6) {
      trigger("otp");
    }
  };

  const onSubmitDelete = (data) => {
    confirmDeleteMutation.mutate(data.otp, {
      onSuccess: () => {
        setIsOtpDialogOpen(false);
        resetDelete();
        setOtpValue("");
      },
    });
  };

  const allLikedPosts =
    likedPosts?.pages?.flatMap((page) => page.data.posts) || [];

  if (isLoadingProfile) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <ProfileSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BlurFade delay={0.1}>
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 bg-white/90 hover:bg-white border border-green-200 hover:border-green-300 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <BlurFade delay={0.2}>
              <Card className="overflow-hidden border border-green-200 bg-gradient-to-br from-white to-green-50/50 py-0">
                <div className="relative">
                  <div className="h-32 relative overflow-hidden">
                    <Image
                      src={images.imageHero}
                      alt="Profile background"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border-4 border-white ring-4 ring-green-200">
                        <AvatarImage
                          src={profile?.data?.avatarUrl}
                          alt={profile?.data?.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white text-2xl font-bold">
                          {profile?.data?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsSettingsOpen(true)}
                    size="sm"
                    variant="secondary"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 border border-green-200 hover:border-green-300 transition-all duration-200"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <CardContent className="pt-20 pb-6 text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {profile?.data?.name}
                  </h1>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      {profile?.data?.email}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-200"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {profile?.data?.role}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
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

                  <div className="flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {likedPosts?.pages?.[0]?.data?.total || 0}
                      </div>
                      <div className="text-sm text-gray-600">Total Likes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          <div className="lg:col-span-8">
            <BlurFade delay={0.3}>
              <Card className="border border-green-200 bg-white/90 py-0">
                <Tabs defaultValue="liked" className="w-full">
                  <div className="border-b border-green-100 flex items-center justify-between px-2 py-2">
                    <TabsList className="grid w-full grid-cols-1 bg-transparent">
                      <TabsTrigger
                        value="liked"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Liked Posts
                      </TabsTrigger>
                    </TabsList>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 flex items-center gap-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all"
                      onClick={() => refetchLikedPosts()}
                      disabled={isRefetchingLikedPosts || isLoadingLikedPosts}
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${
                          isRefetchingLikedPosts ? "animate-spin" : ""
                        }`}
                      />
                      Refresh
                    </Button>
                  </div>

                  <TabsContent value="liked" className="p-6">
                    <div className="space-y-4">
                      {isLoadingLikedPosts || isRefetchingLikedPosts ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                        </div>
                      ) : allLikedPosts.length > 0 ? (
                        <>
                          {allLikedPosts.map((post) => (
                            <div
                              key={post.id}
                              className="group p-6 border border-green-100 rounded-xl hover:border-green-200 transition-all duration-300 bg-gradient-to-br from-white to-green-50/30"
                            >
                              <Link
                                href={`/community/${post.communityId}/${post.id}`}
                                className="block"
                              >
                                <div className="flex items-start gap-4">
                                  {post.imageUrl && (
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                      <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                                      {post.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                      {post.content}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                      <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(
                                          post.createdAt
                                        ).toLocaleDateString("id-ID")}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Heart className="w-3 h-3 text-red-500" />
                                        Liked
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}

                          {hasNextPage && (
                            <div className="flex justify-center pt-4">
                              <Button
                                variant="outline"
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                              >
                                {isFetchingNextPage ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  "Load More Posts"
                                )}
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-10 h-10 text-green-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No Liked Posts Yet
                          </h3>
                          <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
                            Start exploring the community and like posts that
                            interest you!
                          </p>
                          <Link href="/community">
                            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                              Explore Community
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </BlurFade>
          </div>
        </div>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-green-200">
            <DialogHeader className="border-b border-green-100 pb-4">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Profile Settings
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1">
              <div className="space-y-2">
                <Label
                  htmlFor="avatar"
                  className="text-sm font-semibold text-gray-700"
                >
                  Profile Picture
                </Label>
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50"
                      : "border-gray-300 hover:border-green-400 bg-gradient-to-br from-gray-50 to-white"
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
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={imagePreview} alt="Preview" />
                      </Avatar>
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
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                          <Camera className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Drag & drop your photo here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          or click the button below to select a file
                        </p>
                      </div>
                    </div>
                  )}

                  {!imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photo
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className={`transition-all duration-200 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-green-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={profile?.data?.email || ""}
                    disabled
                    className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Email cannot be changed for security reasons
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  New Password (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter new password"
                    className={`pr-12 transition-all duration-200 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-green-500"
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-green-100">
                <AlertDialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border border-green-200">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Delete Account
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete your account? This
                        action cannot be undone. All your data will be
                        permanently lost. We'll send an OTP to your email for
                        confirmation.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleRequestDelete}
                        disabled={requestDeleteMutation.isPending}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {requestDeleteMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          "Send OTP"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all duration-200"
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
          <DialogContent className="max-w-md border border-green-200 rounded-2xl">
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-bold text-red-600">
                Confirm Account Deletion
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmitDelete(onSubmitDelete)}
              className="space-y-6"
            >
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <Label
                    htmlFor="otp"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enter the OTP sent to your email
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Check your inbox for the verification code
                  </p>
                </div>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={handleOtpChange}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot
                        index={0}
                        className="w-12 h-12 text-lg font-bold border-2"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-12 h-12 text-lg font-bold border-2"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-12 h-12 text-lg font-bold border-2"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-12 h-12 text-lg font-bold border-2"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-12 h-12 text-lg font-bold border-2"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-12 h-12 text-lg font-bold border-2"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {deleteErrors.otp && (
                  <p className="text-red-500 text-sm text-center flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {deleteErrors.otp.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOtpDialogOpen(false);
                    setOtpValue("");
                    resetDelete();
                  }}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={confirmDeleteMutation.isPending}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6"
                >
                  {confirmDeleteMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
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
