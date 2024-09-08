// import React from "react";
// import Header from "../../components/Header";
// import { Box } from "@mui/material";

// function Records() {
//   return (
//     <Box m="20px">
//       <Header title="Medical Records" subtitle="Manage your medical records" />
//       Records
//     </Box>
//   );
// }

// export default Records;

//================================================================================================================================================

// import React from "react";
// import Header from "../../components/Header";
// import { Box } from "@mui/material";
// import { Card, CardContent, Typography, Grid } from '@mui/material';
// import MedicalRecordCard from "./MedicalRecordCard ";

// function Records() {

//   const record = {
//     id: 12,
//     diagnosis: "Anemia",
//     prescription: "Ferrous Sulfate 200mg",
//     assignDate: "2024-08-19T07:45:00",
//     price: 260.00,
//     treatmentIds: [16],
//     doctorId: 112,
//     patientId: 212,
//     paymentId: 312
//   };

//   return (
//     <Box m="20px">
//       <Header title="Medical Records" subtitle="Manage your medical records" />
//       <MedicalRecordCard record={record} />
//     </Box>
//   );
// }

// export default Records;

//================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Tooltip,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
// import { tokens } from "../../theme";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
//   minWidth: 400,
// };

// const Records = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [records, setRecords] = useState(mockDataRecords);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);

//   const handleViewOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenView(true);
//   };

//   const handleEditOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenEdit(true);
//   };

//   const handleDeleteOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenDelete(true);
//   };

//   const handleEditSave = () => {
//     setRecords(
//       records.map((record) =>
//         record.id === selectedRecord.id ? selectedRecord : record
//       )
//     );
//     setOpenEdit(false);
//   };

//   const handleDeleteConfirm = () => {
//     setRecords(records.filter((record) => record.id !== selectedRecord.id));
//     setOpenDelete(false);
//   };

//   return (
//     <Box
//       m="20px"
//       p={2}
//       sx={{
//         borderRadius: 2,
//         overflowY: "auto",
//         maxHeight: "80vh",
//         backgroundColor: colors.grey[800],
//       }}
//     >
//       {records.map((record) => (
//         <Card
//           key={record.id}
//           sx={{
//             mb: 2,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: colors.grey[900],
//           }}
//         >
//           <CardContent sx={{ display: "flex", alignItems: "center" }}>
//             <Box sx={{ width: "90%" }}>
//               <Grid
//                 container
//                 rowSpacing={1}
//                 columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//               >
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Diagnosis: {record.diagnosis}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Prescription: {record.prescription}
//                   </Typography>
//                   {/* <Divider /> */}
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Treatments: {record.treatmentIds.join(", ")}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">
//                     Doctor: {record.doctorId}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">
//                     Patient: {record.patientId}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Divider sx={{ width: "65%", marginTop: "1%" }} />
//                 </Grid>
//                 <Grid size={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       paddingTop: 1,
//                     }}
//                   >
//                     <Typography variant="body2">Assigned Date:</Typography>
//                     <Typography p={1} pl={3} variant="h5">
//                       {" "}
//                       {record.assignDate}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       paddingTop: 1,
//                     }}
//                   >
//                     <Typography variant="body2">Price:</Typography>
//                     <Typography p={1} pl={2} variant="h5">
//                       {" "}
//                       {record.price}$
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>

//             {/* <Typography variant="h5">Diagnosis: {record.diagnosis}</Typography>
//             <Typography>Prescription: {record.prescription}</Typography>
//             <Typography>Assigned Date: {record.assignDate}</Typography>
//             <Typography>Price: {record.price}</Typography>
//             <Typography>Treatments: {record.treatmentIds.join(", ")}</Typography>
//             <Typography>Doctor ID: {record.doctorId}</Typography>
//             <Typography>Patient ID: {record.patientId}</Typography> */}
//             <Box
//               mt={2}
//               display="flex"
//               justifyContent="space-between"
//               height={1}
//               sx={{ width: "10%" }}
//             >
//               {/* <Tooltip title="View Record">
//                 <IconButton onClick={() => handleViewOpen(record)}>
//                   <VisibilityIcon />
//                 </IconButton>
//               </Tooltip> */}
//               <Tooltip title="Edit Record">
//                 <IconButton onClick={() => handleEditOpen(record)}>
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
//                 <IconButton onClick={() => handleDeleteOpen(record)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </CardContent>
//         </Card>
//       ))}

