import type { Metadata } from 'next';
import DeleteAccountForm from './DeleteAccountForm';

export const metadata: Metadata = {
  title: 'Eliminar cuenta',
  description:
    'Solicita la eliminación de tu cuenta de StreetWOD y todos los datos asociados.',
};

export default function DeleteAccountPage() {
  return (
    <section className="py-10 px-5">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-2">
          Eliminar cuenta
        </h1>
        <p className="text-text-secondary mb-8">
          Solicita la eliminación permanente de tu cuenta de StreetWOD y todos tus datos.
        </p>

        {/* Requisitos Google Play: qué datos se eliminan */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <h2 className="font-oswald text-lg font-semibold tracking-wide mb-4">
            ¿Qué datos se eliminan?
          </h2>

          <div className="space-y-3 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-sw-red mb-1">Datos eliminados permanentemente:</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  Perfil de usuario (nombre, foto, país, fecha de nacimiento)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  Todos los récords máximos (RMs) y vídeos de verificación
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  WODs creados y resultados registrados
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  Historial de duelos y estadísticas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  Mensajes privados y relaciones de seguimiento
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  Análisis de técnica con IA e historial de progreso
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sw-red mt-0.5">×</span>
                  Posiciones en rankings y logros
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-tertiary mb-1">Datos que se conservan de forma anónima:</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-text-tertiary mt-0.5">•</span>
                  Datos estadísticos agregados y anonimizados (no vinculados a tu identidad)
                </li>
              </ul>
            </div>
          </div>

          <h2 className="font-oswald text-lg font-semibold tracking-wide mb-3">
            Plazo de eliminación
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            Las solicitudes se procesan en un plazo máximo de <strong>30 días</strong>.
            Durante este periodo puedes contactar con nosotros para cancelar la solicitud.
            Una vez completada, la eliminación es <strong>permanente e irreversible</strong>.
          </p>

          <h2 className="font-oswald text-lg font-semibold tracking-wide mb-3">
            Métodos de eliminación
          </h2>
          <div className="text-sm text-text-secondary space-y-2">
            <p>
              <strong>Opción 1 — Desde la app:</strong> Ve a Perfil → Configuración → Eliminar cuenta.
              La eliminación se procesará de forma inmediata.
            </p>
            <p>
              <strong>Opción 2 — Desde esta página:</strong> Completa el formulario a continuación
              y procesaremos tu solicitud en un máximo de 30 días.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="font-oswald text-lg font-semibold tracking-wide mb-5">
            Solicitar eliminación
          </h2>
          <DeleteAccountForm />
        </div>
      </div>
    </section>
  );
}
