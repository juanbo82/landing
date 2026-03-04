interface DownloadCTAProps {
  title?: string;
  description?: string;
}

export default function DownloadCTA({
  title = '¿Quieres más? Descarga la app',
  description = 'Cronómetros profesionales, duelos 1vs1, chat entre atletas y mucho más. Todo gratis.',
}: DownloadCTAProps) {
  return (
    <section className="py-16 px-5">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-oswald text-2xl md:text-3xl font-bold uppercase mb-3">
          {title}
        </h2>
        <p className="text-text-secondary mb-6">{description}</p>
        <a
          href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-bg font-oswald font-semibold tracking-wider px-6 py-3 rounded-md hover:shadow-[0_6px_24px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.302 1.317-2.56 1.46-2.442-2.442 2.7-2.7zm-3.907-2.308L4.864 0.165l10.937 6.333-2.01 2.301z" />
          </svg>
          Descargar en Google Play
        </a>
      </div>
    </section>
  );
}
