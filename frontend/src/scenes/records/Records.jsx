import React, { useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

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
  const [records, setRecords] = useState(mockDataRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");

  const handleViewOpen = (record) => {
    setSelectedRecord(record);
    setOpenView(true);
  };

  const handleEditOpen = (record) => {
    setSelectedRecord(record);
    setOpenEdit(true);
  };

  const handleDeleteOpen = (record) => {
    setSelectedRecord(record);
    setOpenDelete(true);
  };

  const handleCreateOpen = () => {
    setOpenCreate(true);
  };

  const handleEditSave = () => {
    setRecords(
      records.map((record) =>
        record.id === selectedRecord.id ? selectedRecord : record
      )
    );
    setOpenEdit(false);
  };

  const handleDeleteConfirm = () => {
    setRecords(records.filter((record) => record.id !== selectedRecord.id));
    setOpenDelete(false);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const filteredRecords = records.filter(
    (record) =>
      record.diagnosis.toLowerCase().includes(filterText.toLowerCase()) ||
      record.prescription.toLowerCase().includes(filterText.toLowerCase()) ||
      record.doctorId.toString().includes(filterText) ||
      record.patientId.toString().includes(filterText) ||
      record.treatmentIds.includes(filterText) ||
      record.price.toString().includes(filterText) ||
      record.assignDate.toString().includes(filterText)
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleCreateRecord = (values, { resetForm }) => {
    const newRecord = {
      id: records.length + 1, // ID genera
      ...values,
    };
    setRecords([...records, newRecord]);
    console.log(values);
    resetForm(values);
    setOpenCreate(false);
  };

  return (
    <Box m="20px">
      <Header title="MEDICAL RECORDS" subtitle="Manage your medical records" />
      <Box
        m="20px"
        p={2}
        sx={{
          borderRadius: 2,
          maxHeight: "77vh",
        }}
      >
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
              label="Filter records"
              variant="outlined"
              size="small"
              value={filterText}
              onChange={handleFilterChange}
              sx={{ backgroundColor: colors.primary[400], borderRadius: 1 }}
            />
            <SearchIcon sx={{ marginLeft: 1 }} />
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleCreateOpen}
            >
              + Create Record
            </Button>
          </Box>
        </Box>

        {/* Record List */}
        <Box sx={{ overflowY: "auto", maxHeight: "55vh" }}>
          {paginatedRecords.map((record) => (
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
                {/* Record detials */}
                <Box sx={{ width: "90%", pt: 2 }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid size={12}>
                      <Typography variant="h5">
                        Diagnosis: {record.diagnosis}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="h5">
                        Prescription: {record.prescription}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="h5">
                        Treatments: {record.treatmentIds.join(", ")}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h5">
                        Doctor: {record.doctorId}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h5">
                        Patient: {record.patientId}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Divider sx={{ width: "65%" }} />
                    </Grid>
                    <Grid size={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          paddingTop: 1,
                        }}
                      >
                        <Typography variant="body2">Assigned Date:</Typography>
                        <Typography p={1} pl={3} variant="h5">
                          {/* {record.assignDate} */}
                          {dayjs(record.assignDate).format('YYYY-MM-DD')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          paddingTop: 1,
                        }}
                      >
                        <Typography variant="body2">Price:</Typography>
                        <Typography p={1} pl={2} variant="h5">
                          {record.price}$
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  height={1}
                  sx={{ width: "10%" }}
                >
                  <Tooltip title="Edit Record">
                    <IconButton onClick={() => handleEditOpen(record)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
                    <IconButton onClick={() => handleDeleteOpen(record)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination ted Bar*/}
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
            <Typography variant="body2">Records per page:</Typography>
            <FormControl variant="outlined" size="small">
              <Select
                labelId="records-per-page"
                id="records-per-page-select"
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <IconButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ display: "inline-block", padding: "0 10px" }}
            >
              {currentPage}/{totalPages}
            </Typography>
            <IconButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Create Record Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <Box
          sx={{
            ...modalStyle,
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography
            variant="h2"
            padding={3}
            align="center"
          >
            Create New Record
          </Typography>
          <Formik
            initialValues={{
              diagnosis: "",
              prescription: "",
              treatmentIds: [],
              doctorId: "",
              patientId: "",
              price: "",
              assignDate: new Date(),
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
                  >
                    {mockDataRecords.map((record) => (
                      <MenuItem key={record.patientId} value={record.patientId}>
                        {record.patientId}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.patientId && errors.patientId && (
                    <Typography color="error">{errors.patientId}</Typography>
                  )}
                </FormControl>

                <Autocomplete
                  multiple
                  options={mockTreatmentIds}
                  getOptionLabel={(option) => option}
                  value={values.treatmentIds}
                  onChange={(event, newValue) => {
                    setFieldValue("treatmentIds", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Treatment IDs"
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
                  sx={{
                    width: "50%",
                    ml: "25%",
                  }}
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Edit Record Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box p={4} sx={{ ...modalStyle, backgroundColor: colors.primary[400] }}>
          {selectedRecord && (
            <>
              <TextField
                label="Diagnosis"
                value={selectedRecord.diagnosis}
                onChange={(e) =>
                  setSelectedRecord({
                    ...selectedRecord,
                    diagnosis: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Prescription"
                value={selectedRecord.prescription}
                onChange={(e) =>
                  setSelectedRecord({
                    ...selectedRecord,
                    prescription: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />{" "}
              <TextField
                label="Price"
                type="number"
                value={selectedRecord.price}
                onChange={(e) =>
                  setSelectedRecord({
                    ...selectedRecord,
                    price: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
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
                {mockTreatmentIds.map((treatmentId) => (
                  <Box
                    key={treatmentId}
                    sx={{
                      width: "calc(33.33% - 16px)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedRecord.treatmentIds.includes(
                            treatmentId
                          )}
                          onChange={(e) => {
                            const updatedTreatmentIds = e.target.checked
                              ? [...selectedRecord.treatmentIds, treatmentId]
                              : selectedRecord.treatmentIds.filter(
                                  (id) => id !== treatmentId
                                );
                            setSelectedRecord({
                              ...selectedRecord,
                              treatmentIds: updatedTreatmentIds,
                            });
                          }}
                        />
                      }
                      label={treatmentId}
                    />
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                onClick={handleEditSave}
                color="secondary"
                sx={{
                  width: "50%",
                  ml: "25%",
                }}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          p={4}
          sx={{
            ...modalStyle,
            backgroundColor: colors.primary[400],
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: colors.redAccent[500],
            }}
          >
            Warning !
          </Typography>
          <Typography>Are you sure you want to delete this record?</Typography>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              // color: colors.greenAccent[400]
              backgroundColor: colors.redAccent[600],
              width: "50%",
            }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDelete(false)}
            sx={{
              // color: colors.greenAccent[400]
              backgroundColor: colors.grey[600],
              width: "50%",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Records;
