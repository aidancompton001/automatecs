"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion";
import { CTABanner } from "@/components/sections";
import { formatDateDE } from "@/lib/blog";
import type { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
}

export function BlogDetailClient({ post }: Props) {
  const paragraphs = post.content.split("\n\n");

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <Link
              href="/blog/"
              className="text-sm text-brand-green font-body hover:text-brand-black transition-colors"
            >
              ← Zurück zum Blog
            </Link>
            <h1 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-brand-black leading-tight">
              {post.title}
            </h1>
            <time className="mt-4 block text-sm text-brand-black/70 font-body">
              {formatDateDE(post.date)}
            </time>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          {paragraphs.map((p, i) => (
            <ScrollReveal key={i}>
              <p className="text-brand-black/80 font-body leading-relaxed text-lg mb-6">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </article>

      <CTABanner />
    </>
  );
}
