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
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

interface Column {
  id: "name" | "email" | "phone" | "premium" | "bidAmount";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "name", label: "Customer name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "phone", label: "Phone", minWidth: 100 },
  { id: "premium", label: "Premimun", minWidth: 100 },
  { id: "bidAmount", label: "Max/Min bid", minWidth: 100 },
];
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "89vh",
  },
  row: {
    cursor: "pointer",
  },
  skeleton: {
    marginLeft: 30,
    marginRight: 30,
  },
});
interface Props {
  history: any;
}

const ListCustomers: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = useState<any>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const viewCustomersDetails = (event: any) => {
    const record = rows[event.currentTarget.rowIndex - 1];
    history.push("/customer-details", record);
  };
  const toggleBidAmount = () => {
    setRows(createListData(rows, !toggle));
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const request: any = await fetch(
        "https://intense-tor-76305.herokuapp.com/merchants"
      );
      const result = await request.json();
      setRows(createListData(result, toggle));
    })();
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper className={classes.root}>
      <Backdrop open={rows.length > 0 ? false : true}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
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
                rows.slice(page * 10, page * 10 + 10).map((row: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      className={classes.row}
                      tabIndex={-1}
                      key={row.id}
                      onClick={viewCustomersDetails}
                    >
                      {columns.map((column) => {
                        const value =
                          column.id === "bidAmount" ? (
                            toggle ? (
                              row["minBid"]
                            ) : (
                              row["maxBid"]
                            )
                          ) : column.id !== "name" ? (
                            row[column.id]
                          ) : (
                            <Box display="flex" alignItems="center">
                              <Avatar alt="Remy Sharp" src={row["avatarUrl"]} />
                              &nbsp;&nbsp;&nbsp;
                              {row[column.id]}
                            </Box>
                          );

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
        {rows.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rows.length}
            rowsPerPage={10}
            page={page}
            onChangePage={handleChangePage}
          />
        )}
      </div>
    </Paper>
  );
};
export default ListCustomers;
