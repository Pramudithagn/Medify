// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarDensitySelector,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import {
//   Box,
//   Button,
//   IconButton,
//   Modal,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   Avatar,
//   Autocomplete,
//   useTheme,
//   Switch,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import Header from "../../components/Header";
// import {
//   setPatients,
//   setSelectedPatient,
//   setIsUuidDeleted,
//   setDeleteButtonEnabled,
//   addPatient,
//   updatePatient,
//   deletePatient,
// } from "../../features/patientSlice";
// import {
//   mockDataPatients,
//   mockDoctorIds,
//   mockPaymentIds,
// } from "../../data/mockData";
// import { tokens } from "../../theme";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   mail: Yup.string().email("Invalid email address").required("Email is required"),
//   phone: Yup.string().required("Phone number is required"),
//   assignedDate: Yup.date().required("Assigned date is required"),
//   dob: Yup.date().required("Date of Birth is required"),
//   bloodGroup: Yup.string().required("Blood group is required"),
//   age: Yup.number().required("Age is required").min(0, "Age must be positive"),
//   weight: Yup.number().required("Weight is required").min(0, "Weight must be positive"),
//   height: Yup.number().required("Height is required").min(0, "Height must be positive"),
//   allergies: Yup.string().required("Allergies are required"),
//   gender: Yup.string().required("Gender is required"),
//   address: Yup.object().shape({street: Yup.string().required("Street is required"),houseNumber: Yup.string().required("House number is required"),city: Yup.string().required("City is required"),zipCode: Yup.string().required("Zip code is required"),}),
//   paymentIds: Yup.array().of(Yup.string()).required("At least one payment ID is required"),
//   doctorIds: Yup.array().of(Yup.string()).required("At least one doctor ID is required"),
// });

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector slotProps={{ tooltip: { title: "Change density" } }} />
//       <Box sx={{ flexGrow: 1 }} />
//       <GridToolbarExport slotProps={{ tooltip: { title: "Export data" } }} />
//     </GridToolbarContainer>
//   );
// }

// const Patients = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const dispatch = useDispatch();
//   const { patients, selectedPatient, isUuidDeleted, deleteButtonEnabled } = useSelector((state) => state.patient);
//   const [open, setOpen] = React.useState(false);
//   const [deleteOpen, setDeleteOpen] = React.useState(false);

//   const isAdmin = true; // admin non-admin toggle

//   useEffect(() => {
//     dispatch(setPatients(mockDataPatients));
//     console.log(patients);
//   }, [dispatch]);

//   const handleOpen = (patient) => {
//     dispatch(setSelectedPatient(patient));
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     dispatch(setSelectedPatient(null));
//   };
//   const handleSave = (values) => {
//     dispatch(updatePatient(values));
//     handleClose();
//   };
//   const handleDeleteOpen = (patient) => {
//     dispatch(setSelectedPatient(patient));
//     setDeleteOpen(true);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     dispatch(setIsUuidDeleted(false));
//     dispatch(setDeleteButtonEnabled(false));
//     dispatch(setSelectedPatient(null));
//   };
//   const handleDelete = () => {
//     dispatch(deletePatient(selectedPatient.id));
//     handleDeleteClose();
//   };
//   const handleSwitchChange = (event) => {
//     dispatch(setIsUuidDeleted(event.target.checked));
//     dispatch(setDeleteButtonEnabled(event.target.checked));
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.25 },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "phone",
//       headerName: "Phone",
//       flex: 1,
//     },
//     {
//       field: "mail",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 0.5,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       headerAlign: "center",
//       renderCell: (params) => (
//         <Box display="flex" justifyContent="center" ml="3%" pt="2%">
//           <IconButton
//             aria-label="view"
//             onClick={() => handleOpen(params.row)}
//             sx={{ color: colors.grey[400], marginRight: 2 }}
//           >
//             <VisibilityIcon />
//           </IconButton>
//           <IconButton
//             aria-label="delete"
//             onClick={() => handleDeleteOpen(params.row)}
//             sx={{ color: colors.grey[400] }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="PATIENTS" subtitle="List of patients" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": { border: "none" },
//           "& .MuiDataGrid-cell": { borderBottom: "none" },
//           "& .name-column--cell": { color: colors.greenAccent[300] },
//           "& .MuiDataGrid-columnHeaders": {backgroundColor: `${colors.blueAccent[700]} !important`, borderBottom: "none", },
//           "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400],},
//           "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700], },
//           "& .MuiCheckbox-root": {  color: `${colors.greenAccent[200]} !important`, },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important`, },
//         }}
//       >
//         <DataGrid
//           rows={patients}
//           columns={columns}
//           disableRowSelectionOnClick
//           slots={{ toolbar: CustomToolbar }}
//         />
//       </Box>

