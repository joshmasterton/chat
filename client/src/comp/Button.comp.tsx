import { IconButtonType, ButtonType } from '../../types/comp.type'

export const Button = ({
  type,
  children,
  variant = 'default',
  onClick = () => {},
  className = ''
}: ButtonType) => {
  // Button themes
  const buttonVariants = {
    primary: 'bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white',
    secondary: '',
    default:
      'bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 focus:bg-gray-300 dark:focus:bg-gray-700 dark:text-white'
  }

  return (
    <button
      type={type}
      onClick={(e) => {
        e.currentTarget.blur()
        onClick()
      }}
      className={`cursor-pointer w-fit px-4 py-2 rounded-lg ${buttonVariants[variant]} ${className} shadow-md outline-none`}
    >
      {children}
    </button>
  )
}

export const IconButton = ({
  type,
  children,
  label,
  variant = 'default',
  onClick = () => {},
  className = ''
}: IconButtonType) => {
  // Button themes
  const buttonVariants = {
    primary:
      'shadow-sm bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white',
    secondary: '',
    transparent:
      'shadow-none hover:bg-gray-200 focus:bg-gray-300 dark:text-white dark:hover:bg-gray-900 dark:focus:bg-gray-800',
    default:
      'shadow-sm bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 focus:bg-gray-300 dark:focus:bg-gray-700 dark:text-white'
  }

  return (
    <button
      type={type}
      aria-label={label}
      onClick={(e) => {
        e.currentTarget.blur()
        onClick()
      }}
      className={`cursor-pointer p-2 w-fit rounded-lg ${buttonVariants[variant]} ${className} outline-none`}
    >
      {children}
    </button>
  )
}
