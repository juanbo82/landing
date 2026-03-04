import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
};

export default function PrivacyPage() {
  return (
    <section className="py-10 px-5">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm prose-headings:font-oswald prose-headings:tracking-wide">
        <h1>Política de Privacidad</h1>
        <p>Última actualización: Marzo 2026</p>

        <h2>Datos que recopilamos</h2>
        <p>
          StreetWOD recopila la información que proporcionas al crear tu perfil:
          nombre de usuario, país, fecha de nacimiento, género y foto de perfil (opcional).
          También almacenamos tus records máximos (RMs), resultados de WODs, y actividad social
          (seguidos, duelos, mensajes).
        </p>

        <h2>Uso de los datos</h2>
        <p>
          Utilizamos tus datos para: mostrar tu perfil público, calcular rankings y estadísticas,
          y permitir la interacción social (duelos, chat, feed). No vendemos tus datos a terceros.
        </p>

        <h2>Almacenamiento</h2>
        <p>
          Los datos se almacenan en servidores de Supabase (infraestructura de AWS) con cifrado
          en reposo y en tránsito.
        </p>

        <h2>Eliminación de cuenta</h2>
        <p>
          Puedes eliminar tu cuenta y todos tus datos desde la configuración de la app.
          La eliminación es permanente e irreversible.
        </p>

        <h2>Contacto</h2>
        <p>
          Para cualquier consulta sobre privacidad, contacta con nosotros a través de la app
          o en las redes sociales de StreetWOD.
        </p>
      </div>
    </section>
  );
}
