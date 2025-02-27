import { Currency, PlayLimits } from "@enigma-lake/zoot-platform-sdk";
import { RiskTypes } from "../components/base/DifficultySelector/types";

export type StylingProps = {
  panel: {
    bottom: string;
    bgColorHex: string;
  };
  dropdown: {
    bgColorHex: string;
    riskColorConfig: {
      [RiskTypes.LOW]: string;
      [RiskTypes.MEDIUM]: string;
      [RiskTypes.HIGH]: string;
    };
  };
};

export type CurrencyProps = {
  currentCurrency: Currency;
  currencies: Currency[];
};

export type ActionsProps = {
  onPlay: (side: PlaySide) => void;
  onAutoPlay: (next: () => void, stop: () => void, side: PlaySide) => void;
};

export type PlaySettingsProps = {
  isPlaying: boolean;
  canCashout: boolean;
  disabledController: boolean;
  risks: RiskTypes[];
  currentRisk: RiskTypes;
  onRiskChange: (risk: RiskTypes) => void;
  disabledMenu: boolean;
  displayController: boolean;
  lastPlayedSide: PlaySide;
  disableInput: boolean;
  playHook: () => {
    playLimits?: PlayLimits;
    leftPlayAmount: number;
    rightPlayAmount: number;
    setLeftBetAmount: (value: number) => void;
    setRightBetAmount: (value: number) => void;
  };
  autoPlayDelay?: number;
};

export type PlayControllerProps = StylingProps &
  ActionsProps & {
    currencyOptions: CurrencyProps;
    playOptions: PlaySettingsProps;
  };

export const PLAY_HALVE = 0.5;
export const PLAY_DOUBLE = 2;

export enum PlaySide {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}
