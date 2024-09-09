/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const DeleteConfirmationDialog = ({
  open,
  handleClose,
  handleDelete,
  userName,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{userName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
