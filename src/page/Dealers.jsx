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
import DealerModal from "../components/DealerModal";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import { deleteDealer, getDealers } from "../service/dealerService";

const Dealers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // for pagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // for pagination

  const fetchDealers = async () => {
    const response = await getDealers({ page: page + 1, limit: rowsPerPage });
    const data = response.data.data;
    setUsers(data);
  };

  useEffect(() => {
    try {
      fetchDealers();
    } catch (error) {
      console.log(error);
      alert("Failed to fetch users");
    }
  }, [page, rowsPerPage]);

  const handleAddUser = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setOpenModal(true);
  };

  const handleEditUser = (user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDealer(selectedUser.id);
      alert("User deleted successfully");
      console.log("User deleted:", selectedUser.id);
      fetchDealers();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          width: "65vw",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Dealers
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Add Dealer
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
                  <TableCell>{user.name || "-"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteUser(user)}
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
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Add/Edit User Modal */}
        <DealerModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          user={selectedUser}
          isEdit={isEdit}
          refetch={fetchDealers}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          handleDelete={handleConfirmDelete}
          userName={selectedUser ? selectedUser.name : ""}
        />
      </Box>
    </>
  );
};

export default Dealers;
