import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { postService } from "@/services/post.service";

// Get posts by community
export const useGetPostsByCommunity = (communityId, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["posts", communityId, page, limit],
    queryFn: () => postService.getPostsByCommunity(communityId, page, limit),
    enabled: !!communityId,
    staleTime: 1 * 60 * 1000, // Mengurangi stale time agar data lebih sering direfresh
  });
};

// Get post by ID
export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => postService.getPostById(postId),
    enabled: !!postId,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: true, // Mengaktifkan refetch ketika window fokus kembali
  });
};

// Get like count for a post
export const useGetLikeCount = (postId) => {
  return useQuery({
    queryKey: ["likeCount", postId],
    queryFn: () => postService.getLikeCount(postId),
    enabled: !!postId,
    staleTime: 30 * 1000, // Refresh lebih sering (30 detik)
    refetchOnWindowFocus: true,
  });
};

// Create post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: (data, variables) => {
      toast.success(data.message || "Postingan berhasil dibuat");
      
      // Extract communityId from FormData
      let communityId;
      if (variables instanceof FormData) {
        communityId = variables.get("communityId");
      }
      
      if (communityId) {
        queryClient.invalidateQueries({ queryKey: ["posts", communityId] });
        
        // Redirect to the new post (optional)
        if (data.data?.id) {
          router.push(`/community/${communityId}/${data.data.id}`);
        } else {
          router.push(`/community/${communityId}`);
        }
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat postingan");
    },
  });
};

// Update post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }) => postService.updatePost(postId, data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Postingan berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui postingan");
    },
  });
};

// Delete post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: postService.deletePost,
    onSuccess: (data) => {
      toast.success(data.message || "Postingan berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      
      // Go back to community page
      router.back();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus postingan");
    },
  });
};

// Like post
export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => postService.likePost(postId),
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["likeCount", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menyukai postingan");
    },
  });
};

// Unlike post
export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => postService.unlikePost(postId),
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["likeCount", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membatalkan suka pada postingan");
    },
  });
};

// Add comment
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }) => postService.addComment(postId, content),
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan komentar");
    },
  });
};

// Update comment
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }) => postService.updateComment(commentId, content),
    onSuccess: (data, variables) => {
      if (data?.data?.postId) {
        queryClient.invalidateQueries({ queryKey: ["comments", data.data.postId] });
        queryClient.invalidateQueries({ queryKey: ["post", data.data.postId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        queryClient.invalidateQueries({ queryKey: ["post"] });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui komentar");
    },
  });
};

// Delete comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => postService.deleteComment(commentId),
    onSuccess: (data) => {
      if (data?.data?.postId) {
        queryClient.invalidateQueries({ queryKey: ["comments", data.data.postId] });
        queryClient.invalidateQueries({ queryKey: ["post", data.data.postId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        queryClient.invalidateQueries({ queryKey: ["post"] });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus komentar");
    },
  });
};

// Get comments for post
export const useGetCommentsByPost = (postId, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["comments", postId, page, limit],
    queryFn: () => postService.getCommentsByPost(postId, page, limit),
    enabled: !!postId,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};