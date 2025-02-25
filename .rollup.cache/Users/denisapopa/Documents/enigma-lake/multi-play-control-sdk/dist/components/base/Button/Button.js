import { jsx as _jsx } from "react/jsx-runtime";
import cx from "classnames";
import styles from "./Button.module.scss";
const themes = {
  primary: "primary",
  success: "success",
  ghost: "ghost",
};
const Button = ({ disabled, className = "", theme = "primary", ...props }) => {
  return _jsx("button", {
    ...props,
    className: cx(styles.base, styles[`base__theme-${theme}`], className, {
      [styles["base__state-disabled"]]: disabled,
    }),
    disabled: disabled,
  });
};
Button.themes = themes;
export default Button;
//# sourceMappingURL=Button.js.map