//       {/* View Record Modal */}
//       <Modal open={openView} onClose={() => setOpenView(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <Typography variant="h6">{selectedRecord.diagnosis}</Typography>
//               <Typography>
//                 Prescription: {selectedRecord.prescription}
//               </Typography>
//               <Typography>
//                 Assigned Date: {selectedRecord.assignDate}
//               </Typography>
//               <Typography>Price: {selectedRecord.price}</Typography>
//               <Typography>
//                 Treatments: {selectedRecord.treatmentIds.join(", ")}
//               </Typography>
//               <Typography>Doctor ID: {selectedRecord.doctorId}</Typography>
//               <Typography>Patient ID: {selectedRecord.patientId}</Typography>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Edit Record Modal */}
//       {/* <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <TextField
//                 label="Diagnosis"
//                 value={selectedRecord.diagnosis}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     diagnosis: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 label="Prescription"
//                 value={selectedRecord.prescription}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     prescription: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 label="Price"
//                 type="number"
//                 value={selectedRecord.price}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     price: e.target.value,
//                   })
//                 }
//               />
//               <Box>
//                 {mockTreatmentIds.map((treatmentId) => (
//                   <FormControlLabel
//                     key={treatmentId}
//                     control={
//                       <Checkbox
//                         checked={selectedRecord.treatmentIds.includes(
//                           treatmentId
//                         )}
//                         onChange={(e) => {
//                           const updatedTreatmentIds = e.target.checked
//                             ? [...selectedRecord.treatmentIds, treatmentId]
//                             : selectedRecord.treatmentIds.filter(
//                                 (id) => id !== treatmentId
//                               );
//                           setSelectedRecord({
//                             ...selectedRecord,
//                             treatmentIds: updatedTreatmentIds,
//                           });
//                         }}
//                       />
//                     }
//                     label={treatmentId}
//                   />
//                 ))}
//               </Box>
//               <Button variant="contained" onClick={handleEditSave}>
//                 Save Changes
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal> */}

//       <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <TextField
//                 label="Diagnosis"
//                 value={selectedRecord.diagnosis}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     diagnosis: e.target.value,
//                   })
//                 }
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Prescription"
//                 value={selectedRecord.prescription}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     prescription: e.target.value,
//                   })
//                 }
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Price"
//                 type="number"
//                 value={selectedRecord.price}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     price: e.target.value,
//                   })
//                 }
//                 fullWidth
//                 margin="normal"
//               />

//               {/* Checkbox Container */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 2,
//                   maxHeight: "150px",
//                   overflowY: "auto",
//                   marginBottom: 2,
//                 }}
//               >
//                 {mockTreatmentIds.map((treatmentId) => (
//                   <Box
//                     key={treatmentId}
//                     sx={{
//                       width: "calc(33.33% - 16px)",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={selectedRecord.treatmentIds.includes(
//                             treatmentId
//                           )}
//                           onChange={(e) => {
//                             const updatedTreatmentIds = e.target.checked
//                               ? [...selectedRecord.treatmentIds, treatmentId]
//                               : selectedRecord.treatmentIds.filter(
//                                   (id) => id !== treatmentId
//                                 );
//                             setSelectedRecord({
//                               ...selectedRecord,
//                               treatmentIds: updatedTreatmentIds,
//                             });
//                           }}
//                         />
//                       }
//                       label={treatmentId}
//                     />
//                   </Box>
//                 ))}
//               </Box>

//               <Button variant="contained" onClick={handleEditSave}>
//                 Save Changes
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           <Typography>Are you sure you want to delete this record?</Typography>
//           <Button variant="contained" onClick={handleDeleteConfirm}>
//             Confirm
//           </Button>
//           <Button variant="outlined" onClick={() => setOpenDelete(false)}>
//             Cancel
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Records;

//================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Tooltip,
//   Divider,
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
// import Grid from "@mui/material/Grid2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
// import { tokens } from "../../theme";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
//   minWidth: 400,
// };

// const Records = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [records, setRecords] = useState(mockDataRecords);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);

//   const handleViewOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenView(true);
//   };

//   const handleEditOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenEdit(true);
//   };

//   const handleDeleteOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenDelete(true);
//   };

//   const handleEditSave = () => {
//     setRecords(
//       records.map((record) =>
//         record.id === selectedRecord.id ? selectedRecord : record
//       )
//     );
//     setOpenEdit(false);
//   };

//   const handleDeleteConfirm = () => {
//     setRecords(records.filter((record) => record.id !== selectedRecord.id));
//     setOpenDelete(false);
//   };

