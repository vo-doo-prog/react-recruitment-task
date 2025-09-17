import React, { memo } from "react";

import { clsx } from "../../utils";
import styles from "./alert.module.css";

export interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = memo(({ children, className }) => {
  return (
    <div className={clsx(styles.alertContainer, className)}>{children}</div>
  );
});
