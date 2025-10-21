import { createContext, useState } from "react";

type LoadingContextType = {
  active: boolean;
  start: () => void;
  stop: () => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  active: false,
  start: () => {},
  stop: () => {},
});

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        active: loading,
        start: () => setLoading(true),
        stop: () => setLoading(false),
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
