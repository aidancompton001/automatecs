export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-4 w-full max-w-2xl px-4">
        {/* Skeleton heading */}
        <div className="h-8 bg-brand-black/10 rounded w-2/3 animate-pulse" />
        {/* Skeleton paragraph */}
        <div className="h-4 bg-brand-black/10 rounded w-full animate-pulse" />
        <div className="h-4 bg-brand-black/10 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-brand-black/10 rounded w-4/6 animate-pulse" />
        {/* Skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="h-48 bg-brand-black/10 rounded animate-pulse" />
          <div className="h-48 bg-brand-black/10 rounded animate-pulse" />
          <div className="h-48 bg-brand-black/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
