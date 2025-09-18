import { Navigation, Footer } from "@/components/common";
import { BlogPost } from "@/components/blog";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <BlogPost postId={params.id} />
      </main>
      <Footer />
    </div>
  );
}
