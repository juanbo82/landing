import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
      <h1 className="font-oswald text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-text-secondary mb-8">La página que buscas no existe.</p>
      <Link
        href="/"
        className="font-oswald font-semibold tracking-wider text-sm px-5 py-2.5 border border-accent-30 rounded-lg text-accent hover:bg-accent-15 transition-colors"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
