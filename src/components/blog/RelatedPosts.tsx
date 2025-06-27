import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
}

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedPosts = ({ currentPost, allPosts }: RelatedPostsProps) => {
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.id !== currentPost.id && post.category === currentPost.category
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block hover:no-underline"
          >
            <Card className="h-full transition-all hover:scale-105">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader className="space-y-2">
                <h3 className="line-clamp-2 text-lg font-bold hover:text-primary">
                  {post.title}
                </h3>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
