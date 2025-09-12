import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-off-white text-dark-blue px-4 py-4 pb-20">
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">There's nothing here...</h1>
        <p className="mb-8">The page you are looking for does not exist.</p>
        <button
          onClick={handleGoBack}
          className="bg-aus-green text-off-white px-6 py-3 rounded-lg hover:bg-dark-blue transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
