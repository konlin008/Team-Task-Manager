import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './layout/MainLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard from './pages/dashboard/Dashboard'
import ProjectDetails from './pages/project/ProjectDetails'
import MyTaskPage from './pages/MyTaskPage'
import { useSocket } from './hooks/useSocket'

function App() {
  useSocket();
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <Dashboard /> },
        { path: '/project-details/:id', element: <ProjectDetails /> },
        { path: '/tasks', element: <MyTaskPage /> }
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
