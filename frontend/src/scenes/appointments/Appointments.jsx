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

import { useState } from "react";
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
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core/index.js";

// some Mock data for patients and doctors
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
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEventInfo, setUpdatedEventInfo] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    patientId: null,
    doctorId: null,
  });

  // Handle create modal open/close
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => {
    setSelectedAppointment(null);
    setCreateModalOpen(false);
  };

  // Handle delete modal open/close
  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedEvent(null);
    setDeleteModalOpen(false);
  };

  // Handle update modal open/close
  const openUpdateModal = (info) => {
    setUpdatedEventInfo(info);
    setUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    if (updatedEventInfo) {
      updatedEventInfo.revert(); // Revert the event change
    }
    setUpdatedEventInfo(null);
    setUpdateModalOpen(false);
  };

  // Handle form field changes when new appointment makeing
  const handleNewAppointmentChange = (field, value) => {
    setNewAppointment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateClick = (selected) => {
    setSelectedAppointment(selected);
    openCreateModal();
  };

  const handleEventClick = (selected) => {
    setSelectedEvent(selected.event);
    openDeleteModal(selected.event);
  };

  const handleCreateAppointment = () => {
    const calendarApi = selectedAppointment.view.calendar;
    calendarApi.unselect();
    if (
      newAppointment.title &&
      newAppointment.patientId &&
      newAppointment.doctorId &&
      selectedAppointment !== null
    ) {
      const title = newAppointment.title;

      calendarApi.addEvent({
        id: `${selectedAppointment.dateStr}-${title}`,
        title,
        start: selectedAppointment.startStr,
        end: selectedAppointment.endStr,
        allDay: selectedAppointment.allDay,
      });

      closeCreateModal();
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      setSelectedEvent(null);
      closeDeleteModal();
    }
  };

  // Handle event change (toupdate)
  const handleEventChange = (info) => {
    const oldStart = formatDate(info.oldEvent.start, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const oldEnd = formatDate(info.oldEvent.end, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const newStart = formatDate(info.event.start, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const newEnd = formatDate(info.event.end, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log("Old Start: ", oldStart, "Old End: ", oldEnd);
    console.log("New Start: ", newStart, "New End: ", newEnd);

    // Show update confirmation modal
    openUpdateModal(info);
  };

  const handleConfirmUpdate = () => {
    // Confirm update m(event already updated in calendar)
    setUpdatedEventInfo(null);
    setUpdateModalOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Appointments" subtitle="Manage your appointments here" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Appointments list</Typography>
          <Divider sx={{ mt: 1, backgroundColor: colors.grey[500] }} />
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
            eventsSet={(events) => setCurrentEvents(events)}
          />
        </Box>
      </Box>

      {/* Create Appointment Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: colors.primary[800],
            width: "20%",
          },
        }}
      >
        <DialogTitle fontSize={17} width="70%" ml="15%">
          Create New Appointment
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
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
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            width="100%"
            gap={2}
            mb={3}
          >
            <Button
              onClick={handleCreateAppointment}
              variant="contained"
              color="secondary"
            >
              Create
            </Button>
            <Button
              onClick={closeCreateModal}
              variant="contained"
              sx={{
                backgroundColor: colors.grey[600],
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Delete Appointment Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: colors.primary[400],
          },
        }}
      >
        <DialogTitle fontSize={17} width="50%" ml="25%">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the appointment '
            {selectedEvent?.title}'?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            width="100%"
            gap={2}
            mb={3}
          >
            <Button
              onClick={handleDeleteAppointment}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <Button
              onClick={closeDeleteModal}
              variant="contained"
              sx={{
                backgroundColor: colors.grey[600],
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* Update Confirmation Modal */}
      <Dialog
        open={isUpdateModalOpen}
        onClose={closeUpdateModal}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: colors.primary[800],
          },
        }}
      >
        <DialogTitle fontSize={17} width="70%" ml="15%">
          Confirm Event Update
        </DialogTitle>
        <DialogContent>
          <Typography>
            {/* Old Start: {formatDate(updatedEventInfo?.oldEvent?.start, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}<br />
        Old End: {formatDate(updatedEventInfo?.oldEvent?.end, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}<br /> */}
            New Start Date & Time :{" "}
            {formatDate(updatedEventInfo?.event?.start, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            <br />
            New End Date & Time :{" "}
            {formatDate(updatedEventInfo?.event?.end, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            width="100%"
            gap={2}
            mb={3}
          >
            <Button
              onClick={handleConfirmUpdate}
              variant="contained"
              color="secondary"
            >
              Confirm
            </Button>
            <Button
              onClick={closeUpdateModal}
              variant="contained"
              sx={{
                backgroundColor: colors.grey[600],
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;

//===============================================================================================================================================

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
//   useTheme,
//   TextField,
//   Autocomplete,
//   IconButton,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { tokens } from "../../theme";

// // Mock data for appointments
// const mockAppointments = [
//   { id: 1, title: "Appointment 1", patientId: 1, patientName: "John Doe", doctorId: 101, doctorName: "Dr. John Specialist", date: "2024-09-14", time: "10:00 AM" },
//   { id: 2, title: "Appointment 2", patientId: 2, patientName: "Jane Smith", doctorId: 103, doctorName: "Dr. Alex Surgeon", date: "2024-09-20", time: "2:00 PM" },
// ];

// const AdminAppointments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [appointments, setAppointments] = useState(mockAppointments);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Open close modals
//   const openEditModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setSelectedAppointment(null);
//     setIsModalOpen(false);
//   };

//   // updating appointment
//   const handleUpdateAppointment = () => {
//     closeModal();
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     { field: "title", headerName: "Title", width: 150 },
//     { field: "patientName", headerName: "Patient", width: 150 },
//     { field: "doctorName", headerName: "Doctor", width: 150 },
//     { field: "date", headerName: "Date", width: 120 },
//     { field: "time", headerName: "Time", width: 120 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params) => (
//         <>
//           <IconButton onClick={() => openEditModal(params.row)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton color="error" onClick={() => handleDeleteAppointment(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   // deleting  appointment
//   const handleDeleteAppointment = (id) => {
//     setAppointments(appointments.filter((appointment) => appointment.id !== id));
//   };

//   return (
//     <Container>
//       <Box m="20px">
//         <Typography variant="h4" gutterBottom>
//           Admin - Manage Appointments
//         </Typography>

//         <Box height="75vh">
//           <DataGrid
//             rows={appointments}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5, 10, 15]}
//             pagination
//           />
//         </Box>

//         {/* Edit Appointment Modal */}
//         <Dialog open={isModalOpen} onClose={closeModal}>
//           <DialogTitle>Edit Appointment</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Title"
//               fullWidth
//               margin="dense"
//               value={selectedAppointment?.title || ""}
//               onChange={(e) =>
//                 setSelectedAppointment((prev) => ({
//                   ...prev,
//                   title: e.target.value,
//                 }))
//               }
//             />
//             <TextField
//               label="Date"
//               fullWidth
//               margin="dense"
//               type="date"
//               value={selectedAppointment?.date || ""}
//               onChange={(e) =>
//                 setSelectedAppointment((prev) => ({
//                   ...prev,
//                   date: e.target.value,
//                 }))
//               }
//             />
//             <TextField
//               label="Time"
//               fullWidth
//               margin="dense"
//               type="time"
//               value={selectedAppointment?.time || ""}
//               onChange={(e) =>
//                 setSelectedAppointment((prev) => ({
//                   ...prev,
//                   time: e.target.value,
//                 }))
//               }
//             />
//             <Autocomplete
//               options={mockAppointments.map((app) => ({
//                 id: app.patientId,
//                 name: app.patientName,
//               }))}
//               getOptionLabel={(option) => option.name}
//               value={
//                 selectedAppointment
//                   ? { id: selectedAppointment.patientId, name: selectedAppointment.patientName }
//                   : null
//               }
//               onChange={(e, value) =>
//                 setSelectedAppointment((prev) => ({
//                   ...prev,
//                   patientId: value?.id || null,
//                   patientName: value?.name || "",
//                 }))
//               }
//               renderInput={(params) => (
//                 <TextField {...params} label="Select Patient" margin="dense" fullWidth />
//               )}
//             />
//             <Autocomplete
//               options={mockAppointments.map((app) => ({
//                 id: app.doctorId,
//                 name: app.doctorName,
//               }))}
//               getOptionLabel={(option) => option.name}
//               value={
//                 selectedAppointment
//                   ? { id: selectedAppointment.doctorId, name: selectedAppointment.doctorName }
//                   : null
//               }
//               onChange={(e, value) =>
//                 setSelectedAppointment((prev) => ({
//                   ...prev,
//                   doctorId: value?.id || null,
//                   doctorName: value?.name || "",
//                 }))
//               }
//               renderInput={(params) => (
//                 <TextField {...params} label="Select Doctor" margin="dense" fullWidth />
//               )}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closeModal}>Cancel</Button>
//             <Button onClick={handleUpdateAppointment} variant="contained" color="primary">
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Container>
//   );
// };

// export default AdminAppointments;
