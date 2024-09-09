// import React, { useState } from 'react';
// import { ToggleButtonGroup, ToggleButton, TextField, Button, Grid, Box } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Header from '../../components/Header';

// const Register = () => {
//   const [role, setRole] = useState('patient');

//   const handleRoleChange = (event, newRole) => {
//     if (newRole !== null) {
//       setRole(newRole);
//     }
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required('Name is required'),
//     mail: Yup.string().email('Invalid email format').required('Email is required'),
//     phone: Yup.string().required('Phone number is required'),
//     photo: Yup.string().required('Photo URL is required'),
//     ...(role === 'patient' && {
//       gender: Yup.string().required('Gender is required'),
//       dob: Yup.string().required('Date of Birth is required'),
//       bloodGroup: Yup.string().required('Blood group is required'),
//       weight: Yup.number().required('Weight is required'),
//       height: Yup.number().required('Height is required'),
//       allergies: Yup.string(),
//     }),
//     ...(role === 'doctor' && {
//       specialization: Yup.string().required('Specialization is required'),
//     }),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       mail: '',
//       phone: '',
//       photo: '',
//       gender: '',
//       dob: '',
//       bloodGroup: '',
//       weight: '',
//       height: '',
//       allergies: '',
//       specialization: '',
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log('Form Values:', values);
//     },
//   });

//   return (
//     <Box m="20px">
//               <Header title="USER REGISTER" subtitle="User Registration" />
//       <Box display="flex" justifyContent="center" marginBottom={2}>
//         <ToggleButtonGroup
//           value={role}
//           exclusive
//           onChange={handleRoleChange}
//           aria-label="role selection"
//         >
//           <ToggleButton value="patient" aria-label="patient">
//             Patient
//           </ToggleButton>
//           <ToggleButton value="doctor" aria-label="doctor">
//             Doctor
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="name"
//               name="name"
//               label="Name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               error={formik.touched.name && Boolean(formik.errors.name)}
//               helperText={formik.touched.name && formik.errors.name}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="mail"
//               name="mail"
//               label="Email"
//               value={formik.values.mail}
//               onChange={formik.handleChange}
//               error={formik.touched.mail && Boolean(formik.errors.mail)}
//               helperText={formik.touched.mail && formik.errors.mail}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="phone"
//               name="phone"
//               label="Phone"
//               value={formik.values.phone}
//               onChange={formik.handleChange}
//               error={formik.touched.phone && Boolean(formik.errors.phone)}
//               helperText={formik.touched.phone && formik.errors.phone}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="photo"
//               name="photo"
//               label="Photo URL"
//               value={formik.values.photo}
//               onChange={formik.handleChange}
//               error={formik.touched.photo && Boolean(formik.errors.photo)}
//               helperText={formik.touched.photo && formik.errors.photo}
//             />
//           </Grid>

//           {/* Conditionally render patient form */}
//           {role === 'patient' && (
//             <>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="gender"
//                   name="gender"
//                   label="Gender"
//                   value={formik.values.gender}
//                   onChange={formik.handleChange}
//                   error={formik.touched.gender && Boolean(formik.errors.gender)}
//                   helperText={formik.touched.gender && formik.errors.gender}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="dob"
//                   name="dob"
//                   label="Date of Birth"
//                   value={formik.values.dob}
//                   onChange={formik.handleChange}
//                   error={formik.touched.dob && Boolean(formik.errors.dob)}
//                   helperText={formik.touched.dob && formik.errors.dob}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="bloodGroup"
//                   name="bloodGroup"
//                   label="Blood Group"
//                   value={formik.values.bloodGroup}
//                   onChange={formik.handleChange}
//                   error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
//                   helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   id="weight"
//                   name="weight"
//                   label="Weight"
//                   value={formik.values.weight}
//                   onChange={formik.handleChange}
//                   error={formik.touched.weight && Boolean(formik.errors.weight)}
//                   helperText={formik.touched.weight && formik.errors.weight}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   id="height"
//                   name="height"
//                   label="Height"
//                   value={formik.values.height}
//                   onChange={formik.handleChange}
//                   error={formik.touched.height && Boolean(formik.errors.height)}
//                   helperText={formik.touched.height && formik.errors.height}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="allergies"
//                   name="allergies"
//                   label="Allergies"
//                   value={formik.values.allergies}
//                   onChange={formik.handleChange}
//                   error={formik.touched.allergies && Boolean(formik.errors.allergies)}
//                   helperText={formik.touched.allergies && formik.errors.allergies}
//                 />
//               </Grid>
//             </>
//           )}

