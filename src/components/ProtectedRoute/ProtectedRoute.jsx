import { Navigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useToken();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }

    return children;
}