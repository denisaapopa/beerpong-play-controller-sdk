import { jsx as _jsx } from "react/jsx-runtime";
import cx from "classnames";
import { useCallback } from "react";
import { cleanInputNumber } from "./cleanInputNumber";
import styles from "./Input.module.scss";
const Input = ({ onChange, disabled, className, max, ...restProps }) => {
  const handleChange = useCallback(
    (event) => {
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
  return _jsx("input", {
    ...restProps,
    disabled: disabled,
    onChange: handleChange,
    className: cx(styles.base, className, { [styles.disabled]: disabled }),
  });
};
export default Input;
//# sourceMappingURL=Input.js.map
