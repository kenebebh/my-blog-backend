import { Suspense } from "react";
import { Header, Hero, Footer, PostsGrid } from "@/components";

// Mock data for demonstration - replace with actual API calls
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Node.js and Express",
    excerpt:
      "Learn the fundamentals of building web applications with Node.js and Express framework. This comprehensive guide covers everything from setup to deployment.",
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    tags: ["Node.js", "Express", "Backend"],
    slug: "getting-started-nodejs-express",
  },
  {
    id: 2,
    title: "Database Design Principles for Beginners",
    excerpt:
      "Understanding the core principles of database design is crucial for any backend developer. Explore normalization, relationships, and best practices.",
    author: "Jane Smith",
    publishedAt: "2024-01-12",
    readTime: "12 min read",
    tags: ["Database", "SQL", "Design"],
    slug: "database-design-principles",
  },
  {
    id: 3,
    title: "RESTful API Design Best Practices",
    excerpt:
      "Create robust and scalable APIs by following REST principles. Learn about proper HTTP methods, status codes, and API versioning strategies.",
    author: "Mike Johnson",
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    tags: ["API", "REST", "Backend"],
    slug: "restful-api-design-best-practices",
  },
  {
    id: 4,
    title: "Authentication and Authorization in Web Apps",
    excerpt:
      "Secure your applications with proper authentication and authorization mechanisms. Explore JWT, OAuth, and session-based authentication.",
    author: "Sarah Wilson",
    publishedAt: "2024-01-08",
    readTime: "15 min read",
    tags: ["Security", "Auth", "JWT"],
    slug: "authentication-authorization-web-apps",
  },
  {
    id: 5,
    title: "Microservices Architecture Fundamentals",
    excerpt:
      "Break down monolithic applications into microservices. Learn about service communication, data consistency, and deployment strategies.",
    author: "David Brown",
    publishedAt: "2024-01-05",
    readTime: "18 min read",
    tags: ["Microservices", "Architecture", "Scalability"],
    slug: "microservices-architecture-fundamentals",
  },
  {
    id: 6,
    title: "Docker for Backend Developers",
    excerpt:
      "Containerize your applications with Docker. Learn about images, containers, volumes, and orchestration for better deployment workflows.",
    author: "Lisa Chen",
    publishedAt: "2024-01-03",
    readTime: "14 min read",
    tags: ["Docker", "DevOps", "Containers"],
    slug: "docker-for-backend-developers",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Latest Articles
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Discover the latest insights, tutorials, and best practices in
                backend development
              </p>
            </div>
            <Suspense
              fallback={
                <div className="text-center text-muted">Loading posts...</div>
              }
            >
              <PostsGrid posts={mockPosts} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
