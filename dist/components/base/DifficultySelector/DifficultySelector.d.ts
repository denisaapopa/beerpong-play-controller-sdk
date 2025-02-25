import { PlaySettingsProps } from "../../../types/playController";
import { RiskTypes } from "./types";
declare const DifficultySelector: ({
  playOptions,
  dropdownConfig,
}: {
  playOptions: PlaySettingsProps;
  dropdownConfig: {
    bgColorHex: string;
    riskColorConfig: {
      [RiskTypes.LOW]: string;
      [RiskTypes.MEDIUM]: string;
      [RiskTypes.HIGH]: string;
    };
  };
}) => import("react/jsx-runtime").JSX.Element;
export default DifficultySelector;
