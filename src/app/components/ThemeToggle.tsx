'use client'

import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  if (theme === null) return null // avoid rendering during SSR mismatch

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  )
}
