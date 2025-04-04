import { Currency } from "@enigma-lake/zoot-platform-sdk";
import cx from "classnames";

import { usePlayController } from "../../hooks/usePlayController";
import MiniPlayAmountControl from "../PlayController/MiniPlayAmountControl";
import Button from "../Button";

import styles_button from "../Button/Button.module.scss";
import styles_group from "./ManualPlayController.module.scss";
import { PlaySide } from "../../../types/playController";
import { GAME_MODE } from "../../../types";
import { useCallback, useEffect, useMemo } from "react";
import { selectButton, addPressedClass, removePressedClass } from "../../utils";

const ManualPlayController = ({
  side = PlaySide.LEFT,
  lastPlayedSide,
}: {
  side?: PlaySide;
  lastPlayedSide?: PlaySide;
}) => {
  const {
    currentCurrency,
    currencies,
    playAmount,
    playOptions,
    minPlayAmount,
    maxPlayAmount,
    isValidPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    manualPlay: { isDisabled, onPlay },
  } = usePlayController(side);

  const roleButton = GAME_MODE.MANUAL;

  const activeClassName = useMemo(() => {
    return currentCurrency === Currency.GOLD
      ? styles_button.buttonGold__active
      : styles_button.buttonSweeps__active;
  }, [currentCurrency]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      const button = selectButton(roleButton, lastPlayedSide);
      if (!button || isDisabled()) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      addPressedClass(roleButton, activeClassName, lastPlayedSide);
      button.click();
    },
    [roleButton, isDisabled, activeClassName, lastPlayedSide],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      const button = selectButton(roleButton, lastPlayedSide);
      if (!button) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      removePressedClass(roleButton, activeClassName, lastPlayedSide);
    },
    [roleButton, activeClassName, lastPlayedSide],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyPress, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    };
  }, [handleKeyPress, handleKeyUp]);

  const isButtonDisabled = isDisabled() || !isValidPlayAmount;

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
        disableInput={playOptions.disableInput}
      />
      <Button
        disabled={isButtonDisabled}
        className={cx({
          [styles_button.buttonGold]: currentCurrency === Currency.GOLD,
          [styles_button.buttonSweeps]: currentCurrency !== Currency.GOLD,
          [styles_button.overlap]: true,
        })}
        onClick={() => onPlay(side)}
        roleType={roleButton}
      >
        Play
      </Button>
    </div>
  );
};

export default ManualPlayController;
