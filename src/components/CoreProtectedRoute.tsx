
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";

interface Props {
  children: React.ReactNode;
}

const CoreProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  if (!isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};

export default CoreProtectedRoute;
