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
import { useCreateCommunity, useUpdateCommunity } from "@/hooks/use-community";
import Image from "next/image";

const communitySchema = z.object({
  name: z.string().min(3, "Nama komunitas minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.any().optional(),
});

export default function CommunityForm({ community = null, onCancel }) {
  const [imagePreview, setImagePreview] = useState(community?.imageUrl || null);
  const [imageFile, setImageFile] = useState(null);

  const createMutation = useCreateCommunity();
  const updateMutation = useUpdateCommunity();

  const isEditing = !!community;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: community?.name || "",
      description: community?.description || "",
    },
  });

  // Update form when community prop changes
  useEffect(() => {
    if (community) {
      reset({
        name: community.name,
        description: community.description,
      });
      setImagePreview(community.imageUrl);
    }
  }, [community, reset]);

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
    if (!isEditing) {
      setImagePreview(null);
    } else {
      setImagePreview(community?.imageUrl || null);
    }
    setValue("image", null);
  };

  const onSubmit = (data) => {
    if (isEditing) {
      // For update, only send name and description
      updateMutation.mutate({
        id: community.id,
        data: {
          name: data.name,
          description: data.description,
        },
      }, {
        onSuccess: () => {
          if (onCancel) onCancel();
        },
      });
    } else {
      // For create, send FormData with image
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
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
          {isEditing ? "Edit Komunitas" : "Buat Komunitas Baru"}
        </CardTitle>
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
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="image">Gambar Komunitas</Label>
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

          {isEditing && imagePreview && (
            <div className="space-y-2">
              <Label>Gambar Saat Ini</Label>
              <div className="w-full h-48 rounded-lg overflow-hidden border">
                <Image
                  src={imagePreview}
                  alt="Current image"
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-gray-500">
                Gambar tidak dapat diubah saat edit. Hapus dan buat ulang komunitas untuk mengubah gambar.
              </p>
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
                isEditing ? "Perbarui Komunitas" : "Buat Komunitas"
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