import { Currency, PlayLimits } from "@enigma-lake/zoot-platform-sdk";
import { RiskTypes } from "../components/base/DifficultySelector/types";
export type StylingProps = {
  panel: {
    top: string;
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
  onPlay: () => void;
  onAutoPlay: (next: () => void, stop: () => void) => void;
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
  playHook: () => {
    playLimits?: PlayLimits;
    playAmount: number;
    setPlayAmount: (value: number) => void;
  };
  autoPlayDelay?: number;
};
export type PlayControllerProps = StylingProps &
  ActionsProps & {
    currencyOptions: CurrencyProps;
    playOptions: PlaySettingsProps;
  };
export declare const PLAY_HALVE = 0.5;
export declare const PLAY_DOUBLE = 2;
