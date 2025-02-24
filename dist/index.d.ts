import { ReactElement } from "react";
import { Currency, PlayLimits } from "@enigma-lake/zoot-platform-sdk";

declare enum GAME_MODE {
  MANUAL = "manual",
  AUTOPLAY = "autoplay",
}
declare enum AUTO_PLAY_STATE {
  IDLE = "idle",
  PLAYING = "playing",
}

type StylingProps = {
  panel: {
    top: string;
    bgColorHex: string;
  };
};
type CurrencyProps = {
  currentCurrency: Currency;
  currencies: Currency[];
};
type ActionsProps = {
  onPlay: () => void;
  onAutoPlay: (next: () => void, stop: () => void) => void;
};
type PlaySettingsProps = {
  isPlaying: boolean;
  disabledController: boolean;
  displayController: boolean;
  playHook: () => {
    playLimits?: PlayLimits;
    playAmount: number;
    setPlayAmount: (value: number) => void;
  };
  autoPlayDelay?: number;
};
type PlayControllerProps = StylingProps &
  ActionsProps & {
    currencyOptions: CurrencyProps;
    playOptions: PlaySettingsProps;
  };

interface AutoManualPlayStateContextType {
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

interface AutoManualPlayStateProviderProps {
  children:
    | React.ReactNode
    | ((state: AutoManualPlayStateContextType) => ReactElement);
  config: PlayControllerProps;
}
declare const AutoManualPlayProvider: React.FC<AutoManualPlayStateProviderProps>;

export { AUTO_PLAY_STATE, AutoManualPlayProvider, GAME_MODE };
