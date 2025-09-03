import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PlayersProvider } from './context/PlayersContext.tsx'
import { ToastContextProvider } from './context/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <PlayersProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </PlayersProvider>
  </>
)
