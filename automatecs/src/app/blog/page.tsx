import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Aktuelles von Automatecs: Neuigkeiten, Tipps und Informationen rund um Verkaufsautomaten.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return <BlogListingClient posts={posts} />;
}
