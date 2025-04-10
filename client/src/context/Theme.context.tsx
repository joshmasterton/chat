import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeContextType } from '../../types/context.type'
import { ReactNode } from 'react'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? true
      : false
  )

  useEffect(() => {
    document.documentElement.className = isDark ? 'bg-gray-950' : 'bg-gray-100'
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
    const currentTheme = document.documentElement.getAttribute('data-theme')

    document.documentElement.setAttribute(
      'data-theme',
      currentTheme === 'dark' ? 'light' : 'dark'
    )
    document.documentElement.className =
      currentTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
