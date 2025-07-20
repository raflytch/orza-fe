"use client";

import MyCommunityPageSkeleton from "@/components/community/my-community-skeleton";
import { useState } from "react";
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

export default function MyCommunityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: myCommunities, isLoading, error } = useGetMyCommunities();

  // Filter communities based on search term
  const filteredCommunities = (myCommunities?.data || []).filter(
    (community) =>
      community.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return <MyCommunityPageSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Gagal Memuat Komunitas
            </h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <Link href="/community">
              <Button variant="outline" className="hover:bg-green-50">
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
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col">
        {/* Background Image with Overlay */}
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

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Komunitas Saya
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Kelola dan pantau komunitas yang Anda miliki atau ikuti
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md w-full mx-auto">
              <Input
                placeholder="Cari komunitas Anda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white/95 backdrop-blur-sm border-0 rounded-full text-base shadow-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-8 flex justify-center">
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/70" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/community">
            <Button
              variant="outline"
              className="hover:bg-green-50 border-green-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Komunitas
            </Button>
          </Link>
        </div>

        {/* Stats Summary */}
        {filteredCommunities.length > 0 && (
          <div className="mb-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Ringkasan Aktivitas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {filteredCommunities.length}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Total Komunitas
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredCommunities.filter((c) => c.isOwner).length ||
                    filteredCommunities.length}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Komunitas Dimiliki
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {new Date().getFullYear()}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Tahun Aktif
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Communities Grid or Empty State */}
        {filteredCommunities.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              {searchTerm ? "Komunitas Tidak Ditemukan" : "Belum Ada Komunitas"}
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">
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
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
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
        ) : (
          <>
            {/* Communities Grid Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchTerm
                    ? `Hasil Pencarian "${searchTerm}"`
                    : "Komunitas Anda"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredCommunities.length} komunitas ditemukan
                </p>
              </div>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300">
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

            {/* Communities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCommunities.map((community) => (
                <Card
                  key={community.id}
                  className="group overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-xl"
                >
                  {/* Community Image */}
                  <div className="relative h-40 w-full overflow-hidden">
                    {community.imageUrl ? (
                      <Image
                        src={community.imageUrl}
                        alt={community.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center">
                        <Users className="w-12 h-12 text-white opacity-80" />
                      </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Owner Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 shadow-lg border border-blue-400/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Owner
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-lg font-bold line-clamp-1 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                      {community.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-5 pt-0">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {community.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Dibuat{" "}
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
                          className="w-full text-sm border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                        >
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
