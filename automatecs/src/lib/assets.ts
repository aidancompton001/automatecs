/**
 * Prepend basePath to asset URLs.
 * Needed because CSS background-image url() does NOT auto-prepend basePath
 * (unlike Next.js <Link> and next/image).
 *
 * Fix for T004: all images 404 on GitHub Pages subdirectory.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/automatecs";

export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
