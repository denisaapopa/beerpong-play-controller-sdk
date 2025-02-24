import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import cx from "classnames";
import {
  useCallback,
  useMemo,
  Fragment,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Switch as Switch$1,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";

var GAME_MODE;
(function (GAME_MODE) {
  GAME_MODE["MANUAL"] = "manual";
  GAME_MODE["AUTOPLAY"] = "autoplay";
})(GAME_MODE || (GAME_MODE = {}));
var AUTO_PLAY_STATE;
(function (AUTO_PLAY_STATE) {
  AUTO_PLAY_STATE["IDLE"] = "idle";
  AUTO_PLAY_STATE["PLAYING"] = "playing";
})(AUTO_PLAY_STATE || (AUTO_PLAY_STATE = {}));

var styles_button = {
  base: "Button-module__base___muNxk",
  "base__theme-ghost": "Button-module__base__theme-ghost___I5-LJ",
  "base__theme-primary": "Button-module__base__theme-primary___Zuswb",
  "base__state-disabled": "Button-module__base__state-disabled___EU5tH",
  buttonCashout: "Button-module__buttonCashout___LG-Yr",
  buttonSweeps: "Button-module__buttonSweeps___0snDQ",
  buttonGold: "Button-module__buttonGold___DAj-d",
};

const themes = {
  primary: "primary",
  success: "success",
  ghost: "ghost",
};
const Button = ({ disabled, className = "", theme = "primary", ...props }) => {
  return jsx("button", {
    ...props,
    className: cx(
      styles_button.base,
      styles_button[`base__theme-${theme}`],
      className,
      {
        [styles_button["base__state-disabled"]]: disabled,
      },
    ),
    disabled: disabled,
  });
};
Button.themes = themes;

var styles_group = {
  label: "GroupRow-module__label___Du57P",
  group: "GroupRow-module__group___V7xa6",
  groupItem: "GroupRow-module__groupItem___yNSX8",
  x2: "GroupRow-module__x2___9bLae",
  last: "GroupRow-module__last___ArsSn",
};

const GroupRow = ({ children, label, classNames, ...restProps }) => {
  return jsxs("div", {
    ...restProps,
    className: cx(styles_group.base, classNames),
    children: [
      label && jsx("div", { className: styles_group.label, children: label }),
      jsx("div", { className: styles_group.group, children: children }),
    ],
  });
};

const ALLOWED_SEPARATORS = [",", "."];
function findFirstSeparatorIndex(value) {
  const index = [...value].findIndex((char) =>
    ALLOWED_SEPARATORS.includes(char),
  );
  return index !== -1 ? index : undefined;
}
function cleanInputNumber(value) {
  const cleaned = value.replace(/[^0-9,.]/g, "");
  if (cleaned === "0") {
    return cleaned;
  }
  const trimmed = cleaned.replace(/^0+(?!$)/, "").replace(/(,|\.){2,}/g, "$1");
  const separatorIndex = findFirstSeparatorIndex(trimmed);
  if (separatorIndex === undefined) {
    return trimmed;
  }
  const integerPart =
    trimmed.slice(0, separatorIndex).replace(/[,.]/g, "") || "0";
  const decimalPart = trimmed.slice(separatorIndex + 1).replace(/[,.]/g, "");
  return `${integerPart}.${decimalPart}`;
}

var styles$2 = {
  base: "Input-module__base___IifiA",
  disabled: "Input-module__disabled___WqyKa",
};

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
  return jsx("input", {
    ...restProps,
    disabled: disabled,
    onChange: handleChange,
    className: cx(styles$2.base, className, { [styles$2.disabled]: disabled }),
  });
};

var styles$1 = {
  base: "Switch-module__base___gj2ey",
  switcher: "Switch-module__switcher___gHXIx",
  gold: "Switch-module__gold___oewnb",
  sweeps: "Switch-module__sweeps___yS-IY",
  unchecked: "Switch-module__unchecked___ooSS2",
  disabled: "Switch-module__disabled___lMRv0",
  thumb: "Switch-module__thumb___1wJ9D",
  "move-right": "Switch-module__move-right___ca-6D",
  label: "Switch-module__label___pG2uz",
};

