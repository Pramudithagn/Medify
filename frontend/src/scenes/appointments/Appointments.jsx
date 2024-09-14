// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
// import { formatDate } from "@fullcalendar/core/index.js";

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [currentEvents, setCurrentEvents] = useState([]);

//   const handleDateClick = (selected) => {
//     const title = prompt("Please enter a new title for your appointment");
//     const calendarApi = selected.view.calendar;
//     calendarApi.unselect();

//     if (title) {
//       calendarApi.addEvent({
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.startStr,
//         end: selected.endStr,
//         allDay: selected.allDay,
//       });
//     }
//   };

//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the appointment '${selected.event.title}'`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="You can manage your appointments here" />

//       <Box display="flex" justifyContent="space-between">
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments list</Typography>
//           <Divider sx={{mt:1, backgroundColor: colors.grey[500]}}/>
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventsSet={(events) => setCurrentEvents(events)}
//             initialEvents={[
//               {
//                 id: "12315",
//                 title: "All-day appointment",
//                 date: "2022-09-14",
//               },
//               {
//                 id: "5123",
//                 title: "Timed appointment",
//                 date: "2022-09-28",
//               },
//             ]}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Appointments;

//===============================================================================================================================================

// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { formatDate } from "@fullcalendar/core/index.js";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   useTheme
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";

// // Mock data for patients and doctors
// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [{ id: 101, name: "Dr. John Specialist" }, { id: 102, name: "Dr. Jane Expert" }],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [currentEvents, setCurrentEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     patientId: null,
//     doctorId: null,
//   });

//   // Handle create modal open/close
//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => {
//     setSelectedAppointment(null)
//     setCreateModalOpen(false);
//   }

//   console.log(currentEvents)
//   // Handle delete modal open/close
//   const openDeleteModal = (event) => {
//     // setSelectedEvent(event);
//     setDeleteModalOpen(true);
//   };
//   const closeDeleteModal = () => {
//       setSelectedAppointment(null)
//       setDeleteModalOpen(false);
//     }

//   // Handle form field changes for new appointment
//   const handleNewAppointmentChange = (field, value) => {
//     setNewAppointment((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleDateClick = (selected) => {
//     setSelectedAppointment(selected)
//     openCreateModal();
//   };

//   const handleEventClick = (selected) => {
//     setSelectedAppointment(selected)
//     openDeleteModal(selected.event);
//   };

//   const handleCreateAppointment = () => {
//     const calendarApi = selectedAppointment.view.calendar;
//     calendarApi.unselect();
//     if (newAppointment.title && newAppointment.patientId && newAppointment.doctorId && selectedAppointment !== null) {
//           const title = newAppointment.title;

//       calendarApi.addEvent({
//                 id: `${selectedAppointment.dateStr}-${title}`,
//                 title,
//                 start: selectedAppointment.startStr,
//                 end: selectedAppointment.endStr,
//                 allDay: selectedAppointment.allDay,
//               });

//       const newEvent = {
//         id: `${newAppointment.title}-${newAppointment.patientId}`,
//         title: newAppointment.title,
//         // start: new Date(),
//         // allDay: true,
//         start: selectedAppointment.startStr,
//         end: selectedAppointment.endStr,
//         allDay: selectedAppointment.allDay,

//       };
//       // setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
//       closeCreateModal();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedAppointment) {
//       // setCurrentEvents((prevEvents) =>
//       //   prevEvents.filter((event) => event.id !== selectedAppointment.id)
//       // );
//       selectedAppointment.event.remove();
//       setSelectedAppointment(null)
//       closeDeleteModal();
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="You can manage your appointments here" />

//       <Box display="flex" justifyContent="space-between">
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments list</Typography>
//           <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventsSet={(events) => setCurrentEvents(events)}
//           />
//         </Box>
//       </Box>

//       {/* Create Appointment Modal */}
//       <Dialog open={isCreateModalOpen} onClose={closeCreateModal}>
//         <DialogTitle>Create New Appointment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={newAppointment.title}
//             onChange={(e) => handleNewAppointmentChange("title", e.target.value)}
//           />
//           <Autocomplete
//             options={mockPatients}
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) => handleNewAppointmentChange("patientId", value?.id)}
//             renderInput={(params) => (
//               <TextField {...params} label="Select Patient" margin="dense" fullWidth />
//             )}
//           />
//           <Autocomplete
//             options={newAppointment.patientId ? mockDoctors[newAppointment.patientId] : []}
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) => handleNewAppointmentChange("doctorId", value?.id)}
//             renderInput={(params) => (
//               <TextField {...params} label="Select Doctor" margin="dense" fullWidth />
//             )}
//             disabled={!newAppointment.patientId}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeCreateModal}>Cancel</Button>
//           <Button onClick={handleCreateAppointment} variant="contained" color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Appointment Modal */}
//       <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the appointment '{selectedAppointment?.title}'?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDeleteModal}>Cancel</Button>
//           <Button onClick={handleDeleteAppointment} variant="contained" color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Appointments;

//===============================================================================================================================================

// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   useTheme,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
// import { formatDate } from "@fullcalendar/core/index.js";
// import { mockDataAppointments } from "../../data/mockData";

// // some Mock data for patients and doctors
// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [
//     { id: 101, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [updatedEventInfo, setUpdatedEventInfo] = useState(null);
//   const [currentEvents, setCurrentEvents] = useState([]);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     patientId: null,
//     doctorId: null,
//   });

//   useEffect(() => {
//     setCurrentEvents(mockDataAppointments)
//         // dispatch(setEvents(mockDataAppointments));
//         console.log(currentEvents);
//       }, [])

//   // Handle create modal open/close
//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => {
//     setSelectedAppointment(null);
//     setCreateModalOpen(false);
//   };

//   // Handle delete modal open/close
//   const openDeleteModal = (event) => {
//     setSelectedEvent(event);
//     setDeleteModalOpen(true);
//   };
//   const closeDeleteModal = () => {
//     setSelectedEvent(null);
//     setDeleteModalOpen(false);
//   };

//   // Handle update modal open/close
//   const openUpdateModal = (info) => {
//     setUpdatedEventInfo(info);
//     setUpdateModalOpen(true);
//   };
//   const closeUpdateModal = () => {
//     if (updatedEventInfo) {
//       updatedEventInfo.revert(); // Revert the event change
//     }
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   // Handle form field changes when new appointment makeing
//   const handleNewAppointmentChange = (field, value) => {
//     setNewAppointment((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleDateClick = (selected) => {
//     setSelectedAppointment(selected);
//     openCreateModal();
//   };

//   const handleEventClick = (selected) => {
//     setSelectedEvent(selected.event);
//     openDeleteModal(selected.event);
//   };

//   const handleCreateAppointment = () => {
//     const calendarApi = selectedAppointment.view.calendar;
//     calendarApi.unselect();
//     if (
//       newAppointment.title &&
//       newAppointment.patientId &&
//       newAppointment.doctorId &&
//       selectedAppointment !== null
//     ) {
//       const title = newAppointment.title;

