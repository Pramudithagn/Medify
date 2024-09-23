// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Switch,
//   Autocomplete,
//   Fab,
//   Typography,
// } from "@mui/material";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarExport,
//   GridToolbarDensitySelector,
// } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataTreatments, mockDoctorIds } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { grey } from "@mui/material/colors";
// import AddIcon from "@mui/icons-material/Add";

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector
//         slotProps={{ tooltip: { title: "Change density" } }}
//       />
//       <Box sx={{ flexGrow: 1 }} />
//       <GridToolbarExport
//         slotProps={{
//           tooltip: { title: "Export data" },
//           button: { variant: "outlined" },
//         }}
//       />
//     </GridToolbarContainer>
//   );
// }

// export const Treatments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [treatments, setTreatments] = useState(mockDataTreatments);
//   const [selectedTreatment, setSelectedTreatment] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);

//   const handleOpen = (treatment) => {
//     setSelectedTreatment(treatment);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setIsCreating(false);
//   };

//   const handleSave = () => {
//     if (isCreating) {
//       // Save new treatment  call backend
//       setTreatments([...treatments, selectedTreatment]);
//     } else {
//       // Update  treatment
//       setTreatments(
//         treatments.map((treatment) =>
//           treatment.id === selectedTreatment.id ? selectedTreatment : treatment
//         )
//       );
//     }
//     setOpen(false);
//   };

//   const handleStatusChange = (event) => {
//     setSelectedTreatment({
//       ...selectedTreatment,
//       status: event.target.checked,
//     });
//   };

//   const handleDoctorIdsChange = (event, value) => {
//     setSelectedTreatment({
//       ...selectedTreatment,
//       doctorIds: value,
//     });
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       flex: 2,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       type: "number",
//       flex: 1,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => (params.row.status ? "Available" : "Unavailable"),
//     },
//     {
//       field: "doctorIds",
//       headerName: "Doctor Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <Button
//           sx={{ backgroundColor: colors.grey[700] }}
//           variant="contained"
//           size="small"
//           onClick={() => handleOpen(params.row)}
//         >
//           ...
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="TREATMENTS" subtitle="List of provided treatments" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: `${colors.blueAccent[700]}  !important`,
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//           "& .MuiButtonBase-root": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={treatments}
//           columns={columns}
//           disableRowSelectionOnClick
//           slots={{
//             toolbar: CustomToolbar,
//           }}
//         />
//       </Box>

//       {/* Modal for editing treatment */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: colors.primary[400],
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 500,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             "& .MuiSwitch-switchBase.Mui-checked": {
//               color: `${colors.greenAccent[600]} !important`,
//               "&:hover": {},
//             },
//             "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//               backgroundColor: grey[600],
//             },
//           }}
//         >
//           <Typography variant="h2" padding={3} align="center">
//             Update Treatment
//           </Typography>

//           <TextField
//             label="Name"
//             value={selectedTreatment?.name || ""}
//             onChange={(e) =>
//               setSelectedTreatment({
//                 ...selectedTreatment,
//                 name: e.target.value,
//               })
//             }
//           />
//           <TextField
//             label="Description"
//             value={selectedTreatment?.description || ""}
//             onChange={(e) =>
//               setSelectedTreatment({
//                 ...selectedTreatment,
//                 description: e.target.value,
//               })
//             }
//           />
//           <TextField
//             label="Price"
//             type="number"
//             value={selectedTreatment?.price || ""}
//             onChange={(e) =>
//               setSelectedTreatment({
//                 ...selectedTreatment,
//                 price: e.target.value,
//               })
//             }
//           />
//           <Autocomplete
//             multiple
//             options={mockDoctorIds}
//             getOptionLabel={(option) => option}
//             value={selectedTreatment?.doctorIds || []}
//             onChange={handleDoctorIdsChange}
//             renderInput={(params) => (
//               <TextField {...params} label="Doctor IDs" />
//             )}
//           />
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <span>
//               Status: {selectedTreatment?.status ? "Available" : "Unavailable"}
//             </span>
//             <Switch
//               checked={selectedTreatment?.status || false}
//               onChange={handleStatusChange}
//             />
//           </Box>
//           <Box display="flex" justifyContent="flex-end" gap={2}>
//             <Button
//               variant="contained"
//               onClick={handleSave}
//               sx={{ backgroundColor: colors.greenAccent[600] }}
//             >
//               Save Changes
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleClose}
//               sx={{ backgroundColor: colors.grey[600] }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* FAB for creating a  treatment */}
//       <Box
//         sx={{
//           "& .MuiFab-root": {
//             backgroundColor: `${colors.greenAccent[600]} !important`,
//           },
//         }}
//       >
//         <Fab
//           color="primary"
//           aria-label="add"
//           sx={{
//             position: "fixed",
//             bottom: "12%",
//             right: "5%",
//           }}
//           onClick={() => {
//             setSelectedTreatment({
//               id: treatments.length + 1,
//               name: "",
//               description: "",
//               price: "",
//               status: false,
//               doctorIds: [],
//             });
//             setIsCreating(true);
//             setOpen(true);
//           }}
//         >
//           <AddIcon />
//         </Fab>
//       </Box>

