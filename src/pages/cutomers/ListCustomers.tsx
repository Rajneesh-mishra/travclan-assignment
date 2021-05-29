import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { createListData } from "./customerListHelper";
import { FormControlLabel, Switch } from "@material-ui/core";

interface Column {
  id: "name" | "email" | "phone" | "hasPremium" | "bidAmount";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "name", label: "Customer name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "phone", label: "Phone", minWidth: 100 },
  { id: "hasPremium", label: "Premimun", minWidth: 100 },
  { id: "bidAmount", label: "Max/Min bid", minWidth: 100 },
];
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "89vh",
  },
});

export default function ListCustomers() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = useState<any>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const toggleBidAmount = () => {
    setRows(createListData(rows, !toggle));
    setToggle((prev) => !prev);
  };
  const fetchCustomers = async () => {
    const request: any = await fetch(
      "https://intense-tor-76305.herokuapp.com/merchants"
    );
    const result = await request.json();
    setRows(createListData(result, toggle));
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id !== "bidAmount" ? (
                    column.label
                  ) : (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={toggle}
                          onChange={toggleBidAmount}
                          name="checkedA"
                        />
                      }
                      labelPlacement="start"
                      label={toggle ? "Min bid" : "Max bid"}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value =
                          column.id === "bidAmount"
                            ? toggle
                              ? row["minBid"]
                              : row["maxBid"]
                            : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
