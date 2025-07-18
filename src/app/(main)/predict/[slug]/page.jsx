"use client";

import { use } from "react";
import PredictionDetail from "@/components/prediction/prediction-detail";

export default function PredictionDetailPage({ params }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <PredictionDetail predictionId={resolvedParams.slug} />
        </div>
      </div>
    </div>
  );
}
