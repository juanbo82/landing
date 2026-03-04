import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Condiciones del Servicio',
};

export default function TermsPage() {
  return (
    <section className="py-10 px-5">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm prose-headings:font-oswald prose-headings:tracking-wide">
        <h1>Condiciones del Servicio</h1>
        <p>Última actualización: Marzo 2026</p>

        <h2>Aceptación</h2>
        <p>
          Al usar StreetWOD aceptas estas condiciones. Si no estás de acuerdo, no uses la app.
        </p>

        <h2>Uso aceptable</h2>
        <p>
          Te comprometes a: usar la app de forma responsable, no subir contenido ofensivo o ilegal,
          no intentar manipular rankings o resultados, y respetar a otros usuarios.
        </p>

        <h2>Contenido del usuario</h2>
        <p>
          Los WODs, vídeos y resultados que compartas son tu responsabilidad. StreetWOD puede
          moderar o eliminar contenido que viole estas condiciones.
        </p>

        <h2>Verificación de RMs</h2>
        <p>
          Los records máximos requieren verificación por vídeo. La comunidad puede votar la
          legitimidad de un RM. StreetWOD se reserva el derecho de invalidar registros sospechosos.
        </p>

        <h2>Disponibilidad</h2>
        <p>
          StreetWOD se ofrece &quot;tal cual&quot;. No garantizamos disponibilidad ininterrumpida del servicio.
        </p>

        <h2>Modificaciones</h2>
        <p>
          Podemos actualizar estas condiciones en cualquier momento. Te notificaremos de cambios
          significativos a través de la app.
        </p>
      </div>
    </section>
  );
}
