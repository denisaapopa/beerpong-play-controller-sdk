import React from "react";
type Props = React.ComponentProps<"input"> & {
  max?: number;
};
declare const Input: ({
  onChange,
  disabled,
  className,
  max,
  ...restProps
}: Props) => import("react/jsx-runtime").JSX.Element;
export default Input;
