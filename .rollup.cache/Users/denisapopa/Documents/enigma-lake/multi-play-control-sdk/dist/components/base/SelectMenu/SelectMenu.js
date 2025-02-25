import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import cx from "classnames";
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GoldIcon } from "./GoldIcon";
import { SweepsIcon } from "./SweepsIcon";
import style_select from "./SelectMenu.module.scss";
import ChevronIcon from "../ChevronIcon/ChevronIcon";
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const getIcon = (option) =>
  option === Currency.SWEEPS ? _jsx(SweepsIcon, {}) : _jsx(GoldIcon, {});
const SelectMenu = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  disabled = false,
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
    setSelectedCurrency({ currency: value });
  };
  return _jsx(Menu, {
    as: "div",
    className: cx(style_select.menu),
    children: ({ open }) =>
      _jsxs(_Fragment, {
        children: [
          _jsxs(MenuButton, {
            className: cx(style_select.button, {
              [style_select.disabled]: disabled,
            }),
            disabled: disabled,
            children: [
              getIcon(selectedCurrency),
              _jsx(ChevronIcon, { open: open, disabled: disabled }),
            ],
          }),
          _jsx(MenuItems, {
            anchor: { to: "top start" },
            className: cx(style_select.menuItems),
            children: currencies.map((option) =>
              _jsxs(
                MenuItem,
                {
                  as: "div",
                  "data-value": option,
                  onClick: handleClick,
                  className: cx(style_select.menuItem, {
                    [style_select.selected]:
                      String(selectedCurrency) === String(option),
                  }),
                  children: [getIcon(option), capitalize(String(option))],
                },
                `element-${option}`,
              ),
            ),
          }),
        ],
      }),
  });
};
export default SelectMenu;
//# sourceMappingURL=SelectMenu.js.map
