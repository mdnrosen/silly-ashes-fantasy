import { Link } from "react-router";

type Props = {
  test: string;
  label: string;
  venue: string;
  status?: string;
};

const TestSummary = ({ test, label, venue, status = "Open" }: Props) => {
  const isUnavailable = status === "Unavailable";

  if (isUnavailable) {
    return (
      <div className="border-1 p-4 mb-2 rounded-md flex flex-col bg-gray-50 opacity-50 cursor-not-allowed">
        <div className="flex justify-between">
          <p className="font-semibold text-gray-500">{label}</p>
          <small className="font-extralight uppercase text-sm text-gray-500">
            {venue}
          </small>
        </div>
        <small className="text-xs text-gray-400 mt-1">Unavailable</small>
      </div>
    );
  }

  return (
    <Link
      to={test}
      className="border-1 p-4 mb-2 rounded-md flex flex-col bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <div className="flex justify-between">
        <p className="font-semibold">{label}</p>
        <small className="font-extralight uppercase text-sm">{venue}</small>
      </div>
      <small className="text-xs text-gray-600 mt-1">{status}</small>
    </Link>
  );
};

export default TestSummary;
