// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Select,
//   MenuItem,
//   Fab,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataPayments } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";

// export const Payments = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [payments, setPayments] = useState(mockDataPayments);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [open, setOpen] = useState(false);

//   const handleOpen = (payment) => {
//     setSelectedPayment(payment);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleStatusChange = (event) => {
//     const updatedStatus = event.target.value;
//     setSelectedPayment({
//       ...selectedPayment,
//       status: updatedStatus,
//     });
//   };

//   const handleMethodChange = (event) => {
//     setSelectedPayment({
//       ...selectedPayment,
//       method: event.target.value,
//     });
//   };

//   const handleSavePayment = () => {
//     // Call backend API to save payment updates
//     setPayments(
//       payments.map((payment) =>
//         payment.id === selectedPayment.id ? selectedPayment : payment
//       )
//     );
//     setOpen(false);
//   };

//   const statusColors = {
//     paid: colors.greenAccent[600],
//     unpaid: colors.redAccent[500],
//     reviewing: colors.blueAccent[500],
//     failed: colors.redAccent[700],
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     {
//       field: "issueDate",
//       headerName: "Issue Date",
//       flex: 1,
//     },
//     {
//       field: "dueDate",
//       headerName: "Due Date",
//       flex: 1,
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//       type: "number",
//       flex: 1,
//     },
//     {
//       field: "method",
//       headerName: "Method",
//       flex: 1,
//       renderCell: (params) => (
//         <Box sx={{ color: statusColors[params.row.status] }}>
//           {params.row.method}
//         </Box>
//       ),
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => (
//         <Select
//           value={params.row.status}
//           onChange={(event) =>
//             setPayments(
//               payments.map((payment) =>
//                 payment.id === params.row.id
//                   ? { ...payment, status: event.target.value }
//                   : payment
//               )
//             )
//           }
//         >
//           <MenuItem value="paid">Paid</MenuItem>
//           <MenuItem value="unpaid">Unpaid</MenuItem>
//           <MenuItem value="reviewing">Reviewing</MenuItem>
//           <MenuItem value="failed">Failed</MenuItem>
//         </Select>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) =>
//         (params.row.status === "unpaid" || params.row.status === "failed") && (
//           <Button
//             variant="contained"
//             color="primary"
//             size="small"
//             onClick={() => handleOpen(params.row)}
//           >
//             Pay
//           </Button>
//         ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="PAYMENTS" subtitle="List of payments" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: `${colors.blueAccent[700]}  !important`,
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//         }}
//       >
//         <DataGrid rows={payments} columns={columns} />
//       </Box>

//       {/* Modal for managing payment */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           p={4}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             borderRadius: 2,
//             maxWidth: 500,
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="Amount"
//             value={selectedPayment?.amount || ""}
//             disabled
//           />
//           <Select
//             value={selectedPayment?.method || ""}
//             onChange={handleMethodChange}
//           >
//             <MenuItem value="Credit Card">Credit Card</MenuItem>
//             <MenuItem value="Cash">Cash</MenuItem>
//             <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
//           </Select>
//           <Box display="flex" justifyContent="flex-end" gap={2}>
//             <Button variant="contained" onClick={handleSavePayment}>
//               Pay
//             </Button>
//             <Button variant="outlined" onClick={handleClose}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };
// export default Payments;

//======================================================================================================================================

import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  Fab,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockDataPayments } from "../../data/mockData";

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
          button: { variant: "outlined" },
        }}
      />
    </GridToolbarContainer>
  );
}

const PaymentPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [payments, setPayments] = useState(mockDataPayments);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  // const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleOpen = (payment) => {
    setSelectedPayment(payment);
    setSelectedMethod(payment.method || "");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setPaymentMethod("");
    setSelectedMethod("")
  };

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  // const handlePay = () => {
  //   // Call backend endpoint to process payment
  //   setPayments(
  //     payments.map((payment) =>
  //       payment.id === selectedPayment.id ? selectedPayment : payment
  //     )
  //   );
  //   console.log(
  //     `Paying with method: ${paymentMethod} for payment ID: ${selectedPayment.method}`
  //   );
  //   setOpen(false);
  // };

  const handlePay = () => {
    const updatedPayments = payments.map((payment) =>
      payment.id === selectedPayment.id
        ? { ...payment, method: selectedMethod, status: "reviewing" }
        : payment
    );

        // Call backend process payment

    setPayments(updatedPayments);
    setOpen(false);
  };

  const handleStatusChange = (id, event) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: event.target.value } : payment
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "issueDate", headerName: "Issue Date", flex: 1 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
    {
      field: "patientId",
      headerName: "Patient ID",
      flex: 1,
      renderCell: (params) => params.row.patientId || "N/A",
    },
    {
      field: "medicalRecordId",
      headerName: "Medical Record ID",
      width: 0,
      flex: 1,
      renderCell: (params) => params.row.medicalRecordId || "N/A", 
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    // {
    //     field: "amount",
    //     headerName: "Amount",
    //     type: "number",
    //     flex: 1,
    //     renderCell: (params) => (
    //       <Box
    //         sx={{
    //           pl: 0, // Reduce left padding
    //           pr: 10,   // Increase right padding
    //         }}
    //       >
    //         {params.row.amount}
    //       </Box>
    //     ),
    //   },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            value={params.row.status}
            onChange={(e) => handleStatusChange(params.row.id, e)}
            sx={{
              paddingTop: 1,
              color:
                params.value === "paid"
                  ? colors.greenAccent[500]
                  : params.value === "unpaid"
                  ? colors.redAccent[300]
                  : params.value === "reviewing"
                  ? colors.blueAccent[500]
                  : colors.redAccent[500],
            }}
          >
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="reviewing">Reviewing</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) =>
        ["unpaid", "failed"].includes(params.row.status) ? (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleOpen(params.row)}
          >
            Pay
          </Button>
        ) : null,
    },
  ];

  return (
    <Box m="20px">
      <Header title="PAYMENTS" subtitle="Manage your payments" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiSelect-root": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiButtonBase-root": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={payments}
          columns={columns}
          disableRowSelectionOnClick 
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>

      {/* Modal for Payment */}
      <Modal open={open} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: colors.grey[800],
            boxShadow: 24,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: 400,
          }}
        >
          <h2 id="parent-modal-title">Payment Method</h2>

          <FormControl fullWidth sx={{ gap: 2 }}>
            <TextField
              label="Amount"
              value={selectedPayment?.amount || ""}
              disabled
            />
            <Select
              value={selectedMethod}
              // onChange={(e) => setPaymentMethod(e.target.value)}
              onChange={handleMethodChange}
              label="Payment Method"
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="secondary" onClick={handlePay}>
            Pay Now
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentPage;