//   const renderRecordCard = (record) => (
//     <Card
//       sx={{
//         p: 2,
//         borderRadius: 2,
//         backgroundColor: colors.grey[900],
//       }}
//     >
//       <CardContent sx={{ display: "flex", alignItems: "center" }}>
//         <Box sx={{ width: "90%" }}>
//           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//             <Grid size={12}>
//               <Typography variant="h5">Diagnosis: {record.diagnosis}</Typography>
//             </Grid>
//             <Grid size={12}>
//               <Typography variant="h5">Prescription: {record.prescription}</Typography>
//             </Grid>
//             <Grid size={12}>
//               <Typography variant="h5">Treatments: {record.treatmentIds.join(", ")}</Typography>
//             </Grid>
//             <Grid size={6}>
//               <Typography variant="h5">Doctor: {record.doctorId}</Typography>
//             </Grid>
//             <Grid size={6}>
//               <Typography variant="h5">Patient: {record.patientId}</Typography>
//             </Grid>
//             <Grid size={12}>
//               <Divider sx={{ width: "65%", marginTop: "1%" }} />
//             </Grid>
//             <Grid size={6}>
//               <Box sx={{ paddingTop: 1 }}>
//                 <Typography variant="body2">Assigned Date:</Typography>
//                 <Typography p={1} pl={3} variant="h5">
//                   {record.assignDate}
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid size={6}>
//               <Box sx={{ paddingTop: 1 }}>
//                 <Typography variant="body2">Price:</Typography>
//                 <Typography p={1} pl={2} variant="h5">
//                   {record.price}$
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         <Box mt={2} display="flex" justifyContent="space-between" height={1} sx={{ width: "10%" }}>
//           <Tooltip title="Edit Record">
//             <IconButton onClick={() => handleEditOpen(record)}>
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
//             <IconButton onClick={() => handleDeleteOpen(record)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   const columns = [
//     { field: "id", headerName: "ID", width: 100 },
//     {
//       field: "record",
//       headerName: "Medical Record",
//       width: 700,
//       renderCell: (params) => renderRecordCard(params.row),
//     },
//   ];

//     const [paginationModel, setPaginationModel] = useState({
//       page: 0,
//       pageSize: 3, // Change page size here
//     });

//     function CustomToolbar() {
//       return (
//         <GridToolbarContainer>
//           <GridToolbarColumnsButton />
//           <GridToolbarFilterButton />
//           <GridToolbarDensitySelector
//             slotProps={{ tooltip: { title: "Change density" } }}
//           />
//           <Box sx={{ flexGrow: 1 }} />
//           <GridToolbarExport
//             slotProps={{
//               tooltip: { title: "Export data" },
//               button: { variant: "outlined" },
//             }}
//           />
//         </GridToolbarContainer>
//       );
//     }

//   return (
//     <Box m="20px" p={2} sx={{ borderRadius: 2, backgroundColor: colors.grey[800] }}>
//       <DataGrid
//         rows={records}
//         columns={columns}
//         autoHeight
//         rowHeight={280}
//         pagination
//         paginationModel={paginationModel}
//         onPaginationModelChange={setPaginationModel}
//         pageSizeOptions={[5, 10, 20]}
//         slots={{
//           toolbar: CustomToolbar,
//         }}

//         sx={{ borderRadius: 2, height: "70vh", overflow: "hidden" }}
//       />

//       {/* Modals for view, edit, delete (similar to the original implementation) */}
//       {/* View Record Modal */}
//       <Modal open={openView} onClose={() => setOpenView(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <Typography variant="h6">{selectedRecord.diagnosis}</Typography>
//               <Typography>Prescription: {selectedRecord.prescription}</Typography>
//               <Typography>Assigned Date: {selectedRecord.assignDate}</Typography>
//               <Typography>Price: {selectedRecord.price}</Typography>
//               <Typography>Treatments: {selectedRecord.treatmentIds.join(", ")}</Typography>
//               <Typography>Doctor ID: {selectedRecord.doctorId}</Typography>
//               <Typography>Patient ID: {selectedRecord.patientId}</Typography>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Records;

//================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Tooltip,
//   Divider,
//   MenuItem,
//   Select,
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
// import Grid from "@mui/material/Grid2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
// import { tokens } from "../../theme";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
//   minWidth: 400,
// };

// const Records = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [records, setRecords] = useState(mockDataRecords);
//   const [filteredRecords, setFilteredRecords] = useState(mockDataRecords);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [filter, setFilter] = useState("");

//   const handleViewOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenView(true);
//   };

//   const handleEditOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenEdit(true);
//   };

//   const handleDeleteOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenDelete(true);
//   };

//   const handleEditSave = () => {
//     setRecords(
//       records.map((record) =>
//         record.id === selectedRecord.id ? selectedRecord : record
//       )
//     );
//     setOpenEdit(false);
//   };

//   const handleDeleteConfirm = () => {
//     setRecords(records.filter((record) => record.id !== selectedRecord.id));
//     setOpenDelete(false);
//   };

