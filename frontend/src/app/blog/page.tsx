import { Navigation, Footer } from "@/components/common";
import { BlogList, BlogHeader } from "@/components/blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <BlogHeader />
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}
