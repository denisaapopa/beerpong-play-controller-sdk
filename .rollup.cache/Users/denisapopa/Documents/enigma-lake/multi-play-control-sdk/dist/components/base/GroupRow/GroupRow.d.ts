import { ComponentProps } from "react";
export type Props = ComponentProps<"div"> & {
  label?: string;
  classNames?: string;
};
declare const GroupRow: ({
  children,
  label,
  classNames,
  ...restProps
}: Props) => import("react/jsx-runtime").JSX.Element;
export default GroupRow;
