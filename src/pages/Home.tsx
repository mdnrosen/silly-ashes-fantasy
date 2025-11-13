import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const _auth = useAuth();

  const getStarted = () => {
    if (!_auth.isAuthenticated) {
      navigate("/register");
    } else {
      navigate("/leaderboard");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="absolute right-0 text-right p-2 z-10">
        <h1 className="text-4xl uppercase font-semibold text-dark-blue">
          SILLY ASHES
        </h1>
        <h2 className="text-2xl uppercase font-light italic">
          FANTASY EDITION
        </h2>
      </div>
      <div className="w-full relative z-1">
        <img
          src="/assets/hero.png"
          alt="A pencil sketch of Stuart Broad bowing Marnus Labushagne in the 2023 Ashes."
        />
      </div>
      <div className="p-4 text-center">
        <button
          onClick={getStarted}
          className="w-full bg-blue-50 p-2 border-2 rounded-lg"
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default Home;
