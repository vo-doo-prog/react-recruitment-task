import React, { memo } from "react";
import { Link, LinkProps } from "react-router-dom";

export interface BreadcrumbItemProps extends LinkProps {
  children: React.ReactNode;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = memo(
  ({ children, ...rest }) => {
    return (
      <li>
        <Link {...rest}>{children}</Link>
      </li>
    );
  }
);
