"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductSuggestions } from "@/hooks/use-product";
import { ShoppingCart, ExternalLink, Package } from "lucide-react";
import { FaShopify } from "react-icons/fa";

function ProductSuggestionsSkeleton() {
  return (
    <Card>
      <CardHeader className="py-2">
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="border rounded-lg p-3 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductSuggestions({ cropType, disease }) {
  const { data, isLoading, error } = useProductSuggestions();

  if (isLoading) {
    return <ProductSuggestionsSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-orange-600" />
            Saran Produk Pengobatan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">
              Tidak dapat memuat saran produk saat ini
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const findPlantData = (plantName) => {
    const plantVariations = {
      "Daun Pisang": ["pisang", "banana"],
      "Daun Cabai": ["cabai", "pepper", "chili"],
      "Daun Jagung": ["jagung", "corn"],
      "Daun Anggur": ["anggur", "grape"],
      "Daun Mangga": ["mangga", "mango"],
      "Daun Jeruk": ["jeruk", "orange", "citrus"],
      "Daun Kentang": ["kentang", "potato"],
      "Daun Padi": ["padi", "rice"],
      "Daun Teh": ["teh", "tea"],
      "Daun Tomat": ["tomat", "tomato"],
    };

    return data.data.daftar_tanaman.find((plant) => {
      const variations = plantVariations[plant.nama_tanaman] || [];
      return variations.some((variation) =>
        cropType.toLowerCase().includes(variation)
      );
    });
  };

  const plantData = findPlantData(cropType);

  if (!plantData) {
    return (
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-orange-600" />
            Saran Produk Pengobatan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">
              Tidak ada saran produk untuk tanaman {cropType}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const matchingDiseases = plantData.daftar_penyakit.filter(
    (diseaseData) =>
      disease.toLowerCase().includes(diseaseData.nama_penyakit.toLowerCase()) ||
      diseaseData.nama_penyakit.toLowerCase().includes(disease.toLowerCase())
  );

  const relevantDiseases =
    matchingDiseases.length > 0
      ? matchingDiseases
      : plantData.daftar_penyakit.slice(0, 3);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Penyakit Jamur":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Penyakit Bakteri":
        return "bg-red-100 text-red-800 border-red-200";
      case "Virus (Vektor Kontrol)":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Hama":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Nutrisi":
        return "bg-green-100 text-green-800 border-green-200";
      case "Kondisi Sehat":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "tokopedia":
        return "🟢";
      case "shopee":
        return "🟠";
      default:
        return "🛒";
    }
  };

  return (
    <Card>
      <CardHeader className="py-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4 text-orange-600" />
          Saran Produk Pengobatan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relevantDiseases.map((diseaseData, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-sm text-gray-800">
                  {diseaseData.nama_penyakit}
                </h4>
                <Badge
                  className={`${getCategoryColor(
                    diseaseData.kategori
                  )} text-xs`}
                >
                  {diseaseData.kategori}
                </Badge>
              </div>

              {diseaseData.solusi_ramah_lingkungan.length > 0 && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-green-800 mb-1">
                    Solusi Ramah Lingkungan:
                  </p>
                  <p className="text-xs text-green-700">
                    {diseaseData.solusi_ramah_lingkungan.join(", ")}
                  </p>
                </div>
              )}

              {diseaseData.pencarian_ecommerce.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {diseaseData.pencarian_ecommerce.map(
                    (product, productIndex) => (
                      <div
                        key={productIndex}
                        className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">
                            {getPlatformIcon(product.platform)}
                          </span>
                          <span className="font-medium text-sm text-gray-800">
                            {product.platform}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          {product.keyword}
                        </p>
                        <Button
                          size="sm"
                          className="w-full text-xs"
                          onClick={() =>
                            window.open(product.link_produk, "_blank")
                          }
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Lihat Produk
                        </Button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}

          {relevantDiseases.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600">
                Tidak ada saran produk untuk penyakit {disease}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