//           {/* Conditionally render doctor form */}
//           {role === 'doctor' && (
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="specialization"
//                 name="specialization"
//                 label="Specialization"
//                 value={formik.values.specialization}
//                 onChange={formik.handleChange}
//                 error={formik.touched.specialization && Boolean(formik.errors.specialization)}
//                 helperText={formik.touched.specialization && formik.errors.specialization}
//               />
//             </Grid>
//           )}
//         </Grid>

//         <Box display="flex" justifyContent="center" marginTop={2}>
//           <Button color="primary" variant="contained" type="submit">
//             Create User
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default Register;

//=================================================================================================================================================

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Button,
//   ToggleButton,
//   ToggleButtonGroup,
//   Autocomplete,
//   Box,
//   useTheme,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";

// const treatments = [1, 2, 3];
// const doctors = [101, 102, 103];
// const genders = ["Male", "Female"];
// const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// const Registration = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [userType, setUserType] = useState("patient");

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       mail: "",
//       phone: "",
//       photo: "",
//       gender: "",
//       dob: null,
//       bloodGroup: "",
//       age: "",
//       weight: "",
//       height: "",
//       allergies: "",
//       street: "",
//       houseNumber: "",
//       city: "",
//       zipCode: "",
//       assignedDate: null,
//       doctorIds: [],
//       treatmentIds: [],
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Name is required"),
//       mail: Yup.string()
//         .email("Invalid email format")
//         .required("Email is required"),
//       phone: Yup.string().required("Phone is required"),
//       dob: Yup.date().nullable().required("Date of Birth is required"),
//       assignedDate: Yup.date().nullable().required("Assigned Date is required"),
//       gender: Yup.string().required("Gender is required"),
//       bloodGroup: Yup.string().required("Blood group is required"),
//       age: Yup.number().when("userType", {
//         is: "patient",
//         then: Yup.number().required("Age is required"),
//       }),
//       street: Yup.string().required("Street is required"),
//       houseNumber: Yup.string().required("House number is required"),
//       city: Yup.string().required("City is required"),
//       zipCode: Yup.string().required("Zip code is required"),
//       doctorIds: Yup.array().min(1, "At least one doctor must be selected"),
//       treatmentIds: Yup.array().min(
//         1,
//         "At least one treatment must be selected for doctors"
//       ),
//     }),
//     onSubmit: (values) => {
//       console.log("Form Values:", values);
//     },
//   });

//   const handleToggleChange = (event, newType) => {
//     if (newType !== null) {
//       setUserType(newType);
//       formik.resetForm();
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="USER REGISTER" subtitle="User Registration" />
//       <Box
//         mx="5%"
//         sx={{
//           "& .MuiTextField-root, & .MuiFormControl-root": {
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: colors.grey[500],
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: colors.grey[400],
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: colors.grey[200],
//             },
//             "& .MuiInputLabel-root.Mui-focused": {
//               color: colors.grey[400],
//             },
//           },
//         }}
//       >
//         <Box display="flex" justifyContent="center">
//           <ToggleButtonGroup
//             value={userType}
//             exclusive
//             onChange={handleToggleChange}
//             aria-label="User type"
//             style={{ marginBottom: "20px" }}
//           >
//             <ToggleButton value="patient">Patient</ToggleButton>
//             <ToggleButton value="doctor">Doctor</ToggleButton>
//           </ToggleButtonGroup>
//         </Box>
//         <form onSubmit={formik.handleSubmit}>
//           <TextField
//             fullWidth
//             id="name"
//             name="name"
//             label="Name"
//             size="small"
//             variant="filled"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             error={formik.touched.name && Boolean(formik.errors.name)}
//             helperText={formik.touched.name && formik.errors.name}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             id="mail"
//             name="mail"
//             label="Email"
//             size="small"
//             variant="filled"
//             value={formik.values.mail}
//             onChange={formik.handleChange}
//             error={formik.touched.mail && Boolean(formik.errors.mail)}
//             helperText={formik.touched.mail && formik.errors.mail}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             id="phone"
//             name="phone"
//             label="Phone"
//             size="small"
//             variant="filled"
//             value={formik.values.phone}
//             onChange={formik.handleChange}
//             error={formik.touched.phone && Boolean(formik.errors.phone)}
//             helperText={formik.touched.phone && formik.errors.phone}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             id="photo"
//             name="photo"
//             label="Photo URL"
//             size="small"
//             variant="filled"
//             value={formik.values.photo}
//             onChange={formik.handleChange}
//             margin="normal"
//           />

