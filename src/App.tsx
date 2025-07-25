
import './App.css'
import PlayerSummary from './pages/PlayersSummary';


function App() {
  return (
    // mobile friendly width please
    <div className="max-w-4xl mx-auto">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Silly Ashes Fantasy</h1>
        </header>
      <PlayerSummary />
    </div>
  )
};






export default App
