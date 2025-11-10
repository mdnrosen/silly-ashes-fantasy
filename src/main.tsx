import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PlayersProvider } from "./context/PlayersContext.tsx";
import { ToastContextProvider } from "./context/ToastContext.tsx";
import { TeamProvider } from "./context/TeamContext.tsx"
createRoot(document.getElementById("root")!).render(
  <>
    <TeamProvider>
      <PlayersProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </PlayersProvider>
    </TeamProvider>
  </>
);
