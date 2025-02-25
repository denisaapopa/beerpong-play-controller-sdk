import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import cx from "classnames";
import styles from "./Switch.module.scss";
export const Switch = ({
  enabled,
  onSwitch,
  disabled,
  currency,
  isPlaying,
}) => {
  const switcherClassName = useMemo(
    () =>
      cx(styles.switcher, styles[currency], {
        [styles.checked]: enabled,
        [styles.unchecked]: !enabled,
        [styles.disabled]: disabled,
      }),
    [enabled, currency, disabled],
  );
  return _jsx(HeadlessSwitch, {
    checked: enabled,
    onChange: onSwitch,
    as: Fragment,
    disabled: isPlaying,
    children: _jsxs("div", {
      className: styles.base,
      children: [
        _jsx("span", { className: styles.label, children: "Auto" }),
        _jsx("div", {
          className: switcherClassName,
          children: _jsx("span", {
            className: cx(styles.thumb, { [styles["move-right"]]: enabled }),
          }),
        }),
      ],
    }),
  });
};
//# sourceMappingURL=Switch.js.map
