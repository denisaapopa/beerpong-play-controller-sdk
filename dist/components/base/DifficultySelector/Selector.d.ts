import { SelectorProps } from "./types";
declare const Selector: <T>({
  currentValue,
  label,
  riskColor,
  values,
  onSelect,
  disabled,
}: SelectorProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Selector;
