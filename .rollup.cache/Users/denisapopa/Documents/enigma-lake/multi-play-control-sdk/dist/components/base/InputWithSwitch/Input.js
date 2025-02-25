import { jsx as _jsx } from "react/jsx-runtime";
import cx from "classnames";
import { useCallback } from "react";
import styles from "./Input.module.scss";
import { cleanInputNumber } from "../Input/cleanInputNumber";
const Input = ({ onChange, disabled, className, ...restProps }) => {
  const handleChange = useCallback(
    (event) => {
      if (!disabled) {
        event.target.value = cleanInputNumber(event.target.value);
        onChange?.(event);
      }
    },
    [disabled, onChange],
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