//       calendarApi.addEvent({
//         id: `${selectedAppointment.dateStr}-${title}`,
//         title,
//         start: selectedAppointment.startStr,
//         end: selectedAppointment.endStr,
//         allDay: selectedAppointment.allDay,
//       });

//       closeCreateModal();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedEvent) {
//       selectedEvent.remove();
//       setSelectedEvent(null);
//       closeDeleteModal();
//     }
//   };

//   // Handle event change (toupdate)
//   const handleEventChange = (info) => {
//     const oldStart = formatDate(info.oldEvent.start, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const oldEnd = formatDate(info.oldEvent.end, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const newStart = formatDate(info.event.start, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const newEnd = formatDate(info.event.end, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     console.log("Old Start: ", oldStart, "Old End: ", oldEnd);
//     console.log("New Start: ", newStart, "New End: ", newEnd);

//     // Show update confirmation modal
//     openUpdateModal(info);
//   };

//   const handleConfirmUpdate = () => {
//     // Confirm update m(event already updated in calendar)
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="Manage your appointments here" />

//       <Box display="flex" justifyContent="space-between">
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments list</Typography>
//           <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventChange={handleEventChange}
//             eventsSet={(events) => setCurrentEvents(events)}
//           />
//         </Box>
//       </Box>

//       {/* Create Appointment Modal */}
//       <Dialog
//         open={isCreateModalOpen}
//         onClose={closeCreateModal}
//         sx={{
//           "& .MuiDialog-paper": {
//             backgroundColor: colors.primary[800],
//             width: "20%",
//           },
//         }}
//       >
//         <DialogTitle fontSize={17} width="70%" ml="15%">
//           Create New Appointment
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={newAppointment.title}
//             onChange={(e) =>
//               handleNewAppointmentChange("title", e.target.value)
//             }
//           />
//           <Autocomplete
//             options={mockPatients}
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) =>
//               handleNewAppointmentChange("patientId", value?.id)
//             }
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Patient"
//                 margin="dense"
//                 fullWidth
//               />
//             )}
//           />
//           <Autocomplete
//             options={
//               newAppointment.patientId
//                 ? mockDoctors[newAppointment.patientId]
//                 : []
//             }
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) =>
//               handleNewAppointmentChange("doctorId", value?.id)
//             }
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Doctor"
//                 margin="dense"
//                 fullWidth
//               />
//             )}
//             disabled={!newAppointment.patientId}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Box
//             sx={{ display: "flex", justifyContent: "center" }}
//             width="100%"
//             gap={2}
//             mb={3}
//           >
//             <Button
//               onClick={handleCreateAppointment}
//               variant="contained"
//               color="secondary"
//             >
//               Create
//             </Button>
//             <Button
//               onClick={closeCreateModal}
//               variant="contained"
//               sx={{
//                 backgroundColor: colors.grey[600],
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Appointment Modal */}
//       <Dialog
//         open={isDeleteModalOpen}
//         onClose={closeDeleteModal}
//         sx={{
//           "& .MuiDialog-paper": {
//             backgroundColor: colors.primary[400],
//           },
//         }}
//       >
//         <DialogTitle fontSize={17} width="50%" ml="25%">
//           Confirm Delete
//         </DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the appointment '
//             {selectedEvent?.title}'?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Box
//             sx={{ display: "flex", justifyContent: "center" }}
//             width="100%"
//             gap={2}
//             mb={3}
//           >
//             <Button
//               onClick={handleDeleteAppointment}
//               variant="contained"
//               color="error"
//             >
//               Delete
//             </Button>
//             <Button
//               onClick={closeDeleteModal}
//               variant="contained"
//               sx={{
//                 backgroundColor: colors.grey[600],
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </DialogActions>
//       </Dialog>
//       {/* Update Confirmation Modal */}
//       <Dialog
//         open={isUpdateModalOpen}
//         onClose={closeUpdateModal}
//         sx={{
//           "& .MuiDialog-paper": {
//             backgroundColor: colors.primary[800],
//           },
//         }}
//       >
//         <DialogTitle fontSize={17} width="70%" ml="15%">
//           Confirm Event Update
//         </DialogTitle>
//         <DialogContent>
//           <Typography>
//             {/* Old Start: {formatDate(updatedEventInfo?.oldEvent?.start, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}<br />
//         Old End: {formatDate(updatedEventInfo?.oldEvent?.end, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}<br /> */}
//             New Start Date & Time :{" "}
//             {formatDate(updatedEventInfo?.event?.start, {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//             <br />
//             New End Date & Time :{" "}
//             {formatDate(updatedEventInfo?.event?.end, {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Box
//             sx={{ display: "flex", justifyContent: "center" }}
//             width="100%"
//             gap={2}
//             mb={3}
//           >
//             <Button
//               onClick={handleConfirmUpdate}
//               variant="contained"
//               color="secondary"
//             >
//               Confirm
//             </Button>
//             <Button
//               onClick={closeUpdateModal}
//               variant="contained"
//               sx={{
//                 backgroundColor: colors.grey[600],
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Appointments;

//===============================================================================================================================================

// // src/pages/Appointments.js
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   useTheme,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
// import { formatDate } from "@fullcalendar/core";
// import { mockDataAppointments } from "../../data/mockData";
// import {
//   setAppointments,
//   addAppointment,
//   updateAppointment,
//   removeAppointment,
// } from "../../features/appointmentSlice";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Add, Edit, Delete } from "@mui/icons-material";

// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [
//     { id: 101, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();
//   const appointments = useSelector((state) => state.appointment);

//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [updatedEventInfo, setUpdatedEventInfo] = useState(null);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     patientId: null,
//     doctorId: null,
//     duration: 30,
//     startTime: null,
//   });

//   useEffect(() => {
//     dispatch(setAppointments(mockDataAppointments));
//   }, [dispatch]);

//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => {
//     setSelectedAppointment(null);
//     setCreateModalOpen(false);
//   };

//   const openDeleteModal = (event) => {
//     setSelectedEvent(event);
//     setDeleteModalOpen(true);
//   };
//   const closeDeleteModal = () => {
//     setSelectedEvent(null);
//     setDeleteModalOpen(false);
//   };