//       {/* Edit Modal */}

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 600,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             "& .MuiTextField-root, & .MuiFormControl-root": {
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: colors.grey[500], },
//                 "&.Mui-focused fieldset": {  borderColor: colors.grey[400],},
//                 "&.Mui-disabled fieldset": { borderColor: colors.grey[300], },
//                 "&.Mui-disabled .MuiInputBase-input": { WebkitTextFillColor: `${colors.grey[300]} !important`, },
//               },
//               "& .MuiInputLabel-root": { color: colors.grey[200], },
//               "& .MuiInputLabel-root.Mui-focused": { color: colors.grey[500],  },
//               mt: 2,
//             },
//           }}
//         >
//           <Typography variant="h3" align="center">
//             Patient Details
//           </Typography>
//           {selectedPatient && (
//             <Formik
//               initialValues={selectedPatient}
//               validationSchema={validationSchema}
//               onSubmit={handleSave}
//             >
//               {({
//                 errors,
//                 touched,
//                 handleChange,
//                 setFieldValue,
//                 handleBlur,
//                 values,
//               }) => (
//                 <Form>
//                   <Box display="flex" alignItems="center" gap={2}>
//                     <Avatar
//                       src={values.photo}
//                       alt={values.name}
//                       sx={{ width: 80, height: 80 }}
//                     />
//                     <TextField
//                       label="Name"
//                       name="name"
//                       value={values.name}
//                       onChange={handleChange}
//                       fullWidth
//                       size="small"
//                       disabled={!isAdmin}
//                       error={touched.name && Boolean(errors.name)}
//                       helperText={touched.name && errors.name}
//                     />
//                   </Box>
//                   <TextField
//                     label="Email"
//                     name="mail"
//                     value={values.mail}
//                     onChange={handleChange}
//                     fullWidth
//                     size="small"
//                     disabled={!isAdmin}
//                     error={touched.mail && Boolean(errors.mail)}
//                     helperText={touched.mail && errors.mail}
//                   />
//                   <TextField
//                     label="Phone"
//                     name="phone"
//                     value={values.phone}
//                     onChange={handleChange}
//                     fullWidth
//                     size="small"
//                     disabled={!isAdmin}
//                     error={touched.phone && Boolean(errors.phone)}
//                     helperText={touched.phone && errors.phone}
//                   />
//                   <Box display="flex" justifyContent="space-between" gap={3}>
//                     <TextField
//                       label="Assigned Date"
//                       name="assignedDate"
//                       type="date"
//                       value={values.assignedDate}
//                       onChange={handleChange}
//                       fullWidth
//                       size="small"
//                       InputLabelProps={{ shrink: true }}
//                       disabled={!isAdmin}
//                       error={touched.assignedDate && Boolean(errors.assignedDate)}
//                       helperText={touched.assignedDate && errors.assignedDate}
//                     />
//                     <TextField
//                       label="Date of Birth"
//                       name="dob"
//                       type="date"
//                       value={values.dob || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       size="small"
//                       InputLabelProps={{ shrink: true }}
//                       disabled={!isAdmin}
//                       error={touched.dob && Boolean(errors.dob)}
//                       helperText={touched.dob && errors.dob}
//                     />
//                   </Box>
//                   <Box display="flex" justifyContent="space-between">
//                     <FormControl
//                       size="small"
//                       sx={{ width: "48%" }}
//                       error={touched.gender && Boolean(errors.gender)}
//                     >
//                       <InputLabel id="gender-label">Gender</InputLabel>
//                       <Select
//                         labelId="gender-label"
//                         id="gender"
//                         name="gender"
//                         value={values.gender || ""}
//                         onChange={handleChange}
//                         label="Gender"
//                         disabled={!isAdmin}
//                       >
//                         <MenuItem value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                       </Select>
//                       {touched.gender && errors.gender && (
//                         <FormHelperText>{errors.gender}</FormHelperText>
//                       )}
//                     </FormControl>

