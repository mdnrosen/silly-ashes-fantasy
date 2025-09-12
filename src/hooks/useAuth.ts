import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOut, AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMountedRef = useRef(true);

  const checkAuthState = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      const currentUser = await getCurrentUser();
      if (isMountedRef.current) {
        setUser(currentUser);
        setIsLoading(false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setUser(null);
        setIsLoading(false);
      }
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      if (isMountedRef.current) {
        setUser(null);
        navigate("/register");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    checkAuthState();

    // Listen for auth events
    const unsubscribe = Hub.listen("auth", (data) => {
      if (!isMountedRef.current) return;

      const { event } = data.payload;

      if (event === "signedIn") {
        checkAuthState();
      } else if (event === "signedOut") {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, []); // Empty dependency array - only run once

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut: handleSignOut,
  };
}
