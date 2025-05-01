// Client-side authentication utilities
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";

// Create an auth context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    // Validate the token
    const validateToken = async () => {
      try {
        const userData = await validateSession({ token });
        if (userData) {
          setUser(userData);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error validating session:", error);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginUser({ email, password });
      localStorage.setItem("authToken", result.token);
      setUser(result.user);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await registerUser({ name, email, password });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await logoutUser({ token });
        localStorage.removeItem("authToken");
      }
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook to validate session
export function useValidateSession() {
  const validateSession = useQuery(api.auth.validateSession);
  return validateSession;
}

// Hook for login
export function useLogin() {
  const login = useMutation(api.auth.login);
  return login;
}

// Hook for registration
export function useRegister() {
  const register = useMutation(api.auth.register);
  return register;
}

// Hook for logout
export function useLogout() {
  const logout = useMutation(api.auth.logout);
  return logout;
}