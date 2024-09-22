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
import { setAppointments } from "../../features/appointmentSlice";
import {
  mockDataAppointments,
  mockDataDoctors,
  mockDataPayments,
  mockDataRecords,
  mockDataTreatments,
} from "../../data/mockData";
import { setTreatments } from "../../features/treatmentSlice";
import { setPayments } from "../../features/paymentSlice";
import { setDoctors } from "../../features/doctorSlice";
import { setRecords } from "../../features/recordSlice";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const { appointments } = useSelector((state) => state.appointment);
  const { treatments } = useSelector((state) => state.treatment);
  const { records } = useSelector((state) => state.record);
  const { payments } = useSelector((state) => state.payment);
  const { doctors } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(setAppointments(mockDataAppointments));
    dispatch(setTreatments(mockDataTreatments));
    dispatch(setPayments(mockDataPayments));
    dispatch(setDoctors(mockDataDoctors));
    dispatch(setRecords(mockDataRecords));
  }, []);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Sort by newest entries first
  const sortByDateTime = (a, b) =>
    new Date(b.startTime) - new Date(a.startTime);

  // Filteri sort
  const weeklyAppointments = appointments
    .filter((appointment) => new Date(appointment.startTime) >= oneWeekAgo)
    .sort(sortByDateTime);

  // Filtersort
  const weeklyNewDoctors = doctors
    .filter((doctor) => new Date(doctor.assignedDate) >= oneWeekAgo)
    .sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));

  // Sort
  const latestTreatments = treatments
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  const latestRecords = records
    .slice()
    .sort((a, b) => new Date(b.assignDate) - new Date(a.assignDate))
    .reverse()
    .slice(0, 7);

  const latestPayments = payments
    .slice()
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .reverse()
    .slice(0, 7);

  const latestAppointments = appointments
    .slice()
    .sort(sortByDateTime)
    .slice(0, 4);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
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
                      {appointment.startTime}
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
              Recent Treatments
            </Typography>
          </Box>
          {latestRecords.map((record, i) => (
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
          ))}
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
          {latestPayments.map((payment, i) => (
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
          ))}
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
            title={weeklyAppointments.length.toString()}
            subtitle="Weekly Consultations"
            progress={weeklyAppointments.length / appointments.length}
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

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
