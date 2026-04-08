"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="font-heading text-3xl font-bold text-brand-black mb-4">
        Etwas ist schiefgelaufen
      </h1>
      <p className="font-body text-brand-black/70 mb-6 text-center max-w-md">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-brand-green text-brand-white font-body font-medium rounded hover:bg-brand-black transition-colors cursor-pointer"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
