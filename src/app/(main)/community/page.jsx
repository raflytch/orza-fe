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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
          <BlurFade>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 max-w-3xl">
              Komunitas Petani
            </h1>
            <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto mb-6 leading-relaxed">
              Bergabunglah dengan komunitas petani untuk berbagi pengetahuan dan
              pengalaman
            </p>
            <div className="relative max-w-xs w-full mx-auto">
              <Input
                placeholder="Cari Komunitas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white/95 border-0 rounded-full text-sm focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
          </BlurFade>
        </div>
        <div className="relative z-10 pb-6 flex justify-center">
          <div className="animate-bounce">
            <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-1"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <BlurFade delay={0.1}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-6 mb-2 sm:mb-0">
              <h2 className="text-lg font-bold text-green-600 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[3px] after:bg-green-500">
                All Community
              </h2>
              {profile?.data && (
                <Link
                  href="/community/my"
                  className="text-lg font-medium text-gray-500 hover:text-green-600 transition-colors"
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
                <Button className="bg-green-600 hover:bg-green-700 rounded-full transition-all duration-300 mt-4 sm:mt-0">
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
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchTerm
                  ? "Komunitas tidak ditemukan"
                  : "Belum ada komunitas"}
              </h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto text-sm">
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
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full transition-all duration-300 mt-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                {filteredCommunities.map((community) => {
                  const isMember = community.members?.some(
                    (member) => member.userId === profile?.data?.id
                  );
                  const isOwner = community.ownerId === profile?.data?.id;
                  return (
                    <Card
                      key={community.id}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-green-300 transition-all duration-300 hover:-translate-y-1 px-5"
                    >
                      <div className="relative h-36 w-full overflow-hidden px-3 rounded-lg">
                        {community.imageUrl ? (
                          <Image
                            src={community.imageUrl}
                            alt={community.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center rounded-lg">
                            <Users className="w-10 h-10 text-white opacity-80" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                          <Badge
                            variant="secondary"
                            className="bg-white/90 text-gray-700 font-medium px-2 py-1 text-xs rounded-full backdrop-blur-sm border border-gray-200"
                          >
                            <Users className="w-3 h-3 mr-1" />
                            {community.memberCount ||
                              community.members?.length ||
                              0}
                          </Badge>
                          {isOwner && (
                            <Badge className="bg-blue-500/90 text-white px-2 py-1 rounded-full backdrop-blur-sm text-xs border border-blue-300">
                              Owner
                            </Badge>
                          )}
                          {isMember && !isOwner && (
                            <Badge className="bg-green-500/90 text-white px-2 py-1 rounded-full backdrop-blur-sm text-xs border border-green-300">
                              Member
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader className="px-4">
                        <Link href={`/community/${community.id}`}>
                          <span className="text-xs text-gray-400 block">
                            Nama Komunitas
                          </span>
                          <CardTitle className="text-base font-bold line-clamp-1 text-gray-800 hover:text-green-600 transition-colors duration-200">
                            {community.name}
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="pb-3 px-4">
                        <span className="text-xs text-gray-400 block">
                          Deskripsi
                        </span>
                        <p className="text-gray-600 line-clamp-2 mb-3 text-xs leading-relaxed">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
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
                      <CardFooter className="flex gap-2 pt-2 border-t border-gray-100 px-4">
                        <Link
                          href={`/community/${community.id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full rounded-full border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-200 text-xs"
                          >
                            Lihat Detail
                          </Button>
                        </Link>
                        {!isOwner && !isMember && profile?.data && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 rounded-full transition-all duration-200 text-xs"
                            onClick={() => handleJoinCommunity(community.id)}
                            disabled={joinMutation.isPending}
                          >
                            {joinMutation.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              "Gabung"
                            )}
                          </Button>
                        )}
                        {!profile?.data && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 rounded-full transition-all duration-200 text-xs"
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
                    size="sm"
                    className="rounded-full px-4 hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all duration-200"
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
                            className={`rounded-full w-8 h-8 p-0 transition-all duration-200 text-xs ${
                              page === pageNum
                                ? "bg-green-600 hover:bg-green-700"
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
                    size="sm"
                    className="rounded-full px-4 hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all duration-200"
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
