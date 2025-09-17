import React, { memo } from "react";

import styles from "./breadcrumbs.module.css";

export interface BreadcrumbsProps {
  children: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = memo(({ children }) => {
  return (
    <nav className={styles.breadcrumbsContainer} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbsList}>{children}</ol>
    </nav>
  );
});
