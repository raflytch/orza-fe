"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X, Camera, FileImage } from "lucide-react";
import { FaLeaf, FaRobot } from "react-icons/fa";
import { useCrops, useCreatePrediction } from "@/hooks/use-prediction";
import Image from "next/image";

const predictionSchema = z.object({
  cropType: z.string().min(1, "Pilih jenis tanaman"),
  image: z.instanceof(File, { message: "Gambar harus berupa file" }),
});

export default function PredictionForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { data: crops, isLoading: cropsLoading } = useCrops();
  const createPrediction = useCreatePrediction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(predictionSchema),
  });

  const watchedCropType = watch("cropType");

  const handleImageChange = (file) => {
    if (file) {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    createPrediction.mutate(data, {
      onSuccess: () => {
        reset();
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-green-50 py-0">
      <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <div className="flex items-center justify-center gap-3 mb-4 py-4">
          <div className="p-3 bg-white/20 rounded-full">
            <FaRobot className="text-lg md:text-xl" />
          </div>
          <CardTitle className="text-xs md:text-xl font-bold">
            AI Plant Disease Detection
          </CardTitle>
        </div>
        <CardDescription className="text-green-100 pb-4">
          Upload gambar tanaman untuk mendeteksi penyakit menggunakan teknologi
          AI terdepan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="cropType"
              className="text-sm font-semibold text-gray-700"
            >
              Jenis Tanaman
            </Label>
            <Select
              value={watchedCropType}
              onValueChange={(value) => setValue("cropType", value)}
            >
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors">
                <SelectValue placeholder="Pilih jenis tanaman yang akan dianalisis" />
              </SelectTrigger>
              <SelectContent>
                {cropsLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2 text-sm">Memuat...</span>
                  </div>
                ) : (
                  crops?.data?.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      <div className="flex items-center gap-2">
                        <FaLeaf className="h-4 w-4 text-green-500" />
                        {crop.label}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.cropType && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.cropType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="image"
              className="text-sm font-semibold text-gray-700"
            >
              Gambar Tanaman
            </Label>
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

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg shadow-lg"
            disabled={createPrediction.isPending}
          >
            {createPrediction.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Menganalisis dengan AI...
              </>
            ) : (
              <>
                <FaRobot className="mr-2 h-5 w-5" />
                Mulai Analisis AI
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
