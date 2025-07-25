import { JSX } from "react";
import { Link } from "react-router-dom";
const Home: React.FC = (): JSX.Element => {
  return (
    <div className="p-4">
        <header className="bg-gray-800 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Silly Ashes Fantasy</h1>
        </header>
        <main className="mt-4">
            <p className="text-center text-lg">
            Welcome to the Silly Ashes Fantasy League! Select players to build your team and compete for the highest score.
            </p>
            <Link to="/players" className="block text-center mt-4 text-dark-blue hover:underline">
                View Players
            </Link>
        </main>
    </div>
  );
};

export default Home;