//   const renderRecordCard = (record) => (
//     <Card
//       sx={{
//         p: 2,
//         borderRadius: 2,
//         backgroundColor: colors.grey[900],
//       }}
//     >
//       <CardContent sx={{ display: "flex", alignItems: "center" }}>
//         <Box sx={{ width: "90%" }}>
//           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//             <Grid size={12}>
//               <Typography variant="h5">Diagnosis: {record.diagnosis}</Typography>
//             </Grid>
//             <Grid size={12}>
//               <Typography variant="h5">Prescription: {record.prescription}</Typography>
//             </Grid>
//             <Grid size={12}>
//               <Typography variant="h5">Treatments: {record.treatmentIds.join(", ")}</Typography>
//             </Grid>
//             <Grid size={6}>
//               <Typography variant="h5">Doctor: {record.doctorId}</Typography>
//             </Grid>
//             <Grid size={6}>
//               <Typography variant="h5">Patient: {record.patientId}</Typography>
//             </Grid>
//             <Grid size={12}>
//               <Divider sx={{ width: "65%", marginTop: "1%" }} />
//             </Grid>
//             <Grid size={6}>
//               <Box sx={{ paddingTop: 1 }}>
//                 <Typography variant="body2">Assigned Date:</Typography>
//                 <Typography p={1} pl={3} variant="h5">
//                   {record.assignDate}
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid size={6}>
//               <Box sx={{ paddingTop: 1 }}>
//                 <Typography variant="body2">Price:</Typography>
//                 <Typography p={1} pl={2} variant="h5">
//                   {record.price}$
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         <Box mt={2} display="flex" justifyContent="space-between" height={1} sx={{ width: "10%" }}>
//           <Tooltip title="Edit Record">
//             <IconButton onClick={() => handleEditOpen(record)}>
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
//             <IconButton onClick={() => handleDeleteOpen(record)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   const handleFilterChange = (event) => {
//     const value = event.target.value;
//     setFilter(value);

//     // Filter records based on diagnosis, prescription, or patient ID
//     const filtered = records.filter(
//       (record) =>
//         record.diagnosis.toLowerCase().includes(value.toLowerCase()) ||
//         record.prescription.toLowerCase().includes(value.toLowerCase()) ||
//         record.patientId.toString().includes(value.toLowerCase())
//     );
//     setFilteredRecords(filtered);
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 100 },
//     {
//       field: "record",
//       headerName: "Medical Record",
//       width: 700,
//       renderCell: (params) => renderRecordCard(params.row),
//     },
//   ];

//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 3,
//   });

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer>
//         <GridToolbarColumnsButton />
//         <GridToolbarFilterButton />
//         <GridToolbarDensitySelector slotProps={{ tooltip: { title: "Change density" } }} />
//         <Box sx={{ flexGrow: 1 }} />
//         <TextField
//           label="Filter by Diagnosis/Prescription/Patient"
//           variant="outlined"
//           value={filter}
//           onChange={handleFilterChange}
//           size="small"
//           sx={{ marginRight: 2 }}
//         />
//         <GridToolbarExport slotProps={{ tooltip: { title: "Export data" }, button: { variant: "outlined" } }} />
//       </GridToolbarContainer>
//     );
//   }

//   return (
//     <Box m="20px" p={2} sx={{ borderRadius: 2, backgroundColor: colors.grey[800] }}>
//       <DataGrid
//         rows={filteredRecords}
//         columns={columns}
//         autoHeight
//         rowHeight={280}
//         pagination
//         paginationModel={paginationModel}
//         onPaginationModelChange={setPaginationModel}
//         pageSizeOptions={[5, 10, 20]}
//         slots={{
//           toolbar: CustomToolbar,
//         }}
//         sx={{ borderRadius: 2, height: "70vh", overflow: "hidden" }}
//       />

//       {/* View Record Modal */}
//       <Modal open={openView} onClose={() => setOpenView(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <Typography variant="h6">{selectedRecord.diagnosis}</Typography>
//               <Typography>Prescription: {selectedRecord.prescription}</Typography>
//               <Typography>Assigned Date: {selectedRecord.assignDate}</Typography>
//               <Typography>Price: {selectedRecord.price}</Typography>
//               <Typography>Treatments: {selectedRecord.treatmentIds.join(", ")}</Typography>
//               <Typography>Doctor ID: {selectedRecord.doctorId}</Typography>
//               <Typography>Patient ID: {selectedRecord.patientId}</Typography>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Records;

//================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Tooltip,
//   Divider,
//   useTheme,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
// import { tokens } from "../../theme";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
//   minWidth: 400,
// };

