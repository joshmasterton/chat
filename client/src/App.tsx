import './styles.css'

export const App = () => {
  return (
    <main className="m-6 gap-y-4">
      <article className=" p-6 gap-2 mx-auto flex flex-col max-w-sm gap-x-4 rounded-lg bg-white shadow-lg outline outline-black/10 dark:bg-black dark:outline-white/20 dark:shadow-xl">
        <header className="text-xl font-medium dark:text-white">Hello</header>
        <section>
          <p className="text-gray-500 dark:text-gray-300">Welcome to chat</p>
        </section>
      </article>
    </main>
  )
}
