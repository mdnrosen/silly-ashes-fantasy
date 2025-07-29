type StatRowProps = {
  statName: string;
  statValue: number;
};

const StatRow = ({ statName, statValue }: StatRowProps) => {
  return (
    <div className="flex justify-between p-4 border-b-1 border-off-white text-off-white">
      <span className="text-xl">{statName}</span>
      <span className="text-2xl">{statValue}</span>
    </div>
  );
};

export default StatRow;
