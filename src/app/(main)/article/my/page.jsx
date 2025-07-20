"use client";

import { useState } from "react";
import { useGetMyArticles, useDeleteArticle } from "@/hooks/use-article";
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
import {
  Search,
  Plus,
  BookOpen,
  Calendar,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ArticleForm from "@/components/article/article-form";
import ArticleModal from "@/components/article/article-modal";
import { ArticleSkeletonList } from "@/components/article/article-skeleton";
import { BlurFade } from "@/components/magicui/blur-fade";
import { images } from "@/constants/images";

export default function MyArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetMyArticles(currentPage, 12);
  const deleteArticleMutation = useDeleteArticle();

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

  const handleDelete = (articleId) => {
    deleteArticleMutation.mutate(articleId);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsEditDialogOpen(true);
  };

  if (error) {
    return (
      <main className="min-h-screen">
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
    <main className="min-h-screen">
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-screen flex flex-col">
        <div className="absolute inset-0">
          <Image
            src={images.imageHero4}
            alt="My Articles Banner"
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
                Artikel Saya
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                Kelola dan pantau artikel yang telah Anda buat
              </p>

              <div className="relative max-w-sm sm:max-w-md w-full mx-auto px-4">
                <Input
                  placeholder="Cari artikel Anda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 sm:h-14 bg-white/95 backdrop-blur-sm border-0 rounded-full text-sm sm:text-base shadow-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300"
                />
                <span className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </span>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 max-w-7xl">
        <BlurFade delay={0.2}>
          <div className="mb-6 sm:mb-8">
            <Link href="/article">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-green-50 border-green-200 mb-4 sm:mb-6 text-xs sm:text-sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Kembali ke Artikel
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {searchTerm
                  ? `Hasil Pencarian "${searchTerm}"`
                  : "Artikel Saya"}
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {filteredArticles.length} artikel ditemukan
              </p>
            </div>

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
                  <span className="hidden sm:inline">Buat Artikel Baru</span>
                  <span className="sm:hidden">Buat Artikel</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogTitle className="sr-only">Buat Artikel Baru</DialogTitle>
                <ArticleForm onCancel={() => setIsCreateDialogOpen(false)} />
              </DialogContent>
            </Dialog>
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
                {searchTerm ? "Artikel Tidak Ditemukan" : "Belum Ada Artikel"}
              </h3>
              <p className="text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                {searchTerm
                  ? "Coba gunakan kata kunci yang berbeda untuk menemukan artikel yang Anda cari"
                  : "Anda belum membuat artikel apapun. Mulai dengan membuat artikel pertama Anda!"}
              </p>
              {!searchTerm && (
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Buat Artikel Pertama
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">
                      Buat Artikel Pertama
                    </DialogTitle>
                    <ArticleForm
                      onCancel={() => setIsCreateDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
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
                        <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2 break-words">
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
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600 truncate">
                              {new Date(article.createdAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-1 sm:gap-2">
                          <ArticleModal
                            article={article}
                            trigger={
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 hover:bg-green-50 hover:text-green-600 hover:border-green-300 text-xs sm:text-sm"
                              >
                                Baca
                              </Button>
                            }
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(article)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300 px-2 sm:px-3"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 px-2 sm:px-3"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[95vw] max-w-md">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-base sm:text-lg">
                                  Hapus Artikel
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm sm:text-base">
                                  Apakah Anda yakin ingin menghapus artikel "
                                  {article.title}"? Tindakan ini tidak dapat
                                  dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                                <AlertDialogCancel className="w-full sm:w-auto text-xs sm:text-sm">
                                  Batal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(article.id)}
                                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto text-xs sm:text-sm"
                                >
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogTitle className="sr-only">Edit Artikel</DialogTitle>
            <ArticleForm
              article={selectedArticle}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedArticle(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
