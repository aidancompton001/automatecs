"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { BlogCard } from "@/components/blog";
import { CTABanner } from "@/components/sections";
import type { BlogPost } from "@/types";

interface Props {
  posts: BlogPost[];
}

export function BlogListingClient({ posts }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-brand-black">
              Blog
            </h1>
            <p className="mt-4 font-body text-lg text-brand-black/70">
              Aktuelles und Wissenswertes rund um Verkaufsautomaten.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
