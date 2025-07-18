"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  useGetCommunityById, 
  useJoinCommunity, 
  useLeaveCommunity,
  useUpdateCommunity,
  useDeleteCommunity 
} from "@/hooks/use-community";
import { useGetPostsByCommunity } from "@/hooks/use-post";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
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
  ImageIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/hooks/use-auth";
import CommunityForm from "@/components/community/community-form";
import PostForm from "@/components/community/post-form";

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [postsPage, setPostsPage] = useState(1);
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { data: community, isLoading: isLoadingCommunity, error: communityError } = useGetCommunityById(params.id);
  const { data: postsData, isLoading: isLoadingPosts, error: postsError } = useGetPostsByCommunity(params.id, postsPage, 10);
  const { data: profile } = useProfile();
  
  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();
  const deleteMutation = useDeleteCommunity();

  if (isLoadingCommunity) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            <p className="text-gray-600">Memuat detail komunitas...</p>
          </div>
        </div>
      </main>
    );
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
            
            {/* Debug info */}
            <details className="mt-6 text-left max-w-xl mx-auto">
              <summary className="text-sm text-gray-500 cursor-pointer">Debug Info</summary>
              <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto mt-2">
                {JSON.stringify({error: communityError}, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </main>
    );
  }

  const communityData = community?.data;
  const isOwner = profile?.data?.id === communityData?.ownerId;
  const isMember = communityData?.members?.some(
    member => member.userId === profile?.data?.id
  );
  
  // Get posts from API data or fallback to empty array
  const posts = postsData?.data?.posts || [];

  const handleJoin = () => {
    if (!profile?.data) {
      window.location.href = '/sign-in';
      return;
    }
    joinMutation.mutate(communityData.id);
  };

  const handleLeave = () => {
    leaveMutation.mutate(communityData.id);
  };

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus komunitas ini?')) {
      deleteMutation.mutate(communityData.id);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/community">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Komunitas
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Community Header */}
          <Card className="mb-8">
            {/* Community Image */}
            <div className="relative h-64 w-full">
              {communityData?.imageUrl ? (
                <Image
                  src={communityData.imageUrl}
                  alt={communityData.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center rounded-t-lg">
                  <Users className="w-24 h-24 text-white" />
                </div>
              )}
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {communityData?.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{communityData?.members?.length || 0} anggota</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Dibuat {new Date(communityData?.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Owner Controls - IMPORTANT: Show only for owner */}
                {isOwner && (
                  <div className="flex gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CommunityForm 
                          community={communityData}
                          onCancel={() => setIsEditDialogOpen(false)} 
                        />
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDelete}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Hapus
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {communityData?.description}
                </p>
              </div>

              {/* Action Buttons */}
              {!isOwner && profile?.data && (
                <div className="flex gap-3">
                  {isMember ? (
                    <Button 
                      variant="outline"
                      onClick={handleLeave}
                      disabled={leaveMutation.isPending}
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      {leaveMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <UserMinus className="w-4 h-4 mr-2" />
                      )}
                      Keluar dari Komunitas
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleJoin}
                      disabled={joinMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
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
              )}

              {!profile?.data && (
                <div className="flex gap-3">
                  <Button 
                    onClick={() => window.location.href = '/sign-in'}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Login untuk Bergabung
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Posts Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Postingan Komunitas</h2>
              {(isMember || isOwner) && (
                <Dialog open={isCreatePostDialogOpen} onOpenChange={setIsCreatePostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Postingan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <PostForm 
                      communityId={params.id} 
                      onCancel={() => setIsCreatePostDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Loading state for posts */}
            {isLoadingPosts && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            )}

            {/* Error state for posts */}
            {postsError && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-red-600 mb-2">Gagal memuat postingan</p>
                  <p className="text-gray-500">{postsError.message}</p>
                </CardContent>
              </Card>
            )}

            {/* Posts list */}
            {!isLoadingPosts && !postsError && posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{post.user?.name || "Pengguna"}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-green-600 cursor-pointer">
                    <Link href={`/community/${params.id}/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {post.imageUrl && (
                    <div className="mb-4 relative h-48 w-full rounded-md overflow-hidden">
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likesCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentsCount || 0}</span>
                      </div>
                    </div>
                    <Link href={`/community/${params.id}/${post.id}`}>
                      <Button variant="outline" size="sm">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

            {!isLoadingPosts && !postsError && posts.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Belum ada postingan
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Jadilah yang pertama membuat postingan di komunitas ini
                  </p>
                  {(isMember || isOwner) && (
                    <Dialog open={isCreatePostDialogOpen} onOpenChange={setIsCreatePostDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Buat Postingan Pertama
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

            {/* Pagination for posts */}
            {postsData?.pagination && postsData.pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  disabled={postsPage === 1}
                  onClick={() => setPostsPage(postsPage - 1)}
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
                          variant={postsPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPostsPage(pageNum)}
                          className={postsPage === pageNum ? "bg-green-600 hover:bg-green-700" : ""}
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
                >
                  Selanjutnya
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Anggota Komunitas</CardTitle>
            </CardHeader>
            <CardContent>
              {communityData?.members?.length > 0 ? (
                <div className="space-y-3">
                  {communityData.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Member {member.userId.slice(-6)}</p>
                        <p className="text-xs text-gray-500">
                          Bergabung {new Date(member.joinedAt).toLocaleDateString('id-ID')}
                        </p>
                        {member.userId === communityData.ownerId && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Owner
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  Belum ada anggota
                </p>
              )}
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Anggota</span>
                <Badge variant="secondary">
                  {communityData?.members?.length || 0}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Postingan</span>
                <Badge variant="secondary">
                  {postsData?.pagination?.total || 0}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dibuat</span>
                <span className="text-sm">
                  {new Date(communityData?.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className="bg-green-100 text-green-800">
                  Aktif
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}