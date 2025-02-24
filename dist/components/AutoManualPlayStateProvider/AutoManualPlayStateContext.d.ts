import { GAME_MODE, AUTO_PLAY_STATE } from "../../types/gameMode";
import { PlayControllerProps } from "../../types/playController";
export interface AutoManualPlayStateContextType {
  mode: GAME_MODE;
  config: PlayControllerProps;
  manual: {
    playManualMode: () => void;
  };
  autoPlay: {
    state: AUTO_PLAY_STATE;
    playedRounds: number;
    numberOfPlays: number;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    start: (numberOfPlays: number) => void;
    stop: () => void;
    setState: React.Dispatch<React.SetStateAction<AUTO_PLAY_STATE>>;
    setPlayedRounds: React.Dispatch<React.SetStateAction<number>>;
    setNumberOfPlays: React.Dispatch<React.SetStateAction<number>>;
  };
  reset: () => void;
  toggleMode: () => void;
}
export declare const AutoManualPlayStateContext: import("react").Context<
  AutoManualPlayStateContextType | undefined
>;
export declare const useAutoManualPlayState: () => AutoManualPlayStateContextType;
