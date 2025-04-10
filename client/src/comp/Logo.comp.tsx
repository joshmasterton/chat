import morph from '../assets/morph.png'

export const Logo = () => {
  return (
    <section className="w-3/12 dark:text-white flex gap-1 items-center">
      <img alt="logo" src={morph} className="w-10 h-10 p-2" />
      <div className="py-2 font-semibold">Chat</div>
    </section>
  )
}
