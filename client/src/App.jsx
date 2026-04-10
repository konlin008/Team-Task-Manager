import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './layout/MainLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard from './pages/dashboard/Dashboard'
import ProjectDetails from './pages/project/ProjectDetails'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <Dashboard /> },
        { path: '/project-details/:id', element: <ProjectDetails /> }
      ]

    },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> }
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
