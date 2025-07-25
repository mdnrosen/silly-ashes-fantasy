
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home';
import PlayerProfile from './pages/PlayerProfile';
import ListPlayers from './pages/ListPlayers';

function App() {
  return (
    <div className="max-w-5xl mx-auto bg-light-blue min-h-screen">
      <Router>
        {/* Navbar will go here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<ListPlayers />} />
          <Route path="/player/:playerId" element={<PlayerProfile />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App
