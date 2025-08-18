import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PlayerProfile from "./pages/PlayerProfile";
import ListPlayers from "./pages/ListPlayers";
import Team from "./pages/Team";
import Rules from "./pages/Rules";
import Leaderboard from "./pages/Leaderboard";

import Footer from "./modules/Footer";
import Navbar from "./modules/Navbar";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-w-xs max-w-3xl mx-auto bg-off-white min-h-screen font-roboto">
      <Router>
        <Navbar />
        <ScrollToTop />
        {/* Navbar will go here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<ListPlayers />} />
          <Route path="/myteam" element={<Team />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/player/:playerId" element={<PlayerProfile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
