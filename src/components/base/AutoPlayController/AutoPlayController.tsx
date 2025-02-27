import { Currency } from "@enigma-lake/zoot-platform-sdk";

import { usePlayController } from "../../hooks/usePlayController";
import { AUTO_PLAY_STATE } from "../../../types";
import PlayAmountControl from "../PlayController/PlayController";
import Button from "../Button";

import styles_button from "../Button/Button.module.scss";
import { PlaySide } from "../../../types/playController";

const AutoPlayController = ({ side = PlaySide.LEFT }: { side?: PlaySide }) => {
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
    playOptions,
    autoPlay: { isDisabled, state, onPlay, onStopPlay },
  } = usePlayController(side);

  return (
    <>
      <PlayAmountControl
        playAmount={playAmount}
        minPlayAmount={minPlayAmount}
        maxPlayAmount={maxPlayAmount}
        isDisabled={isDisabled}
        adjustPlayAmount={adjustPlayAmount}
        onChangeAmount={onChangeAmount}
        onBlurAmount={onBlurAmount}
        currentCurrency={currentCurrency}
        currencies={currencies}
        disableInput={playOptions.disableInput}
      />

      {state === AUTO_PLAY_STATE.PLAYING ? (
        <Button className={styles_button.buttonCashout} onClick={onStopPlay}>
          Stop Autoplay
        </Button>
      ) : (
        <Button
          disabled={isDisabled() || !isValidPlayAmount}
          className={
            currentCurrency === Currency.GOLD
              ? styles_button.buttonGold
              : styles_button.buttonSweeps
          }
          onClick={() => onPlay(side)}
        >
          Start Autoplay
        </Button>
      )}
    </>
  );
};

export default AutoPlayController;
