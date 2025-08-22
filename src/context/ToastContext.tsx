import { createContext, useState } from 'react';
import ToastsContainer from '../components/ToastContainer';
import { ToastContextType } from '../hooks/useToast';

type Toast = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ toasts, setToasts ] = useState<Toast[]>([]);

  return (
    <ToastContext.Provider value={{
      success: (message: string) => setToasts([...toasts, { id: Math.random(), type: 'success', message }]),
      error: (message: string) => setToasts([...toasts, { id: Math.random(), type: 'error', message }]),
      remove: (id: number) => setToasts(toasts.filter(toast => toast.id !== id))
    }}>
      <ToastsContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};