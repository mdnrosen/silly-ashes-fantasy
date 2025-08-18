import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center h-15 md:h-20 w-full mx-auto p-4 bg-off-white text-dark-blue relative z-50 border-b-2">
        LOGO
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-dark-blue transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-dark-blue transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-dark-blue transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full bg-dark-blue text-off-white transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="pt-24 pb-6 px-6">
          <nav className="space-y-6">
            <Link
              to="/team"
              className="block text-lg hover:text-light-blue transition-colors duration-200 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              My Team
            </Link>
            <Link
              to="/leaderboard"
              className="block text-lg hover:text-light-blue transition-colors duration-200 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              to="/players"
              className="block text-lg hover:text-light-blue transition-colors duration-200 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Players
            </Link>
            <Link
              to="/rules"
              className="block text-lg hover:text-light-blue transition-colors duration-200 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              The Rules
            </Link>
            <button
              className="block text-lg hover:text-light-blue transition-colors duration-200 pt-6 border-t border-mid-blue w-full text-left uppercase"
              onClick={() => {
                setIsMenuOpen(false);
                // TODO: Add sign out logic
                console.log("Sign out clicked");
              }}
            >
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        ></button>
      )}
    </>
  );
};

export default Navbar;
