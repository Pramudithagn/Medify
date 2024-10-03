import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Autocomplete,
  Avatar,
  useTheme,
  IconButton,
  Switch,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  // setDoctors,
  getDoctors,
  createNewDoctor,
  updateDoctor,
  deleteDoctor,
  setSelectedDoctor,
  clearSelectedDoctor,
} from "../../features/doctorSlice";
import {
  mockDataDoctors,
  mockPatientIds,
  mockTreatmentIds,
} from "../../data/mockData";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { fetchTreatments } from "../../features/treatmentSlice";
import { fetchPatients } from "../../features/patientSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mail: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  assignedDate: Yup.date().required("Assigned date is required"),
  specialization: Yup.string().required("Specialization is required"),
  address: Yup.object().shape({street: Yup.string().required("Street is required"),houseNumber: Yup.string().required("House number is required"),zipCode: Yup.string().required("Zip code is required"),}),
  treatmentIds: Yup.array().of(Yup.string()).required("At least one treatment ID is required"),
  patientIds: Yup.array().of(Yup.string()).required("At least one patient ID is required"),
});

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport slotProps={{ tooltip: { title: "Export data" } }} />
    </GridToolbarContainer>
  );
}

const Doctors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { userRole } = JSON.parse(localStorage.getItem("userDetails")) || {};
  // const userRole = "PATIENT";
  // const { doctors, selectedDoctor } = useSelector((state) => state.doctor);
  const { doctors, selectedDoctor, loading } = useSelector(
    (state) => state.doctor
  );
  const { treatments } = useSelector((state) => state.treatment);
  const { patients } = useSelector((state) => state.patient);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
  const [isUuidDeleted, setIsUuidDeleted] = useState(false);

  // const isAdmin = true;
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    dispatch(getDoctors());
    dispatch(fetchTreatments());
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleOpen = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearSelectedDoctor());
  };

  const handleSave = (values) => {
    dispatch(updateDoctor(values));
    handleClose();
  };

  const handleDeleteOpen = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setIsUuidDeleted(false);
    setDeleteButtonEnabled(false);
    dispatch(clearSelectedDoctor());
  };

  const handleDelete = () => {
    dispatch(deleteDoctor(selectedDoctor.id));
    handleDeleteClose();
  };

  const handleSwitchChange = (event) => {
    setIsUuidDeleted(!!event.target.checked);
    setDeleteButtonEnabled(!!event.target.checked);
  };

  const columns = [
    ...(userRole === "ADMIN" ? [{ field: "id", headerName: "ID", flex: 0.25 }] : []),
    // { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "mail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" ml="3%" pt="2%">
          <IconButton
            aria-label="view"
            onClick={() => handleOpen(params.row)}
            sx={{ color: colors.grey[400], marginRight: 2 }}
          >
            <VisibilityIcon />
          </IconButton>
          {userRole === "ADMIN" && (
            <IconButton
            aria-label="delete"
            onClick={() => handleDeleteOpen(params.row)}
            sx={{ color: colors.grey[400] }}
          >
            <DeleteIcon />
          </IconButton>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="DOCTORS" subtitle="List of doctors" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.blueAccent[700]} !important`,borderBottom: "none",},
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400], },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700], },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important`,},
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important`,},
        }}
      >
        {/* <DataGrid
          rows={doctors}
          columns={columns}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
        /> */}
        {loading ? (
          // Skeleton loading state
          <Box>
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} height={50} sx={{ bgcolor: colors.primary[400], mb: 1 }} />
            ))}
          </Box>
        ) : (
          <DataGrid
            rows={doctors}
            columns={columns}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
          />
        )}
      </Box>

      {/* Details Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 600,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiTextField-root": {
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: colors.grey[500] },
                "&.Mui-focused fieldset": { borderColor: colors.grey[400] },
                "&.Mui-disabled fieldset": { borderColor: colors.grey[300] },
                "&.Mui-disabled .MuiInputBase-input": {
                  WebkitTextFillColor: `${colors.grey[300]} !important`, }, },
              "& .MuiInputLabel-root": { color: colors.grey[200] },
              "& .MuiInputLabel-root.Mui-focused": { color: colors.grey[500] },
              "& .MuiInputLabel-root.Mui-disabled": { color: colors.grey[300] },
              mt: 2,
            },
          }}
        >
          <Typography variant="h3" padding={1} align="center">
            Doctor Details
          </Typography>
          {selectedDoctor && (
            <Formik
              initialValues={selectedDoctor}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ values, handleChange, setFieldValue, errors, touched }) => (
                <Form>
                <Box display="flex" alignItems="center" gap={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar src={values.photo} alt={values.name} sx={{ width: 80, height: 80 }} />
                    </Box>
                  <Box display="flex" flexDirection="column" flexGrow={1}>
                    <TextField
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                    label="Email"
                    name="mail"
                    value={values.mail}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={!isAdmin}
                    error={touched.mail && Boolean(errors.mail)}
                    helperText={touched.mail && errors.mail}
                  />
                  </Box>
                </Box>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={!isAdmin}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <TextField
                    label="Assigned Date"
                    // type="date"
                    type="datetime-local"
                    name="assignedDate"
                    value={values.assignedDate ? values.assignedDate : ""}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                    disabled={!isAdmin}
                    error={touched.assignedDate && Boolean(errors.assignedDate)}
                    helperText={touched.assignedDate && errors.assignedDate}
                  />
                  <TextField
                    label="Specialization"
                    name="specialization"
                    value={values.specialization}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={!isAdmin}
                    error={ touched.specialization && Boolean(errors.specialization)}
                    helperText={touched.specialization && errors.specialization}
                  />
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Street"
                      name="address.street"
                      value={values.address.street || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={ touched.address?.street && Boolean(errors.address?.street) }
                      helperText={ touched.address?.street && errors.address?.street }
                    />
                    <TextField
                      label="House Number"
                      name="address.houseNumber"
                      value={values.address.houseNumber || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={ touched.address?.houseNumber && Boolean(errors.address?.houseNumber) }
                      helperText={ touched.address?.houseNumber && errors.address?.houseNumber }
                    />
                    <TextField
                      label="Zip Code"
                      name="address.zipCode"
                      value={values.address.zipCode || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={ touched.address?.zipCode && Boolean(errors.address?.zipCode) }
                      helperText={ touched.address?.zipCode && errors.address?.zipCode }
                    />
                  </Box>
                  <TextField
                    label="Treatment"
                    name="treatmentName"
                    value={values.treatmentIds
                      .map((id) => treatments.find((treatment) => treatment.id === id) ?.name || "" )
                      .join(", ")}
                    fullWidth
                    size="small"
                    disabled={true}
                  />
                  {/* <Box>
                    <Autocomplete
                      multiple
                      disabled={!isAdmin}
                      options={values.patientIds
                        .map((id) => patients.find((p) => p.id === id))
                        .filter(Boolean)}
                      getOptionLabel={(option) => option.name?.toString()}
                      value={values.patientIds.map(
                        (id) => patients.find((p) => p.id === id) || ""
                      )}
                      onChange={(event, newValue) => {
                        const selectedPatientIds = newValue.map(
                          (patient) => patient.id
                        );
                        setFieldValue("patientIds", selectedPatientIds);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Patients"
                          fullWidth
                          size="small"
                          disabled={!isAdmin}
                          error={
                            touched.patientIds && Boolean(errors.patientIds)
                          }
                          helperText={touched.patientIds && errors.patientIds}
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                    />
                    <Box display="flex" alignItems="center" mt={1} ml={1}>
                      <ErrorOutlineIcon
                        sx={{ color: "red", fontSize: 16, mr: 0.5 }}
                      />
                      <Typography
                        variant="caption"
                        fontSize={10}
                        sx={{ color: colors.redAccent[300] }}
                      >
                        You can only remove one at a time
                      </Typography>
                    </Box>
                  </Box> */}
                  <Box>
                    {isAdmin ? (
                      <Autocomplete
                        multiple
                        disabled={!isAdmin}
                        options={values.patientIds
                          .map((id) => patients.find((p) => p.id === id))
                          .filter(Boolean)}
                        getOptionLabel={(option) => option.name?.toString()}
                        value={values.patientIds.map(
                          (id) => patients.find((p) => p.id === id) || "" )}
                        onChange={(event, newValue) => {
                          const selectedPatientIds = newValue.map( (patient) => patient.id );
                          setFieldValue("patientIds", selectedPatientIds);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Patients"
                            fullWidth
                            size="small"
                            disabled={!isAdmin}
                            error={ touched.patientIds && Boolean(errors.patientIds) }
                            helperText={touched.patientIds && errors.patientIds}
                          />
                        )}
                        isOptionEqualToValue={(option, value) => option.id === value.id }
                      />
                    ) : (
                      <TextField
                        label="Patients"
                        name="patientIds"
                        value={values.patientIds
                          .map(
                            (id) => patients.find((patient) => patient.id === id)?.name || "")
                          .join(", ")}
                        fullWidth
                        size="small"
                        disabled={true}
                        error={touched.patientIds && Boolean(errors.patientIds)}
                        helperText={touched.patientIds && errors.patientIds}
                      />
                    )}
                    {isAdmin && (
                      <Box display="flex" alignItems="center" mt={1} ml={1}>
                        <ErrorOutlineIcon sx={{ color: "red", fontSize: 16, mr: 0.5 }} />
                        <Typography
                          variant="caption"
                          fontSize={10}
                          sx={{ color: colors.redAccent[300] }}
                        >
                          You can only remove one at a time
                        </Typography>
                      </Box>
                    )}
                  </Box>


                  <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    {isAdmin && (
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Save
                      </Button>
                    )}
                    <Button sx={{ backgroundColor: colors.grey[600] }} onClick={handleClose} >
                      Close
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteOpen} onClose={handleDeleteClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ color: colors.redAccent[500] }}>
            Warning !
          </Typography>
          <Typography variant="h6" align="center" color="text.primary">
            Please make sure that this user have been completely removed from
            the user authentication system first. Are you sure you want to
            delete this doctor ?
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Switch
              checked={isUuidDeleted}
              onChange={handleSwitchChange}
              color="secondary"
            />
            <Typography>Enable to confirm delete</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={!deleteButtonEnabled}
            >
              Delete
            </Button>
            <Button
              onClick={handleDeleteClose}
              sx={{ backgroundColor: colors.grey[600], }}
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Doctors;
