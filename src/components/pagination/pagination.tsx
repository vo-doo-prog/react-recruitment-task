import React, { memo } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

import styles from "./pagination.module.css";

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: ReactPaginateProps["onPageChange"];
}

export const Pagination: React.FC<PaginationProps> = memo(
  ({ pageCount, currentPage, onPageChange }) => {
    return (
      <ReactPaginate
        className={styles.paginationContainer}
        breakClassName={styles.breakItem}
        activeClassName={styles.activeItem}
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        forcePage={currentPage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    );
  }
);
