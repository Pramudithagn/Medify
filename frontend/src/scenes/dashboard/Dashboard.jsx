// import {
//   Box,
//   Button,
//   Divider,
//   IconButton,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { tokens } from "../../theme";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import Header from "../../components/Header";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import {
//   mockDataTreatments,
//   mockDataPayments,
//   mockTransactions,
// } from "../../data/mockData";

// import * as React from "react";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

// const Dashboard = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <Box m="20px">
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
//       </Box>

//       {/* GRID */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >

//         {/* ROW 2 */}
//         <Box
//           gridColumn="span 4"
//           gridRow="span 3"
//           backgroundColor={colors.primary[400]}
//         >
//           <Box
//             mt="25px"
//             p="0 30px"
//             display="flex "
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <Typography
//                 variant="h5"
//                 fontWeight="600"
//                 color={colors.grey[100]}
//               >
//                 Upcoming Appointments
//               </Typography>
//               <Divider sx={{ mt: 2, backgroundColor: colors.grey[500] }} />
//               <Timeline
//                 sx={{ width: "20vw", height: "50vh", gap: 2 }}
//                 position="alternate"
//               >
//                 <TimelineItem>
//                   <TimelineOppositeContent color="text.secondary">
//                     09:30 am
//                   </TimelineOppositeContent>
//                   <TimelineSeparator>
//                     <TimelineDot />
//                     <TimelineConnector />
//                   </TimelineSeparator>
//                   <TimelineContent>Eat</TimelineContent>
//                 </TimelineItem>
//                 <TimelineItem>
//                   <TimelineOppositeContent color="text.secondary">
//                     10:00 am
//                   </TimelineOppositeContent>
//                   <TimelineSeparator>
//                     <TimelineDot />
//                     <TimelineConnector />
//                   </TimelineSeparator>
//                   <TimelineContent>Code</TimelineContent>
//                 </TimelineItem>
//                 <TimelineItem>
//                   <TimelineOppositeContent color="text.secondary">
//                     12:00 am
//                   </TimelineOppositeContent>
//                   <TimelineSeparator>
//                     <TimelineDot />
//                     <TimelineConnector />
//                   </TimelineSeparator>
//                   <TimelineContent>Sleep</TimelineContent>
//                 </TimelineItem>
//                 <TimelineItem>
//                   <TimelineOppositeContent color="text.secondary">
//                     9:00 am
//                   </TimelineOppositeContent>
//                   <TimelineSeparator>
//                     <TimelineDot />
//                     <TimelineConnector />
//                   </TimelineSeparator>
//                   <TimelineContent>Repeat</TimelineContent>
//                 </TimelineItem>
//               </Timeline>
//             </Box>
//           </Box>

//           <Box height="250px" m="-20px 0 0 0">
//           </Box>
//         </Box>

//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           overflow="auto"
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             borderBottom={`4px solid ${colors.primary[500]}`}
//             colors={colors.grey[100]}
//             p="15px"
//           >
//             <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
//               Recent Treatments
//             </Typography>
//           </Box>
//           {mockTransactions.map((transaction, i) => (
//             <Box
//               key={`${transaction.txId}-${i}`}
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               borderBottom={`4px solid ${colors.primary[500]}`}
//               p="15px"
//             >
//               <Box>
//                 <Typography
//                   color={colors.greenAccent[500]}
//                   variant="h5"
//                   fontWeight="600"
//                 >
//                   {transaction.txId}
//                 </Typography>
//                 <Typography color={colors.grey[100]}>
//                   {transaction.user}
//                 </Typography>
//               </Box>
//               <Box color={colors.grey[100]}>{transaction.date}</Box>
//               <Box
//                 backgroundColor={colors.greenAccent[500]}
//                 p="5px 10px"
//                 borderRadius="4px"
//               >
//                 ${transaction.cost}
//               </Box>
//             </Box>
//           ))}
//         </Box>

//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           overflow="auto"
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             borderBottom={`4px solid ${colors.primary[500]}`}
//             colors={colors.grey[100]}
//             p="15px"
//           >
//             <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
//               Recent Payments
//             </Typography>
//           </Box>
//           {mockTransactions.map((transaction, i) => (
//             <Box
//               key={`${transaction.txId}-${i}`}
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               borderBottom={`4px solid ${colors.primary[500]}`}
//               p="15px"
//             >
//               <Box>
//                 <Typography
//                   color={colors.greenAccent[500]}
//                   variant="h5"
//                   fontWeight="600"
//                 >
//                   {transaction.txId}
//                 </Typography>
//                 <Typography color={colors.grey[100]}>
//                   {transaction.user}
//                 </Typography>
//               </Box>
//               <Box color={colors.grey[100]}>{transaction.date}</Box>
//               <Box
//                 backgroundColor={colors.greenAccent[500]}
//                 p="5px 10px"
//                 borderRadius="4px"
//               >
//                 ${transaction.cost}
//               </Box>
//             </Box>
//           ))}
//         </Box>

//         {/* 2nd ROW 2 ROW */}
//         <Box
//           gridColumn="span 4"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="32,441"
//             subtitle="Weekly Consultations"
//             progress="0.30"
//             increase="+5%"
//             icon={
//               <PersonAddIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 4"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title="32,441"
//             subtitle="New Users"
//             progress="0.30"
//             increase="+5%"
//             icon={
//               <PersonAddIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>

//         {/* ROW 3 */}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useEffect } from "react";
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
  const { userRole, id  } = JSON.parse(localStorage.getItem("userDetails")) || {};

  const { appointments } = useSelector((state) => state.appointment);
  const { treatments } = useSelector((state) => state.treatment);
  const { records } = useSelector((state) => state.record);
  const { payments } = useSelector((state) => state.payment);
  const { doctors } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchAppointments({ userRole, id }));
    dispatch(fetchTreatments());
    dispatch(fetchPayments({ userRole, id }));
    dispatch(getDoctors());
    dispatch(fetchRecords({ userRole, id }));
  }, []);
  
  console.log({
    appointments,
    treatments,
    records,
    payments,
    doctors
  });
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Sort by newest entries first
  const sortByDateTime = (a, b) =>
    new Date(b.startTime) - new Date(a.startTime);

  // Filteri sort
  const weeklyAppointments = appointments? appointments
    .filter((appointment) => new Date(appointment.startTime) >= oneWeekAgo)
    .sort(sortByDateTime) : [];

  // Filtersort
  const weeklyNewDoctors = doctors
    .filter((doctor) => new Date(doctor.assignedDate) >= oneWeekAgo)
    .sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));

  // Sort
  const latestTreatments = treatments? treatments
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7)
    :[];

  const latestRecords = records? records
    .slice()
    .sort((a, b) => new Date(b.assignDate) - new Date(a.assignDate))
    .reverse()
    .slice(0, 7)
    :[];

  const latestPayments = payments? payments
    .slice()
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .reverse()
    .slice(0, 7)
    :[];

  const latestAppointments = appointments? appointments
    .slice()
    .sort(sortByDateTime)
    .slice(0, 4)
    :[];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Quick insights on recent activity" />
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
              {latestAppointments.length > 0 ? (
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
          {latestRecords.length > 0 ? (
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
          
          {latestPayments.length > 0 ? (
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
          )) ) : (
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
            increase="+5%"
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
