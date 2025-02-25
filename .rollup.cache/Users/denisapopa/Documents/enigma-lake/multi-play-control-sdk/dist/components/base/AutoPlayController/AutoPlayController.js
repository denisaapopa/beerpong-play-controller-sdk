import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import { usePlayController } from "../../hooks/usePlayController";
import { AUTO_PLAY_STATE } from "../../../types";
import PlayAmountControl from "../PlayController/PlayController";
import Button from "../Button";
import styles_button from "../Button/Button.module.scss";
const AutoPlayController = () => {
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
    autoPlay: { isDisabled, state, onPlay, onStopPlay },
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
      state === AUTO_PLAY_STATE.PLAYING
        ? _jsx(Button, {
            className: styles_button.buttonCashout,
            onClick: onStopPlay,
            children: "Stop Autoplay",
          })
        : _jsx(Button, {
            disabled: isDisabled() || !isValidPlayAmount,
            className:
              currentCurrency === Currency.GOLD
                ? styles_button.buttonGold
                : styles_button.buttonSweeps,
            onClick: onPlay,
            children: "Start Autoplay",
          }),
    ],
  });
};
export default AutoPlayController;
//# sourceMappingURL=AutoPlayController.js.map
