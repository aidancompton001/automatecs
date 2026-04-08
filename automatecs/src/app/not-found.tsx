import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="font-heading text-4xl md:text-6xl font-bold text-brand-yellow mb-4">
        404
      </h1>
      <h2 className="font-heading text-2xl font-semibold text-brand-black mb-4">
        Seite nicht gefunden
      </h2>
      <p className="font-body text-brand-black/70 mb-8 text-center max-w-md">
        Die von Ihnen gesuchte Seite existiert leider nicht oder wurde
        verschoben.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-green text-brand-white font-body font-medium rounded hover:bg-brand-black transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