const Switch = ({ enabled, onSwitch, disabled, currency, isPlaying }) => {
  const switcherClassName = useMemo(
    () =>
      cx(styles$1.switcher, styles$1[currency], {
        [styles$1.checked]: enabled,
        [styles$1.unchecked]: !enabled,
        [styles$1.disabled]: disabled,
      }),
    [enabled, currency, disabled],
  );
  return jsx(Switch$1, {
    checked: enabled,
    onChange: onSwitch,
    as: Fragment,
    disabled: isPlaying,
    children: jsxs("div", {
      className: styles$1.base,
      children: [
        jsx("span", { className: styles$1.label, children: "Auto" }),
        jsx("div", {
          className: switcherClassName,
          children: jsx("span", {
            className: cx(styles$1.thumb, {
              [styles$1["move-right"]]: enabled,
            }),
          }),
        }),
      ],
    }),
  });
};

var styles = {
  base: "InputWithIcon-module__base___FwgXx",
  icon: "InputWithIcon-module__icon___KtOjW",
  input: "InputWithIcon-module__input___mQFr9",
  inputWithLabel: "InputWithIcon-module__inputWithLabel___06L8W",
  label: "InputWithIcon-module__label___O28vw",
  gold: "InputWithIcon-module__gold___GlVw1",
  sweeps: "InputWithIcon-module__sweeps___J4JdJ",
};

const InputWithIcon = ({
  children,
  switcherConfig,
  disabled,
  currency,
  label,
  className,
  ...restProps
}) => {
  return jsxs("div", {
    className: cx(styles.base, className, {
      [styles.disabled]: switcherConfig?.disabled,
    }),
    children: [
      label &&
        jsx("span", {
          className: cx(styles.label, styles[currency]),
          children: label,
        }),
      jsx(Input, {
        ...restProps,
        className: cx(styles.input, {
          [styles.inputWithLabel]: label !== undefined,
        }),
        disabled: disabled,
      }),
      switcherConfig && jsx(Switch, { ...switcherConfig }),
      children &&
        jsx("div", { className: cx(styles.icon), children: children }),
    ],
  });
};

