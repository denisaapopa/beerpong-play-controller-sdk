import { AUTO_PLAY_STATE } from "../../types";
import { ChangeEvent, FocusEvent } from "react";
export declare const usePlayController: () => {
  currentCurrency: import("@enigma-lake/zoot-platform-sdk").Currency;
  currencies: import("@enigma-lake/zoot-platform-sdk").Currency[];
  playAmount: number;
  minPlayAmount: number;
  maxPlayAmount: number;
  setPlayAmount: (value: number) => void;
  adjustPlayAmount: (multiplier: number) => void;
  onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlurAmount: (event: FocusEvent<HTMLInputElement>) => void;
  playOptions: import("../../types/playController").PlaySettingsProps;
  isValidPlayAmount: boolean;
  manualPlay: {
    isDisabled: () => boolean;
    onPlay: () => void;
  };
  autoPlay: {
    isDisabled: () => boolean;
    state: AUTO_PLAY_STATE;
    onPlay: () => void;
    onStopPlay: () => void;
  };
};
