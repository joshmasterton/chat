import { Landing } from './pages/Landing.page'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Nav } from './comp/Nav.comp'
import { ThemeProvider } from './context/Theme.context'

const routes = [
  {
    path: '/',
    element: <Nav />,
    children: [{ path: '/', element: <Landing /> }]
  }
]

const router = createBrowserRouter(routes)

export const App = () => {
  return (
    <div className="relative flex flex-col items-center">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}
