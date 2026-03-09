'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function DeleteAccountForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), reason }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al enviar la solicitud');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sw-green/10 border border-sw-green/30 rounded-lg p-6 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="font-oswald text-xl font-semibold mb-2">Solicitud recibida</h3>
        <p className="text-sm text-text-secondary">
          Tu solicitud de eliminación ha sido registrada. Procesaremos la eliminación de tu cuenta
          y todos tus datos en un plazo máximo de <strong>30 días</strong>. Recibirás una confirmación
          cuando se complete el proceso.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1.5">
          Nombre de usuario en StreetWOD *
        </label>
        <input
          id="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu nombre de usuario"
          className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
          Email asociado a tu cuenta *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium mb-1.5">
          Motivo (opcional)
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="¿Por qué quieres eliminar tu cuenta?"
          rows={3}
          className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
          className="mt-0.5 accent-accent"
        />
        <span className="text-sm text-text-secondary">
          Entiendo que esta acción es <strong className="text-sw-red">permanente e irreversible</strong>.
          Se eliminarán mi cuenta, perfil, récords, WODs, duelos, mensajes y todos los datos asociados.
        </span>
      </label>

      {status === 'error' && (
        <div className="bg-sw-red/10 border border-sw-red/30 rounded-lg px-4 py-3 text-sm text-sw-red">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={!confirm || status === 'loading'}
        className="w-full font-oswald font-semibold tracking-wider px-6 py-3 rounded-lg bg-sw-red text-white hover:bg-sw-red/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {status === 'loading' ? 'Enviando solicitud...' : 'Solicitar eliminación de cuenta'}
      </button>
    </form>
  );
}
