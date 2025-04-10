import { Outlet } from 'react-router'
import { Button, IconButton } from './Button.comp'
import { Link } from './Link.comp'
import { Bars3Icon, MoonIcon } from '@heroicons/react/16/solid'
import { useTheme } from '../context/Theme.context'
import { Logo } from './Logo.comp'

export const Nav = () => {
  const { toggleTheme } = useTheme()

  return (
    <>
      <nav className="backdrop-blur-lg bg-gray-100/50 dark:bg-gray-950/50 fixed p-4 self-center justify-between flex w-full gap-x-4">
        <Logo />
        <ul className="max-sm:hidden flex flex-1 justify-center items-center gap-x-4">
          <li className="flex">
            <Link href="#">
              <div>Home</div>
            </Link>
          </li>
          <li className="flex">
            <Link href="#">
              <div>About</div>
            </Link>
          </li>
          <li className="flex">
            <Link href="#">
              <div>Settings</div>
            </Link>
          </li>
        </ul>
        <section className="w-3/12 flex justify-end items-center gap-x-4">
          <IconButton
            variant="transparent"
            label="menu"
            type="button"
            className="min-sm:hidden"
          >
            <Bars3Icon className="w-6" />
          </IconButton>
          <Button type="button" variant="primary" className="max-sm:hidden">
            <div>Login</div>
          </Button>
          <IconButton
            label="theme-button"
            type="button"
            className="max-sm:hidden"
            onClick={() => toggleTheme()}
          >
            <MoonIcon className="w-6" />
          </IconButton>
        </section>
      </nav>
      <Outlet />
    </>
  )
}
