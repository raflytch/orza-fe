"use client";

import CommunityDetailSkeleton from "@/components/community/community-detail-skeleton";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  useGetCommunityById,
  useJoinCommunity,
  useLeaveCommunity,
  useUpdateCommunity,
  useDeleteCommunity,
} from "@/hooks/use-community";
import { useGetPostsByCommunity } from "@/hooks/use-post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  Users,
  Calendar,
  ArrowLeft,
  Settings,
  Trash2,
  UserPlus,
  UserMinus,
  Plus,
  MessageCircle,
  Heart,
  ImageIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/hooks/use-auth";
import CommunityForm from "@/components/community/community-form";
import PostForm from "@/components/community/post-form";

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [postsPage, setPostsPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const {
    data: community,
    isLoading: isLoadingCommunity,
    error: communityError,
  } = useGetCommunityById(params.id);
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useGetPostsByCommunity(params.id, postsPage, 10);
  const { data: profile } = useProfile();

  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();
  const deleteMutation = useDeleteCommunity();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.userId);
    } catch (error) {
      console.error("Invalid token:", error);
      router.push("/sign-in");
    }
  }, [router]);

  if (isLoadingCommunity) {
    return <CommunityDetailSkeleton />;
  }

  if (communityError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold mb-2">
              Komunitas tidak ditemukan
            </p>
            <p className="text-gray-600 mb-4">{communityError.message}</p>
            <Link href="/community">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Komunitas
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const communityData = community?.data;
  const isOwner = currentUserId === communityData?.owner?.id;
  const isMember = communityData?.members?.some(
    (member) => member.id === currentUserId
  );
  const canAccessCommunity = isOwner || isMember;

  const posts = postsData?.data?.posts || [];

  const handleJoin = () => {
    if (!currentUserId) {
      router.push("/sign-in");
      return;
    }
    joinMutation.mutate(communityData.id);
  };

  const handleLeave = () => {
    leaveMutation.mutate(communityData.id);
  };

  const handleDelete = () => {
    deleteMutation.mutate(communityData.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <main className="min-h-screen py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
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

        <Card className="mb-8 overflow-hidden border-0 shadow-lg bg-white rounded-xl">
          <div className="relative">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              <div className="flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6">
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden ring-4 ring-green-50">
                    {communityData?.imageUrl ? (
                      <Image
                        src={communityData.imageUrl}
                        alt={communityData.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Users className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-3">
                    <div>
                      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        {communityData?.name}
                      </h1>

                      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{communityData?.memberCount || 0} anggota</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Dibuat{" "}
                            {new Date(
                              communityData?.createdAt
                            ).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isOwner && (
                      <div className="flex gap-2 justify-center lg:justify-end">
                        <Dialog
                          open={isEditDialogOpen}
                          onOpenChange={setIsEditDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-gray-600 hover:text-green-600 hover:border-green-300"
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogTitle className="sr-only">
                              Edit Komunitas
                            </DialogTitle>
                            <CommunityForm
                              community={communityData}
                              onCancel={() => setIsEditDialogOpen(false)}
                            />
                          </DialogContent>
                        </Dialog>

                        <AlertDialog
                          open={isDeleteDialogOpen}
                          onOpenChange={setIsDeleteDialogOpen}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={deleteMutation.isPending}
                              className="hover:bg-red-600"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4 mr-2" />
                              )}
                              Hapus
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Konfirmasi Hapus Komunitas
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus komunitas ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {deleteMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  "Hapus"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Deskripsi
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {communityData?.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    {!isOwner && currentUserId && !isMember && (
                      <Button
                        onClick={handleJoin}
                        disabled={joinMutation.isPending}
                        className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        {joinMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <UserPlus className="w-4 h-4 mr-2" />
                        )}
                        Bergabung
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-1 bg-green-400"></div>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <div className="border-b border-gray-200 bg-white rounded-t-lg px-6">
            <div className="flex space-x-8 py-4">
              <button className="pb-2 px-1 border-b-2 border-green-500 text-green-600 font-medium text-sm">
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {canAccessCommunity && (
              <div className="mb-6">
                <Dialog
                  open={isCreatePostDialogOpen}
                  onOpenChange={setIsCreatePostDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 rounded-lg py-3 text-left justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">
                      Buat Postingan Baru
                    </DialogTitle>
                    <PostForm
                      communityId={params.id}
                      onCancel={() => setIsCreatePostDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {isLoadingPosts && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            )}

            {postsError && (
              <Card className="border-0 shadow-sm">
                <CardContent className="text-center py-8">
                  <p className="text-red-600 mb-2">Gagal memuat postingan</p>
                  <p className="text-gray-500">{postsError.message}</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {!isLoadingPosts &&
                !postsError &&
                posts.map((post) => (
                  <Card
                    key={post.id}
                    className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden bg-white"
                  >
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {post.user?.name || "Pengguna"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </p>
                          </div>
                        </div>

                        <Link href={`/community/${params.id}/${post.id}`}>
                          <h3 className="font-semibold text-gray-800 hover:text-green-600 cursor-pointer">
                            {post.title}
                          </h3>
                        </Link>
                      </div>

                      {post.imageUrl && (
                        <div className="relative h-64 w-full">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="p-4">
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <Link href={`/community/${params.id}/${post.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Baca Selengkapnya
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {!isLoadingPosts && !postsError && posts.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Belum ada postingan
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Jadilah yang pertama membuat postingan di komunitas ini
                  </p>
                  {canAccessCommunity && (
                    <Dialog
                      open={isCreatePostDialogOpen}
                      onOpenChange={setIsCreatePostDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Buat Postingan Pertama
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogTitle className="sr-only">
                          Buat Postingan Pertama
                        </DialogTitle>
                        <PostForm
                          communityId={params.id}
                          onCancel={() => setIsCreatePostDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            )}

            {postsData?.pagination && postsData.pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  disabled={postsPage === 1}
                  onClick={() => setPostsPage(postsPage - 1)}
                  className="hover:bg-green-50"
                >
                  Sebelumnya
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: Math.min(5, postsData.pagination.totalPages) },
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={
                            postsPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setPostsPage(pageNum)}
                          className={
                            postsPage === pageNum
                              ? "bg-green-600 hover:bg-green-700"
                              : "hover:bg-green-50"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  disabled={postsPage === postsData.pagination.totalPages}
                  onClick={() => setPostsPage(postsPage + 1)}
                  className="hover:bg-green-50"
                >
                  Selanjutnya
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm rounded-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">
                  About Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Members</span>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700"
                    >
                      {communityData?.memberCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Posts</span>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700"
                    >
                      {postsData?.pagination?.total || posts.length || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Created</span>
                    <span className="text-gray-600 text-xs">
                      {new Date(communityData?.createdAt).toLocaleDateString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Members</CardTitle>
              </CardHeader>
              <CardContent>
                {communityData?.owner || communityData?.members?.length > 0 ? (
                  <div className="space-y-3">
                    {communityData?.owner && (
                      <div
                        key={communityData.owner.id}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {communityData.owner.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">
                              {new Date(
                                communityData.createdAt
                              ).toLocaleDateString("id-ID")}
                            </p>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-blue-100 text-blue-700"
                            >
                              Owner
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {communityData?.members
                      ?.slice(0, communityData?.owner ? 4 : 5)
                      .map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-gray-500">Member</p>
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700"
                              >
                                Member
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}

                    {communityData?.members &&
                      communityData.members.length >
                        (communityData?.owner ? 4 : 5) && (
                        <p className="text-xs text-gray-500 text-center pt-2">
                          +
                          {communityData.members.length -
                            (communityData?.owner ? 4 : 5)}{" "}
                          members lainnya
                        </p>
                      )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Belum ada anggota
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}