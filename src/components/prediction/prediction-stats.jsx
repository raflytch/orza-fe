"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FaLeaf,
  FaExclamationTriangle,
  FaChartBar,
  FaPlus,
} from "react-icons/fa";
import { usePredictionStats } from "@/hooks/use-prediction";
import { TrendingUp, Activity } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#3B82F6"];

function PredictionStatsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full rounded-lg" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-8 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-8 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PredictionStats() {
  const { data: stats, isLoading } = usePredictionStats();

  if (isLoading) {
    return <PredictionStatsSkeleton />;
  }

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

  const cropChartData =
    stats?.data?.cropStats?.map((crop, index) => ({
      name: crop.cropType.charAt(0).toUpperCase() + crop.cropType.slice(1),
      value: crop._count.cropType,
      color: COLORS[index % COLORS.length],
    })) || [];

  const severityChartData =
    stats?.data?.severityStats?.map((severity, index) => ({
      name: severity.severity,
      value: severity._count.severity,
      color:
        severity.severity.toLowerCase() === "ringan"
          ? "#10B981"
          : severity.severity.toLowerCase() === "sedang"
          ? "#F59E0B"
          : "#EF4444",
    })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Total Prediksi
            </CardTitle>
            <div className="p-2 bg-green-500 rounded-full">
              <FaChartBar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              {stats?.data?.totalPredictions || 0}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Prediksi yang telah dibuat
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Jenis Tanaman
            </CardTitle>
            <div className="p-2 bg-blue-500 rounded-full">
              <FaLeaf className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {stats?.data?.cropStats?.length || 0}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <Activity className="h-3 w-3 mr-1" />
              Varietas yang dianalisis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Tingkat Keparahan
            </CardTitle>
            <div className="p-2 bg-purple-500 rounded-full">
              <FaExclamationTriangle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">
              {stats?.data?.severityStats?.length || 0}
            </div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <FaPlus className="h-3 w-3 mr-1" />
              Kategori keparahan
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaLeaf className="h-5 w-5 text-green-500" />
              Distribusi Jenis Tanaman
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cropChartData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cropChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                  <FaLeaf className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Belum ada data tersedia</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
              Tingkat Keparahan Penyakit
            </CardTitle>
          </CardHeader>
          <CardContent>
            {severityChartData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={severityChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                      {severityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                  <FaExclamationTriangle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Belum ada data tersedia</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detail Jenis Tanaman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.data?.cropStats?.map((crop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium capitalize">
                      {crop.cropType}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {crop._count.cropType}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detail Tingkat Keparahan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.data?.severityStats?.map((severity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor:
                          severity.severity.toLowerCase() === "ringan"
                            ? "#10B981"
                            : severity.severity.toLowerCase() === "sedang"
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    />
                    <span className="font-medium">{severity.severity}</span>
                  </div>
                  <Badge className={getSeverityColor(severity.severity)}>
                    {severity._count.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