//   const openUpdateModal = (info) => {
//     setUpdatedEventInfo(info);
//     setUpdateModalOpen(true);
//   };
//   const closeUpdateModal = () => {
//     if (updatedEventInfo) {
//       updatedEventInfo.revert();
//     }
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   const handleNewAppointmentChange = (field, value) => {
//     setNewAppointment((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleDateClick = (selected) => {
//     setSelectedAppointment(selected);
//     openCreateModal();
//   };

//   const handleEventClick = (selected) => {
//     setSelectedEvent(selected.event);
//     openDeleteModal(selected.event);
//   };

//   const handleCreateAppointment = () => {
//     if (
//       newAppointment.title &&
//       newAppointment.patientId &&
//       newAppointment.doctorId &&
//       newAppointment.startTime &&
//       selectedAppointment !== null
//     ) {
//       const endTime = new Date(newAppointment.startTime);
//       endTime.setMinutes(endTime.getMinutes() + newAppointment.duration);

//       const newEvent = {
//         id: `${selectedAppointment.dateStr}-${newAppointment.title}`,
//         title: newAppointment.title,
//         start: newAppointment.startTime.toISOString(),
//         end: endTime.toISOString(),
//         allDay: selectedAppointment.allDay,
//       };

//       dispatch(addAppointment(newEvent));
//       closeCreateModal();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedEvent) {
//       dispatch(removeAppointment(selectedEvent.id));
//       setSelectedEvent(null);
//       closeDeleteModal();
//     }
//   };

//   const handleEventChange = (info) => {
//     openUpdateModal(info);
//   };

//   const handleConfirmUpdate = () => {
//     if (updatedEventInfo) {
//       const updatedEvent = {
//         ...updatedEventInfo.event.toPlainObject(),
//         start: updatedEventInfo.event.startStr,
//         end: updatedEventInfo.event.endStr,
//       };
//       dispatch(updateAppointment(updatedEvent));
//     }
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="Manage your appointments here" />
//       <Box display="flex" justifyContent="space-between" mb="20px">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={openCreateModal}
//           startIcon={<Add />}
//         >
//           Create Appointment
//         </Button>
//       </Box>
//       <Box display="flex" justifyContent="space-between">
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments list</Typography>
//           <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
//           <List>
//             {appointments.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//                 secondaryAction={
//                   <Box>
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => openUpdateModal({ event })}>
//                         <Edit />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton onClick={() => openDeleteModal(event)}>
//                         <Delete />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 }
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventChange={handleEventChange}
//             // eventsSet={(events) =>
//             //   dispatch(
//             //     setAppointments(events.map((event) => event.toPlainObject()))
//             //   )
//             // }
//             events={appointments}
//           />
//         </Box>
//       </Box>

//       {/* Create Appointment Modal */}
//       <Dialog
//         open={isCreateModalOpen}
//         onClose={closeCreateModal}
//         sx={{
//           "& .MuiDialog-paper": {
//             backgroundColor: colors.primary[400],
//           },
//         }}
//       >
//         <DialogTitle>Create New Appointment</DialogTitle>
//         <DialogContent>

//           <TextField
//             fullWidth
//             variant="filled"
//             label="Title"
//             value={newAppointment.title}
//             onChange={(e) =>
//               handleNewAppointmentChange("title", e.target.value)
//             }
//           />
//           <Autocomplete
//             disablePortal
//             options={mockPatients}
//             getOptionLabel={(option) => option.name}
//             onChange={(event, value) =>
//               handleNewAppointmentChange("patientId", value?.id)
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Select Patient" />
//             )}
//           />
//           <Autocomplete
//             disablePortal
//             options={mockDoctors[newAppointment.patientId] || []}
//             getOptionLabel={(option) => option.name}
//             onChange={(event, value) =>
//               handleNewAppointmentChange("doctorId", value?.id)
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Select Doctor" />
//             )}
//           />
//           <DatePicker
//             label="Start Time"
//             value={newAppointment.startTime}
//             onChange={(value) => handleNewAppointmentChange("startTime", value)}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="number"
//             label="Duration (in minutes)"
//             value={newAppointment.duration}
//             onChange={(e) =>
//               handleNewAppointmentChange("duration", e.target.value)
//             }
//           />
//         </DialogContent>
//         <DialogActions>

//           <Button onClick={closeCreateModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateAppointment} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {/* Update Modal */}
//       <Dialog
//         open={isUpdateModalOpen}
//         onClose={closeUpdateModal}
//         sx={{
//           "& .MuiDialog-paper": {
//             backgroundColor: colors.primary[400],
//           },
//         }}
//       >
//         <DialogTitle>Update Appointment</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             variant="filled"
//             label="Title"
//             value={updatedEventInfo?.event?.title || ""}
//             onChange={(e) =>
//               updatedEventInfo?.event?.setProp("title", e.target.value)
//             }
//           />
//           <DatePicker
//             label="Start Time"
//             value={updatedEventInfo?.event?.start}
//             onChange={(value) =>
//               updatedEventInfo?.event?.setDates(
//                 value,
//                 updatedEventInfo?.event?.end
//               )
//             }
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="number"
//             label="Duration (in minutes)"
//             value={updatedEventInfo?.event?.extendedProps?.duration || ""}
//             onChange={(e) =>
//               updatedEventInfo?.event?.setExtendedProp(
//                 "duration",
//                 e.target.value
//               )
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeUpdateModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmUpdate} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {/* Delete Modal */}
//       <Dialog
//         open={isDeleteModalOpen}
//         onClose={closeDeleteModal}
//         sx={{
//           "& .MuiDialog-paper": {
//             backgroundColor: colors.primary[400],
//           },
//         }}
//       >
//         <DialogTitle>
//           Are you sure you want to delete this appointment?
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={closeDeleteModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteAppointment} color="primary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Appointments;

//===============================================================================================================================================

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   useTheme,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
// import { formatDate } from "@fullcalendar/core";
// import {
//   setAppointments,
//   addAppointment,
//   updateAppointment,
//   deleteAppointment,
// } from "../../features/appointmentSlice";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Ensure you're using MUI's DatePicker
// import dayjs from "dayjs"; // Import dayjs if using it for dates
// import { Add, Edit, Delete } from "@mui/icons-material";

// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [
//     { id: 101, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();
//   const {appointments} = useSelector((state) => state.appointment);

//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [updatedEventInfo, setUpdatedEventInfo] = useState(null);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     patientId: null,
//     doctorId: null,
//     duration: 30,
//     startTime: null, // Ensure this is a valid date object (using dayjs or Date)
//   });

//   useEffect(() => {
//     // Initialize with mock data
//     dispatch(setAppointments([  {
//       id: 5,
//       title: "Physical Therapy",
//       start: "2024-09-19T16:00:00",
//       end: "2024-09-19T16:45:00",
//       doctorId: 105,
//       patientId: 205
//   },
//   {
//       id: 6,
//       title: "Cardiology Follow-up",
//       start: "2024-09-20T09:30:00",
//       end: "2024-09-20T10:00:00",
//       doctorId: 106,
//       patientId: 206
//   },]));
//   }, [dispatch]);

//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => {
//     setSelectedAppointment(null);
//     setCreateModalOpen(false);
//   };

//   const openDeleteModal = (event) => {
//     setSelectedEvent(event);
//     setDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setSelectedEvent(null);
//     setDeleteModalOpen(false);
//   };

//   const openUpdateModal = (info) => {
//     setUpdatedEventInfo(info);
//     setUpdateModalOpen(true);
//   };

