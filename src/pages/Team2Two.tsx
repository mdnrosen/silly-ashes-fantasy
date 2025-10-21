import PlayerBox from "../modules/PlayerBox";

const TeamTwo = () => {
  const renderPlayerBox = (isDisabled?: boolean, player: any | null = null) => {
    return <PlayerBox isDisabled={isDisabled} player={player} />;
  };

  const teamIsNew: boolean = true;

  return (
    <div className="h-[calc(100vh-6.5rem)] overflow-auto bg-off-white border-b-2 grid grid-rows-14 grid-gap-2">
      {/* Title / name input */}
      {teamIsNew && (
        <div className="bg-red-200 w-full p-1">
          <input type="text" placeholder="Enter team name..." className="p-2" />
        </div>
      )}
      {/* Row 1 -  */}
      <div className="p-2 row-span-3 flex justify-around">
        {renderPlayerBox(true)}
        {renderPlayerBox(true)}
      </div>
      <div className="p-2 row-span-3 flex justify-around">
        {renderPlayerBox(true)}
        {renderPlayerBox(true)}
      </div>
      <div className="p-2 row-span-3 flex justify-around">
        {renderPlayerBox(true)}
        {renderPlayerBox(true)}
      </div>
      <div className="p-2 row-span-3 flex justify-around">
        {renderPlayerBox(true)}
        {renderPlayerBox(true)}
      </div>
      {/* Row 2 of Boxes */}
      <div className="p-1 flex justify-center align-middle">
        <button className="w-full md:w-4/5 bg-aus-green rounded-md p-2 text-off-white font-semibold">
          SAVE TEAM
        </button>
      </div>
    </div>
  );
};

export default TeamTwo;
