import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PlayerProfile from "./pages/PlayerProfile";
import ListPlayers from "./pages/ListPlayers";
import Team from "./pages/Team";
import Rules from "./pages/Rules";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import Footer from "./modules/Footer";
import Navbar from "./modules/Navbar";

import ScrollToTop from "./components/ScrollToTop";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

import { Amplify } from "aws-amplify";
import outputs from "./lib/config";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(outputs);

function App() {
  return (
    <div className="min-w-xs max-w-3xl mx-auto bg-off-white min-h-screen font-roboto">
      <Router>
        <Navbar />
        <ScrollToTop />
        <div className="pt-15 md:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Auth />} />
            <Route
              path="/players"
              element={
                <ProtectedRoute>
                  <ListPlayers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rules"
              element={
                <ProtectedRoute>
                  <Rules />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/:playerId"
              element={
                <ProtectedRoute>
                  <PlayerProfile />
                </ProtectedRoute>
              }
            />
            {/* add 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
