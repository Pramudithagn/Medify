import React, { useState } from "react";
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
} from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createPatient } from "../../features/patientSlice";
import { createDoctor, getDoctors } from "../../features/doctorSlice";
import { fetchTreatments } from "../../features/treatmentSlice";

// const treatments = [1, 2, 3, 4];
// const doctors = [1, 3, 4, 101, 102, 103];
const genders = ["Male", "Female"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const initValues = {
  uuid: "",
  name: "",
  mail: "",
  phone: "",
  specialization: "",
  photo: "",
  gender: "",
  dob: null,
  bloodGroup: "",
  age: "",
  weight: "",
  height: "",
  allergies: "",
  street: "",
  houseNumber: "",
  city: "",
  zipCode: "",
  assignedDate: null,
  doctorIds: [],
  treatmentIds: [],
  userType: "patient",
};

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userType, setUserType] = useState("patient");
  const dispatch = useDispatch();
  const [treatmentIds, setTreatmentIds] = useState([]);
  const { treatments } = useSelector((state) => state.treatment);

  React.useEffect(() => {
    dispatch(fetchTreatments());
    dispatch(getDoctors());
  }, [dispatch]);

  React.useEffect(() => {
    if (treatments.length > 0) {
      setTreatmentIds(treatments.map((treatment) => treatment.id));
    }
  }, [treatments]);

  const handleToggleChange = (event, newType) => {
    setUserType(newType);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    const { city, houseNumber, street, zipCode, ...rest } = values;

    const address = {
      city,
      houseNumber,
      street,
      zipCode,
    };

    const formData = {
      ...rest,
      address,
    };

    console.log(formData);

    if (values.userType === "patient") {
      // dispatch(addPatient(values));
      dispatch(createPatient(formData));
    } else {
      // dispatch(addDoctor(values));
      dispatch(createDoctor(formData));
    }
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    uuid: Yup.string().required("Uuid is required"),
    name: Yup.string().required("Name is required"),
    mail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    specialization: Yup.string().when("userType", {
      is: (value) => value === "doctor",
      then: () => Yup.string().required("Specialization is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    dob: Yup.date().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.date().required("Date of Birth is required"),
      otherwise: () => Yup.date().notRequired(),
    }),
    assignedDate: Yup.date().required("Assigned Date is required"),
    gender: Yup.string().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.string().required("Gender is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    bloodGroup: Yup.string().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.string().required("Blood group is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    allergies: Yup.string().notRequired(),
    age: Yup.number().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.number().required("Age is required"),
      otherwise: () => Yup.number().notRequired(),
    }),
    weight: Yup.number().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.number().required("Weight is required"),
      otherwise: () => Yup.number().notRequired(),
    }),
    height: Yup.number().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.number().required("Height is required"),
      otherwise: () => Yup.number().notRequired(),
    }),
    street: Yup.string().required("Street is required"),
    houseNumber: Yup.string().required("House number is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip code is required"),
    doctorIds: Yup.array().notRequired(),
    treatmentIds: Yup.array().notRequired(),
  });

  return (
    <Box m="20px">
      <Header title="USER REGISTER" subtitle="User Registration" />

      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
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
              sx={{
                "& .MuiTextField-root": {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.grey[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.grey[400],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[200],
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.grey[400],
                  },
                },
              }}
            >
              <Box display="flex" justifyContent="center">
                <ToggleButtonGroup
                  value={values.userType}
                  exclusive
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      setFieldValue("userType", newValue);
                      handleToggleChange(event, newValue);
                    }
                  }}
                  aria-label="User type"
                >
                  <ToggleButton value="patient">Patient</ToggleButton>
                  <ToggleButton value="doctor">Doctor</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Divider />
              <TextField
                fullWidth
                id="uuid"
                name="uuid"
                label="UUID"
                size="small"
                variant="filled"
                value={values.uuid}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.uuid && Boolean(errors.uuid)}
                helperText={touched.uuid && errors.uuid}
                // margin="normal"
              />
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                size="small"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                // margin="normal"
              />

              <Box display="flex" justifyContent="space-between" gap={2}>
                <TextField
                  fullWidth
                  id="mail"
                  name="mail"
                  label="Email"
                  size="small"
                  variant="filled"
                  value={values.mail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mail && Boolean(errors.mail)}
                  helperText={touched.mail && errors.mail}
                  // margin="normal"
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  size="small"
                  variant="filled"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  // margin="normal"
                />
              </Box>

              <TextField
                fullWidth
                id="photo"
                name="photo"
                label="Photo URL"
                size="small"
                variant="filled"
                value={values.photo}
                onChange={handleChange}
                onBlur={handleBlur}
                // margin="normal"
              />
              {values.userType === "doctor" && (
                <TextField
                  fullWidth
                  id="specialization"
                  name="specialization"
                  label="Specialization"
                  size="small"
                  variant="filled"
                  value={values.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.specialization && Boolean(errors.specialization)
                  }
                  helperText={touched.specialization && errors.specialization}
                  // margin="normal"
                />
              )}

              {values.userType === "patient" && (
                <>
                  <Box display="flex" gap={2}>
                    <Box flexGrow={1}>
                      <Autocomplete
                        id="gender"
                        options={genders}
                        getOptionLabel={(option) => option}
                        value={values.gender}
                        size="small"
                        onChange={(event, value) =>
                          setFieldValue("gender", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Gender"
                            // margin="normal"
                            variant="filled"
                            error={touched.gender && Boolean(errors.gender)}
                            helperText={touched.gender && errors.gender}
                          />
                        )}
                      />
                    </Box>

                    <Box flexGrow={1}>
                      <Autocomplete
                        id="bloodGroup"
                        options={bloodGroups}
                        getOptionLabel={(option) => option}
                        value={values.bloodGroup}
                        size="small"
                        onChange={(event, value) =>
                          setFieldValue("bloodGroup", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Blood Group"
                            // margin="normal"
                            variant="filled"
                            error={
                              touched.bloodGroup && Boolean(errors.bloodGroup)
                            }
                            helperText={touched.bloodGroup && errors.bloodGroup}
                          />
                        )}
                      />
                    </Box>

                    <Box flexGrow={1}>
                      <TextField
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        type="number"
                        size="small"
                        variant="filled"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.age && Boolean(errors.age)}
                        helperText={touched.age && errors.age}
                        // margin="normal"
                      />
                    </Box>

                    <Box flexGrow={1}>
                      <TextField
                        fullWidth
                        id="weight"
                        name="weight"
                        label="Weight"
                        type="number"
                        size="small"
                        variant="filled"
                        value={values.weight}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.weight && Boolean(errors.weight)}
                        helperText={touched.weight && errors.weight}
                        // margin="normal"
                      />
                    </Box>

                    <Box flexGrow={1}>
                      <TextField
                        fullWidth
                        id="height"
                        name="height"
                        label="Height"
                        type="number"
                        size="small"
                        variant="filled"
                        value={values.height}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.height && Boolean(errors.height)}
                        helperText={touched.height && errors.height}
                        // margin="normal"
                      />
                    </Box>
                  </Box>
                </>
              )}

              <Box display="flex" justifyContent="space-between" gap={2}>
                {values.userType === "patient" && (
                  <DatePicker
                    label="Date of Birth"
                    value={values.dob}
                    onChange={(value) => setFieldValue("dob", value)}
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "filled",
                        // margin: "normal",
                        fullWidth: true,
                        error: touched.dob && Boolean(errors.dob),
                        helperText: touched.dob && errors.dob,
                      },
                    }}
                  />
                )}
                <DateTimePicker
                  label="Assigned Date"
                  value={values.assignedDate}
                  onChange={(value) => setFieldValue("assignedDate", value)}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "filled",
                      // margin: "normal",
                      fullWidth: true,
                      error:
                        touched.assignedDate && Boolean(errors.assignedDate),
                      helperText: touched.assignedDate && errors.assignedDate,
                    },
                  }}
                  // renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>

              {/* {values.userType === "doctor" && (
                <Autocomplete
                multiple
                id="treatments"
                options={treatments}
                getOptionLabel={(option) => option.name}
                value={treatments.filter((treatment) =>
                  values.treatmentIds.includes(treatment.id)
                )}
                size="small"
                onChange={(event, value) => {
                  const ids = value.map((treatment) => treatment.id);
                  setFieldValue("treatmentIds", ids);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Treatments"
                    variant="filled"
                    error={touched.treatmentIds && Boolean(errors.treatmentIds)}
                    helperText={touched.treatmentIds && errors.treatmentIds}
                  />
                )}
              />
              )} */}
              {values.userType === "patient" && (
                <>
                  <TextField
                    fullWidth
                    id="allergies"
                    name="allergies"
                    label="Allergies"
                    size="small"
                    variant="filled"
                    value={values.allergies}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.allergies && Boolean(errors.allergies)}
                    helperText={touched.allergies && errors.allergies}
                    // margin="normal"
                  />
                </>
              )}

              <Box display="flex" gap={2}>
                <TextField
                  fullWidth
                  id="street"
                  name="street"
                  label="Street"
                  size="small"
                  variant="filled"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.street && Boolean(errors.street)}
                  helperText={touched.street && errors.street}
                  // margin="normal"
                />
                <TextField
                  fullWidth
                  id="houseNumber"
                  name="houseNumber"
                  label="House Number"
                  size="small"
                  variant="filled"
                  value={values.houseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.houseNumber && Boolean(errors.houseNumber)}
                  helperText={touched.houseNumber && errors.houseNumber}
                  // margin="normal"
                />
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  size="small"
                  variant="filled"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  // margin="normal"
                />
                <TextField
                  fullWidth
                  id="zipCode"
                  name="zipCode"
                  label="Zip Code"
                  size="small"
                  variant="filled"
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zipCode && Boolean(errors.zipCode)}
                  helperText={touched.zipCode && errors.zipCode}
                  // margin="normal"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  mt: 2,
                  width: "50%",
                  ml: "25%",
                }}
              >
                Create User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