//                     <FormControl
//                       size="small"
//                       sx={{ width: "48%" }}
//                       error={touched.bloodGroup && Boolean(errors.bloodGroup)}
//                     >
//                       <InputLabel id="blood-group-label">
//                         Blood Group
//                       </InputLabel>
//                       <Select
//                         labelId="blood-group-label"
//                         id="bloodGroup"
//                         name="bloodGroup"
//                         value={values.bloodGroup || ""}
//                         onChange={handleChange}
//                         label="Blood Group"
//                         disabled={!isAdmin}
//                       >
//                         <MenuItem value="A+">A+</MenuItem>
//                         <MenuItem value="A-">A-</MenuItem>
//                         <MenuItem value="B+">B+</MenuItem>
//                         <MenuItem value="B-">B-</MenuItem>
//                         <MenuItem value="AB+">AB+</MenuItem>
//                         <MenuItem value="AB-">AB-</MenuItem>
//                         <MenuItem value="O+">O+</MenuItem>
//                         <MenuItem value="O-">O-</MenuItem>
//                       </Select>
//                       {touched.bloodGroup && errors.bloodGroup && (
//                         <FormHelperText>{errors.bloodGroup}</FormHelperText>
//                       )}
//                     </FormControl>
//                   </Box>
//                   <Box display="flex" gap={2}>
//                     <TextField
//                       label="Age"
//                       name="age"
//                       value={values.age || ""}
//                       onChange={handleChange}
//                       // fullWidth
//                       size="small"
//                       disabled={!isAdmin}
//                       error={touched.age && Boolean(errors.age)}
//                       helperText={touched.age && errors.age}
//                     />
//                     <TextField
//                       label="Weight (kg)"
//                       name="weight"
//                       value={values.weight || ""}
//                       onChange={handleChange}
//                       // fullWidth
//                       size="small"
//                       disabled={!isAdmin}
//                       error={touched.weight && Boolean(errors.weight)}
//                       helperText={touched.weight && errors.weight}
//                     />
//                     <TextField
//                       label="Height (cm)"
//                       name="height"
//                       value={values.height || ""}
//                       onChange={handleChange}
//                       // fullWidth
//                       size="small"
//                       disabled={!isAdmin}
//                       error={touched.height && Boolean(errors.height)}
//                       helperText={touched.height && errors.height}
//                     />
//                     <TextField
//                       label="Allergies"
//                       name="allergies"
//                       value={values.allergies || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       size="small"
//                       disabled={!isAdmin}
//                       error={touched.allergies && Boolean(errors.allergies)}
//                       helperText={touched.allergies && errors.allergies}
//                     />
//                   </Box>

//                   <Box display="flex" gap={2}>
//                     <TextField
//                       label="House Number"
//                       name="address.houseNumber"
//                       value={values.address?.houseNumber || ""}
//                       onChange={handleChange}
//                       size="small"
//                       disabled={!isAdmin}
//                       error={ touched.address?.houseNumber && Boolean(errors.address?.houseNumber) }
//                       helperText={ touched.address?.houseNumber && errors.address?.houseNumber }
//                     />
//                     <TextField
//                       label="Street"
//                       name="address.street"
//                       value={values.address?.street || ""}
//                       onChange={handleChange}
//                       size="small"
//                       //   fullWidth
//                       disabled={!isAdmin}
//                       error={ touched.address?.street && Boolean(errors.address?.street) }
//                       helperText={ touched.address?.street && errors.address?.street }
//                     />
//                     <TextField
//                       label="City"
//                       name="address.city"
//                       value={values.address?.city || ""}
//                       onChange={handleChange}
//                       size="small"
//                       disabled={!isAdmin}
//                       error={ touched.address?.zipCode && Boolean(errors.address?.zipCode) }
//                       helperText={ touched.address?.zipCode && errors.address?.zipCode }
//                     />
//                     <TextField
//                       label="Zip Code"
//                       name="address.zipCode"
//                       value={values.address?.zipCode || ""}
//                       onChange={handleChange}
//                       size="small"
//                       disabled={!isAdmin}
//                       error={ touched.address?.zipCode && Boolean(errors.address?.zipCode) }
//                       helperText={ touched.address?.zipCode && errors.address?.zipCode }
//                     />
//                   </Box>
//                   <Autocomplete
//                     multiple
//                     options={mockDoctorIds}
//                     value={values.doctorIds}
//                     onChange={(event, newValue) => { setFieldValue("doctorIds", newValue); }}
//                     getOptionLabel={(option) => option}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Doctor IDs"
//                         variant="outlined"
//                         size="small"
//                         error={touched.doctorIds && Boolean(errors.doctorIds)}
//                         helperText={touched.doctorIds && errors.doctorIds}
//                       />
//                     )}
//                     disabled={!isAdmin}
//                   />
//                   <Autocomplete
//                     multiple
//                     options={mockPaymentIds}
//                     value={values.paymentIds}
//                     onChange={(event, newValue) => { setFieldValue("paymentIds", newValue); }}
//                     getOptionLabel={(option) => option}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Payment IDs"
//                         variant="outlined"
//                         size="small"
//                         error={touched.paymentIds && Boolean(errors.paymentIds)}
//                         helperText={touched.paymentIds && errors.paymentIds}
//                       />
//                     )}
//                     disabled={!isAdmin}
//                   />
//                   <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
//                     {isAdmin && (
//                       <Button
//                         type="submit"
//                         color="secondary"
//                         variant="contained"
//                       >
//                         Save
//                       </Button>
//                     )}
//                     <Button
//                       sx={{
//                         backgroundColor: colors.grey[600],
//                       }}
//                       onClick={handleClose}
//                       variant="contained"
//                     >
//                       Cancel
//                     </Button>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </Box>
//       </Modal>

