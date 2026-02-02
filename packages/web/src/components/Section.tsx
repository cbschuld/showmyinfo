import type { ComponentChildren } from 'preact';

interface SectionProps {
  title: string;
  icon: ComponentChildren;
  children: ComponentChildren;
}

export function Section({ title, icon, children }: SectionProps) {
  return (
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <div class="flex items-center gap-2">
          <span class="text-orange-500">{icon}</span>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
      </div>
      <div class="p-4">{children}</div>
    </div>
  );
}
