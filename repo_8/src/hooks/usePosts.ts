import { useState, useEffect } from "react";
import { Post, PostType } from "@/lib/types";
import { mockPosts } from "@/lib/mockApi";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await mockPosts.getAll();
      setPosts(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (
    userId: string,
    content: string,
    type: PostType,
    tags: string[]
  ) => {
    const newPost = await mockPosts.create({ userId, content, type, tags });
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const likePost = async (postId: string, userId: string) => {
    const updated = await mockPosts.like(postId, userId);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? updated : p))
    );
  };

  const addComment = async (postId: string, userId: string, content: string) => {
    const updated = await mockPosts.addComment(postId, userId, content);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? updated : p))
    );
  };

  return {
    posts,
    isLoading,
    createPost,
    likePost,
    addComment,
    refetch: fetchPosts,
  };
}
