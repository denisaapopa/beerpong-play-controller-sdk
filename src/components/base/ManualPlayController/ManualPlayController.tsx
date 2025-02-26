import { Currency } from "@enigma-lake/zoot-platform-sdk";
import cx from "classnames";

import { usePlayController } from "../../hooks/usePlayController";
import MiniPlayAmountControl from "../PlayController/MiniPlayAmountControl";
import Button from "../Button";

import styles_button from "../Button/Button.module.scss";
import styles_group from "./ManualPlayController.module.scss";
import { PlaySide } from "../../../types/playController";

const ManualPlayController = ({
  side = PlaySide.LEFT,
}: {
  side?: PlaySide;
}) => {
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
  } = usePlayController(side);

  return (
    <div className={cx(styles_group.base)}>
      <MiniPlayAmountControl
        playAmount={playAmount}
        minPlayAmount={minPlayAmount}
        maxPlayAmount={maxPlayAmount}
        isDisabled={isDisabled}
        adjustPlayAmount={adjustPlayAmount}
        onChangeAmount={onChangeAmount}
        onBlurAmount={onBlurAmount}
        currentCurrency={currentCurrency}
        currencies={currencies}
      />

      <Button
        disabled={isDisabled() || !isValidPlayAmount}
        className={cx({
          [styles_button.buttonGold]: currentCurrency === Currency.GOLD,
          [styles_button.buttonSweeps]: currentCurrency !== Currency.GOLD,
          [styles_button.overlap]: true,
        })}
        onClick={() => onPlay(side)}
      >
        Play
      </Button>
    </div>
  );
};

export default ManualPlayController;
