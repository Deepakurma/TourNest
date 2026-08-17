import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8000/auth/getsession", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setAuthenticated(true);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <span>Loading..</span>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <>{children}</>;
};

export default AuthGuard;
