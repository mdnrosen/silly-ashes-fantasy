import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayerProfile from "./pages/PlayerProfile";
import ListPlayers from "./pages/ListPlayers";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./modules/Navbar";
import Footer from "./modules/Footer";

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
          <Route path="/player/:playerId" element={<PlayerProfile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
