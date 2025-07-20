"use client";

import MyCommunityPageSkeleton from "@/components/community/my-community-skeleton";
import { useState, useEffect } from "react";
import { useGetMyCommunities } from "@/hooks/use-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { images } from "@/constants/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Plus,
  Search,
  Users,
  Calendar,
  Settings,
  ArrowLeft,
  Crown,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommunityForm from "@/components/community/community-form";
import { BlurFade } from "@/components/magicui/blur-fade";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";

export default function MyCommunityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const { data: myCommunities, isLoading, error } = useGetMyCommunities();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.userId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const filteredCommunities = (myCommunities?.data || []).filter(
    (community) =>
      community.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <MyCommunityPageSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Gagal Memuat Komunitas
            </h2>
            <p className="text-sm text-gray-600 mb-4">{error.message}</p>
            <Link href="/community">
              <Button variant="outline" size="sm" className="hover:bg-green-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Komunitas
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="relative w-full h-[80vh] flex flex-col">
        <div className="absolute inset-0">
          <Image
            src={images.bannerComunity}
            alt="Banner Komunitas Petani"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
          <BlurFade>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Komunitas Saya
              </h1>
              <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto mb-6 leading-relaxed">
                Kelola dan pantau komunitas yang Anda miliki atau ikuti
              </p>

              <div className="relative max-w-xs w-full mx-auto">
                <Input
                  placeholder="Cari komunitas Anda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 bg-white/95 backdrop-blur-sm border-0 rounded-full text-sm focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
            </div>
          </BlurFade>
        </div>

        <div className="relative z-10 pb-6 flex justify-center">
          <BlurFade delay={0.2}>
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-white/70" />
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BlurFade delay={0.3}>
          <div className="mb-6">
            <Link href="/community">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-green-50 border-green-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Komunitas
              </Button>
            </Link>
          </div>
        </BlurFade>

        {filteredCommunities.length > 0 && (
          <BlurFade delay={0.4}>
            <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Ringkasan Aktivitas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {filteredCommunities.length}
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    Total Komunitas
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {
                      filteredCommunities.filter(
                        (c) => c.ownerId === currentUserId
                      ).length
                    }
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    Komunitas Dimiliki
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {
                      filteredCommunities.filter(
                        (c) => c.ownerId !== currentUserId
                      ).length
                    }
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    Sebagai Member
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        )}

        {filteredCommunities.length === 0 ? (
          <BlurFade delay={0.5}>
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">
                {searchTerm
                  ? "Komunitas Tidak Ditemukan"
                  : "Belum Ada Komunitas"}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                {searchTerm
                  ? "Coba gunakan kata kunci yang berbeda untuk menemukan komunitas yang Anda cari"
                  : "Anda belum memiliki atau bergabung dengan komunitas manapun. Mulai dengan membuat komunitas pertama Anda!"}
              </p>
              {!searchTerm && (
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Komunitas Pertama
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">
                      Buat Komunitas Pertama
                    </DialogTitle>
                    <CommunityForm
                      onCancel={() => setIsCreateDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </BlurFade>
        ) : (
          <>
            <BlurFade delay={0.5}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {searchTerm
                      ? `Hasil Pencarian "${searchTerm}"`
                      : "Komunitas Anda"}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredCommunities.length} komunitas ditemukan
                  </p>
                </div>
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 transition-all duration-300 mt-4 sm:mt-0">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Komunitas Baru
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">
                      Buat Komunitas Baru
                    </DialogTitle>
                    <CommunityForm
                      onCancel={() => setIsCreateDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </BlurFade>

            <BlurFade delay={0.6}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCommunities.map((community, index) => {
                  const isOwner = community.ownerId === currentUserId;
                  const isMember = !isOwner;

                  return (
                    <BlurFade key={community.id} delay={0.7 + index * 0.1}>
                      <Card className="group overflow-hidden bg-white border border-gray-200 hover:border-green-300 transition-all duration-300 hover:-translate-y-1 rounded-xl px-3">
                        <div className="relative h-36 w-full overflow-hidden rounded-lg">
                          {community.imageUrl ? (
                            <Image
                              src={community.imageUrl}
                              alt={community.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center rounded-lg">
                              <Users className="w-10 h-10 text-white opacity-80" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                          <div className="absolute top-2 right-2">
                            {isOwner ? (
                              <Badge className="bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 border border-blue-300">
                                <Crown className="w-3 h-3 mr-1" />
                                Owner
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 border border-green-300">
                                Member
                              </Badge>
                            )}
                          </div>
                        </div>

                        <CardHeader className="px-4 pb-1">
                          <span className="text-xs text-gray-400 block">
                            Nama Komunitas
                          </span>
                          <CardTitle className="text-base font-bold line-clamp-1 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                            {community.name}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4 pt-0">
                          <span className="text-xs text-gray-400 block">
                            Deskripsi
                          </span>
                          <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed">
                            {community.description}
                          </p>

                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(community.createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Link
                              href={`/community/${community.id}`}
                              className="flex-1"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                              >
                                Lihat Detail
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </BlurFade>
                  );
                })}
              </div>
            </BlurFade>
          </>
        )}
      </div>
    </main>
  );
}
