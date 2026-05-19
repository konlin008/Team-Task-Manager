import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './layout/MainLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard from './pages/dashboard/Dashboard'
import ProjectDetails from './pages/project/ProjectDetails'
import MyTaskPage from './pages/MyTaskPage'
import { useSocket } from './hooks/useSocket'
import MyProfile from './pages/MyProfile'
import Projects from './pages/project/Projects'
import { useEffect } from 'react'
import { useGetMe } from './hooks/auth.hook'
import useAuthStore from './store/useAuthStore'
import { AuthenticatedUser, ProtectedRoute } from './components/shared/ProtectedRoute'


function App() {
  useSocket();

  const { data, isSuccess, isError } = useGetMe();
  const { setUser, setIsCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      setUser(data?.user);
      setIsCheckingAuth(false);
    }

    if (isError) {
      setUser(null);
      setIsCheckingAuth(false);
    }
  }, [isSuccess, isError]);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <Dashboard /> },
        {
          path: '/project-details/:id',
          element: (
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          )
        },
        {
          path: '/tasks', element:
            (
              <ProtectedRoute>
                < MyTaskPage />
              </ProtectedRoute>
            )
        },
        {
          path: '/my-profile', element:
            (
              <ProtectedRoute>
                < MyProfile />
              </ProtectedRoute>
            )
        },
        {
          path: '/projects',

          element:
            (
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            )
        }
      ]
    },

    {
      path: '/login', element: (
        <AuthenticatedUser>
          <LoginPage />
        </AuthenticatedUser>
      )
    },
    {
      path: '/register', element: (
        <AuthenticatedUser>
          < RegisterPage />
        </AuthenticatedUser>
      )
    }
  ])

  return <RouterProvider router={appRouter} />
}

export default App