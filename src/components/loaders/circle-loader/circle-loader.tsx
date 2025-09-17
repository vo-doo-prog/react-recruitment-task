import React, { memo } from "react";

import { clsx } from "../../../utils";
import styles from "./circle-loader.module.css";

export const circleLoaderMinAnimationDuration = 600;

export interface CircleLoaderProps {
  className?: string;
  color?: "currentColor" | string;
  animationDuration?: number;
}

export const CircleLoader: React.FC<CircleLoaderProps> = memo(
  ({ className = "", color = "currentColor", animationDuration = 1000 }) => {
    const duration = Math.max(
      animationDuration,
      circleLoaderMinAnimationDuration
    );

    return (
      <span className={clsx(styles.circleLoaderContainer, className)}>
        <svg
          className={styles.svg}
          width="30"
          height="30"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9296 2.4725C29.8369 1.15026 28.6875 0.144307 27.376 0.335819C21.0933 1.25319 15.2055 4.02291 10.4797 8.31713C5.16012 13.151 1.62283 19.635 0.437854 26.7245C-0.747124 33.814 0.489224 41.0959 3.94768 47.397C7.40614 53.6981 12.8853 58.6513 19.5022 61.4585C26.1192 64.2658 33.4885 64.7635 40.4229 62.8716C47.3572 60.9796 53.4527 56.8082 57.727 51.0294C62.0014 45.2506 64.2058 38.2011 63.9849 31.0167C63.7887 24.6343 61.6887 18.4757 57.9823 13.3206C57.2086 12.2443 55.6865 12.117 54.6713 12.9692V12.9692C53.6561 13.8214 53.5337 15.3298 54.2932 16.4161C57.314 20.7374 59.0241 25.8598 59.1872 31.1642C59.3749 37.2709 57.5012 43.263 53.868 48.175C50.2348 53.087 45.0536 56.6327 39.1595 58.2409C33.2653 59.849 27.0013 59.4259 21.3769 57.0398C15.7525 54.6536 11.0952 50.4434 8.15553 45.0874C5.21584 39.7315 4.16494 33.5419 5.17218 27.5158C6.17941 21.4898 9.1861 15.9783 13.7078 11.8696C17.6353 8.30066 22.5072 5.97058 27.7137 5.13981C29.0227 4.93096 30.0223 3.79474 29.9296 2.4725V2.4725Z"
            fill={color}
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur={duration + "ms"}
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 0 0;360 0 0"
          />
        </svg>
      </span>
    );
  }
);
