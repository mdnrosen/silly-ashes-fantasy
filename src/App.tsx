import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PlayerProfile from "./pages/PlayerProfile";
import ListPlayers from "./pages/ListPlayers";
import Rules from "./pages/Rules";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TeamHome from "./pages/TeamHome";
import Team from "./pages/TeamSquad";
import Auth from "./pages/Auth";

import Footer from "./modules/Footer";
import Navbar from "./modules/Navbar";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import outputs from "./lib/config";

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(outputs);

function App() {
  return (
    <div className="min-w-xs max-w-md mx-auto bg-off-white min-h-screen font-roboto shadow-xl">
      <Router>
        <Navbar />
        <ScrollToTop />
        <div className="pt-15 md:pt-20 pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/rules" element={<Rules />} />
            <Route
              path="/players"
              element={
                <ProtectedRoute>
                  <ListPlayers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team/:teamId"
              element={
                <ProtectedRoute>
                  <TeamHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team/:teamId/:test"
              element={
                <ProtectedRoute>
                  <Team />
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
              path="/player/:id"
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
