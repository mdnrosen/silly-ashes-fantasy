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
    <div className="flex flex-col items-center p-4 pt-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl uppercase font-semibold text-dark-blue">
          SILLY ASHES
        </h1>
        <h2 className="text-2xl uppercase font-light italic">
          FANTASY EDITION
        </h2>
      </div>
      <div className="w-1/2 mb-6">
        <img
          src="/assets/hero.png"
          alt="A pencil sketch of Stuart Broad bowling Marnus Labuschagne in the 2023 Ashes"
          className="w-full h-auto"
        />
      </div>
      <div className="w-2/3 max-w-md">
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
