import { Box, Divider, Typography, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  mockDataAppointments,
  mockDataDoctors,
  mockDataPayments,
  mockDataRecords,
  mockDataTreatments,
} from "../../data/mockData";
import { fetchTreatments } from "../../features/treatmentSlice";
import { fetchPayments } from "../../features/paymentSlice";
import { getDoctors } from "../../features/doctorSlice";
import { fetchRecords } from "../../features/recordSlice";
import { fetchAppointments } from "../../features/appointmentSlice";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { userRole, id } =
    JSON.parse(localStorage.getItem("userDetails")) || {};

  const { appointments, status: appointmentStatus } = useSelector(
    (state) => state.appointment
  );
  const { treatments, loading: treatmentStatus } = useSelector(
    (state) => state.treatment
  );
  const { records, loading: recordStatus } = useSelector(
    (state) => state.record
  );
  const { payments, isLoading: paymentStatus } = useSelector(
    (state) => state.payment
  );
  const { doctors, loading: doctorStatus } = useSelector(
    (state) => state.doctor
  );

  React.useEffect(() => {
    dispatch(fetchAppointments({ userRole, id }));
    dispatch(fetchTreatments());
    dispatch(fetchPayments({ userRole, id }));
    dispatch(getDoctors());
    dispatch(fetchRecords({ userRole, id }));
  }, []);

  const isLoading =
    appointmentStatus === "loading" ||
    treatmentStatus === "true" ||
    recordStatus === "true" ||
    paymentStatus === "true" ||
    doctorStatus === "true";

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Sort by newest entries first
  const sortByDateTime = (a, b) =>
    new Date(b.startTime) - new Date(a.startTime);
  // Filteri sort
  const weeklyAppointments = appointments
    ? appointments
        .filter((appointment) => new Date(appointment.startTime) >= oneWeekAgo)
        .sort(sortByDateTime)
    : [];
  // Filtersort
  const weeklyNewDoctors = doctors
    .filter((doctor) => new Date(doctor.assignedDate) >= oneWeekAgo)
    .sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
  // Sort
  // const latestTreatments = treatments? treatments.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7) :[];
  const latestRecords = records
    ? records
        .slice()
        .sort((a, b) => new Date(b.assignDate) - new Date(a.assignDate))
        .reverse()
        .slice(0, 7)
    : [];
  const latestPayments = payments
    ? payments
        .slice()
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        .reverse()
        .slice(0, 7)
    : [];
  const latestAppointments = appointments
    ? appointments.slice().sort(sortByDateTime).slice(0, 4)
    : [];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Quick insights on recent activity"
        />
      </Box>

      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Upcoming Appointments */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Upcoming Appointments
              </Typography>
              <Divider sx={{ mt: 2, backgroundColor: colors.grey[500] }} />

              {isLoading ? (
                <Box>
                  {[...Array(3)].map((_, index) => (
                    <Skeleton
                      key={index}
                      height={100}
                      sx={{ bgcolor: colors.primary[400], mb: 1 }}
                    />
                  ))}
                </Box>
              ) : latestAppointments.length > 0 ? (
                <Timeline
                  sx={{
                    width: "100%",
                    height: "50vh",
                    gap: 2,
                    overflowY: "auto",
                  }}
                  position="alternate"
                >
                  {latestAppointments.map((appointment, i) => (
                    <TimelineItem key={i}>
                      <TimelineOppositeContent
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          maxWidth: "50%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {appointment.dateTime}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          color: colors.greenAccent[500],
                          fontSize: 15,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        {appointment.title}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              ) : (
                <Typography color={colors.grey[300]} mt={2}>
                  No upcoming appointments available.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Recent Treatments */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Diagnostics
            </Typography>
          </Box>
          {isLoading ? (
            <Box>
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  height={100}
                  sx={{ bgcolor: colors.primary[400], mb: 1 }}
                />
              ))}
            </Box>
          ) : latestRecords.length > 0 ? (
            latestRecords.map((record, i) => (
              <Box
                key={`${record.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {record.diagnosis}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {record.description}
                  </Typography>
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${record.price}
                </Box>
              </Box>
            ))
          ) : (
            <Typography color={colors.grey[300]} p={2}>
              No recent treatments available.
            </Typography>
          )}
        </Box>

        {/* Recent Payments */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Payments
            </Typography>
          </Box>

          {isLoading ? (
            <Box>
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  height={100}
                  sx={{ bgcolor: colors.primary[400], mb: 1 }}
                />
              ))}
            </Box>
          ) : latestPayments.length > 0 ? (
            latestPayments.map((payment, i) => (
              <Box
                key={`${payment.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {payment.status}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {payment.method}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  {new Date(payment.dueDate).toLocaleDateString()}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${payment.amount}
                </Box>
              </Box>
            ))
          ) : (
            <Typography color={colors.grey[300]} p={2}>
              No recent payments available.
            </Typography>
          )}
        </Box>

        {/* Weekly Consultations */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={weeklyAppointments.length?.toString()}
            subtitle="Weekly Consultations"
            progress={weeklyAppointments.length / appointments?.length}
            increase="+0%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* New Users */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={weeklyNewDoctors.length.toString()}
            subtitle="New Users"
            progress={weeklyNewDoctors.length / doctors.length}
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
