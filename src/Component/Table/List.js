import {  Add,  Edit,  RemoveRedEye } from "@mui/icons-material";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { replace } from "../../app/HelperFunction";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
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
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [filteredData, setFilteredData] = useState();
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = useState({})

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //console.log(totalItems,"totalItems")

  useEffect(() => {
    setApiParam({
      pageNo: page + 1,
      pageSize: rowsPerPage,
      searchOn: "name",
      searchValue: "",
      filter: filter

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
      filter: filter
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  }



  return (
    <Card>
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item sm={4}>
          {showAdd && (
            <Button
              variant="text"
              onClick={onAdd}
              className="text-button"
              sx={{ mx: "auto", borderRadius: "20px" }}
            >
              <Add /> {buttonLabel}
            </Button>
          )}
        </Grid>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Type and click Search icon"
              inputProps={{ 'aria-label': 'Search' }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Tooltip title="Filter">
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleOpen}>
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Search and Filter">
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableBody-root .MuiTableRow-root:hover": {
            color: "#0171a3",
            borderLeft: "3px solid",
          },
        }}
        aria-label="simple table"
        className="tablePadding"
      >
        <TableHead>
          <TableRow>
            {meta?.thead?.map((head) => (
              <TableCell key={head.label}>{head.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((row) => (
            <TableRow key={row.id} >
              {meta?.tbody?.map((col) => (
                <TableCell key={col.key}>
                  {col.key !== "thumbnailPath" ? (
                    col.key === "actionButoon" ? (
                      <>
                      <div style={{ display: 'flex' }}>
                        {col?.button?.icon === "Edit" && (
                          <Button
                            variant={col?.button?.variant}
                            color={col?.button?.color}
                            onClick={() => onEdit(row)}
                            size="small"
                          >
                            <Edit />
                          </Button>
                        )}
                        {col?.button?.icon !== "View" && (
                          <Button
                            variant={col?.button?.variant}
                            color={col?.button?.color}
                            onClick={()=>handleView(row.id)}
                            size="small"
                          >
                            <RemoveRedEye />
                          </Button>
                        )}
                        </div>
                      </>
                    ) : col?.replace ? (
                      replace(row[col?.key], ",@,", " ")
                    ) : (
                      row[col?.key]
                    )
                  ) : (
                    <TableCell>
                      <img src={row[col?.key]} style={{ height: "50px", width:"50px", marginLeft: "-15px" }} />
                    </TableCell>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredData?.length > 0 ? (
        <Pagination
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          No Records Available
        </div>
      )}
      <ProductFilter open={open} handleClose={handleClose} setFilter={setFilter} />
    </Card>
  );
};

export default TableList;