// const Records = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [records, setRecords] = useState(mockDataRecords);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [filterText, setFilterText] = useState("");

//   // Handle opening modals
//   const handleViewOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenView(true);
//   };

//   const handleEditOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenEdit(true);
//   };

//   const handleDeleteOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenDelete(true);
//   };

//   const handleEditSave = () => {
//     setRecords(
//       records.map((record) =>
//         record.id === selectedRecord.id ? selectedRecord : record
//       )
//     );
//     setOpenEdit(false);
//   };

//   const handleDeleteConfirm = () => {
//     setRecords(records.filter((record) => record.id !== selectedRecord.id));
//     setOpenDelete(false);
//   };

//   // Filter records based on user input
//   const filteredRecords = records.filter(
//     (record) =>
//       record.diagnosis.toLowerCase().includes(filterText.toLowerCase()) ||
//       record.prescription.toLowerCase().includes(filterText.toLowerCase()) ||
//       record.doctorId.toString().includes(filterText) ||
//       record.patientId.toString().includes(filterText) ||
//       record.price.toString().includes(filterText) ||
//       record.assignDate.toString().includes(filterText)
//   );

//   return (
//     <Box
//       m="20px"
//       p={2}
//       sx={{
//         borderRadius: 2,
//         overflowY: "auto",
//         maxHeight: "80vh",
//         backgroundColor: colors.grey[800],
//       }}
//     >
//       {/* Mini Header Bar */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 2,
//           paddingBottom: 2,
//           borderBottom: `1px solid ${colors.grey[700]}`,
//         }}
//       >
//         <Typography variant="h5">Medical Records</Typography>
//         <TextField
//           label="Filter records"
//           variant="outlined"
//           size="small"
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           sx={{ backgroundColor: colors.grey[900], borderRadius: 1 }}
//         />
//       </Box>

//       {/* Record List */}
//       {filteredRecords.map((record) => (
//         <Card
//           key={record.id}
//           sx={{
//             mb: 2,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: colors.grey[900],
//           }}
//         >
//           <CardContent sx={{ display: "flex", alignItems: "center" }}>
//             <Box sx={{ width: "90%" }}>
//               <Grid
//                 container
//                 rowSpacing={1}
//                 columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//               >
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Diagnosis: {record.diagnosis}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Prescription: {record.prescription}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Treatments: {record.treatmentIds.join(", ")}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">
//                     Doctor: {record.doctorId}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">
//                     Patient: {record.patientId}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Divider sx={{ width: "65%", marginTop: "1%" }} />
//                 </Grid>
//                 <Grid size={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       paddingTop: 1,
//                     }}
//                   >
//                     <Typography variant="body2">Assigned Date:</Typography>
//                     <Typography p={1} pl={3} variant="h5">
//                       {record.assignDate}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       paddingTop: 1,
//                     }}
//                   >
//                     <Typography variant="body2">Price:</Typography>
//                     <Typography p={1} pl={2} variant="h5">
//                       {record.price}$
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>

//             <Box
//               mt={2}
//               display="flex"
//               justifyContent="space-between"
//               height={1}
//               sx={{ width: "10%" }}
//             >
//               <Tooltip title="Edit Record">
//                 <IconButton onClick={() => handleEditOpen(record)}>
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
//                 <IconButton onClick={() => handleDeleteOpen(record)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default Records;

//================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Tooltip,
//   Divider,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   useTheme,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
// import { tokens } from "../../theme";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
//   minWidth: 400,
// };

// const Records = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [records, setRecords] = useState(mockDataRecords);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);

//   const [filterText, setFilterText] = useState("");

//   // Handle View, Edit, Delete modals
//   const handleViewOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenView(true);
//   };

//   const handleEditOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenEdit(true);
//   };

//   const handleDeleteOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenDelete(true);
//   };

//   const handleEditSave = () => {
//     setRecords(
//       records.map((record) =>
//         record.id === selectedRecord.id ? selectedRecord : record
//       )
//     );
//     setOpenEdit(false);
//   };

//   const handleDeleteConfirm = () => {
//     setRecords(records.filter((record) => record.id !== selectedRecord.id));
//     setOpenDelete(false);
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

