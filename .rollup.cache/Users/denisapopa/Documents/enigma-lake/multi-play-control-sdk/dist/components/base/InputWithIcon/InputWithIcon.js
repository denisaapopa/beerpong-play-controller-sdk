import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cx from "classnames";
import Input from "../Input/Input";
import { Switch } from "../Switch/Switch";
import styles from "./InputWithIcon.module.scss";
const InputWithIcon = ({
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
      [styles.disabled]: switcherConfig?.disabled,
    }),
    children: [
      label &&
        _jsx("span", {
          className: cx(styles.label, styles[currency]),
          children: label,
        }),
      _jsx(Input, {
        ...restProps,
        className: cx(styles.input, {
          [styles.inputWithLabel]: label !== undefined,
        }),
        disabled: disabled,
      }),
      switcherConfig && _jsx(Switch, { ...switcherConfig }),
      children &&
        _jsx("div", { className: cx(styles.icon), children: children }),
    ],
  });
};
export default InputWithIcon;
//# sourceMappingURL=InputWithIcon.js.map
