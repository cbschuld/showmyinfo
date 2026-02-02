import { serverInfo } from '../lib/store';

export function IPDisplay() {
  const ip = serverInfo.value?.network.ip ?? '...';

  return (
    <div class="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white rounded-xl p-6 shadow-lg">
      <div class="text-center">
        <p class="text-orange-100 text-sm uppercase tracking-wide mb-2">Your IP Address</p>
        <p class="text-3xl sm:text-4xl font-mono font-bold tracking-tight">{ip}</p>
        {serverInfo.value?.geo.city && serverInfo.value?.geo.country && (
          <p class="text-orange-100 mt-2">
            {serverInfo.value.geo.city}, {serverInfo.value.geo.region && `${serverInfo.value.geo.region}, `}
            {serverInfo.value.geo.country}
          </p>
        )}
      </div>
    </div>
  );
}