const GoldIcon = () =>
  jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    children: [
      jsx("path", {
        opacity: "0.39",
        d: "M7.41645 14.1044C11.0357 14.1044 13.9697 11.136 13.9697 7.47417C13.9697 3.81236 11.0357 0.843872 7.41645 0.843872C3.79725 0.843872 0.863281 3.81236 0.863281 7.47417C0.863281 11.136 3.79725 14.1044 7.41645 14.1044Z",
        fill: "#F2BF0B",
      }),
      jsx("path", {
        d: "M7.49933 13.5066C5.90609 13.5066 4.37818 12.8736 3.25163 11.7471C2.12508 10.6205 1.49219 9.09258 1.49219 7.49944C1.49219 5.90626 2.12508 4.37833 3.25163 3.25178C4.37818 2.12523 5.90609 1.49234 7.49933 1.49234C8.32641 1.48979 9.14495 1.6605 9.90213 1.99347C9.92954 2.00654 9.9541 2.02489 9.97447 2.04746C9.99484 2.07003 10.0105 2.0964 10.0207 2.12503C10.0308 2.15367 10.0352 2.18402 10.0336 2.21437C10.032 2.2447 10.0244 2.27444 10.0113 2.30186C9.98737 2.3563 9.94287 2.39903 9.88746 2.42071C9.83205 2.44238 9.77036 2.44123 9.71579 2.4175C9.01511 2.11018 8.25801 1.95261 7.49287 1.95492C6.19268 1.95633 4.93427 2.41409 3.93705 3.24836C2.93984 4.08263 2.26711 5.24047 2.03619 6.51997C1.80527 7.79947 2.03081 9.11941 2.67348 10.2497C3.31615 11.3799 4.33517 12.2487 5.55286 12.7045C6.77048 13.1603 8.10948 13.1743 9.3364 12.7439C10.5632 12.3135 11.6001 11.466 12.2661 10.3494C12.9322 9.23282 13.1852 7.91786 12.9809 6.63384C12.7767 5.34981 12.1281 4.17822 11.1485 3.32338C11.1125 3.28223 11.0928 3.22938 11.0929 3.17472C11.0931 3.12006 11.1132 3.06732 11.1494 3.02638C11.1856 2.98544 11.2355 2.9591 11.2897 2.95227C11.344 2.94544 11.3988 2.9586 11.4441 2.98929C12.3644 3.79366 13.0174 4.85964 13.316 6.04489C13.6146 7.23014 13.5444 8.47827 13.1151 9.62268C12.6857 10.767 11.9174 11.7531 10.9128 12.4495C9.90824 13.1457 8.71519 13.519 7.49287 13.5194L7.49933 13.5066Z",
        fill: "#F2BF0B",
      }),
      jsx("path", {
        d: "M7.50001 14.6249C6.09085 14.6249 4.71327 14.207 3.54156 13.4241C2.36986 12.6412 1.45664 11.5284 0.91736 10.2265C0.378089 8.92454 0.236989 7.49197 0.511905 6.10986C0.78683 4.72775 1.46542 3.45819 2.46187 2.46175C3.45832 1.4653 4.72787 0.786705 6.10996 0.511786C7.49213 0.236866 8.92467 0.377965 10.2266 0.91724C11.5286 1.45651 12.6413 2.36974 13.4242 3.54145C14.2071 4.71314 14.625 6.09069 14.625 7.49988C14.6233 9.38901 13.8721 11.2003 12.5363 12.5362C11.2004 13.872 9.38914 14.6232 7.50001 14.6249ZM7.50001 1.01735C6.21784 1.01735 4.96455 1.39754 3.8985 2.10986C2.83246 2.82216 2.00158 3.83459 1.51093 5.01912C1.02028 6.20365 0.891903 7.50707 1.14203 8.76452C1.39216 10.022 2.00956 11.1771 2.91617 12.0837C3.82276 12.9903 4.97784 13.6077 6.23536 13.8578C7.4928 14.1079 8.79625 13.9796 9.98076 13.489C11.1653 12.9983 12.1777 12.1674 12.89 11.1014C13.6024 10.0354 13.9825 8.78204 13.9825 7.49988C13.9791 5.78165 13.2951 4.13477 12.0801 2.91979C10.8651 1.70481 9.21822 1.02075 7.50001 1.01735Z",
        fill: "#F2BF0B",
      }),
      jsx("path", {
        d: "M10.1591 10.5131C9.43158 10.7452 8.6739 10.8686 7.91043 10.8794C6.91972 10.9596 5.93706 10.6482 5.17347 10.012C4.86218 9.70525 4.61761 9.33743 4.45509 8.93173C4.29258 8.52596 4.21562 8.09104 4.22904 7.65417C4.22904 5.37982 5.94443 4.22981 8.08386 4.22981C8.72897 4.20483 9.37215 4.31423 9.97274 4.55104L9.61934 5.95163C9.13325 5.7425 8.60617 5.64587 8.07741 5.66894C7.8189 5.63999 7.55711 5.6683 7.31067 5.75187C7.06423 5.83544 6.83925 5.9722 6.65165 6.15248C6.46397 6.33274 6.31837 6.5521 6.22499 6.79497C6.13161 7.03784 6.09288 7.29828 6.11149 7.5578C6.0892 7.80993 6.12113 8.0639 6.20512 8.30265C6.2892 8.5414 6.42332 8.75939 6.59859 8.94195C6.77387 9.12461 6.98628 9.26753 7.2214 9.36124C7.45653 9.45496 7.709 9.4972 7.96181 9.48522C8.14782 9.49377 8.33407 9.47423 8.51429 9.42738V8.29664H7.60841V6.94745H10.1783L10.1591 10.5131Z",
        fill: "#F2BF0B",
      }),
    ],
  });