//       {/* Delete Modal */}

//       <Modal open={deleteOpen} onClose={handleDeleteClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 400,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               color: colors.redAccent[500],
//             }}
//           >
//             Warning !
//           </Typography>

//           <Typography variant="h6" align="center" color="text.primary">
//             Please make sure that this user have been completely removed from
//             the user authentication system first. Are you sure you want to
//             delete this patient ?
//           </Typography>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Switch
//               checked={isUuidDeleted}
//               onChange={handleSwitchChange}
//               color="secondary"
//             />
//             <Typography>Enable to confirm delete</Typography>
//           </Box>
//           <Box display="flex" justifyContent="flex-end" gap={2}>
//             <Button
//               onClick={handleDelete}
//               variant="contained"
//               color="error"
//               disabled={!deleteButtonEnabled}
//             >
//               Delete
//             </Button>
//             <Button
//               onClick={handleDeleteClose}
//               sx={{  backgroundColor: colors.grey[600], }}
//               variant="contained"
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Patients;

//=====================================================================================================================================================================================================================================

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Avatar,
  Autocomplete,
  useTheme,
  Switch,
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import {
  // setPatients,
  // setSelectedPatient,
  // setIsUuidDeleted,
  // setDeleteButtonEnabled,
  // addPatient,
  // updatePatient,
  // deletePatient,
  fetchPatients,
  createPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  setIsUuidDeleted,
  setDeleteButtonEnabled,
} from "../../features/patientSlice";
import {
  mockDataPatients,
  mockDoctorIds,
  mockPaymentIds,
} from "../../data/mockData";
import { tokens } from "../../theme";
import { getDoctors } from "../../features/doctorSlice";
import { fetchPayments } from "../../features/paymentSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  assignedDate: Yup.date().required("Assigned date is required"),
  dob: Yup.date().required("Date of Birth is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  age: Yup.number().required("Age is required").min(0, "Age must be positive"),
  weight: Yup.number()
    .required("Weight is required")
    .min(0, "Weight must be positive"),
  height: Yup.number()
    .required("Height is required")
    .min(0, "Height must be positive"),
  allergies: Yup.string().required("Allergies are required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    houseNumber: Yup.string().required("House number is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip code is required"),
  }),
  paymentIds: Yup.array()
    .of(Yup.string())
    .required("At least one payment ID is required"),
  doctorIds: Yup.array()
    .of(Yup.string())
    .required("At least one doctor ID is required"),
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