//   const closeUpdateModal = () => {
//     if (updatedEventInfo) {
//       updatedEventInfo.revert();
//     }
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   const handleNewAppointmentChange = (field, value) => {
//     setNewAppointment((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleDateClick = (selected) => {
//     setSelectedAppointment(selected);
//     openCreateModal();
//   };

//   const handleEventClick = (selected) => {
//     setSelectedEvent(selected.event);
//     openDeleteModal(selected.event);
//   };

//   const handleCreateAppointment = () => {
//     if (
//       newAppointment.title &&
//       newAppointment.patientId &&
//       newAppointment.doctorId &&
//       newAppointment.startTime
//       // &&
//       // selectedAppointment !== null
//     ) {
//       const endTime = dayjs(newAppointment.startTime).add(
//         newAppointment.duration,
//         "minute"
//       );

//       const newEvent = {
//         id: `${newAppointment.title}`,
//         title: newAppointment.title,
//         start: newAppointment.startTime.toISOString(),
//         end: endTime.toISOString(),
//         // allDay: selectedAppointment.allDay,
//         allDay: false,
//       };
//       console.log(newEvent);
//       dispatch(addAppointment(newEvent));
//       closeCreateModal();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedEvent) {
//       dispatch(deleteAppointment(selectedEvent.id));
//       setSelectedEvent(null);
//       closeDeleteModal();
//     }
//   };

//   const handleEventChange = (info) => {
//     openUpdateModal(info);
//   };

//   const handleConfirmUpdate = () => {
//     if (updatedEventInfo) {
//       const updatedEvent = {
//         ...updatedEventInfo.event.toPlainObject(),
//         start: updatedEventInfo.event.startStr,
//         end: updatedEventInfo.event.endStr,
//       };
//       dispatch(updateAppointment(updatedEvent));
//     }
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="Manage your appointments here" />
//       <Box display="flex" justifyContent="space-between" mb="20px">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={openCreateModal}
//           startIcon={<Add />}
//         >
//           Create Appointment
//         </Button>
//       </Box>
//       <Box display="flex" justifyContent="space-between">
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments list</Typography>
//           <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
//           <List>
//             {appointments.map((event) => (
//               <ListItem
//                 key={event.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//                 secondaryAction={
//                   <Box>
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => openUpdateModal({ event })}>
//                         <Edit />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton onClick={() => openDeleteModal(event)}>
//                         <Delete />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 }
//               >
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventChange={handleEventChange}
//             // eventsSet={(events) =>
//             //   dispatch(setAppointments(events.map((event) => event.toPlainObject())))
//             // }
//             events={appointments}
//           />
//         </Box>
//       </Box>

//       {/* Create Appointment Modal */}
//       <Dialog open={isCreateModalOpen} onClose={closeCreateModal}>
//         <DialogTitle>Create Appointment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={newAppointment.title}
//             onChange={(e) =>
//               handleNewAppointmentChange("title", e.target.value)
//             }
//           />
//           <Autocomplete
//             options={mockPatients}
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) =>
//               handleNewAppointmentChange("patientId", value ? value.id : null)
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Patient" margin="dense" fullWidth />
//             )}
//           />
//           <Autocomplete
//             options={mockDoctors[1]}
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) =>
//               handleNewAppointmentChange("doctorId", value ? value.id : null)
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Doctor" margin="dense" fullWidth />
//             )}
//           />
//           <DatePicker
//             label="Start Time"
//             value={newAppointment.startTime}
//             onChange={(value) => handleNewAppointmentChange("startTime", value)}
//             renderInput={(params) => (
//               <TextField {...params} margin="dense" fullWidth />
//             )}
//           />
//           <TextField
//             label="Duration (Minutes)"
//             type="number"
//             fullWidth
//             margin="dense"
//             value={newAppointment.duration}
//             onChange={(e) =>
//               handleNewAppointmentChange("duration", e.target.value)
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeCreateModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateAppointment} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Appointment Modal */}
//       <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
//         <DialogTitle>
//           Are you sure you want to delete this appointment?
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={closeDeleteModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteAppointment} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Appointment Modal */}
//       {/* <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
//         <DialogTitle>Update Appointment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={updatedEventInfo?.event?.title || ''}
//             onChange={(e) =>
//               updatedEventInfo?.event.setProp('title', e.target.value)
//             }
//           />
//           <DatePicker
//             label="Start Time"
//             value={updatedEventInfo?.event?.start ? dayjs(updatedEventInfo.event.start) : null}
//             onChange={(value) =>
//               updatedEventInfo?.event.setStart(value ? value.toDate() : null)
//             }
//             renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
//           />
//           <TextField
//             label="Duration (Minutes)"
//             type="number"
//             fullWidth
//             margin="dense"
//             value={dayjs(updatedEventInfo?.event?.end).diff(dayjs(updatedEventInfo?.event?.start), 'minute')}
//             onChange={(e) => {
//               const newEnd = dayjs(updatedEventInfo?.event?.start).add(e.target.value, 'minute').toDate();
//               updatedEventInfo?.event.setEnd(newEnd);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeUpdateModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmUpdate} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//       {/* Update Appointment Modal */}
//       <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
//         <DialogTitle>Update Appointment</DialogTitle>
//         <DialogContent>
//           {/* <TextField
//       label="Title"
//       fullWidth
//       margin="dense"
//       value={updatedEventInfo?.event?.title || ''}
//       onChange={(e) => {
//         // If `setProp` is not available, use `setExtendedProp` or update state directly
//         updatedEventInfo?.event.setExtendedProp
//           ? updatedEventInfo.event.setExtendedProp('title', e.target.value)
//           : updatedEventInfo.event.title = e.target.value;
//         // If using Redux, dispatch an action to update event title here
//       }}
//     /> */}
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={updatedEventInfo?.event?.title || ""}
//             onChange={(e) => {
//               // Check if setProp exists for FullCalendar's event object
//               if (updatedEventInfo?.event?.setExtendedProp) {
//                 updatedEventInfo.event.setProp("title", e.target.value);
//               } else {
//                 // Update through Redux state if setProp is unavailable or via state management
//                 dispatch(
//                   updateAppointment({
//                     id: updatedEventInfo.event.id,
//                     title: e.target.value,
//                   })
//                 );
//               }
//             }}
//           />

//           <DatePicker
//             label="Start Time"
//             value={
//               updatedEventInfo?.event?.start
//                 ? dayjs(updatedEventInfo.event.start)
//                 : null
//             }
//             onChange={(value) => {
//               // Update start time
//               updatedEventInfo?.event.setStart(value ? value.toDate() : null);
//               // Update Redux state if applicable
//             }}
//             renderInput={(params) => (
//               <TextField {...params} margin="dense" fullWidth />
//             )}
//           />
//           <TextField
//             label="Duration (Minutes)"
//             type="number"
//             fullWidth
//             margin="dense"
//             value={dayjs(updatedEventInfo?.event?.end).diff(
//               dayjs(updatedEventInfo?.event?.start),
//               "minute"
//             )}
//             onChange={(e) => {
//               const newEnd = dayjs(updatedEventInfo?.event?.start)
//                 .add(e.target.value, "minute")
//                 .toDate();
//               updatedEventInfo?.event.setEnd(newEnd);
//               // If managing state via Redux, dispatch an action to update the event's duration
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeUpdateModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmUpdate} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Appointments;


//===============================================================================================================================================



// import { useEffect, useState } from "react";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setAppointments,
//   addAppointment,
//   deleteAppointment,
//   updateAppointment,
// } from "../../features/appointmentSlice";
// import { formatDate } from "@fullcalendar/core/index.js";
// import { tokens } from "../../theme";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Header from "../../components/Header";

// // Mock data for patients and doctors
// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [
//     { id: 101, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();
//   const { appointments } = useSelector((state) => state.appointment);

