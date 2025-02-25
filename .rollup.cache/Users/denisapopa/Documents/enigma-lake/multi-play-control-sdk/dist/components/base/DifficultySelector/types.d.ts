export interface SelectorProps<T> {
  label: string;
  values: T[];
  onSelect: (value: T) => void;
  riskColor: string;
  disabled: boolean;
  currentValue: T;
}
export declare enum SELECTORS {
  ROWS = "Rows",
  RISK = "Risk",
}
export declare enum RiskTypes {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
