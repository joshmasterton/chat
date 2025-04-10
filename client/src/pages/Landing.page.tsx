import {
  ChatBubbleLeftEllipsisIcon,
  UserGroupIcon
} from '@heroicons/react/16/solid'
import { Button } from '../comp/Button.comp'
import { Footer } from '../comp/Footer.comp'
import { Divider } from '../comp/Divider.comp'
import { ComputerDesktopIcon } from '@heroicons/react/20/solid'
import morph from '../assets/morph.png'

export const Landing = () => {
  return (
    <main className="flex mt-20 gap-18 p-4 flex-col w-full dark:text-white items-center">
      <section className="max-w-5xl w-full px-5 flex max-md:flex-col max-md:text-center gap-10 justify-center md:justify-between items-center">
        <aside className="dark:text-white max-w-md flex flex-col gap-4 max-md:items-center">
          <header className="text-6xl font-bold">
            <span className="text-indigo-500">Chat freely, </span>
            instantly, anytime.
          </header>
          <p className="text-gray-600 dark:text-gray-400">
            Join a seamless and secure messaging experience—whether it’s
            one-on-one or in public chatrooms. Stay connected with friends, meet
            new people, or collaborate in real time.
          </p>
          <Button type="button" variant="primary" className="mt-4">
            <div>Start Chatting</div>
          </Button>
        </aside>
        <img alt="morph" src={morph} className="w-full max-w-100" />
      </section>
      <Divider />
      <section className="max-w-5xl w-full flex flex-col gap-12 items-center justify-center text-center">
        <header className="max-w-75 flex flex-col gap-2">
          <h3 className="text-3xl font-bold">Why choose our chat app?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Built for speed, privacy, and simplicity. Here’s what makes our
            platform stand out.
          </p>
        </header>
        <aside className="flex max-sm:flex-col justify-center items-start gap-12">
          <article className="flex items-center flex-col gap-4 max-w-50 rounded-lg flex-1">
            <ChatBubbleLeftEllipsisIcon className="h-20 w-16 text-indigo-500" />
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">Real-Time Messaging</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enjoy instant, reliable communication with no delays or
                refreshes.
              </p>
            </div>
          </article>
          <article className="flex items-center flex-col gap-4 max-w-50 rounded-lg flex-1">
            <UserGroupIcon className="h-20 w-20 text-indigo-500" />
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">
                Public & Private Rooms
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create private spaces for your team or jump into open
                conversations with the community.
              </p>
            </div>
          </article>
          <article className="flex items-center flex-col gap-4 max-w-50 rounded-lg flex-1">
            <ComputerDesktopIcon className="h-20 w-16 text-indigo-500" />
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">
                Modern, Clean Interface
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Built with a sleek UI that works great on desktop and mobile
                devices.
              </p>
            </div>
          </article>
        </aside>
      </section>
      <Divider />
      <section className="max-w-5xl w-full px-5 flex max-md:flex-col max-md:text-center gap-10 justify-center md:justify-between items-center">
        <img alt="morph" src={morph} className="w-full max-w-100" />
        <aside className="dark:text-white max-w-md flex flex-col gap-4 max-md:items-center">
          <header className="text-5xl font-bold">
            <span className="text-indigo-500">Start chatting </span>
            in seconds.
          </header>
          <p className="text-gray-600 dark:text-gray-400">
            No sign-up required to explore public rooms. Dive in, chat, and
            connect.
          </p>
        </aside>
      </section>
      <Footer />
    </main>
  )
}