//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     patientId: null,
//     doctorId: null,
//     duration: 0,
//     startTime: "",
//   });

//   const [updatedAppointment, setUpdatedAppointment] = useState(null);

//   useEffect(() => {
//     // Initialize with mock data
//     dispatch(
//       setAppointments([
//         {
//           id: 5,
//           title: "Physical Therapy",
//           duration: 20,
//           // start: "2024-09-19T16:00:00",
//           startTime: "2024-09-19T16:00:00",
//           // end: "2024-09-19T16:45:00",
//           doctorId: 105,
//           patientId: 205,
//         },
//         {
//           id: 6,
//           title: "Cardiology Follow-up",
//           duration: 10,
//           // start: "2024-09-20T09:30:00",
//           startTime: "2024-09-20T09:30:00",
//           // end: "2024-09-20T10:00:00",
//           doctorId: 106,
//           patientId: 206,
//         },
//       ])
//     );
//   }, [dispatch]);

//   // Calculate the end time based on the start time and duration
//   const calculateEndTime = (startTime, duration) => {
//     const start = new Date(startTime);
//     const end = new Date(start.getTime() + duration * 60000);
//     return end.toISOString();
//   };

//   // Handle form field changes for new appointment
//   const handleNewAppointmentChange = (field, value) => {
//     setNewAppointment((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Create appointment handler
//   const handleCreateAppointment = () => {
//     if (
//       newAppointment.title &&
//       newAppointment.patientId &&
//       newAppointment.doctorId &&
//       newAppointment.startTime &&
//       newAppointment.duration
//     ) {
//       const endTime = calculateEndTime(
//         newAppointment.startTime,
//         newAppointment.duration
//       );

//       dispatch(
//         addAppointment({
//           ...newAppointment,
//           id: `appt-${Date.now()}`,
//           // start: newAppointment.startTime,
//           // end: endTime,
//         })
//       );

//       setNewAppointment({
//         title: "",
//         patientId: null,
//         doctorId: null,
//         duration: 0,
//         startTime: "",
//       });
//       closeCreateModal();
//     }
//   };

//   // Delete appointment handler
//   const handleDeleteAppointment = () => {
//     if (selectedAppointment) {
//       dispatch(deleteAppointment(selectedAppointment.id));
//       setSelectedAppointment(null);
//       closeDeleteModal();
//     }
//   };

//   // Update appointment handler
//   const handleUpdateAppointment = () => {
//     if (updatedAppointment) {
//       const endTime = calculateEndTime(
//         updatedAppointment.startTime,
//         updatedAppointment.duration
//       );
//       console.log(updatedAppointment);

//       dispatch(
//         updateAppointment({
//           ...updatedAppointment,
//           start: updatedAppointment.startTime,
//           end: endTime,
//         })
//       );
//       setUpdatedAppointment(null);
//       closeUpdateModal();
//     }
//   };

//   // Handle modal open/close
//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => setCreateModalOpen(false);
//   const openDeleteModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setDeleteModalOpen(true);
//   };
//   const closeDeleteModal = () => setDeleteModalOpen(false);
//   const openUpdateModal = (appointment) => {
//     setUpdatedAppointment(appointment);
//     setUpdateModalOpen(true);
//   };
//   const closeUpdateModal = () => setUpdateModalOpen(false);

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="Manage your appointments here" />

//       {/* Create Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={openCreateModal}
//         sx={{ marginBottom: "10px" }}
//       >
//         Create Appointment
//       </Button>

//       <Box display="flex" justifyContent="space-between">
//         {/* Appointments List */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments List</Typography>
//           <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
//           <List>
//             {appointments.map((appointment) => (
//               <ListItem
//                 key={appointment.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={appointment.title}
//                   secondary={`Duration: ${appointment.duration} mins`}
//                 />
//                 <IconButton onClick={() => openUpdateModal(appointment)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => openDeleteModal(appointment)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
        
//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//         </Box>

//         {/* Create Appointment Modal */}
//         <Dialog open={isCreateModalOpen} onClose={closeCreateModal}>
//           <DialogTitle>Create New Appointment</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="dense"
//               value={newAppointment.title}
//               onChange={(e) =>
//                 handleNewAppointmentChange("title", e.target.value)
//               }
//             />
//             <Autocomplete
//               options={mockPatients}
//               getOptionLabel={(option) => option.name}
//               onChange={(e, value) =>
//                 handleNewAppointmentChange("patientId", value?.id)
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Patient"
//                   margin="dense"
//                   fullWidth
//                 />
//               )}
//             />
//             <Autocomplete
//               options={
//                 newAppointment.patientId
//                   ? mockDoctors[newAppointment.patientId]
//                   : []
//               }
//               getOptionLabel={(option) => option.name}
//               onChange={(e, value) =>
//                 handleNewAppointmentChange("doctorId", value?.id)
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Doctor"
//                   margin="dense"
//                   fullWidth
//                 />
//               )}
//               disabled={!newAppointment.patientId}
//             />
//             <TextField
//               label="Duration (in minutes)"
//               type="number"
//               fullWidth
//               margin="dense"
//               value={newAppointment.duration}
//               onChange={(e) =>
//                 handleNewAppointmentChange("duration", e.target.value)
//               }
//             />
//             <TextField
//               // label="Start Time"
//               type="datetime-local"
//               fullWidth
//               margin="dense"
//               value={newAppointment.startTime}
//               onChange={(e) =>
//                 handleNewAppointmentChange("startTime", e.target.value)
//               }
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={handleCreateAppointment}
//               variant="contained"
//               color="primary"
//             >
//               Create
//             </Button>
//             <Button
//               onClick={closeCreateModal}
//               variant="contained"
//               color="secondary"
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Appointment Modal */}
//         <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
//           <DialogTitle>Delete Appointment</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete this appointment?
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={handleDeleteAppointment}
//               variant="contained"
//               color="primary"
//             >
//               Delete
//             </Button>
//             <Button
//               onClick={closeDeleteModal}
//               variant="contained"
//               color="secondary"
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Update Appointment Modal */}
//         {updatedAppointment && (
//           <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
//             <DialogTitle>Edit Appointment</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="dense"
//                 value={updatedAppointment.title}
//                 onChange={(e) =>
//                   setUpdatedAppointment({
//                     ...updatedAppointment,
//                     title: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 label="Duration (in minutes)"
//                 type="number"
//                 fullWidth
//                 margin="dense"
//                 value={updatedAppointment.duration}
//                 onChange={(e) =>
//                   setUpdatedAppointment({
//                     ...updatedAppointment,
//                     duration: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 // label="Start Time"
//                 type="datetime-local"
//                 fullWidth
//                 margin="dense"
//                 value={updatedAppointment.startTime}
//                 onChange={(e) =>
//                   setUpdatedAppointment({
//                     ...updatedAppointment,
//                     startTime: e.target.value,
//                   })
//                 }
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 onClick={handleUpdateAppointment}
//                 variant="contained"
//                 color="primary"
//               >
//                 Save
//               </Button>
//               <Button
//                 onClick={closeUpdateModal}
//                 variant="contained"
//                 color="secondary"
//               >
//                 Cancel
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Appointments;


