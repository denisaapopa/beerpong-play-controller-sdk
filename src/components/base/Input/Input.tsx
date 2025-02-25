import cx from "classnames";
import React, { useCallback } from "react";

import { cleanInputNumber } from "./cleanInputNumber";
import styles from "./Input.module.scss";

type Props = React.ComponentProps<"input"> & {
  max?: number;
};
const Input = ({ onChange, disabled, className, max, ...restProps }: Props) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        let value = cleanInputNumber(event.target.value);

        if (max !== undefined) {
          const numericValue = parseFloat(value);
          if (!isNaN(numericValue) && numericValue > max) {
            value = max.toString();
          }
        }

        event.target.value = value;
        onChange?.(event);
      }
    },
    [disabled, onChange, max],
  );

  return (
    <input
      {...restProps}
      disabled={disabled}
      onChange={handleChange}
      className={cx(styles.base, className, {
        [styles.disabled]: disabled,
      })}
    />
  );
};

export default Input;
