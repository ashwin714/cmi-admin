import { Add, Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  InputBase,
  Divider,
  TableContainer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { replace } from "../../app/HelperFunction";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ProductFilter from "../../Modules/Product/ProductFilter";

const TableList = ({
  data,
  meta,
  totalItems,
  setApiParam,
  buttonLabel,
  onEdit,
  onAdd,
  editButtonShow,
  handleView,
  showAdd,
  handleDelete,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setApiParam({
      pageNo: page + 1,
      pageSize: rowsPerPage,
      searchOn: "name",
      searchValue: "",
      filter: filter,
    });
  }, [page, rowsPerPage, filter]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = () => {
    setApiParam({
      pageNo: page + 1,
      pageSize: rowsPerPage,
      searchOn: "name",
      searchValue: search,
      filter: filter,
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          {showAdd && (
            <Button
              variant="contained"
              onClick={onAdd}
              sx={{ textTransform: "none" }}
              startIcon={<Add />}
            >
              {buttonLabel}
            </Button>
          )}
        </Grid>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <Paper
            component="form"
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "Search" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="button" color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Tooltip title="Filter">
              <IconButton color="primary" onClick={handleOpen}>
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Search and Filter">
              <IconButton color="primary" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={3}
        sx={{
          borderRadius: "1px",
          mt: 3,
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: "65vh" }}>
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableBody-root .MuiTableRow-root:hover": {
                color: "#0171a3",
                borderLeft: "3px solid",
                backgroundColor: "#f5faff",
              },
            }}
            className="tablePadding"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                {meta?.thead?.map((head) => (
                  <TableCell key={head.label}>{head.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((row) => (
                <TableRow key={row.id}>
                  {meta?.tbody?.map((col) => (
                    <TableCell key={col.key}>
                      {col.key !== "thumbnailPath" ? (
                        col.key === "actionButoon" ? (
                          <div style={{ display: "flex", gap: "8px" }}>
                            {col?.button?.icon === "Edit" && (
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() => onEdit(row)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            )}
                            {col?.button?.icon !== "View" && (
                              <>
                                <Button
                                  variant={col?.button?.variant}
                                  color={col?.button?.color}
                                  onClick={() => handleView(row.id)}
                                  size="small"
                                >
                                  <RemoveRedEye />
                                </Button>
                                <Button
                                  variant={col?.button?.variant}
                                  color="error"
                                  onClick={() => handleDelete(row.id)}
                                  size="small"
                                >
                                  <Delete />
                                </Button>
                              </>
                            )}
                          </div>
                        ) : col?.replace ? (
                          replace(row[col?.key], ",@,", " ")
                        ) : (
                          row[col?.key]
                        )
                      ) : (
                        <img
                          src={row[col?.key]}
                          alt=""
                          style={{
                            height: "50px",
                            width: "50px",
                          }}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {filteredData?.length > 0 ? (
        <Pagination
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : (
        <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
          No Records Available
        </div>
      )}

      <ProductFilter
        open={open}
        handleClose={handleClose}
        setFilter={setFilter}
      />
    </Card>
  );
};

export default TableList;
