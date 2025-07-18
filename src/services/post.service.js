import apiClient from "@/lib/api-client";

export const postService = {
  // Get posts by community ID with pagination
  getPostsByCommunity: async (communityId, page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/posts?page=${page}&limit=${limit}&communityId=${communityId}`
    );
    return response.data;
  },

  // Get post by ID
  getPostById: async (postId) => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  },

  // Create new post
  createPost: async (formData) => {
    const response = await apiClient.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update post
  updatePost: async (postId, data) => {
    const response = await apiClient.put(`/posts/${postId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  // Delete post
  deletePost: async (postId) => {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  },

  // Like post
  likePost: async (postId) => {
    const response = await apiClient.post("/likes/like", {
      postId: postId,
    });
    return response.data;
  },

  // Unlike post
  unlikePost: async (postId) => {
    const response = await apiClient.post("/likes/unlike", {
      postId: postId,
    });
    return response.data;
  },
  
  // Get like count for a post
  getLikeCount: async (postId) => {
    const response = await apiClient.get(`/likes/count?postId=${postId}`);
    return response.data;
  },

  // Add comment
  addComment: async (postId, content) => {
    const response = await apiClient.post("/comments", {
      postId,
      content,
    });
    return response.data;
  },

  // Update comment
  updateComment: async (commentId, content) => {
    const response = await apiClient.put(`/comments/${commentId}`, {
      content,
    });
    return response.data;
  },

  // Delete comment
  deleteComment: async (commentId) => {
    const response = await apiClient.delete(`/comments/${commentId}`);
    return response.data;
  },

  // Get comments for post
  getCommentsByPost: async (postId, page = 1, limit = 10) => {
    // Gunakan endpoint comments dengan filter postId
    const response = await apiClient.get(
      `/comments?postId=${postId}&page=${page}&limit=${limit}`
    );
    return response.data;
  },
};