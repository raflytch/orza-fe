"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Upload, X, Camera, FileImage } from "lucide-react";
import {
  useCreateArticle,
  useUpdateArticle,
  useGetCategories,
} from "@/hooks/use-article";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const articleSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(50, "Konten minimal 50 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  tags: z.array(z.string()).min(1, "Minimal 1 tag harus dipilih"),
  image: z.any().optional(),
});

const recommendedTags = [
  "Agritech",
  "Pertanian",
  "Teknologi",
  "Inovasi",
  "Sustainable",
  "Organik",
  "Hidroponik",
  "Aeroponik",
  "Smart Farming",
  "IoT",
  "AI",
  "Machine Learning",
  "Drone",
  "Sensor",
  "Otomasi",
  "Irigasi",
  "Pupuk",
  "Pestisida",
  "Bioteknologi",
  "Greenhouse",
];

export default function ArticleForm({ article = null, onCancel }) {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);

  const isEditing = !!article;
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const { data: categories } = useGetCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      categoryId: article?.categoryId || "",
      tags: article?.tags || [],
    },
  });

  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        content: article.content,
        categoryId: article.categoryId,
        tags: article.tags || [],
      });
      setSelectedTags(article.tags || []);
      if (article.imageUrl) {
        setImagePreview(article.imageUrl);
      }
    }
  }, [article, reset]);

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

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageSelect(files[0]);
    }
  };

  const handleImageSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      setValue("tags", newTags);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(newTags);
    setValue("tags", newTags);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId);
    formData.append("tags", selectedTags.join(","));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing) {
      updateMutation.mutate(
        { id: article.id, data: formData },
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
          setSelectedTags([]);
          onCancel?.();
        },
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-4 sm:px-6 pb-4 sm:pb-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold">
            {isEditing ? "Edit Artikel" : "Buat Artikel Baru"}
          </DialogTitle>
        </DialogHeader>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm sm:text-base">
              Judul Artikel
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Masukkan judul artikel"
              className={`text-sm sm:text-base ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm sm:text-base">
              Konten
            </Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Masukkan konten artikel"
              rows={6}
              className={`text-sm sm:text-base ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            {errors.content && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId" className="text-sm sm:text-base">
              Kategori
            </Label>
            <Select
              value={selectedCategoryId}
              onValueChange={(value) => setValue("categoryId", value)}
            >
              <SelectTrigger
                className={`text-sm sm:text-base ${
                  errors.categoryId ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Tags</Label>
            <Select onValueChange={handleTagSelect}>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder="Pilih tags" />
              </SelectTrigger>
              <SelectContent>
                {recommendedTags.map((tag) => (
                  <SelectItem
                    key={tag}
                    value={tag}
                    disabled={selectedTags.includes(tag)}
                  >
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 text-xs sm:text-sm px-2 py-1 break-words"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>

            {errors.tags && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.tags.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm sm:text-base">
              Gambar (Opsional)
            </Label>
            <div
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-green-500 bg-green-50 scale-105"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg object-cover w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <div className="mt-3 sm:mt-4 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs sm:text-sm"
                    >
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Ganti Gambar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="p-3 sm:p-4 bg-green-100 rounded-full">
                      <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-medium text-gray-700">
                      Drag & drop gambar di sini
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      atau klik tombol di bawah untuk memilih file
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <FileImage className="h-4 w-4" />
                    <span>Mendukung: PNG, JPG, JPEG (max 5MB)</span>
                  </div>
                </div>
              )}

              {!imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-3 sm:mt-4 text-xs sm:text-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Pilih Gambar
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
                  {isEditing ? "Menyimpan..." : "Membuat..."}
                </>
              ) : isEditing ? (
                "Simpan Perubahan"
              ) : (
                "Buat Artikel"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
