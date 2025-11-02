type StatBoxProps = {
  statName: string;
  statValue: number;
  emphasis?: boolean;
};

const StatBox = ({ statName, statValue, emphasis }: StatBoxProps) => {
  return (
    <div className="flex w-full flex-col text-center p-2 m-2 border-gray-300">
      <span
        className={`uppercase text-sm md:text-lg ${
          emphasis ? "font-bold" : "font-extralight"
        }`}
      >
        {statName}
      </span>
      <span
        className={`text-xl md:text-2xl ${
          emphasis ? "font-semibold" : "font-normal"
        }`}
      >
        {statValue}
      </span>
    </div>
  );
};

export default StatBox;