//   const handleRecordsPerPageChange = (event) => {
//     setRecordsPerPage(event.target.value);
//     setCurrentPage(1); // Reset to first page when page size changes
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => {
//       const totalPages = Math.ceil(records.length / recordsPerPage);
//       return Math.min(prevPage + 1, totalPages);
//     });
//   };

//   // Filter records based on user input
//   const filteredRecords = records.filter(
//     (record) =>
//       record.diagnosis.toLowerCase().includes(filterText.toLowerCase()) ||
//       record.prescription.toLowerCase().includes(filterText.toLowerCase()) ||
//       record.doctorId.toString().includes(filterText) ||
//       record.patientId.toString().includes(filterText) ||
//       record.price.toString().includes(filterText) ||
//       record.assignDate.toString().includes(filterText)
//   );

//   return (
//     <Box
//       m="20px"
//       p={2}
//       sx={{
//         borderRadius: 2,
//         overflowY: "auto",
//         maxHeight: "80vh",
//         backgroundColor: colors.grey[800],
//       }}
//     >

// {/* Mini Header Bar */}
//        <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 2,
//           paddingBottom: 2,
//           borderBottom: `1px solid ${colors.grey[700]}`,
//         }}
//       >
//       <Box
//         mb={2}
//         display="flex"
//         // justifyContent="space-between"
//         alignItems="center"
//       >
//         <Typography variant="body2">
//           Showing {indexOfFirstRecord + 1} to{" "}
//           {Math.min(indexOfLastRecord, records.length)} of {records.length}{" "}
//           records
//         </Typography>
//         <Box display="flex" alignItems="center" gap={2}>
//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel id="records-per-page-label">Records per page</InputLabel>
//             <Select
//               labelId="records-per-page-label"
//               value={recordsPerPage}
//               onChange={handleRecordsPerPageChange}
//               label="Records per page"
//             >
//               <MenuItem value={2}>2</MenuItem>
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={15}>15</MenuItem>
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             disabled={currentPage === 1}
//             onClick={handlePreviousPage}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="contained"
//             disabled={indexOfLastRecord >= records.length}
//             onClick={handleNextPage}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//       <TextField
//           label="Filter records"
//           variant="outlined"
//           size="small"
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           sx={{ backgroundColor: colors.grey[900], borderRadius: 1 }}
//         />
//       </Box>

//       {filteredRecords.map((record) => (
//         <Card
//           key={record.id}
//           sx={{
//             mb: 2,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: colors.grey[900],
//           }}
//         >
//           <CardContent sx={{ display: "flex", alignItems: "center" }}>
//             <Box sx={{ width: "90%" }}>
//               <Grid
//                 container
//                 rowSpacing={1}
//                 columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//               >
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Diagnosis: {record.diagnosis}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Prescription: {record.prescription}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Treatments: {record.treatmentIds.join(", ")}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">Doctor: {record.doctorId}</Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">Patient: {record.patientId}</Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Divider sx={{ width: "65%", marginTop: "1%" }} />
//                 </Grid>
//                 <Grid size={6}>
//                   <Box sx={{ display: "flex", flexDirection: "column", paddingTop: 1 }}>
//                     <Typography variant="body2">Assigned Date:</Typography>
//                     <Typography p={1} pl={3} variant="h5">
//                       {record.assignDate}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={6}>
//                   <Box sx={{ display: "flex", flexDirection: "column", paddingTop: 1 }}>
//                     <Typography variant="body2">Price:</Typography>
//                     <Typography p={1} pl={2} variant="h5">
//                       {record.price}$
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>

//             <Box mt={2} display="flex" justifyContent="space-between" height={1} sx={{ width: "10%" }}>
//               <Tooltip title="Edit Record">
//                 <IconButton onClick={() => handleEditOpen(record)}>
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
//                 <IconButton onClick={() => handleDeleteOpen(record)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </CardContent>
//         </Card>
//       ))}

//       {/* View Modal */}
//       <Modal open={openView} onClose={() => setOpenView(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <Typography variant="h6">{selectedRecord.diagnosis}</Typography>
//               <Typography>Prescription: {selectedRecord.prescription}</Typography>
//               <Typography>Assigned Date: {selectedRecord.assignDate}</Typography>
//               <Typography>Price: {selectedRecord.price}</Typography>
//               <Typography>Treatments: {selectedRecord.treatmentIds.join(", ")}</Typography>
//               <Typography>Doctor ID: {selectedRecord.doctorId}</Typography>
//               <Typography>Patient ID: {selectedRecord.patientId}</Typography>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <TextField
//                 label="Diagnosis"
//                 value={selectedRecord.diagnosis}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     diagnosis: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 label="Prescription"
//                 value={selectedRecord.prescription}
//                 onChange={(e) =>
//                   setSelectedRecord({
//                     ...selectedRecord,
//                     prescription: e.target.value,
//                   })
//                 }
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={selectedRecord.treatmentIds.includes("Treatment A")}
//                     onChange={(e) => {
//                       const treatmentIds = selectedRecord.treatmentIds.includes(
//                         "Treatment A"
//                       )
//                         ? selectedRecord.treatmentIds.filter(
//                             (id) => id !== "Treatment A"
//                           )
//                         : [...selectedRecord.treatmentIds, "Treatment A"];
//                       setSelectedRecord({
//                         ...selectedRecord,
//                         treatmentIds,
//                       });
//                     }}
//                   />
//                 }
//                 label="Treatment A"
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleEditSave}
//               >
//                 Save
//               </Button>
//               <Button variant="outlined" onClick={() => setOpenEdit(false)}>
//                 Cancel
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Delete Modal */}
//       <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           <Typography variant="h6">Confirm Delete</Typography>
//           <Typography>
//             Are you sure you want to delete this medical record?
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleDeleteConfirm}
//           >
//             Delete
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => setOpenDelete(false)}
//             sx={{ ml: 2 }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Records;

