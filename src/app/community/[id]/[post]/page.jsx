"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetPostById, useDeletePost, useAddComment, useGetCommentsByPost } from "@/hooks/use-post";
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
} from "@/components/ui/dialog";
import { 
  Loader2, 
  ArrowLeft, 
  MessageCircle,
  Heart,
  Calendar,
  User,
  Edit,
  Trash2,
  Send
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import PostForm from "@/components/community/post-form";

export default function CommunityPostPage() {
  const params = useParams();
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { data: post, isLoading: isLoadingPost, error: postError } = useGetPostById(params.post);
  const { data: community, isLoading: isLoadingCommunity } = useGetCommunityById(params.id);
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsByPost(params.post);
  const { data: profile } = useProfile();
  
  const deletePostMutation = useDeletePost();
  const addCommentMutation = useAddComment();

  const isLoading = isLoadingPost || isLoadingCommunity;
  
  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            <p className="text-gray-600">Memuat detail postingan...</p>
          </div>
        </div>
      </main>
    );
  }

  if (postError || !post) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold mb-2">
              Postingan tidak ditemukan
            </p>
            <p className="text-gray-600 mb-4">{postError?.message}</p>
            <Link href={`/community/${params.id}`}>
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
  
  const postData = post.data;
  const commentsData = comments?.data?.comments || [];
  const communityData = community?.data;
  
  const isOwner = profile?.data?.id === postData.userId;
  
  const handleDeletePost = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      deletePostMutation.mutate(postData.id);
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
        }
      }
    );
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/community/${params.id}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Komunitas
          </Button>
        </Link>
      </div>

      {/* Post Content */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-4">{postData.title}</CardTitle>
              
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{postData.user?.name || "Pengguna"}</p>
                  <p className="text-sm text-gray-500">
                    {communityData?.name && (
                      <>Dalam komunitas: {communityData.name}</>
                    )}
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(postData.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{postData.likesCount || 0} suka</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{postData.commentsCount || 0} komentar</span>
                </div>
              </div>
            </div>

            {/* Post Actions - Only for post owner */}
            {isOwner && (
              <div className="flex gap-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <PostForm 
                      post={postData} 
                      onCancel={() => setIsEditDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDeletePost}
                  disabled={deletePostMutation.isPending}
                >
                  {deletePostMutation.isPending ? (
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
          {/* Post Image */}
          {postData.imageUrl && (
            <div className="mb-6">
              <Image
                src={postData.imageUrl}
                alt={postData.title}
                width={800}
                height={400}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose max-w-none mb-6">
            {postData.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Heart className="w-4 h-4 mr-2" />
              Suka ({postData.likesCount || 0})
            </Button>
            <Button variant="ghost" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
              <MessageCircle className="w-4 h-4 mr-2" />
              Komentar ({postData.commentsCount || 0})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Komentar ({postData.commentsCount || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Comment Form - Only show if user is logged in */}
          {profile?.data ? (
            <div className="mb-6">
              <form onSubmit={handleAddComment}>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Tulis komentar..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        type="submit" 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={addCommentMutation.isPending || !commentText.trim()}
                      >
                        {addCommentMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Kirim Komentar
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
              <p className="text-gray-600 mb-2">Login untuk menambahkan komentar</p>
              <Link href="/sign-in">
                <Button className="bg-green-600 hover:bg-green-700">
                  Login
                </Button>
              </Link>
            </div>
          )}

          {/* Comments List */}
          {isLoadingComments ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : commentsData.length > 0 ? (
            <div className="space-y-4">
              {commentsData.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{comment.user?.name || "Pengguna"}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-red-500">
                          <Heart className="w-3 h-3 mr-1" />
                          {comment.likesCount || 0}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada komentar</p>
              <p className="text-sm text-gray-400 mt-1">Jadilah yang pertama berkomentar!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}