// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Autocomplete,
//   Avatar,
//   useTheme,
//   Chip,
// } from "@mui/material";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarDensitySelector,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import {
//   mockDataDoctors,
//   mockPatientIds,
//   mockTreatmentIds,
// } from "../../data/mockData";

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <Box sx={{ flexGrow: 1 }} />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//     // <GridToolbarContainer>
//     //   <GridToolbarColumnsButton />
//     //   <GridToolbarFilterButton />
//     //   <GridToolbarDensitySelector
//     //     slotProps={{ tooltip: { title: "Change density" } }}
//     //   />
//     //   <Box sx={{ flexGrow: 1 }} />
//     //   <GridToolbarExport
//     //     slotProps={{
//     //       tooltip: { title: "Export data" },
//     //       button: { variant: "outlined" },
//     //     }}
//     //   />
//     // </GridToolbarContainer>
//   );
// }

// const Doctors = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [doctors, setDoctors] = useState(mockDataDoctors);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [open, setOpen] = useState(false);

//   const isAdmin = true; // admin non-admin toggle

//   const handleOpen = (doctor) => {
//     setSelectedDoctor(doctor);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedDoctor(null);
//   };

//   const handleSave = () => {
//     // Update the doctors list
//     setDoctors(
//       doctors.map((doc) =>
//         doc.id === selectedDoctor.id ? selectedDoctor : doc
//       )
//     );
//     handleClose();
//   };

//   const handleInputChange = (field, value) => {
//     setSelectedDoctor({
//       ...selectedDoctor,
//       [field]: value,
//     });
//   };

//   const handleAddressChange = (field, value) => {
//     setSelectedDoctor({
//       ...selectedDoctor,
//       address: {
//         ...selectedDoctor.address,
//         [field]: value,
//       },
//     });
//   };

//   const handleTreatmentIdsChange = (event, value) => {
//     setSelectedDoctor({
//       ...selectedDoctor,
//       treatmentIds: value,
//     });
//   };