//===============================================================================================================================================


// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setAppointments,
//   addAppointment,
//   deleteAppointment,
//   updateAppointment,
// } from "../../features/appointmentSlice";
// import { tokens } from "../../theme";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Header from "../../components/Header";

// // Mock data for patients and doctors
// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [
//     { id: 101, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();
//   const { appointments } = useSelector((state) => state.appointment);

//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     patientId: null,
//     doctorId: null,
//     duration: "",
//     startTime: "",
//   });

//   const [updatedAppointment, setUpdatedAppointment] = useState(null);

//   useEffect(() => {
//     // Initialize with mock data
//     dispatch(
//       setAppointments([
//         {
//           id: 5,
//           title: "Physical Therapy",
//           duration: 20,
//           startTime: "2024-09-19T16:00:00",
//           doctorId: 105,
//           patientId: 205,
//         },
//         {
//           id: 6,
//           title: "Cardiology Follow-up",
//           duration: 10,
//           startTime: "2024-09-20T09:30:00",
//           doctorId: 106,
//           patientId: 206,
//         },
//       ])
//     );
//   }, [dispatch]);

//   // Calculate the end time based on the start time and duration
//   const calculateEndTime = (startTime, duration) => {
//     const start = new Date(startTime);
//     const end = new Date(start.getTime() + duration * 60000);
//     return end.toISOString();
//   };

//   // Handle form field changes for new appointment
//   const handleNewAppointmentChange = (field, value) => {
//     setNewAppointment((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Create appointment handler
//   const handleCreateAppointment = () => {
//     if (
//       newAppointment.title &&
//       newAppointment.patientId &&
//       newAppointment.doctorId &&
//       newAppointment.startTime &&
//       newAppointment.duration
//     ) {
//       const endTime = calculateEndTime(
//         newAppointment.startTime,
//         newAppointment.duration
//       );

//       dispatch(
//         addAppointment({
//           ...newAppointment,
//           id: `appt-${Date.now()}`,
//           // start: newAppointment.startTime,
//           // end: endTime,
//         })
//       );

//       setNewAppointment({
//         title: "",
//         patientId: null,
//         doctorId: null,
//         duration: 0,
//         startTime: "",
//       });
//       closeCreateModal();
//     }
//   };

//   // Delete appointment handler
//   const handleDeleteAppointment = () => {
//     if (selectedAppointment) {
//       dispatch(deleteAppointment(selectedAppointment.id));
//       setSelectedAppointment(null);
//       closeDeleteModal();
//     }
//   };

//   // Update appointment handler
//   const handleUpdateAppointment = () => {
//     if (updatedAppointment) {
//       const endTime = calculateEndTime(
//         updatedAppointment.startTime,
//         updatedAppointment.duration
//       );

//       dispatch(
//         updateAppointment({
//           ...updatedAppointment,
//           start: updatedAppointment.startTime,
//           end: endTime,
//         })
//       );
//       setUpdatedAppointment(null);
//       closeUpdateModal();
//     }
//   };

//   // Handle modal open/close
//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => setCreateModalOpen(false);
//   const openDeleteModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setDeleteModalOpen(true);
//   };
//   const closeDeleteModal = () => setDeleteModalOpen(false);
//   const openUpdateModal = (appointment) => {
//     setUpdatedAppointment(appointment);
//     setUpdateModalOpen(true);
//   };
//   const closeUpdateModal = () => setUpdateModalOpen(false);

//   // Map appointments to FullCalendar events
//   const appointmentEvents = appointments.map((appointment) => ({
//     id: appointment.id,
//     title: appointment.title,
//     start: appointment.startTime,
//     end: calculateEndTime(appointment.startTime, appointment.duration),
//   }));

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="Manage your appointments here" />

//       {/* Create Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={openCreateModal}
//         sx={{ marginBottom: "10px" }}
//       >
//         Create Appointment
//       </Button>

//       <Box display="flex" justifyContent="space-between">
//         {/* Appointments List */}
//         <Box
//           flex="1 1 40%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//           <Typography variant="h5">Appointments List</Typography>
//           <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
//           <List>
//             {appointments.map((appointment) => (
//               <ListItem
//                 key={appointment.id}
//                 sx={{
//                   backgroundColor: colors.greenAccent[500],
//                   margin: "10px 0",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <ListItemText
//                   primary={appointment.title}
//                   secondary={`Duration: ${appointment.duration} mins`}
//                 />
//                 <IconButton onClick={() => openUpdateModal(appointment)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => openDeleteModal(appointment)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//           height="70vh"
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
//             initialView="dayGridMonth"
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             events={appointmentEvents}
//             // editable={true}
//             // selectable={true}
//           />
//         </Box>

//         {/* Create Appointment Modal */}
//         <Dialog open={isCreateModalOpen} onClose={closeCreateModal}>
//         <DialogTitle>Create New Appointment</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               placeholder="0"
//               fullWidth
//               margin="dense"
//               value={newAppointment.title}
//               onChange={(e) =>
//                 handleNewAppointmentChange("title", e.target.value)
//               }
//             />
//             <Autocomplete
//               options={mockPatients}
//               getOptionLabel={(option) => option.name}
//               onChange={(e, value) =>
//                 handleNewAppointmentChange("patientId", value?.id)
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Patient"
//                   margin="dense"
//                   fullWidth
//                 />
//               )}
//             />
//             <Autocomplete
//               options={
//                 newAppointment.patientId
//                   ? mockDoctors[newAppointment.patientId]
//                   : []
//               }
//               getOptionLabel={(option) => option.name}
//               onChange={(e, value) =>
//                 handleNewAppointmentChange("doctorId", value?.id)
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Doctor"
//                   margin="dense"
//                   fullWidth
//                 />
//               )}
//               disabled={!newAppointment.patientId}
//             />
//             <TextField
//               label="Duration (in minutes)"
//               type="number"
//               fullWidth
//               margin="dense"
//               value={newAppointment.duration}
//               onChange={(e) =>
//                 handleNewAppointmentChange("duration", e.target.value)
//               }
//             />
//             <TextField
//               // label="Start Time"
//               type="datetime-local"
//               fullWidth
//               margin="dense"
//               value={newAppointment.startTime}
//               onChange={(e) =>
//                 handleNewAppointmentChange("startTime", e.target.value)
//               }
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={handleCreateAppointment}
//               variant="contained"
//               color="primary"
//             >
//               Create
//             </Button>
//             <Button
//               onClick={closeCreateModal}
//               variant="contained"
//               color="secondary"
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Appointment Modal */}
//         <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
//         <DialogTitle>Delete Appointment</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete this appointment?
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={handleDeleteAppointment}
//               variant="contained"
//               color="primary"
//             >
//               Delete
//             </Button>
//             <Button
//               onClick={closeDeleteModal}
//               variant="contained"
//               color="secondary"
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Update Appointment Modal */}
//         {updatedAppointment && (
//           <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
//             <DialogTitle>Edit Appointment</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Title"
//                 fullWidth
//                 margin="dense"
//                 value={updatedAppointment.title}
//                 onChange={(e) =>
//                   setUpdatedAppointment({
//                     ...updatedAppointment,
//                     title: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 label="Duration (in minutes)"
//                 type="number"
//                 fullWidth
//                 margin="dense"
//                 value={updatedAppointment.duration}
//                 onChange={(e) =>
//                   setUpdatedAppointment({
//                     ...updatedAppointment,
//                     duration: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 // label="Start Time"
//                 type="datetime-local"
//                 fullWidth
//                 margin="dense"
//                 value={updatedAppointment.startTime}
//                 onChange={(e) =>
//                   setUpdatedAppointment({
//                     ...updatedAppointment,
//                     startTime: e.target.value,
//                   })
//                 }
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 onClick={handleUpdateAppointment}
//                 variant="contained"
//                 color="primary"
//               >
//                 Save
//               </Button>
//               <Button
//                 onClick={closeUpdateModal}
//                 variant="contained"
//                 color="secondary"
//               >
//                 Cancel
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Appointments;


