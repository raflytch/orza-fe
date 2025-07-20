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
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Upload, X, Camera, FileImage } from "lucide-react";
import { useCreateCommunity, useUpdateCommunity } from "@/hooks/use-community";
import Image from "next/image";
import { toast } from "sonner";

const communitySchema = z.object({
  name: z.string().min(3, "Nama komunitas minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.any().optional(),
});

export default function CommunityForm({ community = null, onCancel }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const isEditing = !!community;
  const createMutation = useCreateCommunity();
  const updateMutation = useUpdateCommunity();
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: community?.name || "",
      description: community?.description || "",
    },
  });

  useEffect(() => {
    if (community?.imageUrl) {
      setImagePreview(community.imageUrl);
    }
  }, [community]);

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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast("Ukuran file maksimal 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast("File harus berupa gambar");
      return;
    }

    setImageFile(file);
    setValue("image", file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing) {
      updateMutation.mutate(
        { id: community.id, data: formData },
        {
          onSuccess: () => {
            reset();
            setImagePreview(null);
            setImageFile(null);
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
            {isEditing ? "Edit Komunitas" : "Buat Komunitas Baru"}
          </DialogTitle>
        </DialogHeader>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Komunitas</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Masukkan nama komunitas"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Masukkan deskripsi komunitas"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Gambar Komunitas</Label>
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
                    {isEditing
                      ? "Klik tombol di atas untuk mengganti gambar"
                      : "Klik tombol di atas untuk mengganti gambar"}
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
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {imagePreview ? "Ganti Gambar" : "Pilih Gambar"}
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
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
              ) : isEditing ? (
                "Perbarui Komunitas"
              ) : (
                "Buat Komunitas"
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
