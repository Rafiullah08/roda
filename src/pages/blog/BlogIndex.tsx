
import React, { useState, useEffect } from "react";
import { FileText, Search, Filter, CalendarIcon } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import BlogCard from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author?: string;
  readTime?: string;
  slug: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  published_at?: string;
  featured_image?: string;
}

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in Professional Services",
    excerpt: "Exploring how artificial intelligence is transforming the way professional services are delivered and consumed in the modern marketplace.",
    date: "2024-01-15",
    slug: "future-of-ai-professional-services",
    imageUrl: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?q=80&w=1399&auto=format&fit=crop",
    category: "Technology",
    readTime: "5 min read",
    tags: ["AI", "Professional Services", "Innovation"]
  },
  {
    id: "2",
    title: "Building Scalable Web Applications",
    excerpt: "Best practices and modern approaches for creating web applications that can grow with your business needs.",
    date: "2024-01-10",
    slug: "building-scalable-web-applications",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1399&auto=format&fit=crop",
    category: "Web Development",
    readTime: "8 min read",
    tags: ["Web Development", "Scalability", "Best Practices"]
  },
  {
    id: "3",
    title: "Digital Transformation in Small Businesses",
    excerpt: "How small businesses can leverage digital tools and services to compete effectively in today's market.",
    date: "2024-01-05",
    slug: "digital-transformation-small-businesses",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1399&auto=format&fit=crop",
    category: "Business",
    readTime: "6 min read",
    tags: ["Digital Transformation", "Small Business", "Strategy"]
  },
  {
    id: "4",
    title: "The Rise of Remote Work and Its Impact on Service Delivery",
    excerpt: "Understanding how remote work trends are reshaping professional service delivery models.",
    date: "2024-01-01",
    slug: "remote-work-service-delivery",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1399&auto=format&fit=crop",
    category: "Business",
    readTime: "7 min read",
    tags: ["Remote Work", "Service Delivery", "Future of Work"]
  }
];

const BlogIndex = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = ["All", "Technology", "Web Development", "Business", "Design"];
  
  useEffect(() => {
    // Simulate loading with mock data
    const loadPosts = () => {
      setIsLoading(true);
      setTimeout(() => {
        setFeaturedPost(mockBlogPosts[0]);
        setPosts(mockBlogPosts.slice(1));
        setIsLoading(false);
      }, 1000);
    };
    
    loadPosts();
  }, []);
  
  const filteredPosts = posts.filter(post => 
    (searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (activeCategory === "all" || post.category?.toLowerCase() === activeCategory.toLowerCase())
  );
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-roda-500/10">
            <FileText className="h-6 w-6 text-roda-500" />
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display tracking-tight md:text-5xl lg:text-6xl">Roda Technologies Blog</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Insights, tips, and updates from our team to help you grow your business
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-roda-500 focus:border-roda-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category.toLowerCase() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.toLowerCase())}
                    className={`text-xs ${
                      activeCategory === category.toLowerCase() 
                        ? "bg-roda-500 hover:bg-roda-600" 
                        : "hover:bg-roda-50 hover:border-roda-200"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-roda-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <h2 className="mb-6 text-2xl font-bold font-display tracking-tight">Featured Article</h2>
                <div className="overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl glass-effect">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title} 
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6">
                      <div className="mb-4 flex items-center space-x-2">
                        <Badge variant="secondary" className="px-3 py-1 bg-roda-100 text-roda-700">
                          {featuredPost.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {formatDate(featuredPost.date)}
                        </div>
                      </div>
                      <h3 className="mb-2 text-3xl font-bold font-display tracking-tight">{featuredPost.title}</h3>
                      <p className="mb-6 text-muted-foreground">{featuredPost.excerpt}</p>
                      <Button asChild className="w-fit bg-roda-500 hover:bg-roda-600">
                        <a href={`/blog/${featuredPost.slug}`}>Read Article</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Blog Posts Grid */}
            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold font-display tracking-tight">Latest Articles</h2>
              {filteredPosts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={{
                        id: post.id,
                        title: post.title,
                        excerpt: post.excerpt,
                        date: formatDate(post.date),
                        slug: post.slug,
                        imageUrl: post.imageUrl,
                        category: post.category,
                        readTime: post.readTime || "5 min read",
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <FileText className="mb-4 h-16 w-16 text-muted-foreground/50" />
                  <h3 className="mb-2 text-2xl font-medium">No articles found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || activeCategory !== "all" ? 
                      "Try changing your search or filter criteria." : 
                      "Check back soon for new content."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BlogIndex;
