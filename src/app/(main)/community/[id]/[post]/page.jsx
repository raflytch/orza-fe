"use client";

import CommunityPostSkeleton from "@/components/community/community-post-skeleton";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetPostById, useDeletePost, useAddComment, useGetCommentsByPost, useLikePost, useUnlikePost, useGetLikeCount } from "@/hooks/use-post";
import { useGetCommunityById } from "@/hooks/use-community";
import { useProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
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
  Loader2, 
  ArrowLeft, 
  MessageCircle,
  Heart,
  Calendar,
  User,
  Edit,
  Trash2,
  Send,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import PostForm from "@/components/community/post-form";
import { toast } from "sonner";

export default function CommunityPostPage() {
  const params = useParams();
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { data: post, isLoading: isLoadingPost, error: postError, refetch: refetchPost } = useGetPostById(params.post);
  const { data: community } = useGetCommunityById(params.id);
  const { data: comments, isLoading: isLoadingComments, refetch: refetchComments } = useGetCommentsByPost(params.post);
  const { data: likeCount, isLoading: isLoadingLikeCount, refetch: refetchLikeCount } = useGetLikeCount(params.post);
  const { data: profile } = useProfile();
  
  const deletePostMutation = useDeletePost();
  const addCommentMutation = useAddComment();
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();

  // Refetch data when component mounts
  useEffect(() => {
    if (params.post) {
      refetchPost();
      refetchComments();
      refetchLikeCount();
    }
  }, [params.post, refetchPost, refetchComments, refetchLikeCount]);

  if (isLoadingPost || isLoadingLikeCount) {
    return <CommunityPostSkeleton />;
  }

  if (postError || !post || !likeCount) {
    return (
      <main className="w-full min-h-screen px-2 py-4 xs:px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center px-4 w-full max-w-md">
              <p className="text-red-600 text-sm xs:text-base sm:text-lg font-semibold mb-2">
                Postingan tidak ditemukan
              </p>
              <p className="text-gray-600 mb-4 text-xs xs:text-sm sm:text-base">
                {postError?.message}
              </p>
              <Link href={`/community/${params.id}`}>
                <Button variant="outline" size="sm" className="text-xs xs:text-sm w-full xs:w-auto">
                  <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                  <span className="xs:hidden">Kembali</span>
                  <span className="hidden xs:inline">Kembali ke Komunitas</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  const postData = post.data;
  const commentsData = comments?.data?.comments || [];
  const communityData = community?.data;
  const likeData = likeCount.data;
  
  const isOwner = profile?.data?.id === postData.userId;
  // Menggunakan data dari endpoint /likes/count untuk status like
  const isLiked = likeData?.liked || false;
  const likeTotal = likeData?.total || 0;
  const commentCount = commentsData.length;
  
  const handleDeletePost = () => {
    deletePostMutation.mutate(postData.id, {
      onSuccess: () => {
        toast.success("Postingan berhasil dihapus");
        setIsDeleteDialogOpen(false);
        router.push(`/community/${params.id}`);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Gagal menghapus postingan");
        setIsDeleteDialogOpen(false);
      }
    });
  };
  
  const handleLikeToggle = () => {
    if (!profile?.data) {
      // Redirect to login if not logged in
      router.push('/sign-in');
      return;
    }
    
    if (isLiked) {
      unlikePostMutation.mutate(postData.id, {
        onSuccess: () => {
          refetchLikeCount();
        }
      });
    } else {
      likePostMutation.mutate(postData.id, {
        onSuccess: () => {
          refetchLikeCount();
        }
      });
    }
  };
  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    addCommentMutation.mutate(
      { postId: postData.id, content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          refetchComments();
          refetchPost();
          toast.success("Komentar berhasil ditambahkan");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Gagal menambahkan komentar");
        }
      }
    );
  };

  return (
    <main className="w-full min-h-screen px-2 py-30 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-3 xs:mb-4 sm:mb-6">
          <Link href={`/community/${params.id}`}>
              <Button variant="outline" size="sm" className="text-sm">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="hidden xs:inline">Kembali ke Komunitas</span>
                <span className="xs:hidden">Kembali</span>
              </Button>
          </Link>
        </div>

        {/* Post Content */}
        <Card className="mb-4 xs:mb-6 sm:mb-8 shadow-sm">
          <CardHeader className="pb-2 xs:pb-3 sm:pb-6 px-3 xs:px-4 sm:px-6">
            <div className="flex items-start justify-between gap-2 xs:gap-3">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base xs:text-lg sm:text-xl lg:text-2xl mb-2 xs:mb-3 sm:mb-4 leading-tight pr-1 xs:pr-2 break-words">
                  {postData.title}
                </CardTitle>
                
                {/* Author Info */}
                <div className="flex items-center gap-2 xs:gap-2 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                  <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base truncate">
                      {postData.user?.name || "Pengguna"}
                    </p>
                    {communityData?.name && (
                      <p className="text-xs xs:text-xs sm:text-sm text-gray-500 truncate">
                        Dalam komunitas: {communityData.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 text-xs xs:text-xs sm:text-sm text-gray-500 mb-2 xs:mb-3 sm:mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs xs:text-xs">
                      {new Date(postData.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart 
                      className={`w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 flex-shrink-0 ${isLiked ? 'text-red-500' : ''}`}
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    <span className="text-xs xs:text-xs">{likeTotal} suka</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs xs:text-xs">{commentCount} komentar</span>
                  </div>
                </div>
              </div>

              {/* Post Actions - Only for post owner */}
              {isOwner && (
                <div className="flex-shrink-0">
                  {/* Desktop Actions */}
                  <div className="hidden sm:flex gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          <Edit className="w-3 h-3 mr-1" />
                          <span className="hidden md:inline">Edit</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
                        <DialogTitle className="sr-only">Edit Postingan</DialogTitle>
                        <PostForm 
                          post={postData} 
                          onCancel={() => setIsEditDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="text-xs px-2 py-1"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          <span className="hidden md:inline">Hapus</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-[90vw] max-w-[400px] p-4 sm:p-6">
                        <AlertDialogHeader className="space-y-2 sm:space-y-3">
                          <AlertDialogTitle className="text-base sm:text-lg font-semibold text-center sm:text-left">
                            Hapus Postingan
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center sm:text-left">
                            Apakah Anda yakin ingin menghapus postingan ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4">
                          <AlertDialogCancel className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10">
                            Batal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeletePost}
                            disabled={deletePostMutation.isPending}
                            className="bg-red-600 hover:bg-red-700 w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
                          >
                            {deletePostMutation.isPending ? (
                              <>
                                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-spin" />
                                Menghapus...
                              </>
                            ) : (
                              "Hapus"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Mobile Actions - Dropdown */}
                  <div className="sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 xs:h-8 xs:w-8 p-0">
                          <MoreVertical className="h-3 w-3 xs:h-4 xs:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-28 xs:w-32">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer text-xs xs:text-sm">
                              <Edit className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
                            <DialogTitle className="sr-only">Edit Postingan</DialogTitle>
                            <PostForm 
                              post={postData} 
                              onCancel={() => setIsEditDialogOpen(false)}
                            />
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 text-xs xs:text-sm">
                              <Trash2 className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[90vw] max-w-[350px] p-4">
                            <AlertDialogHeader className="space-y-2">
                              <AlertDialogTitle className="text-sm xs:text-base font-semibold text-center">
                                Hapus Postingan
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-xs text-gray-600 leading-relaxed text-center">
                                Apakah Anda yakin ingin menghapus postingan ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col-reverse gap-2 pt-4">
                              <AlertDialogCancel className="w-full text-xs h-8">
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeletePost}
                                disabled={deletePostMutation.isPending}
                                className="bg-red-600 hover:bg-red-700 w-full text-xs h-8"
                              >
                                {deletePostMutation.isPending ? (
                                  <>
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    Menghapus...
                                  </>
                                ) : (
                                  "Hapus"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0 px-3 xs:px-4 sm:px-6">
            {/* Post Image */}
            {postData.imageUrl && (
              <div className="mb-3 xs:mb-4 sm:mb-6">
                <Image
                  src={postData.imageUrl}
                  alt={postData.title}
                  width={800}
                  height={400}
                  className="w-full h-auto max-h-48 xs:max-h-64 sm:max-h-96 object-contain rounded-lg border"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose max-w-none mb-3 xs:mb-4 sm:mb-6">
              {postData.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 pt-2 xs:pt-3 sm:pt-4 border-t">
              <Button 
                variant="ghost" 
                size="sm"
                className={`${isLiked ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'} text-xs xs:text-xs sm:text-sm px-1 xs:px-2 sm:px-4 h-7 xs:h-8 sm:h-9`}
                onClick={handleLikeToggle}
                disabled={likePostMutation.isPending || unlikePostMutation.isPending}
              >
                {likePostMutation.isPending || unlikePostMutation.isPending ? (
                  <Loader2 className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1 animate-spin" />
                ) : (
                  <Heart 
                    className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                )}
                <span className="hidden xs:inline">Suka ({likeTotal})</span>
                <span className="xs:hidden">{likeTotal}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 text-xs xs:text-xs sm:text-sm px-1 xs:px-2 sm:px-4 h-7 xs:h-8 sm:h-9"
              >
                <MessageCircle className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden xs:inline">Komentar ({commentCount})</span>
                <span className="xs:hidden">{commentCount}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2 xs:pb-3 sm:pb-6 px-3 xs:px-4 sm:px-6">
            <CardTitle className="text-sm xs:text-base sm:text-lg">
              Komentar ({commentCount})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 xs:px-4 sm:px-6">
            {/* Comment Form - Only show if user is logged in */}
            {profile?.data ? (
              <div className="mb-3 xs:mb-4 sm:mb-6">
                <form onSubmit={handleAddComment}>
                  <div className="flex gap-1 xs:gap-2 sm:gap-3">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Tulis komentar..."
                        className="w-full p-2 xs:p-2 sm:p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs xs:text-sm sm:text-base"
                        rows={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <div className="flex justify-end mt-1 xs:mt-2">
                        <Button 
                          type="submit" 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs xs:text-xs sm:text-sm h-7 xs:h-8 sm:h-9 px-2 xs:px-3 sm:px-4"
                          disabled={addCommentMutation.isPending || !commentText.trim()}
                        >
                          {addCommentMutation.isPending ? (
                            <Loader2 className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1 animate-spin" />
                          ) : (
                            <Send className="w-3 h-3 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1" />
                          )}
                          <span className="hidden xs:inline">Kirim Komentar</span>
                          <span className="xs:hidden">Kirim</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 xs:p-3 sm:p-4 mb-3 xs:mb-4 sm:mb-6 text-center">
                <p className="text-gray-600 mb-2 text-xs xs:text-sm sm:text-base">
                  Login untuk menambahkan komentar
                </p>
                <Link href="/sign-in">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs xs:text-sm w-full xs:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {/* Comments List */}
            {isLoadingComments ? (
              <div className="flex items-center justify-center py-4 xs:py-6 sm:py-8">
                <Loader2 className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 animate-spin text-green-600" />
              </div>
            ) : commentsData.length > 0 ? (
              <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                {commentsData.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-2 xs:pb-3 sm:pb-4 last:border-b-0">
                    <div className="flex gap-1 xs:gap-2 sm:gap-3">
                      <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-1 sm:mb-2 flex-wrap">
                          <p className="font-medium text-xs xs:text-xs sm:text-sm truncate">
                            {comment.user?.name || "Pengguna"}
                          </p>
                          <span className="text-xs xs:text-xs text-gray-500 flex-shrink-0">
                            {new Date(comment.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <p className="text-gray-700 text-xs xs:text-xs sm:text-sm leading-relaxed mb-1 xs:mb-1 sm:mb-2 break-words">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 xs:py-6 sm:py-8">
                <MessageCircle className="w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 xs:mb-2 sm:mb-3" />
                <p className="text-gray-500 text-xs xs:text-sm sm:text-base">Belum ada komentar</p>
                <p className="text-xs xs:text-xs sm:text-sm text-gray-400 mt-1">
                  Jadilah yang pertama berkomentar!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}