import { Link } from "react-router";

type Props = {
  test: string;
  label: string;
  venue: string;
};

const TestSummary = ({ test, label, venue }: Props) => {
  return (
    <Link
      to={test}
      className="border-1 p-2 mb-2 rounded-md flex flex-col bg-gray-100"
    >
      <div className="flex justify-between">
        <p className="font-semibold">{label}</p>
        <small className="font-extralight uppercase text-sm">{venue}</small>
      </div>
      <h2>310 points</h2>
    </Link>
  );
};

export default TestSummary;