const SweepsIcon = () =>
  jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    children: [
      jsx("path", {
        opacity: "0.39",
        d: "M7.41174 14.4521C11.2215 14.4521 14.3099 11.3275 14.3099 7.47291C14.3099 3.61837 11.2215 0.493652 7.41174 0.493652C3.60206 0.493652 0.513672 3.61837 0.513672 7.47291C0.513672 11.3275 3.60206 14.4521 7.41174 14.4521Z",
        fill: "#0DE83D",
      }),
      jsx("path", {
        d: "M8.35827 6.34123C8.33727 6.1169 8.25066 5.94313 8.09843 5.81991C7.94619 5.6951 7.75459 5.6327 7.52362 5.6327C7.35827 5.6327 7.21522 5.6643 7.09449 5.72749C6.97375 5.7891 6.87992 5.87441 6.81299 5.98341C6.74738 6.09084 6.71457 6.21327 6.71457 6.35071C6.71457 6.46603 6.73688 6.56556 6.7815 6.64929C6.82743 6.73302 6.88714 6.80332 6.96063 6.86019C7.03543 6.91548 7.11549 6.96209 7.20079 7C7.28609 7.03633 7.36811 7.06635 7.44685 7.09005L7.84055 7.21327C7.96916 7.25118 8.10105 7.30253 8.23622 7.3673C8.37139 7.43207 8.49672 7.51738 8.6122 7.62322C8.72769 7.72907 8.82087 7.86019 8.89173 8.01659C8.96391 8.17299 9 8.36019 9 8.5782C9 8.85308 8.94094 9.09716 8.82283 9.31043C8.70604 9.5237 8.53609 9.69194 8.31299 9.81517C8.09121 9.93839 7.82283 10 7.50787 10C7.20604 10 6.94488 9.94234 6.72441 9.82701C6.50394 9.71169 6.33136 9.54818 6.20669 9.33649C6.08202 9.12322 6.01312 8.87046 6 8.5782H6.61024C6.62205 8.75355 6.66929 8.89968 6.75197 9.01659C6.83596 9.13191 6.94291 9.21801 7.07283 9.27488C7.20407 9.33017 7.34777 9.35782 7.50394 9.35782C7.67585 9.35782 7.82874 9.32543 7.9626 9.26066C8.09777 9.19431 8.20407 9.10269 8.2815 8.98578C8.35892 8.8673 8.39764 8.72907 8.39764 8.57109C8.39764 8.42733 8.36352 8.30964 8.29528 8.21801C8.22835 8.12638 8.13714 8.05055 8.02165 7.99052C7.90748 7.93049 7.77822 7.87757 7.63386 7.83175L7.15748 7.67536C6.83465 7.56951 6.57874 7.4139 6.38976 7.20853C6.2021 7.00316 6.10827 6.73144 6.10827 6.39336C6.10827 6.11374 6.17126 5.86967 6.29724 5.66114C6.42323 5.45261 6.59383 5.29068 6.80906 5.17536C7.02428 5.05845 7.26706 5 7.5374 5C7.81037 5 8.05118 5.05766 8.25984 5.17299C8.46982 5.28831 8.63517 5.44708 8.75591 5.64929C8.87664 5.84992 8.93963 6.08057 8.94488 6.34123H8.35827Z",
        fill: "#0DE83D",
      }),
      jsx("path", {
        d: "M7.50006 13.8228C5.82297 13.8228 4.21465 13.1566 3.0288 11.9708C1.84296 10.7849 1.17676 9.17656 1.17676 7.49957C1.17676 5.82253 1.84296 4.21419 3.0288 3.02834C4.21465 1.8425 5.82297 1.1763 7.50006 1.1763C8.37068 1.17362 9.2323 1.35331 10.0293 1.7038C10.0582 1.71756 10.084 1.73688 10.1055 1.76064C10.1269 1.7844 10.1434 1.81215 10.1541 1.84229C10.1648 1.87244 10.1694 1.90439 10.1677 1.93633C10.166 1.96826 10.1581 1.99956 10.1443 2.02842C10.1191 2.08573 10.0722 2.13071 10.0139 2.15353C9.95556 2.17634 9.89062 2.17513 9.83318 2.15015C9.09562 1.82665 8.29868 1.6608 7.49327 1.66323C6.12465 1.66471 4.8 2.14656 3.7503 3.02474C2.7006 3.90292 1.99247 5.1217 1.74939 6.46855C1.50632 7.81539 1.74373 9.20479 2.42022 10.3946C3.09672 11.5842 4.16937 12.4988 5.45115 12.9786C6.73285 13.4583 8.14233 13.4731 9.43383 13.02C10.7252 12.567 11.8167 11.6749 12.5177 10.4996C13.2189 9.32417 13.4851 7.94001 13.2701 6.5884C13.0552 5.2368 12.3725 4.00354 11.3413 3.10371C11.3034 3.0604 11.2826 3.00476 11.2828 2.94723C11.283 2.88969 11.3041 2.83418 11.3423 2.79108C11.3804 2.74799 11.4329 2.72026 11.49 2.71307C11.5471 2.70588 11.6048 2.71974 11.6524 2.75204C12.6211 3.59875 13.3086 4.72083 13.6229 5.96845C13.9372 7.21609 13.8633 8.52992 13.4114 9.73456C12.9594 10.9391 12.1507 11.9771 11.0932 12.7101C10.0358 13.443 8.77991 13.8359 7.49327 13.8363L7.50006 13.8228Z",
        fill: "#0DE83D",
      }),
      jsx("path", {
        d: "M7.50001 15C6.01668 15 4.5666 14.5601 3.33323 13.736C2.09986 12.9119 1.13857 11.7406 0.570905 10.3701C0.00325189 8.99965 -0.145274 7.49168 0.144111 6.03682C0.433505 4.58197 1.14781 3.24559 2.1967 2.19671C3.2456 1.14781 4.58197 0.433502 6.0368 0.144114C7.49171 -0.145275 8.99965 0.00324947 10.3701 0.570907C11.7406 1.13856 12.9119 2.09986 13.736 3.33323C14.5602 4.56659 15 6.01664 15 7.5C14.9982 9.48856 14.2075 11.3951 12.8014 12.8014C11.3952 14.2075 9.48857 14.9982 7.50001 15ZM7.50001 0.676288C6.15036 0.676288 4.83111 1.07649 3.70895 1.82629C2.5868 2.57609 1.71218 3.64181 1.19572 4.88868C0.679241 6.13555 0.544108 7.50757 0.807402 8.83121C1.0707 10.1549 1.72059 11.3708 2.67491 12.3251C3.62922 13.2794 4.84509 13.9293 6.1688 14.1926C7.49242 14.4559 8.86448 14.3208 10.1113 13.8043C11.3582 13.2878 12.4239 12.4132 13.1737 11.291C13.9235 10.1689 14.3237 8.84965 14.3237 7.5C14.3202 5.69134 13.6001 3.95778 12.3212 2.67886C11.0422 1.39993 9.30865 0.679862 7.50001 0.676288Z",
        fill: "#0DE83D",
      }),
    ],
  });

