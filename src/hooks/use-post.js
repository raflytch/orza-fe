import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Get all posts by community
export const useGetPostsByCommunity = (communityId, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["posts", communityId, page, limit],
    queryFn: () => postService.getPostsByCommunity(communityId, page, limit),
    enabled: !!communityId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Get post by ID
export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => postService.getPostById(postId),
    enabled: !!postId,
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
      queryClient.invalidateQueries({ queryKey: ["posts", variables.get("communityId")] });
      
      // Redirect to the new post (optional)
      if (data.data?.id && variables.get("communityId")) {
        router.push(`/community/${variables.get("communityId")}/${data.data.id}`);
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
    onSuccess: (data) => {
      toast.success(data.message || "Postingan berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["post"] });
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
    onSuccess: (data, variables, context) => {
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
    mutationFn: postService.likePost,
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error("Gagal menyukai postingan");
    },
  });
};

// Unlike post
export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.unlikePost,
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error("Gagal membatalkan suka pada postingan");
    },
  });
};

// Add comment
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }) => postService.addComment(postId, content),
    onSuccess: (data, { postId }) => {
      toast.success("Komentar berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan komentar");
    },
  });
};

// Get comments for post
export const useGetCommentsByPost = (postId, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["comments", postId, page, limit],
    queryFn: () => postService.getCommentsByPost(postId, page, limit),
    enabled: !!postId,
  });
};