const Patients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { userRole } = JSON.parse(localStorage.getItem("userDetails")) || {};
  // const userRole = "PATIENT";
  const { patients, selectedPatient, isUuidDeleted, deleteButtonEnabled } =
    useSelector((state) => state.patient);
  const { doctors } = useSelector((state) => state.doctor);
  const { payments } = useSelector((state) => state.payment);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [doctorIds, setDoctorIds] = useState([]);

  // const isAdmin = true; // admin non-admin toggle
  const isAdmin = userRole === "ADMIN";

  // useEffect(() => {
  //   dispatch(setPatients(mockDataPatients));
  //   console.log(patients);
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(getDoctors());
    dispatch(fetchPayments());
  }, [dispatch]);

  useEffect(() => {
    if (doctors.length > 0) {
      setDoctorIds(doctors.map((doctor) => doctor.id));
    }
  }, [doctors]);

  console.log(patients);

  const handleOpen = (patient) => {
    dispatch(setSelectedPatient(patient));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(setSelectedPatient(null));
  };
  const handleSave = (values) => {
    console.log(selectedPatient, values);
    dispatch(updatePatient({ selectedPatient, updatedPatient: values }));
    // dispatch(updatePatient(values));
    handleClose();
  };
  const handleDeleteOpen = (patient) => {
    dispatch(setSelectedPatient(patient));
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    dispatch(setIsUuidDeleted(false));
    dispatch(setDeleteButtonEnabled(false));
    dispatch(setSelectedPatient(null));
  };
  const handleDelete = () => {
    dispatch(deletePatient(selectedPatient.id));
    handleDeleteClose();
  };
  const handleSwitchChange = (event) => {
    dispatch(setIsUuidDeleted(event.target.checked));
    dispatch(setDeleteButtonEnabled(event.target.checked));
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
      field: "gender",
      headerName: "Gender",
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
      <Header title="PATIENTS" subtitle="List of patients" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${colors.blueAccent[700]} !important`,
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
        }}
      >
        <DataGrid
          rows={patients}
          columns={columns}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[400] : "white",
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 600,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiTextField-root, & .MuiFormControl-root": {
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: colors.grey[500] },
                "&.Mui-focused fieldset": { borderColor: colors.grey[400] },
                "&.Mui-disabled fieldset": { borderColor: colors.grey[300] },
                "&.Mui-disabled .MuiInputBase-input": {
                  WebkitTextFillColor: `${colors.grey[300]} !important`,
                },
              },
              "& .MuiInputLabel-root": { color: colors.grey[200] },
              "& .MuiInputLabel-root.Mui-focused": { color: colors.grey[500] },
              mt: 2,
            },
          }}
        >
          <Typography variant="h3" align="center">
            Patient Details
          </Typography>
          {selectedPatient && (
            <Formik
              initialValues={selectedPatient}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                values,
              }) => (
                <Form>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      src={values.photo}
                      alt={values.name}
                      sx={{ width: 80, height: 80 }}
                    />
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
                  <Box display="flex" justifyContent="space-between" gap={3}>
                    <TextField
                      label="Assigned Date"
                      name="assignedDate"
                      type="datetime-local"
                      value={values.assignedDate}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      disabled={!isAdmin}
                      error={
                        touched.assignedDate && Boolean(errors.assignedDate)
                      }
                      helperText={touched.assignedDate && errors.assignedDate}
                    />
                    <TextField
                      label="Date of Birth"
                      name="dob"
                      // type="datetime-local"
                      type="date"
                      value={values.dob || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      disabled={!isAdmin}
                      error={touched.dob && Boolean(errors.dob)}
                      helperText={touched.dob && errors.dob}
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl
                      size="small"
                      sx={{ width: "48%" }}
                      error={touched.gender && Boolean(errors.gender)}
                    >
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={values.gender || ""}
                        onChange={handleChange}
                        label="Gender"
                        disabled={!isAdmin}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                      {touched.gender && errors.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      size="small"
                      sx={{ width: "48%" }}
                      error={touched.bloodGroup && Boolean(errors.bloodGroup)}
                    >
                      <InputLabel id="blood-group-label">
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="blood-group-label"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={values.bloodGroup || ""}
                        onChange={handleChange}
                        label="Blood Group"
                        disabled={!isAdmin}
                      >
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                      </Select>
                      {touched.bloodGroup && errors.bloodGroup && (
                        <FormHelperText>{errors.bloodGroup}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Age"
                      name="age"
                      value={values.age || ""}
                      onChange={handleChange}
                      // fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={touched.age && Boolean(errors.age)}
                      helperText={touched.age && errors.age}
                    />
                    <TextField
                      label="Weight (kg)"
                      name="weight"
                      value={values.weight || ""}
                      onChange={handleChange}
                      // fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={touched.weight && Boolean(errors.weight)}
                      helperText={touched.weight && errors.weight}
                    />
                    <TextField
                      label="Height (cm)"
                      name="height"
                      value={values.height || ""}
                      onChange={handleChange}
                      // fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={touched.height && Boolean(errors.height)}
                      helperText={touched.height && errors.height}
                    />
                    <TextField
                      label="Allergies"
                      name="allergies"
                      value={values.allergies || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      disabled={!isAdmin}
                      error={touched.allergies && Boolean(errors.allergies)}
                      helperText={touched.allergies && errors.allergies}
                    />
                  </Box>

                  <Box display="flex" gap={2}>
                    <TextField
                      label="House Number"
                      name="address.houseNumber"
                      value={values.address?.houseNumber || ""}
                      onChange={handleChange}
                      size="small"
                      disabled={!isAdmin}
                      error={
                        touched.address?.houseNumber &&
                        Boolean(errors.address?.houseNumber)
                      }
                      helperText={
                        touched.address?.houseNumber &&
                        errors.address?.houseNumber
                      }
                    />
                    <TextField
                      label="Street"
                      name="address.street"
                      value={values.address?.street || ""}
                      onChange={handleChange}
                      size="small"
                      //   fullWidth
                      disabled={!isAdmin}
                      error={
                        touched.address?.street &&
                        Boolean(errors.address?.street)
                      }
                      helperText={
                        touched.address?.street && errors.address?.street
                      }
                    />
                    <TextField
                      label="City"
                      name="address.city"
                      value={values.address?.city || ""}
                      onChange={handleChange}
                      size="small"
                      disabled={!isAdmin}
                      error={
                        touched.address?.zipCode &&
                        Boolean(errors.address?.zipCode)
                      }
                      helperText={
                        touched.address?.zipCode && errors.address?.zipCode
                      }
                    />
                    <TextField
                      label="Zip Code"
                      name="address.zipCode"
                      value={values.address?.zipCode || ""}
                      onChange={handleChange}
                      size="small"
                      disabled={!isAdmin}
                      error={
                        touched.address?.zipCode &&
                        Boolean(errors.address?.zipCode)
                      }
                      helperText={
                        touched.address?.zipCode && errors.address?.zipCode
                      }
                    />
                  </Box>
                  {/* <Autocomplete
                    multiple
                    // options={mockDoctorIds}
                    options={doctorIds}
                    value={values.doctorIds}
                    onChange={(event, newValue) => { setFieldValue("doctorIds", newValue); }}
                    getOptionLabel={(option) => option.toString()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Doctor IDs"
                        variant="outlined"
                        size="small"
                        error={touched.doctorIds && Boolean(errors.doctorIds)}
                        helperText={touched.doctorIds && errors.doctorIds}
                      />
                    )}
                    disabled={!isAdmin}
                  /> */}



                  {/* <Autocomplete
                    multiple
                    // options={doctorIds}
                    // getOptionLabel={(option) => option.toString()}
                    // value={values.doctorIds}
                    options={values.doctorIds
                      .map((id) => doctors.find((p) => p.id === id))
                      .filter(Boolean)}
                    getOptionLabel={(option) => option.name.toString()}
                    value={values.doctorIds.map(
                      (id) => doctors.find((p) => p.id === id) || ""
                    )}

                    onChange={(event, newValue) => {
                      const existingDoctorIds = selectedPatient.doctorIds;
                      const newDoctorIds = newValue.filter(
                        (id) => !existingDoctorIds.includes(id)
                      );
                      setFieldValue("doctorIds", [
                        ...existingDoctorIds,
                        ...newDoctorIds,
                      ]);
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Doctors"
                        size="small"
                        error={touched.doctorIds && Boolean(errors.doctorIds)}
                        helperText={touched.doctorIds && errors.doctorIds}
                        fullWidth
                      />
                    )}
                    disableCloseOnSelect
                    // renderOption={(props, option, { selected }) => (
                    //   <li {...props}>
                    //     <Checkbox
                    //       icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    //       checkedIcon={<CheckBoxIcon fontSize="small" />}
                    //       style={{ marginRight: 8 }}
                    //       checked={
                    //         selected ||
                    //         selectedPatient.doctorIds.includes(option)
                    //       }
                    //     />
                    //     {option}
                    //   </li>
                    // )}
                    disableClearable
                  /> */}

                {/* <Autocomplete
                    multiple
                    id="doctorIds"
                    options={doctors}
                    getOptionLabel={(option) => option.name} 
                    value={values.doctorIds.map((id) =>
                      doctors.find((doctor) => doctor.id === id)
                    )} 
                    onChange={(event, newValue) => {
                      const selectedDoctorIds = newValue.map((doctor) => doctor.id);
                      setFieldValue("doctorIds", selectedDoctorIds);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Doctors"
                        placeholder="Choose doctors"
                        size="small"
                        error={touched.doctorIds && Boolean(errors.doctorIds)}
                        helperText={touched.doctorIds && errors.doctorIds}
                        disabled={!isAdmin}
                      />
                    )}
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
                      You can only add one doctor at a time
                    </Typography>
                  </Box> */}
                  <Box>
                    {isAdmin ? (
                      <Autocomplete
                        multiple
                        disabled={!isAdmin}
                        id="doctorIds"
                    options={doctors}
                    getOptionLabel={(option) => option.name} 
                    value={values.doctorIds.map((id) =>
                      doctors.find((doctor) => doctor.id === id)
                    )} 
                    onChange={(event, newValue) => {
                      const selectedDoctorIds = newValue.map((doctor) => doctor.id);
                      setFieldValue("doctorIds", selectedDoctorIds);
                    }}
                        renderInput={(params) => (
                          <TextField
                          {...params}
                          variant="outlined"
                          label="Doctors"
                          placeholder="Choose doctors"
                          size="small"
                          error={touched.doctorIds && Boolean(errors.doctorIds)}
                          helperText={touched.doctorIds && errors.doctorIds}
                          disabled={!isAdmin}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        label="Doctors"
                        name="doctorIds"
                        value={values.doctorIds
                          .map(
                            (id) =>
                              doctors?.find((doctor) => doctor.id === id)
                                ?.name || ""
                          )
                          .join(", ")}
                        fullWidth
                        size="small"
                        disabled={true}
                        error={touched.doctorIds && Boolean(errors.doctorIds)}
                        helperText={touched.doctorIds && errors.doctorIds}
                      />
                    )}
                    {isAdmin && (
                      <Box display="flex" alignItems="center" mt={1} ml={1}>
                      <ErrorOutlineIcon
                        sx={{ color: "red", fontSize: 16, mr: 0.5 }}
                      />
                      <Typography
                        variant="caption"
                        fontSize={10}
                        sx={{ color: colors.redAccent[300] }}
                      >
                        You can only add one doctor at a time
                      </Typography>
                    </Box>
                    )}
                  </Box>

                  {/* <Autocomplete
                    multiple
                    options={mockPaymentIds}
                    value={values.paymentIds}
                    onChange={(event, newValue) => {
                      setFieldValue("paymentIds", newValue);
                    }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Payment IDs"
                        variant="outlined"
                        size="small"
                        error={touched.paymentIds && Boolean(errors.paymentIds)}
                        helperText={touched.paymentIds && errors.paymentIds}
                      />
                    )}
                    disabled={!isAdmin}
                  /> */}
                  <TextField
                      label="Payment IDs"
                      name="paymentIds"
                      value={values.paymentIds}
                      // value={values.paymentIds.join(", ")}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                      disabled={true}
                      error={
                        touched.address?.zipCode &&
                        Boolean(errors.address?.zipCode)
                      }
                      helperText={
                        touched.address?.zipCode && errors.address?.zipCode
                      }
                    />
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
                    <Button
                      sx={{
                        backgroundColor: colors.grey[600],
                      }}
                      onClick={handleClose}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>

      {/* Delete Modal */}

      <Modal open={deleteOpen} onClose={handleDeleteClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[400] : "white",
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
          <Typography
            variant="h4"
            sx={{
              color: colors.redAccent[500],
            }}
          >
            Warning !
          </Typography>

          <Typography variant="h6" align="center" color="text.primary">
            Please make sure that this user have been completely removed from
            the user authentication system first. Are you sure you want to
            delete this patient ?
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
              sx={{ backgroundColor: colors.grey[600] }}
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

export default Patients;
