import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  fetchRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  setSelectedRecord,
  setCreateModelOpen,
  setEditModelOpen,
  setDeleteModelOpen,
  setFilterText,
  setCurrentPage,
  setRecordsPerPage,
} from "../../features/recordSlice";
import {
  mockDataRecords,
  mockPatientIds,
  mockTreatmentIds,
} from "../../data/mockData";
import { fetchTreatments } from "../../features/treatmentSlice";
import { fetchPatients } from "../../features/patientSlice";
import { getDoctors } from "../../features/doctorSlice";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 400,
};

const recordValidationSchema = Yup.object().shape({
  diagnosis: Yup.string().required("Diagnosis is required"),
  prescription: Yup.string().required("Prescription is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  patientId: Yup.number().required("Patient is required"),
  treatmentIds: Yup.array().min(1, "At least one treatment is required"),
});

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userRole, id } =
    JSON.parse(localStorage.getItem("userDetails")) || {};

  const dispatch = useDispatch();
  const {
    records,
    selectedRecord,
    createModelOpen,
    editModelOpen,
    deleteModelOpen,
    filterText,
    currentPage,
    recordsPerPage,
    loading,
  } = useSelector((state) => state.record);
  const { treatments } = useSelector((state) => state.treatment);
  const { patients } = useSelector((state) => state.patient);
  const { doctors } = useSelector((state) => state.doctor);

  React.useEffect(() => {
    dispatch(fetchRecords({ userRole, id }));
    dispatch(fetchTreatments());
    dispatch(fetchPatients());
    dispatch(getDoctors());
  }, [dispatch]);

  const handleEditOpen = (record) => {
    dispatch(setSelectedRecord(record));
    dispatch(setEditModelOpen(true));
  };

  const handleDeleteOpen = (record) => {
    dispatch(setSelectedRecord(record));
    dispatch(setDeleteModelOpen(true));
  };

  const handleCreateOpen = () => {
    dispatch(setCreateModelOpen(true));
  };

  const handleEditSave = (values) => {
    dispatch(updateRecord(values))
      .unwrap()
      .then(() => {
        dispatch(setEditModelOpen(false));
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteRecord(selectedRecord.id))
      .unwrap()
      .then(() => {
        dispatch(setDeleteModelOpen(false));
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  const handleFilterChange = (e) => {
    dispatch(setFilterText(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleRecordsPerPageChange = (e) => {
    dispatch(setRecordsPerPage(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleCreateRecord = (values, { resetForm }) => {
    dispatch(addRecord({ ...values, doctorId: id }))
      .unwrap()
      .then(() => {
        resetForm();
        dispatch(setCreateModelOpen(false));
      })
      .catch((error) => {
        console.error("Error creating record:", error);
      });
  };

  const filteredRecords = records?.filter(
    (record) =>
      record.diagnosis?.toLowerCase().includes(filterText.toLowerCase()) ||
      record.prescription?.toLowerCase().includes(filterText.toLowerCase()) ||
      record.doctorId?.toString().includes(filterText) ||
      record.patientId?.toString().includes(filterText) ||
      record.treatmentIds?.includes(filterText) ||
      record.price?.toString().includes(filterText) ||
      record.assignDate?.toString().includes(filterText)
  );

  const paginatedRecords = filteredRecords?.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(filteredRecords?.length / recordsPerPage);

  return (
    <Box m="20px">
      <Header title="MEDICAL RECORDS" subtitle="Manage your medical records" />
      <Box m="20px" p={2} sx={{ borderRadius: 2, maxHeight: "77vh" }}>
        {/* Header Bar*/}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ borderBottom: `1px solid ${colors.grey[700]}` }}
          mb={2}
          pb={2}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Search records"
              variant="outlined"
              size="small"
              value={filterText}
              onChange={handleFilterChange}
              sx={{ backgroundColor: colors.primary[400], borderRadius: 1 }}
            />
            <SearchIcon sx={{ marginLeft: 1 }} />
          </Box>
          <Box>
            {userRole === "DOCTOR" && (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleCreateOpen}
              >
                + Create Record
              </Button>
            )}
          </Box>
        </Box>

        {/* Record List and Detials*/}

        <Box sx={{ overflowY: "auto", maxHeight: "55vh" }}>
          {loading
            ? Array.from(new Array(5)).map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    mr: 2,
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: colors.primary[400],
                  }}
                >
                  <CardContent>
                    <Skeleton animation="wave" height={40} width="80%" />
                    <Skeleton animation="wave" height={40} width="90%" />
                    <Skeleton animation="wave" height={40} width="60%" />
                  </CardContent>
                </Card>
              ))
            : paginatedRecords?.map((record) => {
                // patient name find
                const patient = patients.find((p) => p.id === record.patientId);
                const patientName = patient ? patient.name : "Unknown";

                // doctor name find
                const doctor = doctors.find((d) => d.id === record.doctorId);
                const doctorName = doctor ? doctor.name : "Unknown";

                //treatment names find
                const treatmentNames = record.treatmentIds
                  .map((treatmentId) => {
                    const treatment = treatments.find(
                      (t) => t.id === treatmentId
                    );
                    return treatment ? treatment.name : "Unknown";
                  })
                  .join(", ");

                return (
                  <Card
                    key={record.id}
                    sx={{
                      mr: 2,
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: colors.primary[400],
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        maxHeight: "23vh",
                      }}
                    >
                      {/* Record Details */}
                      <Box sx={{ width: "90%", pt: 2 }}>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid size={12}>
                            <Typography variant="h5">
                              <strong>Diagnosis:</strong>{" "}
                              <em>{record.diagnosis}</em>
                            </Typography>
                          </Grid>
                          <Grid size={12}>
                            <Typography variant="h5">
                              <strong>Prescription:</strong>{" "}
                              <em>{record.prescription}</em>
                            </Typography>
                          </Grid>
                          <Grid size={12}>
                            <Typography variant="h5">
                              <strong>Treatments:</strong>{" "}
                              <em>{treatmentNames}</em>
                            </Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography variant="h5">
                              <strong>Doctor:</strong> <em>{doctorName}</em>
                            </Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography variant="h5">
                              <strong>Patient:</strong> <em>{patientName}</em>
                            </Typography>
                          </Grid>
                          <Grid size={12}>
                            <Divider sx={{ width: "65%" }} />
                          </Grid>
                          <Grid size={6}>
                            <Typography variant="h5">
                              <strong>Price:</strong> <em>{record.price}</em>
                            </Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography variant="h5">
                              <strong>Date:</strong>{" "}
                              <em>
                                {dayjs(record.assignDate).format("MM-DD-YYYY")}
                              </em>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      {userRole !== "PATIENT" && (
                        <Box sx={{ width: "10%" }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEditOpen(record)}
                              color="secondary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDeleteOpen(record)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            padding: 2,
            borderTop: `1px solid ${colors.grey[700]}`,
          }}
        >
          <Box>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Records per page</InputLabel>
              <Select
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
                label="Records per page"
              >
                {[2, 5, 10, 15].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() =>
                dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))
              }
              disabled={currentPage === 1}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              {currentPage} of {totalPages}
            </Typography>
            <IconButton
              onClick={() =>
                dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
              }
              disabled={currentPage === totalPages}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Create Record Modal */}
      <Modal
        open={createModelOpen}
        onClose={() => dispatch(setCreateModelOpen(false))}
      >
        <Box sx={{ ...modalStyle, backgroundColor: colors.primary[400] }}>
          <Typography variant="h2" padding={3} align="center">
            Create New Record
          </Typography>
          <Formik
            initialValues={{
              diagnosis: "",
              prescription: "",
              price: "",
              doctorId: "",
              patientId: "",
              treatmentIds: [],
            }}
            validationSchema={recordValidationSchema}
            onSubmit={handleCreateRecord}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              touched,
              errors,
              setFieldValue,
            }) => (
              <Form>
                <TextField
                  label="Diagnosis"
                  name="diagnosis"
                  value={values.diagnosis}
                  onChange={handleChange}
                  error={touched.diagnosis && Boolean(errors.diagnosis)}
                  helperText={touched.diagnosis && errors.diagnosis}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Prescription"
                  name="prescription"
                  value={values.prescription}
                  onChange={handleChange}
                  error={touched.prescription && Boolean(errors.prescription)}
                  helperText={touched.prescription && errors.prescription}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel id="patient-select-label">Patient</InputLabel>
                  <Select
                    labelId="patient-select-label"
                    id="patient-select"
                    name="patientId"
                    value={values.patientId}
                    onChange={handleChange}
                    error={touched.patientId && Boolean(errors.patientId)}
                    renderValue={(selected) => {
                      const selectedPatient = patients.find(
                        (patient) => patient.id === selected
                      );
                      return selectedPatient ? selectedPatient.name : "";
                    }}
                  >
                    {patients.map((patient) => (
                      <MenuItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.patientId && errors.patientId && (
                    <Typography color="error">{errors.patientId}</Typography>
                  )}
                </FormControl>

                <Autocomplete
                  multiple
                  options={treatments}
                  getOptionLabel={(option) => option.name.toString()}
                  value={values.treatmentIds.map(
                    (id) => treatments.find((t) => t.id === id) || ""
                  )}
                  onChange={(event, newValue) => {
                    const selectedTreatmentIds = newValue.map(
                      (treatment) => treatment.id
                    );
                    setFieldValue("treatmentIds", selectedTreatmentIds);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Treatments"
                      placeholder="Select treatments"
                      error={
                        touched.treatmentIds && Boolean(errors.treatmentIds)
                      }
                      helperText={touched.treatmentIds && errors.treatmentIds}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />

                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ width: "50%", ml: "25%" }}
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Edit Record Modal */}
      <Modal
        open={!!editModelOpen}
        onClose={() => dispatch(setEditModelOpen(false))}
      >
        <Box p={4} sx={{ ...modalStyle, backgroundColor: colors.primary[400] }}>
          {selectedRecord && (
            <Formik
              initialValues={
                selectedRecord || {
                  diagnosis: selectedRecord.diagnosis || "",
                  prescription: selectedRecord.prescription || "",
                  price: selectedRecord.price || "",
                  treatmentIds: selectedRecord.treatmentIds || [],
                }
              }
              validationSchema={recordValidationSchema}
              onSubmit={(values) => {
                handleEditSave(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
              }) => (
                <Form>
                  <TextField
                    label="Diagnosis"
                    name="diagnosis"
                    value={values.diagnosis}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.diagnosis && Boolean(errors.diagnosis)}
                    helperText={touched.diagnosis && errors.diagnosis}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Prescription"
                    name="prescription"
                    value={values.prescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.prescription && Boolean(errors.prescription)}
                    helperText={touched.prescription && errors.prescription}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    fullWidth
                    margin="normal"
                  />
                  <Typography variant="h6" mt={1}>
                    Treatments
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <FieldArray name="treatmentIds">
                    {() => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          maxHeight: "150px",
                          overflowY: "auto",
                          marginBottom: 2,
                        }}
                      >
                        {treatments.map((treatment) => (
                          <Box
                            key={treatment.id}
                            sx={{
                              width: "calc(45% - 16px)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.treatmentIds.includes(
                                    treatment.id
                                  )}
                                  onChange={() => {
                                    const newTreatmentIds =
                                      values.treatmentIds.includes(treatment.id)
                                        ? values.treatmentIds.filter(
                                            (id) => id !== treatment.id
                                          )
                                        : [
                                            ...values.treatmentIds,
                                            treatment.id,
                                          ];
                                    setFieldValue(
                                      "treatmentIds",
                                      newTreatmentIds
                                    );
                                  }}
                                />
                              }
                              label={treatment.name}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </FieldArray>
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    sx={{ width: "50%", ml: "25%" }}
                  >
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteModelOpen}
        onClose={() => dispatch(setDeleteModelOpen(false))}
      >
        <Box
          p={4}
          sx={{
            ...modalStyle,
            backgroundColor: colors.primary[400],
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: colors.redAccent[500] }}>
            Warning !
          </Typography>
          <Typography>Are you sure you want to delete this record?</Typography>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{ backgroundColor: colors.redAccent[600], width: "50%" }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch(setDeleteModelOpen(false))}
            sx={{ backgroundColor: colors.grey[600], width: "50%" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Records;

//===============================================================================================================================================
