import { LinkType } from '../../types/comp.type'

export const Link = ({
  href = '#',
  children,
  variant = 'transparent',
  className = ''
}: LinkType) => {
  // Link themes
  const linkVariants = {
    primary:
      'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 focus:bg-indigo-700 dark:focus:bg-indigo-800 text-white shadow-md',
    secondary: '',
    transparent:
      'transparent hover:bg-gray-200 focus:bg-gray-300 dark:hover:bg-gray-900 dark:focus:bg-gray-800 dark:text-white',
    default:
      'bg-white dark:bg-gray-800 hover:bg-indigo-200 dark:hover:bg-gray-700 focus:bg-indigo-300 dark:focus:bg-gray-600 dark:text-white shadow-md'
  }

  return (
    <a
      href={href}
      onClick={(e) => {
        e.currentTarget.blur()
      }}
      className={`cursor-pointer px-4 w-fit py-2 rounded-lg ${linkVariants[variant]} ${className} outline-none`}
    >
      {children}
    </a>
  )
}
