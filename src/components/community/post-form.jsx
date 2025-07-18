"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Upload, X, Camera, FileImage } from "lucide-react";
import { useCreatePost, useUpdatePost } from "@/hooks/use-post";
import Image from "next/image";

const postSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  image: z.any().optional(),
});

export default function PostForm({ post = null, communityId, onCancel }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const isEditing = !!post;
  
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const isLoading = createMutation.isPending || updateMutation.isPending;

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

  useEffect(() => {
    if (post && isEditing) {
      reset({
        title: post.title,
        content: post.content,
      });
      if (post.imageUrl) {
        setImagePreview(post.imageUrl);
      }
    }
  }, [post, isEditing, reset]);

  const handleImageChange = (file) => {
    if (file) {
      setImageFile(file);
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
    e.target.value = "";
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    setValue("image", null, { shouldValidate: true });
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    
    if (!isEditing) {
      formData.append("communityId", communityId);
    }
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing) {
      updateMutation.mutate(
        { postId: post.id, data: formData },
        {
          onSuccess: () => {
            onCancel?.();
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          reset();
          setImagePreview(null);
          setImageFile(null);
          onCancel?.();
        },
      });
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Postingan" : "Buat Postingan Baru"}
          </DialogTitle>
        </DialogHeader>
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

          <div className="space-y-2">
            <Label htmlFor="image">Gambar (Opsional)</Label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-green-500 bg-green-50 scale-105"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative flex flex-col items-center">
                  <div className="relative mx-auto w-full max-w-xs aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, 320px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    Klik tombol di atas untuk mengganti gambar
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="p-4 bg-green-100 rounded-full">
                      <Camera className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Drag & drop gambar di sini
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      atau klik tombol di bawah untuk memilih file
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileImage className="h-4 w-4" />
                    <span>Mendukung: PNG, JPG, JPEG (max 5MB)</span>
                  </div>
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                ref={fileInputRef}
              />
              {!imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Pilih Gambar
                </Button>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.image.message}
              </p>
            )}
          </div>

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