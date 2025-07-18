"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaLeaf, FaArrowLeft, FaUser, FaTrash } from "react-icons/fa";
import { Calendar, Target, AlertCircle } from "lucide-react";
import { usePredictionById, useDeletePrediction } from "@/hooks/use-prediction";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Typewriter from "@/components/ui/typewriter";

function PredictionDetailSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-16" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>

        <Card className="h-fit">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-14" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PredictionDetail({ predictionId }) {
  const { data, isLoading } = usePredictionById(predictionId);
  const deletePrediction = useDeletePrediction();
  const router = useRouter();

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "ringan":
        return "bg-green-100 text-green-800 border-green-200";
      case "sedang":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "berat":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "text-green-600";
    if (confidence >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const handleDelete = () => {
    deletePrediction.mutate(predictionId, {
      onSuccess: () => {
        router.push("/predict");
      },
    });
  };

  if (isLoading) {
    return <PredictionDetailSkeleton />;
  }

  if (!data?.data) {
    return (
      <Card className="text-center py-8">
        <CardContent className="space-y-3">
          <AlertCircle className="h-10 w-10 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Prediksi tidak ditemukan
            </h3>
            <p className="text-sm text-gray-600">
              Prediksi yang Anda cari tidak ditemukan atau telah dihapus
            </p>
          </div>
          <Link href="/predict">
            <Button size="sm" className="mt-3">
              <FaArrowLeft className="h-3 w-3 mr-2" />
              Kembali ke Prediksi
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const prediction = data.data;
  const cleanTreatment = prediction.treatment?.replace(/\*\*/g, "") || "";

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/predict">
            <Button variant="ghost" size="sm" className="hover:bg-green-50">
              <FaArrowLeft className="h-3 w-3 mr-2" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-full">
              <FaLeaf className="text-green-600 h-4 w-4" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800 capitalize">
              Analisis {prediction.cropType}
            </h1>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="hover:bg-red-600"
            >
              <FaTrash className="h-3 w-3 mr-2" />
              Hapus
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Prediksi</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus prediksi ini? Tindakan ini
                tidak dapat dibatalkan dan Anda akan diarahkan kembali ke
                halaman prediksi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={deletePrediction.isPending}
              >
                {deletePrediction.isPending ? "Menghapus..." : "Hapus"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-600" />
            <h2 className="text-sm font-medium text-gray-700">
              Gambar Analisis
            </h2>
          </div>
          <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none">
            <Image
              src={prediction.imageUrl}
              alt={`${prediction.cropType} analysis`}
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <Card className="h-fit">
          <CardHeader className="py-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              Hasil Analisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Jenis Tanaman:
                </span>
                <span className="text-sm capitalize font-semibold text-green-600">
                  {prediction.cropType}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Penyakit:
                </span>
                <span className="text-sm font-semibold text-red-600 text-right">
                  {prediction.disease}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Tingkat Keparahan:
                </span>
                <Badge
                  className={`${getSeverityColor(prediction.severity)} text-xs`}
                >
                  {prediction.severity}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Tingkat Kepercayaan:
                </span>
                <span
                  className={`text-sm font-bold ${getConfidenceColor(
                    prediction.confidence
                  )}`}
                >
                  {prediction.confidence.toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Dianalisis:
                </span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(prediction.createdAt), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <FaLeaf className="h-4 w-4 text-green-600" />
            Rekomendasi Pengobatan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg border border-green-200 p-4">
            <Typewriter
              text={cleanTreatment}
              speed={20}
              className="text-sm text-gray-700 leading-relaxed"
            />
          </div>
        </CardContent>
      </Card>

      {prediction.user && (
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <FaUser className="h-4 w-4 text-purple-600" />
              Informasi Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {prediction.user.avatarUrl ? (
                <Image
                  src={prediction.user.avatarUrl}
                  alt={prediction.user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
              )}
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {prediction.user.name}
                </h4>
                <p className="text-xs text-gray-600">{prediction.user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Bergabung sejak{" "}
                  {formatDistanceToNow(new Date(prediction.user.createdAt), {
                    addSuffix: true,
                    locale: id,
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
