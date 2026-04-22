import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function AuthRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Betöltés...</div>;
    if (!user) return <Navigate to="/login" />;

    return children;
}
