import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/Dashboard";
import Sidebar from "./scenes/global/Sidebar";
import { Treatments } from "./scenes/treatments/Treatments";
import Payments from "./scenes/payments/Payments";
import Records from "./scenes/records/Records";
import Appointments from "./scenes/appointments/Appointments";
import Doctors from "./scenes/doctors/Doctors";
import Patients from "./scenes/patients/Patients";
import Register from "./scenes/register/Register";
import Profile from "./scenes/profile/Profile";
import FAQ from "./scenes/faq/Faq";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar />
              {/* <Dashboard/> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/treatments" element={<Treatments />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/medical-records" element={<Records />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faq" element={<FAQ />} />
                {/* <Route path="/profile" element={<Profile />} />  */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
