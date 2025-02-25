import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import PlayAmountControl from "../PlayController/PlayController";
import { usePlayController } from "../../hooks/usePlayController";
import Button from "../Button";
import styles_button from "../Button/Button.module.scss";
const ManualPlayController = () => {
  const {
    currentCurrency,
    currencies,
    playAmount,
    minPlayAmount,
    maxPlayAmount,
    isValidPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    manualPlay: { isDisabled, onPlay },
  } = usePlayController();
  return _jsxs(_Fragment, {
    children: [
      _jsx(PlayAmountControl, {
        playAmount: playAmount,
        minPlayAmount: minPlayAmount,
        maxPlayAmount: maxPlayAmount,
        isDisabled: isDisabled,
        adjustPlayAmount: adjustPlayAmount,
        onChangeAmount: onChangeAmount,
        onBlurAmount: onBlurAmount,
        currentCurrency: currentCurrency,
        currencies: currencies,
      }),
      _jsx(Button, {
        disabled: isDisabled() || !isValidPlayAmount,
        className:
          currentCurrency === Currency.GOLD
            ? styles_button.buttonGold
            : styles_button.buttonSweeps,
        onClick: onPlay,
        children: "Play now",
      }),
    ],
  });
};
export default ManualPlayController;
//# sourceMappingURL=ManualPlayController.js.map
