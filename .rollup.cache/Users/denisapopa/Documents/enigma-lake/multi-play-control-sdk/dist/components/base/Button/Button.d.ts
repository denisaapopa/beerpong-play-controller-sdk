import React from "react";
declare const themes: {
  primary: string;
  success: string;
  ghost: string;
};
type Props = React.ComponentProps<"button"> & {
  theme?: (typeof themes)[keyof typeof themes];
};
declare const Button: {
  ({
    disabled,
    className,
    theme,
    ...props
  }: Props): import("react/jsx-runtime").JSX.Element;
  themes: {
    primary: string;
    success: string;
    ghost: string;
  };
};
export default Button;