//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//             gap={2}
//           >
//             {userType === "patient" && (
//               <>
//                 <Box flexGrow={1}>
//                   <Autocomplete
//                     id="gender"
//                     options={genders}
//                     getOptionLabel={(option) => option}
//                     value={formik.values.gender}
//                     size="small"
//                     onChange={(event, value) =>
//                       formik.setFieldValue("gender", value)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Gender"
//                         margin="normal"
//                         variant="filled"
//                         error={
//                           formik.touched.gender && Boolean(formik.errors.gender)
//                         }
//                         helperText={
//                           formik.touched.gender && formik.errors.gender
//                         }
//                       />
//                     )}
//                   />
//                 </Box>

//                 <Box flexGrow={1}>
//                   <Autocomplete
//                     id="bloodGroup"
//                     options={bloodGroups}
//                     getOptionLabel={(option) => option}
//                     value={formik.values.bloodGroup}
//                     size="small"
//                     onChange={(event, value) =>
//                       formik.setFieldValue("bloodGroup", value)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Blood Group"
//                         margin="normal"
//                         variant="filled"
//                         error={
//                           formik.touched.bloodGroup &&
//                           Boolean(formik.errors.bloodGroup)
//                         }
//                         helperText={
//                           formik.touched.bloodGroup && formik.errors.bloodGroup
//                         }
//                       />
//                     )}
//                   />
//                 </Box>

//                 <Box flexGrow={1}>
//                   <TextField
//                     fullWidth
//                     id="age"
//                     name="age"
//                     label="Age"
//                     type="number"
//                     size="small"
//                     variant="filled"
//                     value={formik.values.age}
//                     onChange={formik.handleChange}
//                     error={formik.touched.age && Boolean(formik.errors.age)}
//                     helperText={formik.touched.age && formik.errors.age}
//                     margin="normal"
//                   />
//                 </Box>

//                 <Box flexGrow={1}>
//                   <TextField
//                     fullWidth
//                     id="weight"
//                     name="weight"
//                     label="Weight"
//                     type="number"
//                     size="small"
//                     variant="filled"
//                     value={formik.values.weight}
//                     onChange={formik.handleChange}
//                     margin="normal"
//                   />
//                 </Box>

//                 <Box flexGrow={1}>
//                   <TextField
//                     fullWidth
//                     id="height"
//                     name="height"
//                     label="Height"
//                     type="number"
//                     size="small"
//                     variant="filled"
//                     value={formik.values.height}
//                     onChange={formik.handleChange}
//                     margin="normal"
//                   />
//                 </Box>
//               </>
//             )}
//           </Box>

//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//             gap={2}
//           >
//             {userType === "patient" && (
//               <DatePicker
//                 label="Date of Birth"
//                 value={formik.values.dob}
//                 // size="small"
//                 onChange={(value) => formik.setFieldValue("dob", value)}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     variant: "filled",
//                     margin: "normal",
//                     sx: {width: "100%"},
//                   },
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     margin="normal"
//                     error={formik.touched.dob && Boolean(formik.errors.dob)}
//                     helperText={formik.touched.dob && formik.errors.dob}
//                   />
//                 )}
//               />
//             )}

//             <DatePicker
//               label="Assigned Date"
//               value={formik.values.assignedDate}
//               onChange={(value) => formik.setFieldValue("assignedDate", value)}
//               slotProps={{
//                 textField: {
//                   size: "small",
//                   variant: "filled",
//                   margin: "normal",
//                   sx: { width: "100%" },
//                 },
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   margin="normal"
//                   error={
//                     formik.touched.assignedDate &&
//                     Boolean(formik.errors.assignedDate)
//                   }
//                   helperText={
//                     formik.touched.assignedDate && formik.errors.assignedDate
//                   }
//                 />
//               )}
//             />
//           </Box>

//           {userType === "patient" && (
//             <>
//               <TextField
//                 fullWidth
//                 id="allergies"
//                 name="allergies"
//                 label="Allergies"
//                 size="small"
//                 variant="filled"
//                 value={formik.values.allergies}
//                 onChange={formik.handleChange}
//                 margin="normal"
//               />

