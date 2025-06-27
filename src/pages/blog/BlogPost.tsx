
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BlogInteractions from "@/components/blog/BlogInteractions";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { FileText, Calendar, Tag, Clock, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author?: string;
  readTime?: string;
  slug: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  published_at?: string;
  featured_image?: string;
  author_name?: string;
  created_at?: string;
}

// Mock blog post data
const mockBlogPosts: { [key: string]: BlogPost } = {
  "future-of-ai-professional-services": {
    id: "1",
    title: "The Future of AI in Professional Services",
    excerpt: "Exploring how artificial intelligence is transforming the way professional services are delivered and consumed in the modern marketplace.",
    content: `# The Rise of AI in Professional Services

Artificial Intelligence is no longer a futuristic concept—it's here, and it's revolutionizing how professional services operate. From automated consultations to intelligent project management, AI is reshaping every aspect of the service delivery landscape.

## Understanding the Transformation

The integration of AI in professional services isn't just about automation; it's about augmentation. AI tools are helping professionals:

- Deliver more accurate insights through data analysis
- Streamline repetitive tasks to focus on high-value work  
- Provide 24/7 client support through intelligent chatbots
- Predict project outcomes with greater precision

## Key Areas of Impact

### Client Interaction and Support
AI-powered chatbots and virtual assistants are transforming how clients interact with service providers. These tools can handle initial consultations, schedule appointments, and provide instant responses to common queries.

### Project Management and Delivery
Machine learning algorithms are helping project managers predict potential roadblocks, optimize resource allocation, and ensure timely delivery of services.

### Quality Assurance
AI systems can review work output, check for compliance with industry standards, and maintain consistency across large teams.

## Looking Ahead

The future of AI in professional services is bright. As technology continues to evolve, we can expect even more sophisticated tools that will further enhance the quality and efficiency of professional service delivery.

The key for service providers is to embrace these changes while maintaining the human touch that clients value most.`,
    date: "2024-01-15",
    slug: "future-of-ai-professional-services",
    imageUrl: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?q=80&w=1399&auto=format&fit=crop",
    category: "Technology",
    readTime: "5 min read",
    tags: ["AI", "Professional Services", "Innovation"],
    author_name: "Roda Team"
  },
  "building-scalable-web-applications": {
    id: "2",
    title: "Building Scalable Web Applications",
    excerpt: "Best practices and modern approaches for creating web applications that can grow with your business needs.",
    content: `# Building Scalable Web Applications

Creating web applications that can handle growth is one of the most important considerations for any development project. Scalability isn't just about handling more users—it's about building systems that can adapt and evolve.

## Core Principles of Scalable Architecture

### 1. Modular Design
Break your application into smaller, manageable components that can be developed, tested, and deployed independently.

### 2. Database Optimization
- Use proper indexing strategies
- Implement caching layers
- Consider database sharding for large datasets
- Optimize queries for performance

### 3. Performance Monitoring
Implement comprehensive monitoring to identify bottlenecks before they become critical issues.

## Modern Tools and Technologies

The landscape of web development offers numerous tools to help build scalable applications:

- **React/Vue/Angular** for component-based front-end architecture
- **Node.js/Python/Go** for scalable backend services
- **Docker/Kubernetes** for containerization and orchestration
- **CDNs** for global content delivery

## Best Practices

Always plan for scale from the beginning. It's much easier to build with scalability in mind than to retrofit it later.

Remember: premature optimization is the root of all evil, but thoughtful architecture is the foundation of all success.`,
    date: "2024-01-10",
    slug: "building-scalable-web-applications",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1399&auto=format&fit=crop",
    category: "Web Development",
    readTime: "8 min read",
    tags: ["Web Development", "Scalability", "Best Practices"],
    author_name: "Roda Development Team"
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        setTimeout(() => {
          if (slug && mockBlogPosts[slug]) {
            setPost(mockBlogPosts[slug]);
            
            // Set related posts (other posts in same category)
            const currentPost = mockBlogPosts[slug];
            const related = Object.values(mockBlogPosts)
              .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
              .slice(0, 3);
            setRelatedPosts(related);
          } else {
            setError("The post you're looking for doesn't exist.");
          }
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error in fetchPost:", error);
        setError("An error occurred while fetching the blog post.");
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchPost();
    }
  }, [slug]);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const renderContent = (content: string) => {
    // Split content by new lines and render paragraphs
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("# ")) {
        return <h2 key={index} className="mb-4 mt-8 text-3xl font-bold font-display">{paragraph.substring(2)}</h2>;
      } else if (paragraph.startsWith("## ")) {
        return <h3 key={index} className="mb-4 mt-6 text-2xl font-bold font-display">{paragraph.substring(3)}</h3>;
      } else if (paragraph.startsWith("### ")) {
        return <h4 key={index} className="mb-3 mt-5 text-xl font-bold font-display">{paragraph.substring(4)}</h4>;
      } else if (paragraph.startsWith("- ")) {
        return (
          <ul key={index} className="mb-4 list-inside list-disc">
            {paragraph.split("\n").map((item, i) => (
              <li key={i} className="mb-2 text-lg text-muted-foreground">{item.substring(2)}</li>
            ))}
          </ul>
        );
      } else {
        return <p key={index} className="mb-6 text-lg text-muted-foreground leading-relaxed">{paragraph}</p>;
      }
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto flex justify-center py-16">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-roda-500 border-t-transparent"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 text-center">
          <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <h1 className="mb-4 text-3xl font-bold font-display">Post Not Found</h1>
          <p className="mb-8 text-muted-foreground">{error || "The post you're looking for is not available."}</p>
          <Button asChild className="bg-roda-500 hover:bg-roda-600">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back to blog link */}
        <Link to="/blog" className="mb-8 inline-flex items-center text-muted-foreground hover:text-roda-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
        
        {/* Article header */}
        <div className="mb-8">
          {post.category && (
            <Badge variant="secondary" className="mb-4 bg-roda-100 text-roda-700">
              {post.category}
            </Badge>
          )}
          <h1 className="mb-6 text-4xl font-bold font-display tracking-tight md:text-5xl">{post.title}</h1>
          
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{post.tags.join(", ")}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime || "5 min read"}</span>
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        {post.imageUrl && (
          <div className="mb-10 overflow-hidden rounded-lg">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        
        {/* Author info */}
        <div className="mb-10 flex items-center space-x-4 rounded-lg border bg-card p-4">
          <Avatar>
            <AvatarFallback className="bg-roda-100 text-roda-700">
              {post.author_name ? post.author_name[0] : "R"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">By {post.author_name || "Roda Team"}</div>
            <div className="text-xs text-muted-foreground">Published on {formatDate(post.date)}</div>
          </div>
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg mx-auto max-w-none">
          {renderContent(post.content)}
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-10 mt-10">
            <h3 className="mb-4 text-lg font-semibold font-display">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm border-roda-200 text-roda-600 hover:bg-roda-50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-10" />
        
        {/* Article interactions */}
        <div className="mb-10">
          <div className="flex gap-4">
            <Button variant="secondary" size="sm" className="flex-1 hover:bg-roda-50">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex-1 hover:bg-roda-50 hover:border-roda-200">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
          </div>
        </div>
        
        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold font-display">Related Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="group block hover:no-underline"
                >
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md hover:border-roda-200">
                    {relatedPost.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={relatedPost.imageUrl} 
                          alt={relatedPost.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-2 font-medium font-display group-hover:text-roda-600">
                        {relatedPost.title}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(relatedPost.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BlogPost;
