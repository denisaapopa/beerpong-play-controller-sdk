import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import style_difficulty from "./DifficultySelector.module.scss";
import Selector from "./Selector";
import { RiskTypes, SELECTORS } from "./types";
const DifficultySelector = ({ playOptions, dropdownConfig }) => {
  const { risks, disabledMenu, currentRisk, onRiskChange } = playOptions;
  const riskColor = useRef(dropdownConfig.riskColorConfig[RiskTypes.LOW]);
  function onRiskSelected(value) {
    riskColor.current = dropdownConfig.riskColorConfig[value];
    onRiskChange(value);
  }
  return _jsx("div", {
    className: style_difficulty.base,
    children: _jsx(Selector, {
      currentValue: currentRisk,
      label: SELECTORS.RISK,
      values: risks,
      onSelect: onRiskSelected,
      disabled: disabledMenu,
      riskColor: riskColor.current,
    }),
  });
};
export default DifficultySelector;
//# sourceMappingURL=DifficultySelector.js.map
