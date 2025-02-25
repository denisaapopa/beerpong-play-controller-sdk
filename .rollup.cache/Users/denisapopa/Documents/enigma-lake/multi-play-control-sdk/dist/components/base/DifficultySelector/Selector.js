import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cx from "classnames";
import style_select from "./Selector.module.scss";
import ChevronIcon from "../ChevronIcon/ChevronIcon";
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const Selector = ({
  currentValue,
  label,
  riskColor,
  values,
  onSelect,
  disabled,
}) => {
  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    const target = e.target;
    const value = target.dataset.value;
    if (!value) {
      return;
    }
    onSelect(value);
  };
  return _jsxs("div", {
    className: cx(style_select.base),
    children: [
      label &&
        _jsx("span", { className: cx(style_select.label), children: label }),
      _jsx(Menu, {
        as: "div",
        className: cx(style_select.menu),
        children: ({ open }) =>
          _jsxs(_Fragment, {
            children: [
              _jsxs(MenuButton, {
                className: cx(style_select.button, {
                  [style_select.disabled]: disabled,
                }),
                style: { color: riskColor },
                disabled: disabled,
                children: [
                  capitalize(String(currentValue)),
                  _jsx(ChevronIcon, { open: open, disabled: disabled }),
                ],
              }),
              _jsx(MenuItems, {
                anchor: { to: "top start" },
                className: cx(style_select.menuItems),
                children: values.map((value) =>
                  _jsx(
                    MenuItem,
                    {
                      as: "div",
                      "data-value": value,
                      onClick: handleClick,
                      className: cx(style_select.menuItem, {
                        [style_select.selected]:
                          String(currentValue) === String(value),
                      }),
                      children: capitalize(String(value)),
                    },
                    `element-${value}`,
                  ),
                ),
              }),
            ],
          }),
      }),
    ],
  });
};
export default Selector;
//# sourceMappingURL=Selector.js.map
