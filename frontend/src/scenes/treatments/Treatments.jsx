import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Modal,
  TextField,
  Switch,
  Autocomplete,
  Fab,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDoctorIds } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import {
  setSelectedTreatment,
  setIsCreating,
  setEditModelOpen,
  fetchTreatments,
  createTreatment,
  updateTreatment,
} from "../../features/treatmentSlice";
import { getDoctors } from "../../features/doctorSlice";
import { Formik } from "formik";
import * as Yup from "yup";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          button: { variant: "outlined" },
        }}
      />
    </GridToolbarContainer>
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  doctorIds: Yup.array().notRequired(),
  status: Yup.boolean(),
});

export const Treatments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userRole } = JSON.parse(localStorage.getItem("userDetails")) || {};
  const dispatch = useDispatch();
  const { treatments, selectedTreatment, isCreating, editModelOpen, loading } =
    useSelector((state) => state.treatment);
  const { doctors } = useSelector((state) => state.doctor);

  const [originalDoctorIds, setOriginalDoctorIds] = React.useState([]);
  React.useEffect(() => {
    dispatch(fetchTreatments());
    dispatch(getDoctors());
  }, [dispatch]);

  const handleEditOpen = (treatment) => {
    dispatch(setSelectedTreatment(treatment));
    setOriginalDoctorIds(treatment.doctorIds || []);
    dispatch(setEditModelOpen(true));
  };

  const handleClose = () => {
    dispatch(setSelectedTreatment(null));
    dispatch(setIsCreating(false));
  };

  const handleEditClose = () => {
    dispatch(setSelectedTreatment(null));
    dispatch(setEditModelOpen(false));
    setOriginalDoctorIds([]);
  };

  const handleEditSave = () => {
    let addedDoctorIds = null;
    let removedDoctorIds = null;
    // Find added doctor IDs
    addedDoctorIds = selectedTreatment.doctorIds.filter(
      (id) => !originalDoctorIds.includes(id)
    );
    // Find removed doctor IDs
    removedDoctorIds = originalDoctorIds.filter(
      (id) => !selectedTreatment.doctorIds.includes(id)
    );

    let updatedDoctorIds = [];

    if (addedDoctorIds.length > 0) {
      updatedDoctorIds = addedDoctorIds;
    } else if (removedDoctorIds.length > 0) {
      updatedDoctorIds = removedDoctorIds;
    }

    dispatch(
      updateTreatment({ ...selectedTreatment, doctorIds: updatedDoctorIds })
    );

    dispatch(setSelectedTreatment(null));
    setOriginalDoctorIds([]);
    handleEditClose();
  };

  const handleSave = (values) => {
    const updatedValues = {
      ...values,
      doctorIds: values.doctorIds.map((doctor) => doctor.id),
    };

    dispatch(createTreatment(updatedValues));
    handleClose();
  };

  const handleStatusChange = (event) => {
    dispatch(
      setSelectedTreatment({
        ...selectedTreatment,
        status: event.target.checked,
      })
    );
  };

  const columns = [
    ...(userRole === "ADMIN"
      ? [{ field: "id", headerName: "ID", flex: 0.5 }]
      : []),
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price", type: "number", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (params.row.status ? "Available" : "Unavailable"),
    },
    ...(userRole === "ADMIN"
      ? [
          {
            field: "doctorIds",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <Button
                sx={{ backgroundColor: colors.grey[700] }}
                variant="contained"
                size="small"
                onClick={() => handleEditOpen(params.row)}
              >
                ...
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <Box m="20px">
      <Header title="TREATMENTS" subtitle="Provided treatments by facility" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${colors.blueAccent[700]}  !important`,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiButtonBase-root": { color: `${colors.grey[100]} !important` },
        }}
      >
        {loading ? (
          <Box>
            {[...Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                height={50}
                sx={{ bgcolor: colors.primary[400], mb: 1 }}
              />
            ))}
          </Box>
        ) : (
          <DataGrid
            rows={treatments}
            columns={columns}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
          />
        )}
      </Box>

      {/* Modal  editing treatment */}
      <Modal open={editModelOpen} onClose={handleEditClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: colors.primary[400],
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 500,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: `${colors.greenAccent[600]} !important`,
              "&:hover": {},
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: grey[600],
            },
          }}
        >
          <Typography variant="h2" padding={3} align="center">
            Update Treatment
          </Typography>
          <TextField
            label="Name"
            value={selectedTreatment?.name || ""}
            onChange={(e) =>
              dispatch(
                setSelectedTreatment({
                  ...selectedTreatment,
                  name: e.target.value,
                })
              )
            }
          />
          <TextField
            label="Description"
            value={selectedTreatment?.description || ""}
            onChange={(e) =>
              dispatch(
                setSelectedTreatment({
                  ...selectedTreatment,
                  description: e.target.value,
                })
              )
            }
          />
          <TextField
            label="Price"
            type="number"
            value={selectedTreatment?.price || ""}
            onChange={(e) =>
              dispatch(
                setSelectedTreatment({
                  ...selectedTreatment,
                  price: e.target.value,
                })
              )
            }
          />
          <Autocomplete
            multiple
            options={doctors}
            getOptionLabel={(option) => {
              if (typeof option === "string") return option;
              return option.name || "";
            }}
            value={
              selectedTreatment?.doctorIds.map(
                (id) => doctors.find((doctor) => doctor.id === id) || id
              ) || []
            }
            isOptionEqualToValue={(option, value) =>
              option.id === value || option.id === value.id
            }
            onChange={(event, value) => {
              const selectedDoctorIds = value.map((option) =>
                option.id ? option.id : option
              );
              dispatch(
                setSelectedTreatment({
                  ...selectedTreatment,
                  doctorIds: selectedDoctorIds,
                })
              );
            }}
            renderInput={(params) => <TextField {...params} label="Doctors" />}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>
              Status: {selectedTreatment?.status ? "Available" : "Unavailable"}
            </span>
            <Switch
              checked={selectedTreatment?.status || false}
              onChange={handleStatusChange}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              onClick={handleEditSave}
              sx={{ backgroundColor: colors.greenAccent[600] }}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              onClick={handleEditClose}
              sx={{ backgroundColor: colors.redAccent[600] }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal creating new treatment */}

      <Modal open={isCreating} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: colors.primary[400],
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 500,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: `${colors.greenAccent} !important`,
              "&:hover": {},
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: grey[600],
            },
          }}
        >
          <Typography variant="h2" padding={3} align="center">
            Create New Treatment
          </Typography>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              doctorIds: [],
              status: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  fullWidth
                  sx={{ marginBottom: 2 }}
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
                <Autocomplete
                  multiple
                  options={doctors}
                  getOptionLabel={(option) => option.name || ""}
                  value={values.doctorIds || []}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => {
                    setFieldValue("doctorIds", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Doctor IDs"
                      error={touched.doctorIds && Boolean(errors.doctorIds)}
                      helperText={touched.doctorIds && errors.doctorIds}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography>
                    Status: {values.status ? "Available" : "Unavailable"}
                  </Typography>
                  <Switch
                    checked={values.status}
                    onChange={(event) =>
                      setFieldValue("status", event.target.checked)
                    }
                    name="status"
                    color="secondary"
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={2} mt={3}>
                  <Button variant="contained" type="submit" color="secondary">
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={{ backgroundColor: colors.grey[600] }}
                  >
                    Close
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {userRole === "ADMIN" && (
        <Fab
          color="secondary"
          aria-label="add"
          onClick={() => {
            dispatch(setIsCreating(true));
          }}
          sx={{
            backgroundColor: colors.greenAccent[500],
            position: "fixed",
            bottom: "10%",
            right: "2%",
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

//=====================================================================================================================================================================================================================================
