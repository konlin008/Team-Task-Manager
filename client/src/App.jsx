import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <HomePage /> }
      ]

    },
    { path: '/login', element: <LoginPage /> }
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
