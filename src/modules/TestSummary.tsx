type Props = {
    key: string,
    label: string,
    venue: string
}

const TestSummary = ({ label, venue }: Props) => {
    return (
        <div className="border-1 p-2 mb-2 rounded-md flex flex-col bg-gray-100">
            <div className="flex justify-between">
                <p className="font-semibold">{label}</p>
                <small className="font-extralight uppercase text-sm">{venue}</small>
            </div>
            <h2>310 points</h2>
        </div>
    );
};


export default TestSummary;