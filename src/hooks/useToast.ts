import { useContext } from "react";

import { ToastContext } from "../context/ToastContext";

export interface ToastContextType {
  remove: (id: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

export const useToast = () => useContext(ToastContext);