var style_select = {
  button: "SelectMenu-module__button___N-HeB",
  menu: "SelectMenu-module__menu___c5jvZ",
  menuItems: "SelectMenu-module__menuItems___BX1YQ",
  menuItem: "SelectMenu-module__menuItem___eXbi3",
  selected: "SelectMenu-module__selected___XyADw",
  disabled: "SelectMenu-module__disabled___jiTPl",
};

var style_chevron = {
  chevron: "ChevronIcon-module__chevron___lif8s",
  open: "ChevronIcon-module__open___niD1n",
};

const ChevronIcon = ({ open, disabled }) => {
  return jsx("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    children: jsx("path", {
      className: cx(style_chevron.chevron, {
        [style_chevron.open]: open,
        [style_chevron.disabled]: disabled,
      }),
      d: "M6 9L12 15L18 9",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
};

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const getIcon = (option) =>
  option === Currency.SWEEPS ? jsx(SweepsIcon, {}) : jsx(GoldIcon, {});
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
  return jsx(Menu, {
    as: "div",
    className: cx(style_select.menu),
    children: ({ open }) =>
      jsxs(Fragment$1, {
        children: [
          jsxs(MenuButton, {
            className: cx(style_select.button, {
              [style_select.disabled]: disabled,
            }),
            disabled: disabled,
            children: [
              getIcon(selectedCurrency),
              jsx(ChevronIcon, { open: open, disabled: disabled }),
            ],
          }),
          jsx(MenuItems, {
            anchor: { to: "right end" },
            className: cx(style_select.menuItems),
            children: currencies.map((option) =>
              jsxs(
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

const AutoManualPlayStateContext = createContext(undefined);
const useAutoManualPlayState = () => {
  const context = useContext(AutoManualPlayStateContext);
  if (!context) {
    throw new Error(
      "useAutoManualPlayStateState must be used within a AutoManualPlayStateProvider",
    );
  }
  return context;
};

const usePlayController = () => {
  const {
    config,
    autoPlay: {
      setNumberOfPlays,
      numberOfPlays,
      setPlayedRounds,
      playedRounds,
      setState,
      state,
    },
  } = useAutoManualPlayState();
  const { currentCurrency, currencies } = config.currencyOptions;
  const {
    isPlaying,
    disabledController,
    autoPlayDelay = 500,
    playHook,
  } = config.playOptions;
  const { playAmount, playLimits, setPlayAmount } = playHook?.() ?? {};
  const minPlayAmount = playLimits?.[currentCurrency]?.limits.min ?? 0;
  const maxPlayAmount = playLimits?.[currentCurrency]?.limits.max ?? 0;
  const playIntervalRef = useRef(null);
  const isAutoplayActiveRef = useRef(false);
  const stopAutoplay = () => {
    isAutoplayActiveRef.current = false;
    if (playIntervalRef.current) {
      clearTimeout(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    setState(AUTO_PLAY_STATE.IDLE);
    setTimeout(() => {
      setPlayedRounds(0);
    }, autoPlayDelay);
  };
  const loopRounds = (currentPlayedRounds, remainingPlays) => {
    if (!isAutoplayActiveRef.current) {
      return;
    }
    if (remainingPlays < 1 || numberOfPlays === 0) {
      setNumberOfPlays(Infinity);
      stopAutoplay();
      return;
    }
    setPlayedRounds(currentPlayedRounds + 1);
    setNumberOfPlays((prev) => Math.max(prev - 1, 0));
    config.onAutoPlay(() => {
      if (!isAutoplayActiveRef.current) {
        return;
      }
      playIntervalRef.current = setTimeout(
        () => loopRounds(currentPlayedRounds + 1, remainingPlays - 1),
        autoPlayDelay,
      );
    }, stopAutoplay);
  };
  const handleAutoPlay = () => {
    if (disabledController) {
      return;
    }
    isAutoplayActiveRef.current = true;
    setState(AUTO_PLAY_STATE.PLAYING);
    loopRounds(playedRounds, numberOfPlays);
  };
  const isDisabled = () => disabledController || isPlaying;
  const isAutoplayDisabled = () =>
    disabledController || state === AUTO_PLAY_STATE.PLAYING;
  const adjustPlayAmount = (multiplier) => {
    if (isDisabled()) {
      return;
    }
    const newAmount = Math.max(
      minPlayAmount,
      Math.min(playAmount * multiplier, maxPlayAmount),
    );
    setPlayAmount(Number(newAmount.toFixed(2)));
  };
  const onChangeAmount = (event) => {
    if (isDisabled()) {
      return;
    }
    setPlayAmount(Number(event.currentTarget.value));
  };
  const onBlurAmount = (event) => {
    if (isDisabled()) {
      return;
    }
    const newAmount = Number(event.currentTarget.value);
    setPlayAmount(Math.max(minPlayAmount, Math.min(newAmount, maxPlayAmount)));
  };
  const isValidPlayAmount =
    playAmount >= minPlayAmount && playAmount <= maxPlayAmount;
  return {
    currentCurrency,
    currencies,
    playAmount,
    minPlayAmount,
    maxPlayAmount,
    setPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    playOptions: config.playOptions,
    isValidPlayAmount,
    manualPlay: {
      isDisabled,
      onPlay: config.onPlay,
    },
    autoPlay: {
      isDisabled: isAutoplayDisabled,
      state,
      onPlay: handleAutoPlay,
      onStopPlay: stopAutoplay,
    },
  };
};

const PLAY_HALVE = 0.5;
const PLAY_DOUBLE = 2;

const PlayAmountControl = ({
  playAmount,
  minPlayAmount,
  maxPlayAmount,
  isDisabled,
  adjustPlayAmount,
  onChangeAmount,
  onBlurAmount,
  currentCurrency,
  currencies,
}) => {
  return jsxs(GroupRow, {
    children: [
      jsx(InputWithIcon, {
        className: styles_group.groupItem,
        value: playAmount,
        type: "number",
        onChange: onChangeAmount,
        onBlur: onBlurAmount,
        placeholder: minPlayAmount.toString(),
        max: maxPlayAmount,
        min: minPlayAmount,
        disabled: isDisabled(),
        currency: currentCurrency,
        label: "Play Amount",
        children: jsx(SelectMenu, {
          currencies: currencies,
          selectedCurrency: currentCurrency,
          setSelectedCurrency: sendSetUserCurrencyEvent,
          disabled: isDisabled(),
        }),
      }),
      jsx(Button, {
        className: styles_group.groupItem,
        onClick: () => adjustPlayAmount(PLAY_HALVE),
        theme: "ghost",
        disabled: isDisabled(),
        children: jsx("span", { className: styles_group.x2, children: "-" }),
      }),
      jsx(Button, {
        className: styles_group.groupItem,
        onClick: () => adjustPlayAmount(PLAY_DOUBLE),
        theme: "ghost",
        disabled: isDisabled(),
        children: jsx("span", {
          className: cx(styles_group.x2, styles_group.last),
          children: "+",
        }),
      }),
    ],
  });
};

const AutoPlayController = () => {
  const {
    currentCurrency,
    currencies,
    playAmount,
    minPlayAmount,
    maxPlayAmount,
    isValidPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    autoPlay: { isDisabled, state, onPlay, onStopPlay },
  } = usePlayController();
  return jsxs(Fragment$1, {
    children: [
      jsx(PlayAmountControl, {
        playAmount: playAmount,
        minPlayAmount: minPlayAmount,
        maxPlayAmount: maxPlayAmount,
        isDisabled: isDisabled,
        adjustPlayAmount: adjustPlayAmount,
        onChangeAmount: onChangeAmount,
        onBlurAmount: onBlurAmount,
        currentCurrency: currentCurrency,
        currencies: currencies,
      }),
      state === AUTO_PLAY_STATE.PLAYING
        ? jsx(Button, {
            className: styles_button.buttonCashout,
            onClick: onStopPlay,
            children: "Stop Autoplay",
          })
        : jsx(Button, {
            disabled: isDisabled() || !isValidPlayAmount,
            className:
              currentCurrency === Currency.GOLD
                ? styles_button.buttonGold
                : styles_button.buttonSweeps,
            onClick: onPlay,
            children: "Start Autoplay",
          }),
    ],
  });
};

const ManualPlayController = () => {
  const {
    currentCurrency,
    currencies,
    playAmount,
    minPlayAmount,
    maxPlayAmount,
    isValidPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    manualPlay: { isDisabled, onPlay },
  } = usePlayController();
  return jsxs(Fragment$1, {
    children: [
      jsx(PlayAmountControl, {
        playAmount: playAmount,
        minPlayAmount: minPlayAmount,
        maxPlayAmount: maxPlayAmount,
        isDisabled: isDisabled,
        adjustPlayAmount: adjustPlayAmount,
        onChangeAmount: onChangeAmount,
        onBlurAmount: onBlurAmount,
        currentCurrency: currentCurrency,
        currencies: currencies,
      }),
      jsx(Button, {
        disabled: isDisabled() || !isValidPlayAmount,
        className:
          currentCurrency === Currency.GOLD
            ? styles_button.buttonGold
            : styles_button.buttonSweeps,
        onClick: onPlay,
        children: "Play now",
      }),
    ],
  });
};

var styles_ui = {
  base: "UI-module__base___wThyQ",
  betForm: "UI-module__betForm___hQkYd",
  disabled: "UI-module__disabled___dnZJX",
};

const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
};

const AutoManualPlayProvider = ({ children, config }) => {
  const [mode, setMode] = useState(GAME_MODE.MANUAL);
  const [autoplayState, setAutoplayState] = useState(AUTO_PLAY_STATE.IDLE);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playedRounds, setPlayedRounds] = useState(0);
  const [numberOfPlays, setNumberOfPlays] = useState(Infinity);
  const startAutoplay = useCallback((numPlays) => {
    setMode(GAME_MODE.AUTOPLAY);
    setAutoplayState(AUTO_PLAY_STATE.PLAYING);
    setNumberOfPlays(numPlays);
    setPlayedRounds(0); // Reset when starting autoplay
  }, []);
  const stopAutoplay = useCallback(() => {
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setIsAutoPlaying(false);
  }, []);
  const updateAutoplayState = useCallback(
    (newState) => setAutoplayState(newState),
    [],
  );
  const playManualMode = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
  }, []);
  const resetState = useCallback(() => {
    setMode(GAME_MODE.MANUAL);
    setAutoplayState(AUTO_PLAY_STATE.IDLE);
    setPlayedRounds(0);
    setNumberOfPlays(0);
  }, []);
  const toggleMode = useCallback(() => {
    if (
      config.playOptions.isPlaying ||
      config.playOptions.disabledController ||
      autoplayState === AUTO_PLAY_STATE.PLAYING
    ) {
      return;
    }
    setNumberOfPlays(Infinity);
    setMode((prevMode) =>
      prevMode === GAME_MODE.MANUAL ? GAME_MODE.AUTOPLAY : GAME_MODE.MANUAL,
    );
  }, [autoplayState, config.playOptions]);
  const contextValue = useMemo(
    () => ({
      mode,
      config,
      manual: { playManualMode },
      autoPlay: {
        state: autoplayState,
        playedRounds,
        numberOfPlays,
        isActive: isAutoPlaying,
        start: startAutoplay,
        stop: stopAutoplay,
        updateState: updateAutoplayState,
        setIsActive: setIsAutoPlaying,
        setPlayedRounds,
        setNumberOfPlays,
        setState: setAutoplayState,
      },
      reset: resetState,
      toggleMode,
    }),
    [
      mode,
      config,
      playManualMode,
      autoplayState,
      playedRounds,
      numberOfPlays,
      isAutoPlaying,
      startAutoplay,
      stopAutoplay,
      updateAutoplayState,
      resetState,
      toggleMode,
    ],
  );
  return jsxs(AutoManualPlayStateContext.Provider, {
    value: contextValue,
    children: [
      typeof children === "function" ? children(contextValue) : children,
      config.playOptions.displayController &&
        jsxs("div", {
          className: cx(styles_ui.base, styles_ui.betForm),
          style: {
            "--play-top": config.panel.top,
            "--play-panel-bg": hexToRgb(config.panel.bgColorHex ?? "#01243A"),
          },
          children: [
            jsx(InputWithIcon, {
              value: numberOfPlays === Infinity ? 0 : numberOfPlays,
              type: "number",
              onChange: (e) => setNumberOfPlays(Number(e.currentTarget.value)),
              placeholder: "Number of Plays",
              min: 0,
              disabled:
                config.playOptions.disabledController ||
                mode === GAME_MODE.MANUAL,
              currency: config.currencyOptions.currentCurrency,
              switcherConfig: {
                onSwitch: toggleMode,
                isPlaying: isAutoPlaying || config.playOptions.isPlaying,
                enabled: mode !== GAME_MODE.MANUAL,
                currency: config.currencyOptions.currentCurrency,
                disabled:
                  config.playOptions.disabledController ||
                  autoplayState === AUTO_PLAY_STATE.PLAYING,
              },
              children: jsx("span", {
                className: cx({
                  [styles_ui.disabled]:
                    mode !== GAME_MODE.AUTOPLAY ||
                    numberOfPlays !== Infinity ||
                    autoplayState === AUTO_PLAY_STATE.PLAYING,
                }),
                children: `∞`,
              }),
            }),
            mode === GAME_MODE.MANUAL
              ? jsx(ManualPlayController, {})
              : jsx(AutoPlayController, {}),
          ],
        }),
    ],
  });
};

export { AUTO_PLAY_STATE, AutoManualPlayProvider, GAME_MODE };
//# sourceMappingURL=index.mjs.map
