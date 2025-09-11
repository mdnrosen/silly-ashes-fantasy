import { createContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, signOut, AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser();
    
    const listener = (data: any) => {
      switch (data.payload.event) {
        case "signIn":
          checkUser();
          break;
        case "signOut":
          setUser(null);
          setLoading(false);
          break;
        default:
          break;
      }
    };

    return Hub.listen("auth", listener);
  }, []);

  const checkUser = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};