type Props = {
  team?: any;
};

const InfoBox = ({ team }: Props) => {
  const { budgetUsed = 0, points = 0 } = team || {};
  return (
    <div className="p-1 h-full aspect-square grid grid-rows-5 rounded-md">
      <div className="row-span-2 flex flex-col justify-center items-start">
        <h3 className="text-sm uppercase font-light">Cost</h3>
        <p className="text-lg">{budgetUsed}$</p>
      </div>
      <div className="row-span-2 flex flex-col justify-center items-start">
        <h3 className="text-sm uppercase font-light">Points</h3>
        <p className="text-lg">{points}</p>
      </div>
    </div>
  );
};

export default InfoBox;
