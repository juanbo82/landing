const FORMAT_COLORS: Record<string, string> = {
  'For Time': 'border-sw-red/25 text-sw-red',
  'EMOM': 'border-sw-blue/25 text-sw-blue',
  'AMRAP': 'border-sw-green/25 text-sw-green',
  'Tabata': 'border-accent/25 text-accent',
  'Chipper': 'border-sw-purple/25 text-sw-purple',
  'Other': 'border-text-tertiary/25 text-text-tertiary',
};

export default function FormatBadge({ format }: { format: string }) {
  const colors = FORMAT_COLORS[format] || FORMAT_COLORS['Other'];
  return (
    <span
      className={`inline-block font-oswald text-xs font-semibold tracking-wider px-2.5 py-1 border rounded ${colors} bg-surface`}
    >
      {format}
    </span>
  );
}
