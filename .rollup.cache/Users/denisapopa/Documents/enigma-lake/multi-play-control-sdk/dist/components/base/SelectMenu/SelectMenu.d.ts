import { Currency } from "@enigma-lake/zoot-platform-sdk";
interface ISelectMenuProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: { currency: Currency }) => void;
  disabled?: boolean;
}
declare const SelectMenu: ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  disabled,
}: ISelectMenuProps) => import("react/jsx-runtime").JSX.Element;
export default SelectMenu;
