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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  IconButton,
  useTheme,
  Skeleton,
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

// const mockPatients = [
//   { id: 3, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
// ];

// const mockDoctors = {
//   3: [
//     { id: 4, name: "Dr. John Specialist" },
//     { id: 102, name: "Dr. Jane Expert" },
//   ],
//   2: [{ id: 103, name: "Dr. Alex Surgeon" }],
// };

const Appointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userRole, id } =
    JSON.parse(localStorage.getItem("userDetails")) || {};
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
    dateTime: "",
  });
  const [updatedAppointment, setUpdatedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAppointments({ userRole, id }));
    dispatch(fetchPatients());
    dispatch(getDoctors());
  }, [dispatch]);

  const calculateEndTime = (dateTime, duration) => {
    const start = new Date(dateTime);
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
      newAppointment.dateTime &&
      newAppointment.duration
    ) {
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
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={openCreateModal}
            sx={{ marginBottom: "10px" }}
          >
            Create Appointment
          </Button>
        </Box>
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
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {status === "loading"
              ? Array.from(new Array(5)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={60}
                    sx={{ margin: "10px 0", borderRadius: "2px" }}
                  />
                ))
              : filteredAppointments?.map((appointment) => (
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
                        <IconButton
                          onClick={() => openUpdateModal(appointment)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => openDeleteModal(appointment)}
                        >
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
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? colors.primary[400] : "white",
            }}
          >
            <DialogTitle
              variant="h3"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "5%",
                mb: "3%",
              }}
            >
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
            <DialogActions
              sx={{ display: "flex", justifyContent: "center", mb: "7%" }}
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
                sx={{ backgroundColor: colors.grey[600] }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Delete Appointment Modal */}
        <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal} sx={{}}>
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? colors.primary[400] : "white",
            }}
          >
            <DialogTitle
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                color: colors.redAccent[500],
              }}
            >
              Warning!
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete this appointment?
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "center", mb: 2 }}
            >
              <Button
                onClick={handleDeleteAppointment}
                variant="contained"
                sx={{ backgroundColor: colors.redAccent[600] }}
              >
                Delete
              </Button>
              <Button
                onClick={closeDeleteModal}
                variant="contained"
                sx={{ backgroundColor: colors.grey[600] }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Update Appointment Modal */}
        {updatedAppointment && (
          <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
            <Box
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? colors.primary[400] : "white",
              }}
            >
              <DialogTitle
                mt={4}
                mb={2}
                variant="h4"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Edit Appointment
              </DialogTitle>
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
              <DialogActions
                sx={{ display: "flex", justifyContent: "center", mb: 4 }}
              >
                <Button
                  onClick={handleUpdateAppointment}
                  variant="contained"
                  color="secondary"
                >
                  Save
                </Button>
                <Button
                  onClick={closeUpdateModal}
                  variant="contained"
                  sx={{ backgroundColor: colors.grey[600] }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default Appointments;

//===============================================================================================================================================
