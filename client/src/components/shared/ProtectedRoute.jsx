import useAuthStore from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;