//   const handlePatientIdsChange = (event, value) => {
//     setSelectedDoctor({
//       ...selectedDoctor,
//       patientIds: value,
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
//       field: "specialization",
//       headerName: "Specialization",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.5,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleOpen(params.row)}
//         >
//           Details
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="DOCTORS" subtitle="List of doctors" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": { border: "none" },
//           "& .MuiDataGrid-cell": { borderBottom: "none" },
//           "& .name-column--cell": { color: colors.greenAccent[300] },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: `${colors.blueAccent[700]} !important`,
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
//         }}
//       >
//         <DataGrid
//           rows={doctors}
//           columns={columns}
//           disableRowSelectionOnClick
//           components={{
//             Toolbar: CustomToolbar,
//           }}
//         />
//       </Box>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor:
//               theme.palette.mode === "dark" ? colors.grey[700] : "white",
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 600,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             "& .MuiTextField-root": {
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: colors.grey[500],
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: colors.grey[400],
//                 },
//                 "&.Mui-disabled fieldset": {
//                   borderColor: colors.grey[300],
//                 },
//                 "&.Mui-disabled .MuiInputBase-input": {
//                   WebkitTextFillColor: `${colors.grey[300]} !important`,
//                 },
//               },
//               "& .MuiInputLabel-root": {
//                 color: colors.grey[200],
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: colors.grey[500],
//               },
//               "& .MuiInputLabel-root.Mui-disabled": {
//                 color: colors.grey[300],
//               },
//               mt: 2,
//             },
//           }}
//         >
//           {selectedDoctor && (
//             <>
//               <Box display="flex" alignItems="center" gap={2}>
//                 <Avatar
//                   src={selectedDoctor.photo}
//                   alt={selectedDoctor.name}
//                   sx={{ width: 80, height: 80 }}
//                 />
//                 <TextField
//                   label="Name"
//                   value={selectedDoctor.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   fullWidth
//                   disabled={!isAdmin}
//                 />
//               </Box>
//               <TextField
//                 label="Email"
//                 value={selectedDoctor.mail}
//                 onChange={(e) => handleInputChange("mail", e.target.value)}
//                 fullWidth
//                 disabled={!isAdmin}
//               />
//               <TextField
//                 label="Phone"
//                 value={selectedDoctor.phone}
//                 onChange={(e) => handleInputChange("phone", e.target.value)}
//                 fullWidth
//                 disabled={!isAdmin}
//               />
//               <TextField
//                 label="Assigned Date"
//                 type="date"
//                 value={
//                   selectedDoctor.assignedDate
//                     ? selectedDoctor.assignedDate.split("T")[0]
//                     : ""
//                 }
//                 onChange={(e) =>
//                   handleInputChange("assignedDate", e.target.value)
//                 }
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//                 disabled={!isAdmin}
//               />
//               <TextField
//                 label="Specialization"
//                 value={selectedDoctor.specialization}
//                 onChange={(e) =>
//                   handleInputChange("specialization", e.target.value)
//                 }
//                 fullWidth
//                 disabled={!isAdmin}
//               />

//               <Box display="flex" gap={2}>
//                 <TextField
//                   label="Street"
//                   value={selectedDoctor.address?.street || ""}
//                   onChange={(e) =>
//                     handleAddressChange("street", e.target.value)
//                   }
//                   fullWidth
//                   disabled={!isAdmin}
//                 />
//                 <TextField
//                   label="House Number"
//                   value={selectedDoctor.address?.houseNumber || ""}
//                   onChange={(e) =>
//                     handleAddressChange("houseNumber", e.target.value)
//                   }
//                   fullWidth
//                   disabled={!isAdmin}
//                 />
//                 <TextField
//                   label="Zip Code"
//                   value={selectedDoctor.address?.zipCode || ""}
//                   onChange={(e) =>
//                     handleAddressChange("zipCode", e.target.value)
//                   }
//                   fullWidth
//                   disabled={!isAdmin}
//                 />
//               </Box>

//               <Autocomplete
//                 multiple
//                 options={mockTreatmentIds}
//                 getOptionLabel={(option) => option}
//                 value={selectedDoctor.treatmentIds || []}
//                 onChange={handleTreatmentIdsChange}
//                 renderInput={(params) => (
//                   <TextField {...params} label="Treatment IDs" />
//                 )}
//                 disabled={!isAdmin}
//                 renderTags={(tagValue, getTagProps) =>
//                   isAdmin ? (
//                     tagValue.map((option, index) => (
//                       <Chip
//                         key={option}
//                         label={option}
//                         {...getTagProps({ index })}
//                         sx={{
//                           backgroundColor: colors.grey[600],
//                           color: colors.grey[100],
//                         }}
//                       />
//                     ))
//                   ) : (
//                     <span style={{ color: colors.grey[300] }}>
//                       {tagValue.join(", ")}{" "}
//                     </span>
//                   )
//                 }
//               />

//               <Autocomplete
//                 multiple
//                 options={mockPatientIds}
//                 getOptionLabel={(option) => option}
//                 value={selectedDoctor.patientIds || []}
//                 onChange={handlePatientIdsChange}
//                 renderInput={(params) => (
//                   <TextField {...params} ba label="Patient IDs" />
//                 )}
//                 disabled={!isAdmin}
//                 renderTags={(tagValue, getTagProps) =>
//                   isAdmin ? (
//                     tagValue.map((option, index) => (
//                       <Chip
//                         key={option}
//                         label={option}
//                         {...getTagProps({ index })}
//                         sx={{
//                           backgroundColor: colors.grey[600],
//                           color: colors.grey[100],
//                         }}
//                       />
//                     ))
//                   ) : (
//                     <span style={{ color: colors.grey[300] }}>
//                       {tagValue.join(", ")}
//                     </span>
//                   )
//                 }
//               />

//               <Box display="flex" justifyContent="flex-end" gap={2}>
//                 {isAdmin && (
//                   <Button
//                     variant="contained"
//                     onClick={handleSave}
//                     sx={{ backgroundColor: colors.greenAccent[600] }}
//                   >
//                     Save
//                   </Button>
//                 )}
//                 <Button
//                   variant="contained"
//                   onClick={handleClose}
//                   sx={{ backgroundColor: colors.grey[600] }}
//                 >
//                   Close
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Doctors;

//======================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Autocomplete,
//   Avatar,
//   useTheme,
//   Chip,
// } from "@mui/material";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarDensitySelector,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import {
//   mockDataDoctors,
//   mockPatientIds,
//   mockTreatmentIds,
// } from "../../data/mockData";
// import { Formik, Field, Form, FieldArray } from "formik";
// import * as Yup from "yup";

// // Define validation schema
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   mail: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   phone: Yup.string().required("Phone number is required"),
//   assignedDate: Yup.date().required("Assigned date is required"),
//   specialization: Yup.string().required("Specialization is required"),
//   address: Yup.object().shape({
//     street: Yup.string().required("Street is required"),
//     houseNumber: Yup.string().required("House number is required"),
//     zipCode: Yup.string().required("Zip code is required"),
//   }),
//   treatmentIds: Yup.array()
//     .of(Yup.string())
//     .required("At least one treatment ID is required"),
//   patientIds: Yup.array()
//     .of(Yup.string())
//     .required("At least one patient ID is required"),
// });

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <Box sx={{ flexGrow: 1 }} />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

// const Doctors = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [doctors, setDoctors] = useState(mockDataDoctors);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [open, setOpen] = useState(false);

//   const isAdmin = true; // admin non-admin toggle

//   const handleOpen = (doctor) => {
//     setSelectedDoctor(doctor);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedDoctor(null);
//   };

//   const handleSave = (values) => {
//     // Update the doctors list
//     setDoctors(
//       doctors.map((doc) => (doc.id === values.id ? { ...doc, ...values } : doc))
//     );
//     handleClose();
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
//       field: "specialization",
//       headerName: "Specialization",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.5,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleOpen(params.row)}
//         >
//           Details
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="DOCTORS" subtitle="List of doctors" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": { border: "none" },
//           "& .MuiDataGrid-cell": { borderBottom: "none" },
//           "& .name-column--cell": { color: colors.greenAccent[300] },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: `${colors.blueAccent[700]} !important`,
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
//         }}
//       >
//         <DataGrid
//           rows={doctors}
//           columns={columns}
//           disableRowSelectionOnClick
//           components={{
//             Toolbar: CustomToolbar,
//           }}
//         />
//       </Box>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor:
//               theme.palette.mode === "dark" ? colors.grey[700] : "white",
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 600,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             "& .MuiTextField-root": {
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: colors.grey[500],
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: colors.grey[400],
//                 },
//                 "&.Mui-disabled fieldset": {
//                   borderColor: colors.grey[300],
//                 },
//                 "&.Mui-disabled .MuiInputBase-input": {
//                   WebkitTextFillColor: `${colors.grey[300]} !important`,
//                 },
//               },
//               "& .MuiInputLabel-root": {
//                 color: colors.grey[200],
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: colors.grey[500],
//               },
//               "& .MuiInputLabel-root.Mui-disabled": {
//                 color: colors.grey[300],
//               },
//               mt: 2,
//             },
//           }}
//         >
//           {selectedDoctor && (
//             <Formik
//               initialValues={selectedDoctor}
//               validationSchema={validationSchema}
//               onSubmit={handleSave}
//             >
//               {({ values, handleChange, setFieldValue, errors, touched }) => (
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
//                     disabled={!isAdmin}
//                     error={touched.phone && Boolean(errors.phone)}
//                     helperText={touched.phone && errors.phone}
//                   />
//                   <TextField
//                     label="Assigned Date"
//                     type="date"
//                     name="assignedDate"
//                     value={
//                       values.assignedDate
//                         ? values.assignedDate.split("T")[0]
//                         : ""
//                     }
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     fullWidth
//                     disabled={!isAdmin}
//                     error={touched.assignedDate && Boolean(errors.assignedDate)}
//                     helperText={touched.assignedDate && errors.assignedDate}
//                   />
//                   <TextField
//                     label="Specialization"
//                     name="specialization"
//                     value={values.specialization}
//                     onChange={handleChange}
//                     fullWidth
//                     disabled={!isAdmin}
//                     error={
//                       touched.specialization && Boolean(errors.specialization)
//                     }
//                     helperText={touched.specialization && errors.specialization}
//                   />
//                   <Box display="flex" gap={2}>
//                     <TextField
//                       label="Street"
//                       name="address.street"
//                       value={values.address.street || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isAdmin}
//                       error={
//                         touched.address?.street &&
//                         Boolean(errors.address?.street)
//                       }
//                       helperText={
//                         touched.address?.street && errors.address?.street
//                       }
//                     />
//                     <TextField
//                       label="House Number"
//                       name="address.houseNumber"
//                       value={values.address.houseNumber || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isAdmin}
//                       error={
//                         touched.address?.houseNumber &&
//                         Boolean(errors.address?.houseNumber)
//                       }
//                       helperText={
//                         touched.address?.houseNumber &&
//                         errors.address?.houseNumber
//                       }
//                     />{" "}
//                   </Box>{" "}
//                   <TextField
//                     label="Zip Code"
//                     name="address.zipCode"
//                     value={values.address.zipCode || ""}
//                     onChange={handleChange}
//                     fullWidth
//                     disabled={!isAdmin}
//                     error={
//                       touched.address?.zipCode &&
//                       Boolean(errors.address?.zipCode)
//                     }
//                     helperText={
//                       touched.address?.zipCode && errors.address?.zipCode
//                     }
//                   />{" "}
//                   <Autocomplete
//                     multiple
//                     options={mockTreatmentIds}
//                     getOptionLabel={(option) => option}
//                     value={values.treatmentIds}
//                     onChange={(event, newValue) =>
//                       setFieldValue("treatmentIds", newValue)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Treatments"
//                         placeholder="Select treatments"
//                         fullWidth
//                       />
//                     )}
//                     disabled={!isAdmin}
//                   />{" "}
//                   <Autocomplete
//                     multiple
//                     options={mockPatientIds}
//                     getOptionLabel={(option) => option}
//                     value={values.patientIds}
//                     onChange={(event, newValue) =>
//                       setFieldValue("patientIds", newValue)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Patients"
//                         placeholder="Select patients"
//                         fullWidth
//                       />
//                     )}
//                     disabled={!isAdmin}
//                   />
//                   <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
//                     <Button variant="outlined" onClick={handleClose}>
//                       Cancel
//                     </Button>
//                     {isAdmin && (
//                       <Button type="submit" variant="contained">
//                         Save
//                       </Button>
//                     )}
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Doctors;

//======================================================================================================================================================


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Autocomplete,
//   Avatar,
//   useTheme,
// } from "@mui/material";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarDensitySelector,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import {
//   mockDataDoctors,
//   mockPatientIds,
//   mockTreatmentIds,
// } from "../../data/mockData";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";

// // yup validationschema
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   mail: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   phone: Yup.string().required("Phone number is required"),
//   assignedDate: Yup.date().required("Assigned date is required"),
//   specialization: Yup.string().required("Specialization is required"),
//   address: Yup.object().shape({
//     street: Yup.string().required("Street is required"),
//     houseNumber: Yup.string().required("House number is required"),
//     zipCode: Yup.string().required("Zip code is required"),
//   }),
//   treatmentIds: Yup.array()
//     .of(Yup.string())
//     .required("At least one treatment ID is required"),
//   patientIds: Yup.array()
//     .of(Yup.string())
//     .required("At least one patient ID is required"),
// });

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
//         }}
//       />
//     </GridToolbarContainer>
//   );
// }

// const Doctors = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [doctors, setDoctors] = useState(mockDataDoctors);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [open, setOpen] = useState(false);

//   const isAdmin = true; // admin non-admin toggle

//   const handleOpen = (doctor) => {
//     setSelectedDoctor(doctor);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedDoctor(null);
//   };

//   const handleSave = (values) => {
//     // Log all form values to the console
//     console.log("Form Values: ", values);

//     // Update the doctors list
//     setDoctors(
//       doctors.map((doc) => (doc.id === values.id ? { ...doc, ...values } : doc))
//     );
//     handleClose();
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
//       field: "specialization",
//       headerName: "Specialization",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.5,
//       marginRight:10,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleOpen(params.row)}
//           sx={{
//             backgroundColor: colors.grey[600],
//           }}
//         >
//           Details
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="DOCTORS" subtitle="List of doctors" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": { border: "none" },
//           "& .MuiDataGrid-cell": { borderBottom: "none" },
//           "& .name-column--cell": { color: colors.greenAccent[300] },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: `${colors.blueAccent[700]} !important`,
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
//         }}
//       >
//         <DataGrid
//           rows={doctors}
//           columns={columns}
//           disableRowSelectionOnClick 
//           slots={{
//             toolbar: CustomToolbar,
//           }}
//         />
//       </Box>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor:
//               theme.palette.mode === "dark" ? colors.grey[700] : "white",
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 600,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             "& .MuiTextField-root": {
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: colors.grey[500],
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: colors.grey[400],
//                 },
//                 "&.Mui-disabled fieldset": {
//                   borderColor: colors.grey[300],
//                 },
//                 "&.Mui-disabled .MuiInputBase-input": {
//                   WebkitTextFillColor: `${colors.grey[300]} !important`,
//                 },
//               },
//               "& .MuiInputLabel-root": {
//                 color: colors.grey[200],
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: colors.grey[500],
//               },
//               "& .MuiInputLabel-root.Mui-disabled": {
//                 color: colors.grey[300],
//               },
//               mt: 2,
//             },
//           }}
//         >
//           {selectedDoctor && (
//             <Formik
//               initialValues={selectedDoctor}
//               validationSchema={validationSchema}
//               onSubmit={handleSave}
//             >
//               {({ values, handleChange, setFieldValue, errors, touched }) => (
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
//                     disabled={!isAdmin}
//                     error={touched.phone && Boolean(errors.phone)}
//                     helperText={touched.phone && errors.phone}
//                   />
//                   <TextField
//                     label="Assigned Date"
//                     type="date"
//                     name="assignedDate"
//                     value={
//                       values.assignedDate
//                         ? values.assignedDate.split("T")[0]
//                         : ""
//                     }
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     fullWidth
//                     disabled={!isAdmin}
//                     error={touched.assignedDate && Boolean(errors.assignedDate)}
//                     helperText={touched.assignedDate && errors.assignedDate}
//                   />
//                   <TextField
//                     label="Specialization"
//                     name="specialization"
//                     value={values.specialization}
//                     onChange={handleChange}
//                     fullWidth
//                     disabled={!isAdmin}
//                     error={
//                       touched.specialization && Boolean(errors.specialization)
//                     }
//                     helperText={touched.specialization && errors.specialization}
//                   />
//                   <Box display="flex" gap={2}>
//                     <TextField
//                       label="Street"
//                       name="address.street"
//                       value={values.address.street || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isAdmin}
//                       error={
//                         touched.address?.street &&
//                         Boolean(errors.address?.street)
//                       }
//                       helperText={
//                         touched.address?.street && errors.address?.street
//                       }
//                     />
//                     <TextField
//                       label="House Number"
//                       name="address.houseNumber"
//                       value={values.address.houseNumber || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isAdmin}
//                       error={
//                         touched.address?.houseNumber &&
//                         Boolean(errors.address?.houseNumber)
//                       }
//                       helperText={
//                         touched.address?.houseNumber &&
//                         errors.address?.houseNumber
//                       }
//                     />
//                     <TextField
//                       label="Zip Code"
//                       name="address.zipCode"
//                       value={values.address.zipCode || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isAdmin}
//                       error={
//                         touched.address?.zipCode &&
//                         Boolean(errors.address?.zipCode)
//                       }
//                       helperText={
//                         touched.address?.zipCode && errors.address?.zipCode
//                       }
//                     />
//                   </Box>
//                   <Autocomplete
//                     multiple
//                     options={mockTreatmentIds}
//                     getOptionLabel={(option) => option}
//                     value={values.treatmentIds}
//                     onChange={(event, newValue) =>
//                       setFieldValue("treatmentIds", newValue)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Treatment IDs"
//                         placeholder="Select Treatments"
//                         fullWidth
//                         disabled={!isAdmin}
//                         error={
//                           touched.treatmentIds && Boolean(errors.treatmentIds)
//                         }
//                         helperText={
//                           touched.treatmentIds && errors.treatmentIds
//                         }
//                       />
//                     )}
//                   />
//                   <Autocomplete
//                     multiple
//                     options={mockPatientIds}
//                     getOptionLabel={(option) => option}
//                     value={values.patientIds}
//                     onChange={(event, newValue) =>
//                       setFieldValue("patientIds", newValue)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Patient IDs"
//                         placeholder="Select Patients"
//                         fullWidth
//                         disabled={!isAdmin}
//                         error={touched.patientIds && Boolean(errors.patientIds)}
//                         helperText={touched.patientIds && errors.patientIds}
//                       />
//                     )}
//                   />
//                   <Box
//                     display="flex"
//                     justifyContent="flex-end"
//                     gap={2}
//                     mt={4}
//                   >
//                     <Button type="submit" color="secondary" variant="contained">
//                       Save
//                     </Button>
//                     <Button sx={{
//               backgroundColor: colors.grey[600],
//             }} onClick={handleClose}>Cancel</Button>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Doctors;

//======================================================================================================================================================



import React, { useState } from "react";
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
import {
  mockDataDoctors,
  mockPatientIds,
  mockTreatmentIds,
} from "../../data/mockData";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';

// yup validationschema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  assignedDate: Yup.date().required("Assigned date is required"),
  specialization: Yup.string().required("Specialization is required"),
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    houseNumber: Yup.string().required("House number is required"),
    zipCode: Yup.string().required("Zip code is required"),
  }),
  treatmentIds: Yup.array()
    .of(Yup.string())
    .required("At least one treatment ID is required"),
  patientIds: Yup.array()
    .of(Yup.string())
    .required("At least one patient ID is required"),
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
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
        }}
      />
    </GridToolbarContainer>
  );
}

