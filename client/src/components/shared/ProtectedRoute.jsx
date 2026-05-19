import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

export const ProtectedRoute = ({ children }) => {
    const user = useAuthStore(state => state.user)
    if (!user) {
        return <Navigate to={'/login'} />

    }
    return children
}

export const AuthenticatedUser = ({ children }) => {
    const user = useAuthStore(state => state.user)
    if (user) {
        return <Navigate to={'/'} />

    }
    return children
}