import { Currency } from "@enigma-lake/zoot-platform-sdk";
interface PlayAmountControlProps {
  playAmount: number;
  minPlayAmount: number;
  maxPlayAmount: number;
  isDisabled: () => boolean;
  adjustPlayAmount: (multiplier: number) => void;
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurAmount: (event: React.FocusEvent<HTMLInputElement>) => void;
  currentCurrency: Currency;
  currencies: Currency[];
}
declare const PlayAmountControl: ({
  playAmount,
  minPlayAmount,
  maxPlayAmount,
  isDisabled,
  adjustPlayAmount,
  onChangeAmount,
  onBlurAmount,
  currentCurrency,
  currencies,
}: PlayAmountControlProps) => import("react/jsx-runtime").JSX.Element;
export default PlayAmountControl;
