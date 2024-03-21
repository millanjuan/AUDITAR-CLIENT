import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { getAllUsers } from "../../../../redux/actions";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    margin: "15px",
  },
  header: {
    width: "100%",
    padding: "20px 0",
  },
  headerText: {
    fontSize: "32px",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  body: {
    width: "100%",
    overflowX: "auto",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#c82333",
    },
  },
  tableHeaderCell: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
}));

const ManageUsers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllUsers(token));
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h4" className={classes.header}>
        Administrar Usuarios
      </Typography>
      <div className={classes.body}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Nombre
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Username
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell className={classes.tableHeaderCell}>Rol</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{`${user.name} ${user.lastname}`}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.rol}</TableCell>
                    {user.rol === "client" && (
                      <Button
                        onClick={() => deleteUser(user.id)}
                        className={classes.deleteButton}
                        variant="contained"
                        disableElevation
                      >
                        Eliminar
                      </Button>
                    )}
                    <TableCell></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16, 24, 32]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage=""
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </div>
    </div>
  );
};

export default ManageUsers;
