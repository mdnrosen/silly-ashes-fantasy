type Props = {
  isDisabled?: boolean;
  player: any | null;
};

const PlayerBox = ({ isDisabled, player }: Props) => {
  return (
    <button
      className="border-dashed border-2 h-full aspect-square"
      disabled={isDisabled}
    >
      <p>{player ? player.name : "No Player"}</p>
    </button>
  );
};

export default PlayerBox;
