import React from "react";

import { TablePagination } from "@mui/material";
export const Pagination = ({
  handleChangePage,
  rowsPerPage,
  page,
  handleChangeRowsPerPage,
  totalItems,
}) => {
 
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
      component="div"
      count={totalItems}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