//================================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Tooltip,
//   Divider,
//   Select,
//   MenuItem,
//   useTheme,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { mockDataRecords, mockTreatmentIds } from "../../data/mockData";
// import { tokens } from "../../theme";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
//   minWidth: 400,
// };

// const Records = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [records, setRecords] = useState(mockDataRecords);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [openView, setOpenView] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   const totalPages = Math.ceil(records.length / pageSize);

//   const handleViewOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenView(true);
//   };

//   const handleEditOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenEdit(true);
//   };

//   const handleDeleteOpen = (record) => {
//     setSelectedRecord(record);
//     setOpenDelete(true);
//   };

//   const handleEditSave = () => {
//     setRecords(
//       records.map((record) =>
//         record.id === selectedRecord.id ? selectedRecord : record
//       )
//     );
//     setOpenEdit(false);
//   };

//   const handleDeleteConfirm = () => {
//     setRecords(records.filter((record) => record.id !== selectedRecord.id));
//     setOpenDelete(false);
//   };

//   // Pagination logic
//   const handlePageSizeChange = (event) => {
//     setPageSize(event.target.value);
//     setCurrentPage(1); // Reset to first page when page size changes
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const currentRecords = records.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <Box
//       m="20px"
//       p={2}
//       sx={{
//         borderRadius: 2,
//         overflowY: "auto",
//         maxHeight: "80vh",
//         backgroundColor: colors.grey[800],
//       }}
//     >
//       {currentRecords.map((record) => (
//         <Card
//           key={record.id}
//           sx={{
//             mb: 2,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: colors.grey[900],
//           }}
//         >
//           <CardContent sx={{ display: "flex", alignItems: "center" }}>
//             <Box sx={{ width: "90%" }}>
//               <Grid
//                 container
//                 rowSpacing={1}
//                 columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//               >
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Diagnosis: {record.diagnosis}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Prescription: {record.prescription}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Typography variant="h5">
//                     Treatments: {record.treatmentIds.join(", ")}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">
//                     Doctor: {record.doctorId}
//                   </Typography>
//                 </Grid>
//                 <Grid size={6}>
//                   <Typography variant="h5">
//                     Patient: {record.patientId}
//                   </Typography>
//                 </Grid>
//                 <Grid size={12}>
//                   <Divider sx={{ width: "65%", marginTop: "1%" }} />
//                 </Grid>
//                 <Grid size={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       paddingTop: 1,
//                     }}
//                   >
//                     <Typography variant="body2">Assigned Date:</Typography>
//                     <Typography p={1} pl={3} variant="h5">
//                       {record.assignDate}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       paddingTop: 1,
//                     }}
//                   >
//                     <Typography variant="body2">Price:</Typography>
//                     <Typography p={1} pl={2} variant="h5">
//                       {record.price}$
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>

//             <Box
//               mt={2}
//               display="flex"
//               justifyContent="space-between"
//               height={1}
//               sx={{ width: "10%" }}
//             >
//               <Tooltip title="Edit Record">
//                 <IconButton onClick={() => handleEditOpen(record)}>
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip sx={{ marginRight: 4 }} title="Delete Record">
//                 <IconButton onClick={() => handleDeleteOpen(record)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Bottom Pagination Bar */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mt={3}
//         p={2}
//         sx={{
//           borderTop: `1px solid ${colors.grey[600]}`,
//           backgroundColor: colors.grey[700],
//           borderRadius: 2,
//         }}
//       >
//         {/* Dropdown for selecting records per page */}
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Records per page</InputLabel>
//           <Select value={pageSize} onChange={handlePageSizeChange}>
//             <MenuItem value={2}>2</MenuItem>
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={15}>15</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Pagination info */}
//         <Typography>
//           Showing {Math.min((currentPage - 1) * pageSize + 1, records.length)}-
//           {Math.min(currentPage * pageSize, records.length)} of {records.length}{" "}
//           records
//         </Typography>