import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  IconButton,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppointments,
  addAppointment,
  deleteAppointment,
  updateAppointment,
} from "../../features/appointmentSlice";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { mockDataAppointments } from "../../data/mockData";

const mockPatients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const mockDoctors = {
  1: [
    { id: 101, name: "Dr. John Specialist" },
    { id: 102, name: "Dr. Jane Expert" },
  ],
  2: [{ id: 103, name: "Dr. Alex Surgeon" }],
};

const Appointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointment);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    patientId: null,
    doctorId: null,
    duration: "",
    startTime: "",
  });

  const [updatedAppointment, setUpdatedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize with mock data
    dispatch(
      setAppointments( mockDataAppointments )
    );
  }, [dispatch]);

  const calculateEndTime = (startTime, duration) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    return end.toISOString();
  };

  const handleNewAppointmentChange = (field, value) => {
    setNewAppointment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateAppointment = () => {
    if (
      newAppointment.title &&
      newAppointment.patientId &&
      newAppointment.doctorId &&
      newAppointment.startTime &&
      newAppointment.duration
    ) {
      const endTime = calculateEndTime(
        newAppointment.startTime,
        newAppointment.duration
      );

      dispatch(
        addAppointment({
          ...newAppointment,
          id: `appt-${Date.now()}`,
        })
      );

      setNewAppointment({
        title: "",
        patientId: null,
        doctorId: null,
        duration: 0,
        startTime: "",
      });
      closeCreateModal();
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      dispatch(deleteAppointment(selectedAppointment.id));
      setSelectedAppointment(null);
      closeDeleteModal();
    }
  };

  const handleUpdateAppointment = () => {
    if (updatedAppointment) {
      const endTime = calculateEndTime(
        updatedAppointment.startTime,
        updatedAppointment.duration
      );

      dispatch(
        updateAppointment({
          ...updatedAppointment,
          start: updatedAppointment.startTime,
          end: endTime,
        })
      );
      setUpdatedAppointment(null);
      closeUpdateModal();
    }
  };

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);
  const openDeleteModal = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openUpdateModal = (appointment) => {
    setUpdatedAppointment(appointment);
    setUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setUpdateModalOpen(false);

  const appointmentEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: appointment.startTime,
    end: calculateEndTime(appointment.startTime, appointment.duration),
  }));

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box m="20px">
      <Header title="Appointments" subtitle="Manage your appointments here" />

      <Button
        variant="contained"
        color="primary"
        onClick={openCreateModal}
        sx={{ marginBottom: "10px" }}
      >
        Create Appointment
      </Button>

      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 40%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          {/* <TextField
            label="Search Appointments"
            fullWidth
            margin="dense"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Appointments List"
            fullWidth
            size="small"
            margin="dense"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <SearchIcon sx={{ marginLeft: 1 }} />
          </Box>
          <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
          <List
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {filteredAppointments.map((appointment) => (
              <ListItem
                key={appointment.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={appointment.title}
                  secondary={`Duration: ${appointment.duration} mins`}
                />
                <IconButton onClick={() => openUpdateModal(appointment)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => openDeleteModal(appointment)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="70vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            events={appointmentEvents}
          />
        </Box>

                {/* Create Appointment Modal */}
                <Dialog open={isCreateModalOpen} onClose={closeCreateModal}>
        <DialogTitle>Create New Appointment</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              placeholder="0"
              fullWidth
              margin="dense"
              value={newAppointment.title}
              onChange={(e) =>
                handleNewAppointmentChange("title", e.target.value)
              }
            />
            <Autocomplete
              options={mockPatients}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) =>
                handleNewAppointmentChange("patientId", value?.id)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Patient"
                  margin="dense"
                  fullWidth
                />
              )}
            />
            <Autocomplete
              options={
                newAppointment.patientId
                  ? mockDoctors[newAppointment.patientId]
                  : []
              }
              getOptionLabel={(option) => option.name}
              onChange={(e, value) =>
                handleNewAppointmentChange("doctorId", value?.id)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Doctor"
                  margin="dense"
                  fullWidth
                />
              )}
              disabled={!newAppointment.patientId}
            />
            <TextField
              label="Duration (in minutes)"
              type="number"
              fullWidth
              margin="dense"
              value={newAppointment.duration}
              onChange={(e) =>
                handleNewAppointmentChange("duration", e.target.value)
              }
            />
            <TextField
              // label="Start Time"
              type="datetime-local"
              fullWidth
              margin="dense"
              value={newAppointment.startTime}
              onChange={(e) =>
                handleNewAppointmentChange("startTime", e.target.value)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCreateAppointment}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
            <Button
              onClick={closeCreateModal}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Appointment Modal */}
        <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this appointment?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteAppointment}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
            <Button
              onClick={closeDeleteModal}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Appointment Modal */}
        {updatedAppointment && (
          <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={updatedAppointment.title}
                onChange={(e) =>
                  setUpdatedAppointment({
                    ...updatedAppointment,
                    title: e.target.value,
                  })
                }
              />
              <TextField
                label="Duration (in minutes)"
                type="number"
                fullWidth
                margin="dense"
                value={updatedAppointment.duration}
                onChange={(e) =>
                  setUpdatedAppointment({
                    ...updatedAppointment,
                    duration: e.target.value,
                  })
                }
              />
              <TextField
                // label="Start Time"
                type="datetime-local"
                fullWidth
                margin="dense"
                value={updatedAppointment.startTime}
                onChange={(e) =>
                  setUpdatedAppointment({
                    ...updatedAppointment,
                    startTime: e.target.value,
                  })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleUpdateAppointment}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                onClick={closeUpdateModal}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default Appointments;







//===============================================================================================================================================
// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Autocomplete,
//   useTheme,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setEvents,
//   addEvent,
//   removeEvent,
//   updateEvent,
//   setNewAppointment,
//   resetNewAppointment,
// } from "../../features/appointmentSlice";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
// import { formatDate } from "@fullcalendar/core/index.js";
// import {mockDataAppointments} from "../../data/mockData"

// // some Mock data for patients and doctors
// const mockPatients = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   1: [
//     { id: 101, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();

//   const { currentEvents, newAppointment } = useSelector(
//     (state) => state.appointment
//   );

//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [updatedEventInfo, setUpdatedEventInfo] = useState(null);

//   useEffect(() => {
//     dispatch(setEvents(mockDataAppointments));
//     console.log(currentEvents);
//   }, [dispatch]);

//   // Handle create modal open/close
//   const openCreateModal = () => setCreateModalOpen(true);
//   const closeCreateModal = () => {
//     setSelectedAppointment(null);
//     setCreateModalOpen(false);
//     dispatch(resetNewAppointment());
//   };

//   // Handle delete modal open/close
//   const openDeleteModal = (event) => {
//     setSelectedEvent(event);
//     setDeleteModalOpen(true);
//   };
//   const closeDeleteModal = () => {
//     setSelectedEvent(null);
//     setDeleteModalOpen(false);
//   };

//   // Handle update modal open/close
//   const openUpdateModal = (info) => {
//     setUpdatedEventInfo(info);
//     setUpdateModalOpen(true);
//   };
//   const closeUpdateModal = () => {
//     if (updatedEventInfo) {
//       updatedEventInfo.revert(); // Revert the event change
//     }
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   // Handle form field changes when creating new appointment
//   const handleNewAppointmentChange = (field, value) => {
//     dispatch(setNewAppointment({ [field]: value }));
//   };

//   const handleDateClick = (selected) => {
//     setSelectedAppointment(selected);
//     openCreateModal();
//   };

//   const handleEventClick = (selected) => {
//     setSelectedEvent(selected.event);
//     openDeleteModal(selected.event);
//   };

//   const handleCreateAppointment = () => {
//     const calendarApi = selectedAppointment.view.calendar;
//     calendarApi.unselect();
//     if (
//       newAppointment.title &&
//       newAppointment.patientId &&
//       newAppointment.doctorId
//     ) {
//       const title = newAppointment.title;

//       const newEvent = {
//         id: `${selectedAppointment.dateStr}-${title}`,
//         title,
//         start: selectedAppointment.startStr,
//         end: selectedAppointment.endStr,
//         allDay: selectedAppointment.allDay,
//       };

//        // Debugging logs
//     console.log("Current events in calendar:", calendarApi.getEvents());
//     console.log("New event ID:", newEvent.id);

//       // calendarApi.addEvent(newEvent);
//       // dispatch(addEvent(newEvent));
//       const existingEvent = calendarApi.getEventById(newEvent.id);
//     if (!existingEvent) {
//       calendarApi.addEvent(newEvent);
//       dispatch(addEvent(newEvent));
//       console.log("Event added:", newEvent);
//     } else {
//       console.log("Event already exists:", existingEvent);
//     }
//       closeCreateModal();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedEvent) {
//       dispatch(removeEvent(selectedEvent));
//       selectedEvent.remove();
//       setSelectedEvent(null);
//       closeDeleteModal();
//     }
//   };

//   const handleEventChange = (info) => {
//     const oldStart = formatDate(info.oldEvent.start, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const oldEnd = formatDate(info.oldEvent.end, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const newStart = formatDate(info.event.start, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const newEnd = formatDate(info.event.end, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     console.log("Old Start: ", oldStart, "Old End: ", oldEnd);
//     console.log("New Start: ", newStart, "New End: ", newEnd);

//     const updatedEvent = {
//       id: info.event.id,
//       title: info.event.title,
//       start: newStart,
//       end: newEnd,
//       allDay: info.event.allDay,
//     };
//     console.log(updatedEvent);

//     dispatch(updateEvent(updatedEvent));
//     openUpdateModal(info);
//   };

//   const handleConfirmUpdate = () => {
//     setUpdatedEventInfo(null);
//     setUpdateModalOpen(false);
//   };

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="Manage your appointments here" />

//       <Box display="flex" justifyContent="space-between">

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventChange={handleEventChange}
//             events={currentEvents}
//             // eventsSet={(events) => dispatch(setEvents(events))}
//             // eventsSet={(events) => dispatch(setEvents(events.map(event => ({
//             //   ...event,
//             //   start: event.start.toISOString(),
//             //   end: event.end?.toISOString(),
//             // }))))}

//             // eventsSet={(events) => {
//             //   // You may want to add conditions to prevent unnecessary updates
//             //   const newEvents = events.map(event => ({
//             //     ...event,
//             //     start: event.start.toISOString(),
//             //     end: event.end?.toISOString(),
//             //   }));
//             //   dispatch(setEvents(newEvents));
//             // }}

//             eventsSet={(events) => {
//               // Synchronize events with Redux state only if there are changes
//               const newEvents = events.map(event => ({
//                 ...event,
//                 start: event.start.toISOString(),
//                 end: event.end?.toISOString(),
//               }));

//               const eventsAreDifferent = (existingEvents, newEvents) =>
//                 existingEvents.length !== newEvents.length ||
//                 existingEvents.some(
//                   (event, index) =>
//                     event.id !== newEvents[index].id ||
//                     event.start !== newEvents[index].start ||
//                     event.end !== newEvents[index].end ||
//                     event.title !== newEvents[index].title
//                 );

//               if (eventsAreDifferent(currentEvents, newEvents)) {
//                 dispatch(setEvents(newEvents));
//               }
//             }}

//           />
//         </Box>
//       </Box>

//       {/* Create Appointment Modal */}
//       <Dialog open={isCreateModalOpen} onClose={closeCreateModal}>
//         <DialogTitle>Create New Appointment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={newAppointment.title}
//             onChange={(e) =>
//               handleNewAppointmentChange("title", e.target.value)
//             }
//           />
//           <Autocomplete
//             options={mockPatients}
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) =>
//               handleNewAppointmentChange("patientId", value?.id)
//             }
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Patient"
//                 margin="dense"
//                 fullWidth
//               />
//             )}
//           />
//           <Autocomplete
//             options={
//               newAppointment.patientId
//                 ? mockDoctors[newAppointment.patientId]
//                 : []
//             }
//             getOptionLabel={(option) => option.name}
//             onChange={(e, value) =>
//               handleNewAppointmentChange("doctorId", value?.id)
//             }
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Doctor"
//                 margin="dense"
//                 fullWidth
//               />
//             )}
//             disabled={!newAppointment.patientId}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeCreateModal}>Cancel</Button>
//           <Button
//             onClick={handleCreateAppointment}
//             variant="contained"
//             color="primary"
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Appointment Modal */}
//       <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the appointment '
//             {selectedAppointment?.title}'?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDeleteModal}>Cancel</Button>
//           <Button
//             onClick={handleDeleteAppointment}
//             variant="contained"
//             color="error"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Appointments;

//===============================================================================================================================================

// import {
//   Box,
//   useTheme,
// } from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";

// const Appointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="20px">
//       <Header title="Appointments" subtitle="You can manage your appointments here" />

//       <Box display="flex" justifyContent="space-between">
//         {/* CALENDAR SIDEBAR */}
//         <Box
//           flex="1 1 20%"
//           backgroundColor={colors.primary[400]}
//           p="15px"
//           borderRadius="4px"
//         >
//         </Box>

//         {/* CALENDAR */}
//         <Box flex="1 1 100%" ml="15px">
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Appointments;

//===============================================================================================================================================