const Doctors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [doctors, setDoctors] = useState(mockDataDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUuidDeleted, setIsUuidDeleted] = useState(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);

  const isAdmin = true; // admin non-admin toggle

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  const handleSave = (values) => {
    // all form values to the console log
    console.log("Form Values: ", values);

    // Update  doctors list
    setDoctors(
      doctors.map((doc) => (doc.id === values.id ? { ...doc, ...values } : doc))
    );
    handleClose();
  };

  const handleDeleteOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setIsUuidDeleted(false);
    setDeleteButtonEnabled(false);
    setSelectedDoctor(null);
  };

  const handleDelete = () => {
    // Remove doctor from doc list
    setDoctors(doctors.filter((doc) => doc.id !== selectedDoctor.id));
    handleDeleteClose();
  };

  const handleSwitchChange = (event) => {
    setIsUuidDeleted(event.target.checked);
    setDeleteButtonEnabled(event.target.checked);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
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
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1, 
      headerAlign: "center",
      // align: "center", 
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" ml="3%" pt="2%">
          <IconButton
            aria-label="delete"
            onClick={() => handleOpen(params.row)}
            sx={{ color: colors.grey[400], marginRight: 2 }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteOpen(params.row)}
            sx={{ color: colors.grey[400],  }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="DOCTORS" subtitle="List of doctors" />
      <Box
        m="40px 0 0 0"
        // width="100%"
        height="75vh"
        sx={{
          // width: "100%",
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
          rows={doctors}
          columns={columns}
          disableRowSelectionOnClick 
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor:
              theme.palette.mode === "dark" ? colors.grey[700] : "white",
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 600,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiTextField-root": {
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.grey[500],
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.grey[400],
                },
                "&.Mui-disabled fieldset": {
                  borderColor: colors.grey[300],
                },
                "&.Mui-disabled .MuiInputBase-input": {
                  WebkitTextFillColor: `${colors.grey[300]} !important`,
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.grey[200],
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.grey[500],
              },
              "& .MuiInputLabel-root.Mui-disabled": {
                color: colors.grey[300],
              },
              mt: 2,
            },
          }}
        >
          {selectedDoctor && (
            <Formik
              initialValues={selectedDoctor}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ values, handleChange, setFieldValue, errors, touched }) => (
                <Form>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      src={values.photo}
                      alt={values.name}
                      sx={{ width: 80, height: 80 }}
                    />
                    <TextField
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isAdmin}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Box>
                  <TextField
                    label="Email"
                    name="mail"
                    value={values.mail}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isAdmin}
                    error={touched.mail && Boolean(errors.mail)}
                    helperText={touched.mail && errors.mail}
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isAdmin}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <TextField
                    label="Assigned Date"
                    type="date"
                    name="assignedDate"
                    value={
                      values.assignedDate
                        ? values.assignedDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
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
                    disabled={!isAdmin}
                    error={
                      touched.specialization && Boolean(errors.specialization)
                    }
                    helperText={touched.specialization && errors.specialization}
                  />
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Street"
                      name="address.street"
                      value={values.address.street || ""}
                      onChange={handleChange}
                      fullWidth
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
                      label="House Number"
                      name="address.houseNumber"
                      value={values.address.houseNumber || ""}
                      onChange={handleChange}
                      fullWidth
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
                      label="Zip Code"
                      name="address.zipCode"
                      value={values.address.zipCode || ""}
                      onChange={handleChange}
                      fullWidth
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
                  <Autocomplete
                    multiple
                    options={mockTreatmentIds}
                    getOptionLabel={(option) => option}
                    value={values.treatmentIds}
                    onChange={(event, newValue) =>
                      setFieldValue("treatmentIds", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Treatment IDs"
                        placeholder="Select Treatments"
                        fullWidth
                        disabled={!isAdmin}
                        error={
                          touched.treatmentIds && Boolean(errors.treatmentIds)
                        }
                        helperText={
                          touched.treatmentIds && errors.treatmentIds
                        }
                      />
                    )}
                  />
                  <Autocomplete
                    multiple
                    options={mockPatientIds}
                    getOptionLabel={(option) => option}
                    value={values.patientIds}
                    onChange={(event, newValue) =>
                      setFieldValue("patientIds", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Patient IDs"
                        placeholder="Select Patients"
                        fullWidth
                        disabled={!isAdmin}
                        error={touched.patientIds && Boolean(errors.patientIds)}
                        helperText={touched.patientIds && errors.patientIds}
                      />
                    )}
                  />
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    mt={4}
                  >
                    <Button type="submit" color="secondary" variant="contained">
                      Save
                    </Button>
                    <Button sx={{
              backgroundColor: colors.grey[600],
            }} onClick={handleClose}>Cancel</Button>
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
            backgroundColor:
              theme.palette.mode === "dark" ? colors.grey[700] : "white",
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 400,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4">Delete Doctor</Typography>
          <Typography>
            Please make sure that this user have been completely removed from the user authentication system first. Are you sure you want to delete the selected doctor? 
            Please confirm by toggling.
          </Typography>
          <Switch
            checked={isUuidDeleted}
            onChange={handleSwitchChange}
            color="secondary"
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={!deleteButtonEnabled}
            >
              Delete
            </Button>
            <Button sx={{
              backgroundColor: colors.grey[600],
            }}
            variant="contained"
            onClick={handleDeleteClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Doctors;