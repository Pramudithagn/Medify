import React, { useEffect, useState } from "react";
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
  Typography,
  Skeleton,
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayments,
  // setPayments,
  setSelectedPayment,
  updatePaymentMethod,
  updatePaymentStatus,
} from "../../features/paymentSlice";
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

const Payment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);
  const selectedPayment = useSelector((state) => state.payment.selectedPayment);
  const [selectedMethod, setSelectedMethod] = useState("");
  const { userRole, id } = JSON.parse(localStorage.getItem("userDetails")) || {};
  // const userRole = "PATIENT";

  const isLoading = useSelector((state) => state.payment.isLoading);

  useEffect(() => {
    // dispatch(setPayments(mockDataPayments));
    dispatch(fetchPayments({userRole, id}));
  }, [dispatch]);

  const handleOpen = (payment) => {
    dispatch(setSelectedPayment(payment));
    setSelectedMethod(payment.method || "");
  };

  const handleClose = () => {
    dispatch(setSelectedPayment(null));
    setSelectedMethod("");
  };

  const handleMethodChange = (event) => {
    const updatedMethod = event.target.value;

    const updatedPayment = {
      ...selectedPayment,
      method: updatedMethod,
      status: "reviewing",
    };
    dispatch(setSelectedPayment(updatedPayment));
    setSelectedMethod(event.target.value);
  };

  const handlePay = async () => {
    const updatedPayment = await dispatch(
      updatePaymentMethod(selectedPayment)
    ).unwrap();
    dispatch(setSelectedPayment(null));
    dispatch(updatePaymentStatus({ ...updatedPayment, status: "reviewing" }));

    handleClose();
  };

  const handleStatusChange = (payment, event) => {
    const updatedPayment = {
      ...payment,
      status: event.target.value,
      method: event.target.value === "unpaid" || "failed" ? "" : payment.method,
    };

    // dispatch(updatePaymentStatus({ id, status: event.target.value }));
    dispatch(updatePaymentStatus(updatedPayment));
    setSelectedMethod("");
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
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => 
        userRole==="ADMIN"?
        (<FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            value={params.row.status}
            // disabled={userRole!=="ADMIN"}
            onChange={(e) => handleStatusChange(params.row, e)}
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
      ) : (
        params.row.status || "N/A"
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
        {isLoading ? (
          <Box>
          {[...Array(8)].map((_, index) => (
           <Skeleton key={index} height={50} sx={{ bgcolor: colors.primary[400], mb: 1 }} />
         ))}
       </Box>
        ) : (
          <DataGrid
            rows={payments}
            columns={columns}
            disableRowSelectionOnClick
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        )}
      </Box>

      {/* Modal for Payment */}
      <Modal open={!!selectedPayment} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: colors.primary[400],
            boxShadow: 24,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: 400,
          }}
        >
          <Typography variant="h3" padding={3} align="center">
            Payment Method
          </Typography>

          <TextField
            fullWidth
            label="Amount"
            value={selectedPayment?.amount || ""}
            disabled
          />
          <FormControl fullWidth sx={{ gap: 2 }}>
            <InputLabel id="method-select-label">Method</InputLabel>
            <Select
              value={selectedMethod}
              onChange={handleMethodChange}
              label="Method"
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="bank transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>

          <Button
            color="secondary"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handlePay}
          >
            Pay
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Payment;

//=====================================================================================================================================================================================================================================
