import { Link } from './Link.comp'
import { Divider } from './Divider.comp'
import morph from '../assets/morph.png'

export const Footer = () => {
  return (
    <footer className="dark:text-white w-full flex flex-col gap-4">
      <Divider />
      <header className="dark:text-white flex max-sm:flex-col gap-x-6 gap-4">
        <section className="dark:text-white flex flex-1 gap-1 max-sm:justify-center items-center">
          <img alt="logo" src={morph} className="w-10 h-10 p-2" />
        </section>
        <ul className="max-sm:flex-col flex justify-end items-center gap-x-4 gap-y-2">
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
      </header>
      <section className="text-center p-4">
        © {new Date().getFullYear()} Chat. All Rights Reserved.
      </section>
    </footer>
  )
}
