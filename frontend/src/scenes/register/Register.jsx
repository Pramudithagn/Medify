import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  Box,
  useTheme,
  Divider,
  IconButton,
  Avatar,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import Header from "../../components/Header";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createPatient } from "../../features/patientSlice";
import { createDoctor, getDoctors } from "../../features/doctorSlice";
import { fetchTreatments } from "../../features/treatmentSlice";
import { uploadToCloudinary } from "../../controllers/register.controller";

const genders = ["Male", "Female"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const initValues = { uuid: "", name: "", mail: "", phone: "", specialization: "", photo: "", gender: "", dob: null, bloodGroup: "", age: "", weight: "", height: "", allergies: "", street: "", houseNumber: "", city: "", zipCode: "", assignedDate: null, doctorIds: [], treatmentIds: [], userType: "patient", };

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userType, setUserType] = useState("patient");
  const dispatch = useDispatch();
  const [treatmentIds, setTreatmentIds] = useState([]);
  const { treatments } = useSelector((state) => state.treatment);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "", open: false });

  useEffect(() => { dispatch(fetchTreatments()); dispatch(getDoctors()); }, [dispatch]);
  useEffect(() => { if (treatments.length > 0) { setTreatmentIds(treatments.map((treatment) => treatment.id)); } }, [treatments]);
  useEffect(() => { if (alert.open) { const timer = setTimeout(() => { setAlert((prev) => ({ ...prev, open: false })); }, 3000); return () => clearTimeout(timer); } }, [alert.open]);
  const handleToggleChange = (event, newType) => { setUserType(newType); };
  const handleFormSubmit = (values, { resetForm }) => {
    const { city, houseNumber, street, zipCode, ...rest } = values;
    const address = { city, houseNumber, street, zipCode, };
    const formData = { ...rest, address,};

    console.log(formData);
    if (values.userType === "patient") {
      dispatch(createPatient(formData))
        .then(() => { setAlert({ message: "Patient created successfully!", severity: "success", open: true, }); })
        .catch(() => { setAlert({ message: "Failed to create patient.", severity: "error", open: true, }); });
    } else {
      dispatch(createDoctor(formData))
        .then(() => { setAlert({ message: "Doctor created successfully!", severity: "success", open: true, }); })
        .catch(() => { setAlert({ message: "Failed to create doctor.", severity: "error", open: true, }); });
    }
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    uuid: Yup.string().required("Uuid is required"),
    name: Yup.string().required("Name is required"),
    mail: Yup.string() .email("Invalid email format") .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    specialization: Yup.string().when("userType", { is: (value) => value === "doctor", then: () => Yup.string().required("Specialization is required"), otherwise: () => Yup.string().notRequired(), }),
    dob: Yup.date().when("userType", { is: (value) => value === "patient", then: () => Yup.date().required("Date of Birth is required"), otherwise: () => Yup.date().notRequired(), }),
    assignedDate: Yup.date().required("Assigned Date is required"),
    gender: Yup.string().when("userType", { is: (value) => value === "patient", then: () => Yup.string().required("Gender is required"), otherwise: () => Yup.string().notRequired(), }),
    bloodGroup: Yup.string().when("userType", { is: (value) => value === "patient", then: () => Yup.string().required("Blood group is required"), otherwise: () => Yup.string().notRequired(), }),
    allergies: Yup.string().notRequired(),
    age: Yup.number().when("userType", { is: (value) => value === "patient", then: () => Yup.number().required("Age is required"), otherwise: () => Yup.number().notRequired(), }),
    weight: Yup.number().when("userType", { is: (value) => value === "patient", then: () => Yup.number().required("Weight is required"), otherwise: () => Yup.number().notRequired(), }),
    height: Yup.number().when("userType", { is: (value) => value === "patient", then: () => Yup.number().required("Height is required"), otherwise: () => Yup.number().notRequired(), }),
    street: Yup.string().required("Street is required"),
    houseNumber: Yup.string().required("House number is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip code is required"),
    doctorIds: Yup.array().notRequired(),
    treatmentIds: Yup.array().notRequired(),
  });

  const handleImageUpload = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      try { const imageUrl = await uploadToCloudinary(file); setFieldValue("photo", imageUrl); } 
      catch (error) { console.error("Error uploading image:", error); } 
      finally { setUploadingImage(false); }
    }
  };

  return (
    <Box m="20px">
      <Header title="USER REGISTER" subtitle="User Registration" />
      <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              mx="5%"
              sx={{ "& .MuiTextField-root": { "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: colors.grey[500], }, "&.Mui-focused fieldset": { borderColor: colors.grey[400],  }, }, "& .MuiInputLabel-root": { color: colors.grey[200], }, "& .MuiInputLabel-root.Mui-focused": { color: colors.grey[400], }, }, }}
            >
              <Box display="flex" justifyContent="center">
                <ToggleButtonGroup value={values.userType} exclusive onChange={(event, newValue) => { if (newValue !== null) { setFieldValue("userType", newValue); handleToggleChange(event, newValue); } }} aria-label="User type" >
                  <ToggleButton value="patient">Patient</ToggleButton>
                  <ToggleButton value="doctor">Doctor</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Divider />

              <Box display="flex" alignItems="center" gap={2}>
              {/* Avatar and Photo Upload */}
              <Box display="flex" flexDirection="column" alignItems="center">

              <input type="file" accept="image/*" id="fileUpload" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, setFieldValue)} />
                <label htmlFor="fileUpload">
                  <IconButton component="span">
                    {values.photo ? (
                      <Avatar alt="User Photo" src={values.photo} sx={{ width: 120, height: 120 }} />
                    ) : (
                      <Avatar sx={{ width: 120, height: 120, backgroundColor: "#E0E0E0", }} >
                        <AddPhotoAlternateIcon />
                      </Avatar>
                    )}
                  </IconButton>
                </label>
                {uploadingImage && <CircularProgress />}
              </Box>

              {/* UUID and Name Fields */}
              <Box display="flex" flexDirection="column" flexGrow={1}>
                <TextField fullWidth id="uuid" name="uuid" label="UUID" size="small" variant="filled" value={values.uuid} onChange={handleChange} onBlur={handleBlur} error={touched.uuid && Boolean(errors.uuid)} helperText={touched.uuid && errors.uuid} sx={{ marginBottom: 2 }} />
                <TextField fullWidth id="name" name="name" label="Name" size="small" variant="filled" value={values.name} onChange={handleChange} onBlur={handleBlur} error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
              </Box>
            </Box>

              <Box display="flex" justifyContent="space-between" gap={2}>
                <TextField fullWidth id="mail" name="mail" label="Email" size="small" variant="filled" value={values.mail} onChange={handleChange} onBlur={handleBlur} error={touched.mail && Boolean(errors.mail)} helperText={touched.mail && errors.mail} />
                <TextField fullWidth id="phone" name="phone" label="Phone" size="small" variant="filled" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={touched.phone && Boolean(errors.phone)} helperText={touched.phone && errors.phone} />
              </Box>
              {values.userType === "doctor" && (
                <TextField fullWidth id="specialization" name="specialization" label="Specialization" size="small" variant="filled" value={values.specialization} onChange={handleChange} onBlur={handleBlur} error={ touched.specialization && Boolean(errors.specialization) } helperText={touched.specialization && errors.specialization} />
              )}

              {values.userType === "patient" && (
                <>
                  <Box display="flex" gap={2}>
                    <Box flexGrow={1}>
                      <Autocomplete id="gender" options={genders} getOptionLabel={(option) => option} value={values.gender} size="small" onChange={(event, value) => setFieldValue("gender", value) } renderInput={(params) => ( <TextField {...params} label="Gender" variant="filled" error={touched.gender && Boolean(errors.gender)} helperText={touched.gender && errors.gender} /> )} />
                    </Box>

                    <Box flexGrow={1}>
                      <Autocomplete id="bloodGroup" options={bloodGroups} getOptionLabel={(option) => option} value={values.bloodGroup} size="small" onChange={(event, value) => setFieldValue("bloodGroup", value) } renderInput={(params) => ( <TextField {...params} label="Blood Group" variant="filled" error={ touched.bloodGroup && Boolean(errors.bloodGroup) } helperText={touched.bloodGroup && errors.bloodGroup} /> )} />
                    </Box>

                    <Box flexGrow={1}>
                      <TextField fullWidth id="age" name="age" label="Age" type="number" size="small" variant="filled" value={values.age} onChange={handleChange} onBlur={handleBlur} error={touched.age && Boolean(errors.age)} helperText={touched.age && errors.age} />
                    </Box>

                    <Box flexGrow={1}>
                      <TextField fullWidth id="weight" name="weight" label="Weight" type="number" size="small" variant="filled" value={values.weight} onChange={handleChange} onBlur={handleBlur} error={touched.weight && Boolean(errors.weight)} helperText={touched.weight && errors.weight} />
                    </Box>

                    <Box flexGrow={1}>
                      <TextField fullWidth id="height" name="height" label="Height" type="number" size="small" variant="filled" value={values.height} onChange={handleChange} onBlur={handleBlur} error={touched.height && Boolean(errors.height)} helperText={touched.height && errors.height} />
                    </Box>
                  </Box>
                </>
              )}

              <Box display="flex" justifyContent="space-between" gap={2}>
                {values.userType === "patient" && (
                  <DatePicker label="Date of Birth" value={values.dob} onChange={(value) => setFieldValue("dob", value)} slotProps={{ textField: { size: "small", variant: "filled", fullWidth: true, error: touched.dob && Boolean(errors.dob), helperText: touched.dob && errors.dob, }, }} />
                )}
                <DateTimePicker label="Assigned Date" value={values.assignedDate} onChange={(value) => setFieldValue("assignedDate", value)} slotProps={{ textField: { size: "small", variant: "filled", fullWidth: true, error: touched.assignedDate && Boolean(errors.assignedDate), helperText: touched.assignedDate && errors.assignedDate, }, }} />
              </Box>
              {values.userType === "patient" && (
                <>
                  <TextField fullWidth id="allergies" name="allergies" label="Allergies" size="small" variant="filled" value={values.allergies} onChange={handleChange} onBlur={handleBlur} error={touched.allergies && Boolean(errors.allergies)} helperText={touched.allergies && errors.allergies} />
                </>
              )}

              <Box display="flex" gap={2}>
                <TextField fullWidth id="street" name="street" label="Street" size="small" variant="filled" value={values.street} onChange={handleChange} onBlur={handleBlur} error={touched.street && Boolean(errors.street)} helperText={touched.street && errors.street} />
                <TextField fullWidth id="houseNumber" name="houseNumber" label="House Number" size="small" variant="filled" value={values.houseNumber} onChange={handleChange} onBlur={handleBlur} error={touched.houseNumber && Boolean(errors.houseNumber)} helperText={touched.houseNumber && errors.houseNumber} />
                <TextField fullWidth id="city" name="city" label="City" size="small" variant="filled" value={values.city} onChange={handleChange} onBlur={handleBlur} error={touched.city && Boolean(errors.city)} helperText={touched.city && errors.city} />
                <TextField fullWidth id="zipCode" name="zipCode" label="Zip Code" size="small" variant="filled" value={values.zipCode} onChange={handleChange} onBlur={handleBlur} error={touched.zipCode && Boolean(errors.zipCode)} helperText={touched.zipCode && errors.zipCode} />
              </Box>
              <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, width: "50%", ml: "25%",  }} >
                Create User
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* register alertz */}
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} >
        <Alert severity={alert.severity} onClose={() => setAlert((prev) => ({ ...prev, open: false }))}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
