import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Switch,
  Autocomplete,
  Fab,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTreatments, mockDoctorIds } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

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

export const Treatments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [treatments, setTreatments] = useState(mockDataTreatments);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpen = (treatment) => {
    setSelectedTreatment(treatment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (isCreating) {
      // Save new treatment  call backend
      setTreatments([...treatments, selectedTreatment]);
    } else {
      // Update  treatment
      setTreatments(
        treatments.map((treatment) =>
          treatment.id === selectedTreatment.id ? selectedTreatment : treatment
        )
      );
    }
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setSelectedTreatment({
      ...selectedTreatment,
      status: event.target.checked,
    });
  };

  const handleDoctorIdsChange = (event, value) => {
    setSelectedTreatment({
      ...selectedTreatment,
      doctorIds: value,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (params.row.status ? "Available" : "Unavailable"),
    },
    {
      field: "doctorIds",
      headerName: "Doctor Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          sx={{ backgroundColor: colors.grey[700] }}
          variant="contained"
          size="small"
          onClick={() => handleOpen(params.row)}
        >
          ...
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TREATMENTS" subtitle="List of provided treatments" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${colors.blueAccent[700]}  !important`,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
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
          rows={treatments}
          columns={columns}
          disableRowSelectionOnClick
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>

      {/* Modal for editing treatment */}
      <Modal open={open} onClose={handleClose}>
        <Box
          p={4}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: colors.primary[400],
            boxShadow: 24,
            borderRadius: 2,
            maxWidth: 500,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: `${colors.greenAccent[600]} !important`,
              "&:hover": {},
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: grey[600],
            },
          }}
        >
          <Typography variant="h2" padding={3} align="center">
            Update Treatment
          </Typography>

          <TextField
            label="Name"
            value={selectedTreatment?.name || ""}
            onChange={(e) =>
              setSelectedTreatment({
                ...selectedTreatment,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Description"
            value={selectedTreatment?.description || ""}
            onChange={(e) =>
              setSelectedTreatment({
                ...selectedTreatment,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={selectedTreatment?.price || ""}
            onChange={(e) =>
              setSelectedTreatment({
                ...selectedTreatment,
                price: e.target.value,
              })
            }
          />
          <Autocomplete
            multiple
            options={mockDoctorIds}
            getOptionLabel={(option) => option}
            value={selectedTreatment?.doctorIds || []}
            onChange={handleDoctorIdsChange}
            renderInput={(params) => (
              <TextField {...params} label="Doctor IDs" />
            )}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>
              Status: {selectedTreatment?.status ? "Available" : "Unavailable"}
            </span>
            <Switch
              checked={selectedTreatment?.status || false}
              onChange={handleStatusChange}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ backgroundColor: colors.greenAccent[600] }}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ backgroundColor: colors.grey[600] }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* FAB for creating a  treatment */}
      <Box
        sx={{
          "& .MuiFab-root": {
            backgroundColor: `${colors.greenAccent[600]} !important`,
          },
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: "12%",
            right: "5%",
          }}
          onClick={() => {
            setSelectedTreatment({
              id: treatments.length + 1,
              name: "",
              description: "",
              price: "",
              status: false,
              doctorIds: [],
            });
            setIsCreating(true);
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Modal for creating a  treatment */}
      <Modal open={open && isCreating} onClose={handleClose}>
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
            maxWidth: 500,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: `${colors.greenAccent[600]} !important`,
              "&:hover": {},
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: grey[600],
            },
          }}
        >
          <Typography
            variant="h2"
            padding={3}
            align="center"
          >
            Create New Treatment
          </Typography>
          <TextField
            label="Name"
            value={selectedTreatment?.name || ""}
            onChange={(e) =>
              setSelectedTreatment({
                ...selectedTreatment,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Description"
            value={selectedTreatment?.description || ""}
            onChange={(e) =>
              setSelectedTreatment({
                ...selectedTreatment,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={selectedTreatment?.price || ""}
            onChange={(e) =>
              setSelectedTreatment({
                ...selectedTreatment,
                price: e.target.value,
              })
            }
          />
          <Autocomplete
            multiple
            options={mockDoctorIds}
            getOptionLabel={(option) => option}
            value={selectedTreatment?.doctorIds || []}
            onChange={handleDoctorIdsChange}
            renderInput={(params) => (
              <TextField {...params} label="Doctor IDs" />
            )}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>
              Status: {selectedTreatment?.status ? "Available" : "Unavailable"}
            </span>
            <Switch
              checked={selectedTreatment?.status || false}
              onChange={handleStatusChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" gap={2} mb={1}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ backgroundColor: colors.greenAccent[600] }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ backgroundColor: colors.grey[600] }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Treatments;
