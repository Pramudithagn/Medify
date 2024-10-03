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
  fetchAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../../features/appointmentSlice";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { mockDataAppointments } from "../../data/mockData";
import { getDoctors } from "../../features/doctorSlice";
import { fetchPatients } from "../../features/patientSlice";

const mockPatients = [
  { id: 3, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const mockDoctors = {
  3: [
    { id: 4, name: "Dr. John Specialist" },
    { id: 102, name: "Dr. Jane Expert" },
  ],
  2: [{ id: 103, name: "Dr. Alex Surgeon" }],
};

const Appointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userRole, id  } = JSON.parse(localStorage.getItem("userDetails")) || {};
  // const userRole = "PATIENT";
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointment);
  const { patients } = useSelector((state) => state.patient);
  const { doctors } = useSelector((state) => state.doctor);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    patientId: null,
    doctorId: null,
    duration: "",
    // startTime: "",
    dateTime: "",
  });

  const [updatedAppointment, setUpdatedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchAppointments());
  //   }
  // }, [dispatch, status]);
  useEffect(() => {
    console.log("appointment useeffect");
    console.log("appointment useeffect val", id, userRole);

    // if (status === "idle") {
      // if (userRole && id && status === "idle") {
      dispatch(fetchAppointments({userRole, id}));
      // }
    // }
    if (userRole && id) {
    dispatch(fetchPatients());
    dispatch(getDoctors());
    }
  }, [dispatch]);
// }, [dispatch, userRole, id, status]);


  console.log(appointments);
  console.log(doctors);
  console.log(patients);

  const calculateEndTime = (dateTime, duration) => {
    const start = new Date(dateTime);
    const end = new Date(start.getTime() + duration * 60000);
    console.log(dateTime);
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
      newAppointment.dateTime &&
      newAppointment.duration
    ) {
      const endTime = calculateEndTime(
        newAppointment.dateTime,
        newAppointment.duration
      );

      console.log(newAppointment);

      dispatch(createAppointment(newAppointment));

      setNewAppointment({
        title: "",
        patientId: null,
        doctorId: null,
        duration: 0,
        dateTime: "",
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
      console.log(updatedAppointment);

      dispatch(
        updateAppointment({
          ...updatedAppointment,
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

  const appointmentEvents = appointments?.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: appointment.dateTime,
    end: calculateEndTime(appointment.dateTime, appointment.duration),
  }));

  const filteredAppointments = appointments?.filter((appointment) =>
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const doctorsForSelectedPatient = patients?.find(
    (patient) => patient.id === newAppointment.patientId
  )
    ? patients
        .find((patient) => patient.id === newAppointment.patientId)
        .doctorIds.map((doctorId) => doctors.find((doc) => doc.id === doctorId))
    : [];

  return (
    <Box m="20px">
      <Header title="Appointments" subtitle="Manage your appointments" />

      {userRole === "ADMIN" && (
      <Button
        variant="contained"
        color="primary"
        onClick={openCreateModal}
        sx={{ marginBottom: "10px" }}
      >
        Create Appointment
      </Button>
      )}

      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 40%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Search..."
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
              // maxHeight: "400px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {filteredAppointments?.map((appointment) => (
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
                {userRole === "ADMIN" && (
                <Box>
                <IconButton onClick={() => openUpdateModal(appointment)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => openDeleteModal(appointment)}>
                  <DeleteIcon />
                </IconButton>
                </Box>
                )}
                
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="70vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
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
              // placeholder="0"
              fullWidth
              margin="dense"
              value={newAppointment.title}
              onChange={(e) =>
                handleNewAppointmentChange("title", e.target.value)
              }
            />
            <Autocomplete
              // options={mockPatients}
              options={patients}
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
            {/* <Autocomplete
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
            /> */}
            <Autocomplete
            options={doctorsForSelectedPatient}
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
              type="datetime-local"
              fullWidth
              margin="dense"
              value={newAppointment.dateTime}
              onChange={(e) =>
                handleNewAppointmentChange("dateTime", e.target.value)
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
                type="datetime-local"
                fullWidth
                margin="dense"
                value={updatedAppointment.dateTime}
                onChange={(e) =>
                  setUpdatedAppointment({
                    ...updatedAppointment,
                    dateTime: e.target.value,
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
