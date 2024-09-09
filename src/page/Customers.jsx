import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import CustomerModal from "../components/CustomerModal";
import { deleteCustomer, getCustomers } from "../service/customerService";

const Customers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // Pagination: page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Pagination: rows per page

  const fetchCustomers = async () => {
    const response = await getCustomers({ page: page + 1, limit: rowsPerPage });
    const data = response.data.data;
    setUsers(data);
  };

  useEffect(() => {
    try {
      fetchCustomers();
    } catch (error) {
      console.log(error);
      alert("Failed to fetch users");
    }
  }, [page, rowsPerPage]);

  const handleAddCustomer = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setOpenModal(true);
  };

  const handleEditCustomer = (user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleDeleteCustomer = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCustomer(selectedUser.id);
      alert("User deleted successfully");
      console.log("User deleted:", selectedUser.id);
      fetchCustomers();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        width: "65vw",
        padding: "0px 30px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Customers
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddCustomer}>
          Add New Customer
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditCustomer(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteCustomer(user)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add/Edit User Modal */}
      <CustomerModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        user={selectedUser}
        isEdit={isEdit}
        refetch={fetchCustomers}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        handleDelete={handleConfirmDelete}
        userName={selectedUser ? selectedUser.name : ""}
      />
    </Box>
  );
};

export default Customers;
