import { jsx as _jsx } from "react/jsx-runtime";
import cx from "classnames";
import style_chevron from "./ChevronIcon.module.scss";
const ChevronIcon = ({ open, disabled }) => {
  return _jsx("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    children: _jsx("path", {
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
export default ChevronIcon;
//# sourceMappingURL=ChevronIcon.js.map