//               <Autocomplete
//                 multiple
//                 id="doctorIds"
//                 options={doctors}
//                 getOptionLabel={(option) => `Doctor ID: ${option}`}
//                 value={formik.values.doctorIds}
//                 size="small"
//                 variant="filled"
//                 onChange={(event, value) =>
//                   formik.setFieldValue("doctorIds", value)
//                 }
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Select Doctor IDs"
//                     margin="normal"
//                     variant="filled"
//                     size="medium"
//                     error={
//                       formik.touched.doctorIds &&
//                       Boolean(formik.errors.doctorIds)
//                     }
//                     helperText={
//                       formik.touched.doctorIds && formik.errors.doctorIds
//                     }
//                   />
//                 )}
//               />
//             </>
//           )}

//           <Box display="flex" gap={2}>
//             <TextField
//               fullWidth
//               id="houseNumber"
//               name="houseNumber"
//               label="House Number"
//               size="small"
//               variant="filled"
//               value={formik.values.houseNumber}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
//               }
//               helperText={
//                 formik.touched.houseNumber && formik.errors.houseNumber
//               }
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="street"
//               name="street"
//               label="Street"
//               size="small"
//               variant="filled"
//               value={formik.values.street}
//               onChange={formik.handleChange}
//               error={formik.touched.street && Boolean(formik.errors.street)}
//               helperText={formik.touched.street && formik.errors.street}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="city"
//               name="city"
//               label="City"
//               size="small"
//               variant="filled"
//               value={formik.values.city}
//               onChange={formik.handleChange}
//               error={formik.touched.city && Boolean(formik.errors.city)}
//               helperText={formik.touched.city && formik.errors.city}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="zipCode"
//               name="zipCode"
//               label="Zip Code"
//               size="small"
//               variant="filled"
//               value={formik.values.zipCode}
//               onChange={formik.handleChange}
//               error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
//               helperText={formik.touched.zipCode && formik.errors.zipCode}
//               margin="normal"
//             />
//           </Box>
//           {userType === "doctor" && (
//             <Autocomplete
//               multiple
//               id="treatmentIds"
//               size="small"
//               options={treatments}
//               getOptionLabel={(option) => `Treatment ID: ${option}`}
//               value={formik.values.treatmentIds}
//               onChange={(event, value) =>
//                 formik.setFieldValue("treatmentIds", value)
//               }
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Treatment IDs"
//                   margin="normal"
//                   variant="filled"
//                   size="medium"
//                   error={
//                     formik.touched.treatmentIds &&
//                     Boolean(formik.errors.treatmentIds)
//                   }
//                   helperText={
//                     formik.touched.treatmentIds && formik.errors.treatmentIds
//                   }
//                 />
//               )}
//             />
//           )}
//           <Box display="flex" justifyContent="center" mt={5}>
//             <Button
//               onClick={{}}
//               color="secondary"
//               variant="contained"
//               type="submit"
//             >
//               Create User
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Registration;

