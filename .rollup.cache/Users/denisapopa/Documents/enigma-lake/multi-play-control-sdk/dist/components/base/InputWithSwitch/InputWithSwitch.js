import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from "classnames";
import { Switch } from "../Switch/Switch";
import styles from "./InputWithSwitch.module.scss";
import Input from "../Input";
const InputWithSwitch = ({
  children,
  switcherConfig,
  disabled,
  currency,
  label,
  className,
  ...restProps
}) => {
  return _jsxs("div", {
    className: cx(styles.base, className, {
      [styles.disabled]: switcherConfig.disabled,
    }),
    children: [
      label &&
        _jsx("span", {
          className: cx(styles.label, styles[currency]),
          children: label,
        }),
      _jsx(Switch, { ...switcherConfig }),
      _jsx(Input, {
        ...restProps,
        className: cx(styles.input),
        disabled: disabled,
        max: 99,
      }),
      _jsx("div", { className: cx(styles.icon), children: children }),
    ],
  });
};
export default InputWithSwitch;
//# sourceMappingURL=InputWithSwitch.js.map
