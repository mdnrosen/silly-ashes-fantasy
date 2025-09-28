import { MyPlayers } from "../pages/Team";
import { getTitle, getSelectMessage, getBorderColor } from "../lib/helpers";
import unpickedImage from '../assets/unpicked.jpg'; 

type Props = {
    myPlayers: MyPlayers;
    openSelectionModal: (role: keyof MyPlayers) => void;
    role: keyof MyPlayers;
};

const SelectPlayer = ({ myPlayers, role, openSelectionModal }: Props) => {
    return (
          <button className={`border p-2 h-60 flex flex-col items-center bg-white ${myPlayers[role] ? 'border-4' : 'border-dashed'} ${getBorderColor(myPlayers[role]?.team as string)}`} onClick={() => openSelectionModal(role)}>
            <img src={myPlayers[role] ? myPlayers[role].imageUrl : unpickedImage} alt={getTitle(role) + ' photo'} />
            <div className="py-2">
              <div>
                {myPlayers[role] ? (
                  <div className="text-lg">{myPlayers[role].name}</div>
                ) : (
                  <div className="text-lg">{getTitle(role)}</div>
                )}
              </div>
              {!myPlayers[role] ? (
                <div className="flex">
                  <small className="text-sm">{getSelectMessage(role)}</small>
                </div>
              ): (
                <div className="flex justify-between">
                  <p className="text-md">{myPlayers[role]?.cost}</p>
                  <p className="text-md">{myPlayers[role]?.team}</p>

                </div>
              )}
            </div>
          </button>
    );
};

export default SelectPlayer;