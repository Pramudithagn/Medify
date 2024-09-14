// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentEvents: [],
//   newAppointment: {
//     title: "",
//     patientId: null,
//     doctorId: null,
//   },
// };

// const appointmentSlice = createSlice({
//   name: "appointments",
//   initialState,
//   reducers: {
//     setEvents: (state, action) => {
//       state.currentEvents = action.payload;
//     },
//     addEvent: (state, action) => {
//       // state.currentEvents.push(action.payload);

//       const eventExists = state.currentEvents.some(event => event.id === action.payload.id);
//       if (!eventExists) {
//         state.currentEvents.push(action.payload);
//         console.log("Added event to state:", action.payload);
//       } else {
//         console.log("Event already exists in state:", action.payload);
//       }
//     },
//     removeEvent: (state, action) => {
//       state.currentEvents = state.currentEvents.filter(
//         (event) => event.id !== action.payload.id
//       );
//     },
//     updateEvent: (state, action) => {
//       // const index = state.currentEvents.findIndex(
//       //   (event) => event.id === action.payload.id
//       // );
//       // if (index !== -1) {
//       //   state.currentEvents[index] = action.payload;
//       // }

//       state.currentEvents = state.currentEvents.map((event) =>
//         event.id === action.payload.id ? action.payload : event
//       );
//     },
//     setNewAppointment: (state, action) => {
//       state.newAppointment = {
//         ...state.newAppointment,
//         ...action.payload,
//       };
//     },
//     resetNewAppointment: (state) => {
//       state.newAppointment = {
//         title: "",
//         patientId: null,
//         doctorId: null,
//       };
//     },
//   },
// });

// export const {
//   setEvents,
//   addEvent,
//   removeEvent,
//   updateEvent,
//   setNewAppointment,
//   resetNewAppointment,
// } = appointmentSlice.actions;

// export default appointmentSlice.reducer;






import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: []
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    addAppointment: (state, action) => {
      console.log(action.payload)
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(appt => appt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(appt => appt.id !== action.payload);
    }
  }
});

export const { setAppointments, addAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;








// import { createSlice } from '@reduxjs/toolkit';

// const appointmentSlice = createSlice({
//   name: 'appointments',
//   initialState: [],
//   reducers: {
//     setAppointments: (state, action) => action.payload,
//     addAppointment: (state, action) => {
//       state.push(action.payload);
//     },
//     updateAppointment: (state, action) => {
//       const { id, updates } = action.payload;
//       const index = state.findIndex(appointment => appointment.id === id);
//       if (index !== -1) {
//         state[index] = { ...state[index], ...updates };
//       }
//     },
//     deleteAppointment: (state, action) => {
//       const id = action.payload;
//       return state.filter(appointment => appointment.id !== id);
//     },
//   },
// });

// export const { setAppointments, addAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions;
// export default appointmentSlice.reducer;






























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

// consider this code. don't do unnecessary style changes. here i want a new button above the appointment list which will open the create appointment dialog and from there create the appointment and in appointment entries in the appointment list(in addition to current fields in create dialog, add two more entries to get duration in minutes and pick start time. if end time needed so it can be calculated. use mui datepicker for start time pick), each should have two icon buttons to edit and delete it(should open dialogs and do them). when editing, title , duration, start date time should be the editable fields(use mui date picker if needed) so change edit dialog according to it. according to whatever we do with appointments in our appointments list, they should always sync with redux and calendar view in real time. for statte management, use redux toolkit(don't use any other tool like thunk or saga or any other). give me the full codes for the implementations
