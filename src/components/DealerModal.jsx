/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createDealer, updateDealer } from "../service/dealerService";

// Validation schema
const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const DealerModal = ({ open, handleClose, user, isEdit, refetch }) => {
  const initialValues = {
    name: user ? user.name : "",
    email: user ? user.email : "",
  };

  const handleSubmit = async (values) => {
    if (isEdit) {
      try {
        const response = await updateDealer(user.id, values);
        await refetch();
        alert("User updated successfully");
        console.log("User edited:", response);
      } catch (error) {
        alert("Failed to update user");
        console.error(error);
      }
    } else {
      try {
        const response = await createDealer({ ...values, role: "dealer" });
        await refetch();
        alert("User created successfully");
        console.log("User submitted:", response);
      } catch (error) {
        console.error(error);
        alert("Failed to create user");
      }
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{isEdit ? "Edit Dealer" : "Add New Dealer"}</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Stack spacing={2}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {isEdit ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DealerModal;
