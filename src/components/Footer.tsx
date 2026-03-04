import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <span className="font-oswald text-lg font-bold tracking-wider text-accent/60">
          STREETWOD
        </span>
        <p className="text-sm text-text-tertiary">Find the limits.</p>
        <div className="md:ml-auto flex gap-6">
          <Link href="/privacy" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/terms" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
            Condiciones del Servicio
          </Link>
        </div>
      </div>
    </footer>
  );
}
