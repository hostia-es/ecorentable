import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const TitleComponent = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2"><span className="text-sm font-medium">{title}</span></div>
);

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  city: string | null;
  image_url: string | null;
  published_at: string;
}

const POSTS_PER_PAGE = 12;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const filteredPosts = selectedCategory ? posts.filter((p) => p.category === selectedCategory) : posts;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setSearchParams({ page: "1" });
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = "Blog | Ecología Rentable";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Guías, casos y noticias sobre ecología rentable, descarbonización y mantenimiento eficiente.");
    (async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, category, city, image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (data) setPosts(data);
      setIsLoading(false);
    })();
  }, []);

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guías técnicas, novedades y consejos sobre descarbonización, filtros DPF, ITV y mantenimiento de motor.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              {/* Category filter */}
              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === null ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Posts grid */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay artículos disponibles en esta categoría.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedPosts.map((post) => (
                      <FollowerPointerCard key={post.id} title={<TitleComponent title={post.author} />} className="w-full">
                        <Link to={`/blog/${post.slug}`} className="block cursor-pointer h-full">
                        <article className="group relative h-full rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl overflow-hidden">
                          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
                            {post.image_url ? (
                              <img
                                src={post.image_url}
                                alt={post.title}
                                className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                <span className="text-5xl">📝</span>
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
                              {post.city && (
                                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{post.city}</span>
                              )}
                            </div>
                            <h2 className="my-3 text-xl font-bold text-foreground line-clamp-2">{post.title}</h2>
                            <p className="font-normal text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                            <div className="mt-4 flex flex-row items-center justify-between">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                              </span>
                              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                                Leer más
                                <ArrowRight className="h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </article>
                        </Link>
                      </FollowerPointerCard>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious onClick={() => goToPage(currentPage - 1)} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink onClick={() => goToPage(1)} isActive={currentPage === 1} className="cursor-pointer">1</PaginationLink>
                          </PaginationItem>
                          {currentPage > 3 && (<PaginationItem><PaginationEllipsis /></PaginationItem>)}
                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((page) => page !== 1 && page !== totalPages && page >= currentPage - 1 && page <= currentPage + 1)
                            .map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink onClick={() => goToPage(page)} isActive={currentPage === page} className="cursor-pointer">{page}</PaginationLink>
                              </PaginationItem>
                            ))}
                          {currentPage < totalPages - 2 && (<PaginationItem><PaginationEllipsis /></PaginationItem>)}
                          {totalPages > 1 && (
                            <PaginationItem>
                              <PaginationLink onClick={() => goToPage(totalPages)} isActive={currentPage === totalPages} className="cursor-pointer">{totalPages}</PaginationLink>
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationNext onClick={() => goToPage(currentPage + 1)} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                      <p className="text-center text-sm text-muted-foreground mt-4">
                        Página {currentPage} de {totalPages} · {filteredPosts.length} artículos
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
