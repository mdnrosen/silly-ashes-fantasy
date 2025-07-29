type StatRowProps = {
  statName: string;
  statValue: number;
};

const StatRow = ({ statName, statValue }: StatRowProps) => {
  return (
    <div className="flex justify-between py-2 px-4 border-b-1 border-off-white text-off-white">
      <span className="text-lg md:text-xl">{statName}</span>
      <span className="text-xl md:text-2xl">{statValue}</span>
    </div>
  );
};

export default StatRow;