//       {/* Modal for creating a  treatment */}
//       <Modal open={open && isCreating} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: colors.primary[400],
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 500,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             "& .MuiSwitch-switchBase.Mui-checked": {
//               color: `${colors.greenAccent[600]} !important`,
//               "&:hover": {},
//             },
//             "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//               backgroundColor: grey[600],
//             },
//           }}
//         >
//           <Typography
//             variant="h2"
//             padding={3}
//             align="center"
//           >
//             Create New Treatment
//           </Typography>
//           <TextField
//             label="Name"
//             value={selectedTreatment?.name || ""}
//             onChange={(e) =>
//               setSelectedTreatment({
//                 ...selectedTreatment,
//                 name: e.target.value,
//               })
//             }
//           />
//           <TextField
//             label="Description"
//             value={selectedTreatment?.description || ""}
//             onChange={(e) =>
//               setSelectedTreatment({
//                 ...selectedTreatment,
//                 description: e.target.value,
//               })
//             }
//           />
//           <TextField
//             label="Price"
//             type="number"
//             value={selectedTreatment?.price || ""}
//             onChange={(e) =>
//               setSelectedTreatment({
//                 ...selectedTreatment,
//                 price: e.target.value,
//               })
//             }
//           />
//           <Autocomplete
//             multiple
//             options={mockDoctorIds}
//             getOptionLabel={(option) => option}
//             value={selectedTreatment?.doctorIds || []}
//             onChange={handleDoctorIdsChange}
//             renderInput={(params) => (
//               <TextField {...params} label="Doctor IDs" />
//             )}
//           />
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <span>
//               Status: {selectedTreatment?.status ? "Available" : "Unavailable"}
//             </span>
//             <Switch
//               checked={selectedTreatment?.status || false}
//               onChange={handleStatusChange}
//             />
//           </Box>
//           <Box display="flex" justifyContent="center" gap={2} mb={1}>
//             <Button
//               variant="contained"
//               onClick={handleSave}
//               sx={{ backgroundColor: colors.greenAccent[600] }}
//             >
//               Save
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleClose}
//               sx={{ backgroundColor: colors.grey[600] }}
//             >
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Treatments;

//=====================================================================================================================================================================================================================================

import React, { useCallback, useEffect, useMemo } from "react";
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
  addTreatment,
  editTreatment,
  deleteTreatment,
  setTreatments,
  fetchTreatments,
  updateTreatmentThunk,
  createTreatment,
  updateTreatment,
} from "../../features/treatmentSlice";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { getAllTreatments } from "../../controllers/treatments.controller";

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
  // doctorIds: Yup.array().min(1, "At least one doctor must be selected"),
  doctorIds: Yup.array().notRequired(),
  status: Yup.boolean(),
});

export const Treatments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { treatments, selectedTreatment, isCreating, editModelOpen } =
    useSelector((state) => state.treatment);

  // const fetchTreatments = async () => {
  //   try {
  //     const response = await getAllTreatments();

  //     if (response && response.data) {
  //       dispatch(setTreatments(response.data));
  //     }
  //   } catch (error) {
  //     console.log('Error fetching treatments:', error);
  //   }
  // };

  // const editTreatment = async (selectedTreatment) => {
  //   try {
  //     const response = await updateTreatment(selectedTreatment);

  //     if (response && response.data) {
  //       dispatch(editTreatment(response.data));
  //     }
  //   } catch (error) {
  //     console.log('Error updating treatments:', error);
  //   }
  // };

  // useEffect(() => {
  //     fetchTreatments();
  //   }, [dispatch]);

  // useCallback(async () => {
  //   fetchTreatments();
  // }, []);
  // useMemo(async () => {
  //   fetchTreatments();
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTreatments());
  }, [dispatch]);

  console.log(treatments);

  const handleOpen = (treatment) => {
    dispatch(setSelectedTreatment(treatment));
    dispatch(setIsCreating(true));
  };

  const handleEditOpen = (treatment) => {
    dispatch(setSelectedTreatment(treatment));
    console.log(selectedTreatment);
    dispatch(setEditModelOpen(true));
  };

  const handleClose = () => {
    dispatch(setSelectedTreatment(null));
    dispatch(setIsCreating(false));
  };

  const handleEditClose = () => {
    dispatch(setSelectedTreatment(null));
    dispatch(setEditModelOpen(false));
  };

  const handleEditSave = () => {
    // console.log(selectedTreatment)
    // dispatch(editTreatment(selectedTreatment));
    // editTreatment(selectedTreatment)
    // dispatch(updateTreatment(selectedTreatment));
    dispatch(updateTreatment(selectedTreatment));
    handleEditClose();
  };

  const handleSave = (values) => {
    console.log(values);
    const data = {};

    Object.keys(values).forEach((key) => {
      data[key] = values[key];
    });

    // Object.defineProperty(data, "id", {value:treatments.length + 1});
    console.log(data);
    // dispatch(addTreatment(data));
    dispatch(createTreatment(data));
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

  const handleDoctorIdsChange = (event, value) => {
    dispatch(
      setSelectedTreatment({
        ...selectedTreatment,
        doctorIds: value,
      })
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price", type: "number", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (params.row.status ? "Available" : "Unavailable"),
    },
    {
      field: "doctorIds",
      headerName: "Doctor Actions",
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
  ];

  return (
    <Box m="20px">
      <Header title="TREATMENTS" subtitle="List of provided treatments" />
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
        <DataGrid
          rows={treatments}
          columns={columns}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
        />
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
            options={mockDoctorIds}
            getOptionLabel={(option) => option}
            value={selectedTreatment?.doctorIds || []}
            onChange={handleDoctorIdsChange}
            renderInput={(params) => (
              <TextField {...params} label="Doctor IDs" />
            )}
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
            {/* {isCreating ? "Create New Treatment" : "Update Treatment"} */}
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
                  // onChange={handleChange}
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
                  options={mockDoctorIds}
                  getOptionLabel={(option) => option}
                  value={values.doctorIds}
                  onChange={(event, newValue) =>
                    setFieldValue("doctorIds", newValue)
                  }
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
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={2} mt={3}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: colors.greenAccent }}
                  >
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

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          dispatch(setIsCreating(true));
        }}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
