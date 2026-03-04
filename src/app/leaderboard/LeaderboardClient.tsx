'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryFlag, COUNTRIES } from '@/lib/types';

interface Entry {
  rm_id: string;
  user_id: string;
  username: string;
  weight: number;
  country: string;
  gender: string;
  avatar_url: string | null;
  video_url: string | null;
  is_verified: boolean;
  likes: number;
  fakes: number;
  is_valid: boolean;
  position?: number;
}

interface Props {
  exercises: Record<string, string>;
  exerciseIds: string[];
  initialEntries: Entry[];
  initialExercise: string;
}

export default function LeaderboardClient({ exercises, exerciseIds, initialEntries, initialExercise }: Props) {
  const [exercise, setExercise] = useState(initialExercise);
  const [country, setCountry] = useState('all');
  const [gender, setGender] = useState('all');
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  async function fetchLeaderboard(ex: string, ctry: string, gen: string) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ exercise: ex, country: ctry, gender: gen });
      const res = await fetch(`/api/leaderboard?${params}`);
      const data = await res.json();
      startTransition(() => {
        setEntries(data);
      });
    } finally {
      setLoading(false);
    }
  }

  function handleExerciseChange(ex: string) {
    setExercise(ex);
    fetchLeaderboard(ex, country, gender);
  }

  function handleCountryChange(ctry: string) {
    setCountry(ctry);
    fetchLeaderboard(exercise, ctry, gender);
  }

  function handleGenderChange(gen: string) {
    setGender(gen);
    fetchLeaderboard(exercise, country, gen);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={exercise}
          onChange={(e) => handleExerciseChange(e.target.value)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:border-accent outline-none"
        >
          {exerciseIds.map((id) => (
            <option key={id} value={id}>
              {exercises[id]}
            </option>
          ))}
        </select>

        <select
          value={gender}
          onChange={(e) => handleGenderChange(e.target.value)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:border-accent outline-none"
        >
          <option value="all">Todos</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>

        <select
          value={country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:border-accent outline-none"
        >
          <option value="all">Todos los países</option>
          {COUNTRIES.filter((c) => c.code !== 'OTHER').map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-oswald text-xs tracking-wider text-text-tertiary w-12">#</th>
                <th className="px-4 py-3 font-oswald text-xs tracking-wider text-text-tertiary">ATLETA</th>
                <th className="px-4 py-3 font-oswald text-xs tracking-wider text-text-tertiary text-right">PESO (KG)</th>
                <th className="px-4 py-3 font-oswald text-xs tracking-wider text-text-tertiary text-center">PAÍS</th>
                <th className="px-4 py-3 font-oswald text-xs tracking-wider text-text-tertiary text-center">VÍDEO</th>
              </tr>
            </thead>
            <tbody>
              {(loading || isPending) && entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-text-tertiary">
                    Cargando...
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-text-tertiary">
                    No hay resultados con estos filtros
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr
                    key={entry.rm_id}
                    className="border-b border-border/50 hover:bg-bg-alt/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`font-oswald font-bold ${
                          entry.position === 1
                            ? 'text-accent'
                            : entry.position === 2
                              ? 'text-text-secondary'
                              : entry.position === 3
                                ? 'text-amber-700'
                                : 'text-text-tertiary'
                        }`}
                      >
                        {entry.position}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/athlete/${entry.username}`}
                        className="flex items-center gap-3 hover:text-accent transition-colors"
                      >
                        {entry.avatar_url ? (
                          <Image
                            src={entry.avatar_url}
                            alt={entry.username}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-bold text-text-tertiary">
                            {entry.username[0]?.toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">{entry.username}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-oswald font-bold text-base">{entry.weight}</span>
                      <span className="text-text-tertiary text-xs ml-1">kg</span>
                    </td>
                    <td className="px-4 py-3 text-center text-lg">
                      {getCountryFlag(entry.country)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {entry.video_url ? (
                        <a
                          href={entry.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent/80 transition-colors"
                          title="Ver vídeo"
                        >
                          ▶
                        </a>
                      ) : (
                        <span className="text-text-tertiary">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(loading || isPending) && entries.length > 0 && (
        <div className="text-center py-4 text-text-tertiary text-sm">Actualizando...</div>
      )}
    </div>
  );
}
