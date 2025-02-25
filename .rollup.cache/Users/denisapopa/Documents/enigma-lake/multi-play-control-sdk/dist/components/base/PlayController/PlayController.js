import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from "classnames";
import { sendSetUserCurrencyEvent } from "@enigma-lake/zoot-platform-sdk";
import Button from "../Button";
import GroupRow from "../GroupRow";
import InputWithIcon from "../InputWithIcon";
import SelectMenu from "../SelectMenu";
import { PLAY_HALVE, PLAY_DOUBLE } from "../../../types/playController";
import styles_group from "../GroupRow/GroupRow.module.scss";
const PlayAmountControl = ({
  playAmount,
  minPlayAmount,
  maxPlayAmount,
  isDisabled,
  adjustPlayAmount,
  onChangeAmount,
  onBlurAmount,
  currentCurrency,
  currencies,
}) => {
  return _jsxs(GroupRow, {
    children: [
      _jsx(InputWithIcon, {
        className: styles_group.groupItem,
        value: playAmount,
        type: "number",
        onChange: onChangeAmount,
        onBlur: onBlurAmount,
        placeholder: minPlayAmount.toString(),
        max: maxPlayAmount,
        min: minPlayAmount,
        disabled: isDisabled(),
        currency: currentCurrency,
        label: "Play Amount",
        children: _jsx(SelectMenu, {
          currencies: currencies,
          selectedCurrency: currentCurrency,
          setSelectedCurrency: sendSetUserCurrencyEvent,
          disabled: isDisabled(),
        }),
      }),
      _jsx(Button, {
        className: styles_group.groupItem,
        onClick: () => adjustPlayAmount(PLAY_HALVE),
        theme: "ghost",
        disabled: isDisabled(),
        children: _jsx("span", { className: styles_group.x2, children: "-" }),
      }),
      _jsx(Button, {
        className: styles_group.groupItem,
        onClick: () => adjustPlayAmount(PLAY_DOUBLE),
        theme: "ghost",
        disabled: isDisabled(),
        children: _jsx("span", {
          className: cx(styles_group.x2, styles_group.last),
          children: "+",
        }),
      }),
    ],
  });
};
export default PlayAmountControl;
//# sourceMappingURL=PlayController.js.map
