"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import Image from "next/image";

export default function ArticleModal({ article, trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] flex flex-col rounded-2xl">
        <DialogHeader className="flex-shrink-0 px-4 sm:px-6">
          <DialogTitle className="sr-only">Baca Artikel</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
          {article.imageUrl && (
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 w-fit text-xs"
              >
                {article.category?.name}
              </Badge>
              <span className="text-xs sm:text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight break-words">
              {article.title}
            </h1>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-900">
                  {article.author?.name}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {article.tags?.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base">
                {article.content}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
