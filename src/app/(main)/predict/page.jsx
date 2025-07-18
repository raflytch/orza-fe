"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaLeaf, FaHistory, FaChartBar } from "react-icons/fa";
import PredictionForm from "@/components/prediction/prediction-form";
import PredictionList from "@/components/prediction/prediction-list";
import PredictionStats from "@/components/prediction/prediction-stats";

export default function PredictPage() {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaLeaf className="text-green-500 text-3xl" />
              <h1 className="text-xl md:text-4xl font-bold text-gray-800">
                Prediksi Penyakit Tanaman
              </h1>
            </div>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Gunakan teknologi AI untuk mendeteksi penyakit tanaman dan
              dapatkan rekomendasi pengobatan yang tepat
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="new" className="flex items-center gap-2">
                <FaLeaf className="h-4 w-4" />
                Analisis Baru
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <FaHistory className="h-4 w-4" />
                Riwayat
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <FaChartBar className="h-4 w-4" />
                Statistik
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new">
              <PredictionForm />
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaHistory className="h-5 w-5" />
                      Riwayat Prediksi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PredictionList />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaChartBar className="h-5 w-5" />
                      Statistik Prediksi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PredictionStats />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
