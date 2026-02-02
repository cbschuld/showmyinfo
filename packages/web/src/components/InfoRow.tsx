interface InfoRowProps {
  label: string;
  value: string | number | boolean | undefined | null;
  mono?: boolean;
}

export function InfoRow({ label, value, mono = false }: InfoRowProps) {
  let displayValue: string;

  if (value === undefined || value === null || value === '') {
    displayValue = 'N/A';
  } else if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else {
    displayValue = String(value);
  }

  return (
    <div class="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span class="text-gray-500 dark:text-gray-400 text-sm sm:w-40 shrink-0">{label}</span>
      <span
        class={`text-gray-900 dark:text-white break-all ${mono ? 'font-mono text-sm' : ''} ${
          displayValue === 'N/A' ? 'text-gray-400 dark:text-gray-500 italic' : ''
        }`}
      >
        {displayValue}
      </span>
    </div>
  );
}
