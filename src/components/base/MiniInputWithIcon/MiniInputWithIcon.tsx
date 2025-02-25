import cx from "classnames";
import { ComponentProps, PropsWithChildren } from "react";
import { Currency } from "@enigma-lake/zoot-platform-sdk";

import Input from "../Input/Input";

import styles from "./MiniInputWithIcon.module.scss";

export type Props = PropsWithChildren<ComponentProps<"input">> & {
  currency: Currency;
  label?: string;
  max?: number;
  noBorderRadiuses?: boolean;
};

const MiniInputWithIcon = ({
  children,
  disabled,
  currency,
  label,
  className,
  ...restProps
}: Props) => {
  return (
    <div className={cx(styles.base, className)}>
      <span className={cx(styles.label, styles[currency])}>{label}</span>
      <div className={cx(styles.inputGroup)}>
        {children && <div className={cx(styles.icon)}>{children}</div>}
        <Input
          {...restProps}
          className={cx(styles.input, {
            [styles.inputWithLabel]: label !== undefined,
          })}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default MiniInputWithIcon;
