import { Currency } from "@enigma-lake/zoot-platform-sdk";
interface SwitchProps {
  enabled: boolean;
  onSwitch: () => void;
  isPlaying: boolean;
  currency: Currency;
  disabled: boolean;
}
export declare const Switch: ({
  enabled,
  onSwitch,
  disabled,
  currency,
  isPlaying,
}: SwitchProps) => import("react/jsx-runtime").JSX.Element;
export {};
