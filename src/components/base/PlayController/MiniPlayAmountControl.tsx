import cx from "classnames";
import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";

import Button from "../Button";
import MiniInputWithIcon from "../MiniInputWithIcon";
import SelectMenu from "../SelectMenu";
import { PLAY_HALVE, PLAY_DOUBLE } from "../../../types/playController";

import styles_group from "./MiniPlayAmountController.module.scss";

interface MiniPlayAmountControlProps {
  playAmount: number;
  minPlayAmount: number;
  maxPlayAmount: number;
  isDisabled: () => boolean;
  adjustPlayAmount: (multiplier: number) => void;
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurAmount: (event: React.FocusEvent<HTMLInputElement>) => void;
  currentCurrency: Currency;
  currencies: Currency[];
}

const MiniPlayAmountControl = ({
  playAmount,
  minPlayAmount,
  maxPlayAmount,
  isDisabled,
  adjustPlayAmount,
  onChangeAmount,
  onBlurAmount,
  currentCurrency,
  currencies,
}: MiniPlayAmountControlProps) => {
  return (
    <div className={cx(styles_group.base)}>
      <div className={cx(styles_group.group)}>
        <Button
          className={styles_group.groupItem}
          onClick={() => adjustPlayAmount(PLAY_HALVE)}
          theme="ghost"
          disabled={isDisabled()}
        >
          <span className={cx(styles_group.x2, styles_group.first)}>-</span>
        </Button>
        <Button
          className={styles_group.groupItem}
          onClick={() => adjustPlayAmount(PLAY_DOUBLE)}
          theme="ghost"
          disabled={isDisabled()}
        >
          <span className={cx(styles_group.x2, styles_group.last)}>+</span>
        </Button>
      </div>
      <MiniInputWithIcon
        className={styles_group.groupItem}
        value={playAmount}
        type="number"
        onChange={onChangeAmount}
        onBlur={onBlurAmount}
        placeholder={minPlayAmount.toString()}
        max={maxPlayAmount}
        min={minPlayAmount}
        disabled={isDisabled()}
        currency={currentCurrency}
        label="Play Amount"
      >
        <SelectMenu
          currencies={currencies}
          selectedCurrency={currentCurrency}
          setSelectedCurrency={sendSetUserCurrencyEvent}
          disabled={isDisabled()}
        />
      </MiniInputWithIcon>
    </div>
  );
};

export default MiniPlayAmountControl;