//         {/* Pagination controls */}
//         <Box>
//           <IconButton
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <IconButton
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Modals (same as before)... */}
//       {/* View Record Modal */}
//       <Modal open={openView} onClose={() => setOpenView(false)}>
//         <Box p={4} sx={{ ...modalStyle }}>
//           {selectedRecord && (
//             <>
//               <Typography variant="h6">{selectedRecord.diagnosis}</Typography>
//               <Typography>
//                 Prescription: {selectedRecord.prescription}
//               </Typography>
//               <Typography>
//                 Assigned Date: {selectedRecord.assignDate}
//               </Typography>
//               <Typography>Price: {selectedRecord.price}</Typography>
//               <Typography>
//                 Treatments: {selectedRecord.treatmentIds.join(", ")}
//               </Typography>
//               <Typography>Doctor ID: {selectedRecord.doctorId}</Typography>
//               <Typography>Patient ID: {selectedRecord.patientId}</Typography>
//             </>
//           )}
//         </Box>
//       </Modal>

//     </Box>
//   );
// };

// export default Records;

//================================================================================================================================================

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 400,
};

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [records, setRecords] = useState(mockDataRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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

  return (
    <Box m="20px">
      <Header title="MEDICAL RECORDS" subtitle="Manage your medical records" />
      <Box
        m="20px"
        p={2}
        sx={{
          borderRadius: 2,
          maxHeight: "77vh",
          // backgroundColor: colors.grey[800],
        }}
      >
        {/* Filter Record Header Bar*/}
        <Box
          sx={{
            mb: 2,
            pb: 2,
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            borderBottom: `1px solid ${colors.grey[700]}`,
          }}
        >
          {/* <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="records-per-page-label">Records per page</InputLabel>
          <Select
            labelId="records-per-page-label"
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
            variant="standard"
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl> */}
          <TextField
            label="Filter records"
            variant="outlined"
            size="small"
            value={filterText}
            onChange={handleFilterChange}
            // sx={{ flexGrow: 1 }}
            sx={{ backgroundColor: colors.primary[400], borderRadius: 1 }}
          />
          <SearchIcon sx={{ marginLeft: 1 }} />
        </Box>

        {/* Mini Header Bar */}

        {/* //       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 2,
//           paddingBottom: 2,
//           borderBottom: `1px solid ${colors.grey[700]}`,
//         }}
//       >
//         <Typography variant="h5">Medical Records</Typography>
//         <TextField
//           label="Filter records"
//           variant="outlined"
//           size="small"
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           sx={{ backgroundColor: colors.grey[900], borderRadius: 1 }}
//         />
//       </Box> */}

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
                      <Divider sx={{ width: "65%", marginTop: "1%" }} />
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
                          {" "}
                          {record.assignDate}
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
                          {" "}
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

        {/* Pagination  ted Bar */}
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
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="records-per-page-label">
              Records per page
            </InputLabel>
            <Select
              labelId="records-per-page-label"
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
              variant="standard"
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
          <Typography>
            {`Showing ${paginatedRecords.length} of ${filteredRecords.length} records`}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              sx={{ color: colors.grey[100] }}
            >
              <ArrowBackIcon />
            </Button>
            <Typography
              sx={{ mx: 2 }}
            >{`Page ${currentPage} of ${totalPages}`}</Typography>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              sx={{ color: colors.grey[100] }}
            >
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>

        {/* View Record Modal */}
        <Modal open={openView} onClose={() => setOpenView(false)}>
          <Box p={4} sx={{ ...modalStyle }}>
            {selectedRecord && (
              <>
                <Typography variant="h6">{selectedRecord.diagnosis}</Typography>
                <Typography>
                  Prescription: {selectedRecord.prescription}
                </Typography>
                <Typography>
                  Assigned Date: {selectedRecord.assignDate}
                </Typography>
                <Typography>Price: {selectedRecord.price}</Typography>
                <Typography>
                  Treatments: {selectedRecord.treatmentIds.join(", ")}
                </Typography>
                <Typography>Doctor ID: {selectedRecord.doctorId}</Typography>
                <Typography>Patient ID: {selectedRecord.patientId}</Typography>
              </>
            )}
          </Box>
        </Modal>

        {/* Edit Record Modal */}
        <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
          <Box
            p={4}
            sx={{ ...modalStyle, backgroundColor: colors.primary[400] }}
          >
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
                {/* Checkbox Container */}
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
                  sx={{
                    // color: colors.greenAccent[400]
                    backgroundColor: colors.greenAccent[600],
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
            <Typography>
              Are you sure you want to delete this record?
            </Typography>
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
    </Box>
  );
};

export default Records;
