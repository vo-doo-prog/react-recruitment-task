"use client";

import React from "react";

import { clsx } from "../../utils";
import { CircleLoader } from "../loaders";
import styles from "./button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  use?: "solid" | "transparent";
  width?: number | string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  use = "solid",
  width,
  type = "button",
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        styles.button,
        styles[use],
        { [styles.loading]: loading },
        className
      )}
      type={type}
      style={{ width }}
      disabled={loading || disabled}
    >
      {loading ? <CircleLoader className={styles.loader} /> : children}
    </button>
  );
};