//=================================================================================================================================================

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  Box,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const treatments = [1, 2, 3];
const doctors = [101, 102, 103];
const genders = ["Male", "Female"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userType, setUserType] = useState("patient");

  const handleToggleChange = (event, newType) => {
      setUserType(newType);
      initValues.userType = newType;
      // setFieldValue('userType', newType);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const initValues = {
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    // specialization: Yup.string().required("Specialization is required"),
    specialization: Yup.string().when("userType", {
      is: (value) => value === "doctor",
      then: () => Yup.string().required("Specialization is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    // dob: Yup.date().nullable().required("Date of Birth is required"),
    dob: Yup.date().when("userType", {
      is: (value) => value === "patient",
      then: () => Yup.date().required("Date of Birth is required"),
      otherwise: () => Yup.date().notRequired(),
    }),
    assignedDate: Yup.date().required("Assigned Date is required"),
    // gender: Yup.string().required("Gender is required"),
    // bloodGroup: Yup.string().required("Blood group is required"),
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
    // doctorIds: Yup.array().when("userType", {
    //   is: (value) => value === 'patient',
    //   then: () => Yup.array().min(1, "At least one doctor must be selected"),
    //   otherwise: () => Yup.array().notRequired()
    // }),
    doctorIds: Yup.array().notRequired(),
    // treatmentIds: Yup.array().when("userType", {
    //   is: (value) => value === 'doctor',
    //   then: () => Yup.array().min(1,"At least one treatment must be selected for doctors"),
    //   otherwise: () => Yup.array().notRequired()
    // }),
    treatmentIds: Yup.array().notRequired(),
  });

  return (
    <Box m="20px">
      <Header title="USER REGISTER" subtitle="User Registration" />

      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        // validationSchema={Yup.object({
        //   name: Yup.string().required("Name is required"),
        //   mail: Yup.string()
        //     .email("Invalid email format")
        //     .required("Email is required"),
        //   phone: Yup.string().required("Phone is required"),
        //   specialization: Yup.string().required("Specialization is required"),
        //   dob: Yup.date().nullable().required("Date of Birth is required"),
        //   assignedDate: Yup.date()
        //     .required("Assigned Date is required"),
        //   gender: Yup.string().required("Gender is required"),
        //   bloodGroup: Yup.string().required("Blood group is required"),
        //   // age: Yup.number().when("userType", {
        //   //   is: "patient",
        //   //   then: Yup.number().required("Age is required"),
        //   // }),
        //   age: Yup.number().when("userType", {
        //     is: "patient",
        //     then: Yup.number()
        //   }),
        //   street: Yup.string().required("Street is required"),
        //   houseNumber: Yup.string().required("House number is required"),
        //   city: Yup.string().required("City is required"),
        //   zipCode: Yup.string().required("Zip code is required"),
        //   doctorIds: Yup.array().when("userType", {
        //     is: "patient",
        //     then: Yup.array().min(1, "At least one doctor must be selected"),
        //   }),
        //   treatmentIds: Yup.array().when("userType", {
        //     is: "doctor",
        //     then: Yup.array().min(
        //       1,
        //       "At least one treatment must be selected for doctors"
        //     ),
        //   }),
        // })}
        // onSubmit={(values) => {
        //   console.log("Form Values:", values);
        // }}
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
              // gap="20px"
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
                {/* <ToggleButtonGroup
                  value={userType}
                  exclusive
                  onChange={handleToggleChange}
                  aria-label="User type"
                >
                  <ToggleButton value="patient">Patient</ToggleButton>
                  <ToggleButton value="doctor">Doctor</ToggleButton>
                </ToggleButtonGroup> */}
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
                  // style={{ marginBottom: "20px" }}
                >
                  <ToggleButton value="patient">Patient</ToggleButton>
                  <ToggleButton value="doctor">Doctor</ToggleButton>
                </ToggleButtonGroup>
              </Box>

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
              {userType === "doctor" && (
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

              <Box display="flex" gap={2}>
                {userType === "patient" && (
                  <>
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
                  </>
                )}
              </Box>

              <Box display="flex" justifyContent="space-between" gap={2}>
                {userType === "patient" && (
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        // margin="normal"
                        // error={touched.dob && Boolean(errors.dob)}
                        // helperText={touched.dob && errors.dob}
                      />
                    )}
                  />
                )}
                <DatePicker
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      // margin="normal"
                      // error={
                      //   touched.assignedDate && Boolean(errors.assignedDate)
                      // }
                      // helperText={touched.assignedDate && errors.assignedDate}
                    />
                  )}
                />
              </Box>

              {userType === "doctor" && (
                <Autocomplete
                  id="treatmentIds"
                  multiple
                  options={treatments}
                  getOptionLabel={(option) => `Treatment ${option}`}
                  value={values.treatmentIds}
                  onChange={(event, value) =>
                    setFieldValue("treatmentIds", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Treatments"
                      // margin="normal"
                      variant="filled"
                      error={
                        touched.treatmentIds && Boolean(errors.treatmentIds)
                      }
                      helperText={touched.treatmentIds && errors.treatmentIds}
                    />
                  )}
                />
              )}

              {userType === "patient" && (
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

                  <Autocomplete
                    id="doctorIds"
                    multiple
                    options={doctors}
                    getOptionLabel={(option) => `Doctor ${option}`}
                    value={values.doctorIds}
                    onChange={(event, value) =>
                      setFieldValue("doctorIds", value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Doctors"
                        // margin="normal"
                        variant="filled"
                        error={touched.doctorIds && Boolean(errors.doctorIds)}
                        helperText={touched.doctorIds && errors.doctorIds}
                      />
                    )}
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
                  // backgroundColor: colors.greenAccent[500],
                  width: "50%",
                  ml: "25%",
                }}
              >
                Create User
              </Button>

              {/* <Button
                  variant="contained"
                  onClick={handleEditSave}
                  sx={{
                    // color: colors.greenAccent[400]
                    backgroundColor: colors.greenAccent[600],
                    width: "50%",
                    ml: "25%",
                  }}
                >
                  Save Changes
                </Button> */}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
