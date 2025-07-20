"use client";

import CommunityPageSkeleton from "@/components/community/community-page-skeleton";
import { useState } from "react";
import { useGetCommunities, useJoinCommunity } from "@/hooks/use-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Search, Users, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommunityForm from "@/components/community/community-form";
import { useProfile } from "@/hooks/use-auth";
import { images } from "@/constants/images";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function CommunityPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: communities, isLoading, error } = useGetCommunities(page, 10);
  const { data: profile } = useProfile();
  const joinMutation = useJoinCommunity();

  const getCommunitiesArray = () => {
    if (!communities?.data?.communities) return [];
    return communities.data.communities;
  };

  const communitiesArray = getCommunitiesArray();

  const filteredCommunities = communitiesArray.filter(
    (community) =>
      community.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinCommunity = (communityId) => {
    if (!profile?.data) {
      window.location.href = "/sign-in";
      return;
    }
    joinMutation.mutate(communityId);
  };

  if (isLoading) {
    return <CommunityPageSkeleton />;
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold mb-2">
              Gagal memuat komunitas
            </p>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen">
      <section className="relative w-full h-screen flex flex-col">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
          <BlurFade>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
              Komunitas Petani
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Bergabunglah dengan komunitas petani untuk berbagi pengetahuan dan
              pengalaman
            </p>
            <div className="relative max-w-md w-full mx-auto">
              <Input
                placeholder="Cari Komunitas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white/95 border-0 rounded-full text-base shadow-lg focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </BlurFade>
        </div>
        <div className="relative z-10 pb-8 flex justify-center">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <BlurFade delay={0.1}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center gap-8 mb-4 sm:mb-0">
              <h2 className="text-xl font-bold text-green-600 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[3px] after:bg-green-500">
                All Community
              </h2>
              {profile?.data && (
                <Link
                  href="/community/my"
                  className="text-xl font-medium text-gray-500 hover:text-green-600 transition-colors"
                >
                  My Community
                </Link>
              )}
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Komunitas
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogTitle className="sr-only">
                  Buat Komunitas Baru
                </DialogTitle>
                <CommunityForm onCancel={() => setIsCreateDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </BlurFade>
        <BlurFade delay={0.2}>
          {filteredCommunities.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {searchTerm
                  ? "Komunitas tidak ditemukan"
                  : "Belum ada komunitas"}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? "Coba gunakan kata kunci yang berbeda untuk menemukan komunitas yang Anda cari"
                  : "Jadilah yang pertama membuat komunitas baru dan mulai berbagi pengalaman dengan sesama petani"}
              </p>
              {!searchTerm && (
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
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
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredCommunities.map((community) => {
                  const isMember = community.members?.some(
                    (member) => member.userId === profile?.data?.id
                  );
                  const isOwner = community.ownerId === profile?.data?.id;
                  return (
                    <Card
                      key={community.id}
                      className="group overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="relative h-52 w-full overflow-hidden">
                        {community.imageUrl ? (
                          <Image
                            src={community.imageUrl}
                            alt={community.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center">
                            <Users className="w-16 h-16 text-white opacity-80" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/95 text-gray-700 font-medium px-3 py-1.5 text-xs rounded-full shadow-lg backdrop-blur-sm"
                          >
                            <Users className="w-3 h-3 mr-1.5" />
                            {community.members?.length || 0}
                          </Badge>
                          {isOwner && (
                            <Badge className="bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                              Owner
                            </Badge>
                          )}
                          {isMember && !isOwner && (
                            <Badge className="bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                              Anggota
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader className="pt-6 pb-3">
                        <Link href={`/community/${community.id}`}>
                          <CardTitle className="text-xl font-bold line-clamp-1 text-gray-800 hover:text-green-600 transition-colors duration-200">
                            {community.name}
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="pt-0 pb-4">
                        <p className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Dibuat{" "}
                            {new Date(community.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-3 pt-3 border-t border-gray-100">
                        <Link
                          href={`/community/${community.id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full rounded-full border-gray-300 hover:border-green-500 hover:text-green-600 transition-all duration-200"
                          >
                            Lihat Detail
                          </Button>
                        </Link>
                        {!isOwner && !isMember && profile?.data && (
                          <Button
                            className="bg-green-600 hover:bg-green-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={() => handleJoinCommunity(community.id)}
                            disabled={joinMutation.isPending}
                          >
                            {joinMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Gabung"
                            )}
                          </Button>
                        )}
                        {!profile?.data && (
                          <Button
                            className="bg-green-600 hover:bg-green-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={() => (window.location.href = "/sign-in")}
                          >
                            Login
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              {communities?.data && communities.data.totalPages > 1 && (
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all duration-200"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Sebelumnya
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from(
                      { length: Math.min(5, communities.data.totalPages) },
                      (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                            className={`rounded-full w-10 h-10 p-0 transition-all duration-200 ${
                              page === pageNum
                                ? "bg-green-600 hover:bg-green-700 shadow-md"
                                : "hover:bg-green-50 hover:border-green-500 hover:text-green-600"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full px-6 hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all duration-200"
                    disabled={page === communities.data.totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Selanjutnya
                  </Button>
                </div>
              )}
            </>
          )}
        </BlurFade>
      </div>
    </main>
  );
}
