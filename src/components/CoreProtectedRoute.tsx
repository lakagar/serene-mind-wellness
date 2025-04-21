
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

interface Props {
  children: React.ReactNode;
}

const CoreProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn()) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
      
      // Store the path they were trying to access
      const returnPath = location.pathname !== "/login" ? location.pathname : "/";
      sessionStorage.setItem("returnPath", returnPath);
      
      // Redirect to login
      navigate("/login");
    }
  }, [navigate, location.pathname, toast]);

  if (!isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};

export default CoreProtectedRoute;
