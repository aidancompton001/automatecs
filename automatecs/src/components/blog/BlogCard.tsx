"use client";

import Link from "next/link";
import { formatDateDE } from "@/lib/blog";
import { getImageUrl } from "@/lib/assets";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

/**
 * Blog card with hover lift effect.
 * translateY -8px + shadow elevation-2→3 + image zoom 1.03
 * Underline slide-in on "Weiterlesen"
 */
export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block bg-brand-white border border-brand-black/15 rounded-lg overflow-hidden cursor-pointer
        hover:-translate-y-2 hover:shadow-elevation-3 transition-all duration-250"
    >
      {/* Image — fixed aspect ratio, no CLS (T004) */}
      <div className="relative aspect-video bg-brand-black/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-103 transition-transform duration-400"
          style={{ backgroundImage: `url(${getImageUrl(post.imageUrl)})` }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <time className="text-xs text-brand-black/70 font-body">
          {formatDateDE(post.date)}
        </time>

        <h3 className="mt-2 font-heading text-lg font-semibold text-brand-black line-clamp-2 group-hover:text-brand-green transition-colors">
          {post.title}
        </h3>

        <p className="mt-2 text-sm text-brand-black/70 font-body line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read more with underline slide-in */}
        <span className="mt-4 inline-block text-sm font-body font-medium text-brand-green relative">
          Weiterlesen →
          <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-green group-hover:w-full transition-all duration-300" />
        </span>
      </div>
    </Link>
  );
}
