import type { FeatureDetection } from '@showmyinfo/shared';

interface FeatureGridProps {
  features: FeatureDetection;
}

export function FeatureGrid({ features }: FeatureGridProps) {
  const entries = Object.entries(features) as [string, boolean][];
  return (
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {entries.map(([key, value]) => (
        <div
          key={key}
          class={`px-3 py-2 rounded-lg text-sm ${
            value
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
        >
          <div class="flex items-center gap-2">
            {value ? (
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span class="truncate">{formatFeatureName(key)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatFeatureName(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
