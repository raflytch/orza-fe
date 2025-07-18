"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload, X } from "lucide-react";
import { useCreatePost, useUpdatePost } from "@/hooks/use-post";
import Image from "next/image";

const postSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  image: z.any().optional(),
});

export default function PostForm({ post = null, communityId, onCancel }) {
  const [imagePreview, setImagePreview] = useState(post?.imageUrl || null);
  const [imageFile, setImageFile] = useState(null);

  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const isEditing = !!post;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  // Update form when post prop changes
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
      });
      setImagePreview(post.imageUrl);
    }
  }, [post, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setValue("image", file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue("image", null);
  };

  const onSubmit = (data) => {
    if (isEditing) {
      // For update, only send title and content
      updateMutation.mutate({
        postId: post.id,
        data: {
          title: data.title,
          content: data.content,
        },
      }, {
        onSuccess: () => {
          if (onCancel) onCancel();
        },
      });
    } else {
      // For create, send FormData with image
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("communityId", communityId);
      
      if (imageFile) {
        formData.append("image", imageFile);
      }
      
      createMutation.mutate(formData, {
        onSuccess: () => {
          if (onCancel) onCancel();
        },
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600">
          {isEditing ? "Edit Postingan" : "Buat Postingan Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Postingan</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Masukkan judul postingan"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Masukkan konten postingan"
              rows={6}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="image">Gambar (Opsional)</Label>
              <div className="flex flex-col gap-4">
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-500">Klik untuk upload gambar</p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Memperbarui..." : "Membuat..."}
                </>
              ) : (
                isEditing ? "Perbarui Postingan" : "Buat Postingan"
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Batal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}