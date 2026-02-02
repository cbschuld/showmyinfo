import { darkMode, toggleDarkMode } from '../lib/store';

export function Header() {
  return (
    <header class="bg-orange-500 dark:bg-orange-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span class="text-orange-500 font-bold text-xl">i</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold">ShowMyInfo.net</h1>
              <p class="text-orange-100 text-sm">Your IP, browser & device information</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            class="p-2 rounded-lg bg-orange-400 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode.value ? (
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
