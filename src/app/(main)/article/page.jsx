"use client";

import { useState } from "react";
import { useGetAllArticles } from "@/hooks/use-article";
import { useProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Plus, BookOpen, User, Eye, FileText } from "lucide-react";
import { getCookie } from "cookies-next/client";
import Link from "next/link";
import Image from "next/image";
import ArticleForm from "@/components/article/article-form";
import ArticleModal from "@/components/article/article-modal";
import { ArticleSkeletonList } from "@/components/article/article-skeleton";
import { BlurFade } from "@/components/magicui/blur-fade";
import { images } from "@/constants/images";

export default function ArticlePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const token = getCookie("token");
  const { data: profile } = useProfile();
  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetAllArticles(currentPage, 12);

  const articles = articlesData?.data?.articles || [];
  const pagination = articlesData?.data;

  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold mb-2">
              Gagal memuat artikel
            </p>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-screen flex flex-col">
        <div className="absolute inset-0">
          <Image
            src={images.imageHero3}
            alt="Artikel Banner"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
          <BlurFade>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Artikel & Edukasi
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                Baca artikel terbaru seputar teknologi pertanian dan inovasi
                agritech
              </p>

              <div className="relative max-w-sm sm:max-w-md w-full mx-auto mb-6 sm:mb-8 px-4">
                <Input
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-12 sm:h-14 bg-white/95 backdrop-blur-sm border-0 rounded-full text-sm sm:text-base shadow-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300"
                />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </span>
              </div>

              {!token && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-md mx-auto">
                  <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    Mari Berkontribusi
                  </h3>
                  <p className="text-white/90 mb-3 sm:mb-4 text-xs sm:text-sm">
                    Bagikan pengetahuan dan pengalaman Anda dalam dunia
                    pertanian
                  </p>
                  <Link href="/sign-in">
                    <Button className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold text-sm sm:text-base">
                      Mulai Berkontribusi
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 max-w-7xl">
        <BlurFade delay={0.2}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {searchTerm
                  ? `Hasil Pencarian "${searchTerm}"`
                  : "Semua Artikel"}
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {filteredArticles.length} artikel ditemukan
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {token && (
                <Link href="/article/my">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-600 hover:bg-green-50 text-xs sm:text-sm"
                  >
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Artikel Saya</span>
                    <span className="sm:hidden">Artikel Saya</span>
                  </Button>
                </Link>
              )}

              {token && (
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Buat Artikel</span>
                      <span className="sm:hidden">Buat Artikel</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
                    <DialogTitle className="sr-only">
                      Buat Artikel Baru
                    </DialogTitle>
                    <ArticleForm
                      onCancel={() => setIsCreateDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </BlurFade>

        {isLoading ? (
          <BlurFade delay={0.3}>
            <ArticleSkeletonList count={12} />
          </BlurFade>
        ) : filteredArticles.length === 0 ? (
          <BlurFade delay={0.3}>
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-3">
                {searchTerm ? "Artikel tidak ditemukan" : "Belum ada artikel"}
              </h3>
              <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                {searchTerm
                  ? "Coba gunakan kata kunci yang berbeda untuk menemukan artikel yang Anda cari"
                  : "Jadilah yang pertama membuat artikel dan berbagi pengetahuan dengan komunitas"}
              </p>
            </div>
          </BlurFade>
        ) : (
          <>
            <BlurFade delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {filteredArticles.map((article, index) => (
                  <BlurFade key={article.id} delay={0.1 * index}>
                    <Card className="group overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl flex flex-col h-full">
                      <div className="p-3 sm:p-4 pb-0">
                        <div className="aspect-video relative overflow-hidden rounded-lg">
                          {article.imageUrl ? (
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>

                      <CardHeader className="pb-2 sm:pb-3 flex-shrink-0 px-3 sm:px-4">
                        <Badge
                          variant="secondary"
                          className="w-fit mb-2 bg-green-100 text-green-800 text-xs"
                        >
                          {article.category?.name}
                        </Badge>
                        <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-green-600 transition-colors break-words">
                          {article.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3 sm:space-y-4 flex-1 flex flex-col px-3 sm:px-4">
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 break-words">
                          {article.content}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {article.tags?.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs break-words"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                {article.author?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(article.createdAt).toLocaleDateString(
                                  "id-ID"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <ArticleModal
                          article={article}
                          trigger={
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-2 hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all duration-300 text-xs sm:text-sm"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Baca Artikel
                            </Button>
                          }
                        />
                      </CardContent>
                    </Card>
                  </BlurFade>
                ))}
              </div>
            </BlurFade>

            {pagination && pagination.totalPages > 1 && (
              <BlurFade delay={0.4}>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="hover:bg-green-50 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Sebelumnya
                  </Button>

                  <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={
                              currentPage === pageNum ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={`text-xs sm:text-sm min-w-[2rem] ${
                              currentPage === pageNum
                                ? "bg-green-600 hover:bg-green-700"
                                : "hover:bg-green-50"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === pagination.totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="hover:bg-green-50 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Selanjutnya
                  </Button>
                </div>
              </BlurFade>
            )}
          </>
        )}
      </div>
    </main>
  );
}
