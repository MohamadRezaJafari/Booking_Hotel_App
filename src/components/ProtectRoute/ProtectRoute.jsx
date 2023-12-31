import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

function ProtectRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigagte = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigagte("/login");
  }, [isAuthenticated, navigagte]);

  return isAuthenticated ? children : null;
}

export default ProtectRoute;
