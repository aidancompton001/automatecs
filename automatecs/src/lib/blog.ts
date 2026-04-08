import type { BlogPost } from "@/types";
import blogData from "@/data/blog-posts.json";

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  content: string[];
}

const posts = blogData as BlogPostData[];

export function getAllBlogPosts(): BlogPost[] {
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    imageUrl: p.imageUrl,
    content: p.content.join("\n\n"),
  }));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return undefined;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    content: post.content.join("\n\n"),
  };
}

export function getAllBlogSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Format ISO date to German display: "8. April 2026" */
export function formatDateDE(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
