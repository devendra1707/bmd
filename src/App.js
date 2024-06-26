import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Otp from "./pages/Otp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PatientDashboard from "./pages/patient-routes/PatientDashboard";
import DoctorDashboard from "./pages/doctor-routes/DoctorDashboard";
import PatientRoute from "./components/PatientRoute";
import DoctorRoute from "./components/DoctorRoute";
import PatientProfile from "./pages/patient-routes/PatientProfile";
import DoctorProfile from "./pages/doctor-routes/DoctorProfile";
import ViewDoctors from "./pages/patient-routes/ViewDoctors";
import ViewAppointments from "./pages/patient-routes/ViewAppointments";
import DoctorDetailsComponents from "./components/DoctorDetailsComponents";
import BookAppointment from "./components/BookAppointment";
import AppointmentDetail from "./pages/patient-routes/AppointmentDetail";
import DoctorDetail from "./pages/doctor-routes/DoctorDetail";
import DoctorDetails from "./components/DoctorDetails";
import UpdateDetails from "./pages/patient-routes/UpdateDetails";
import UpdateDoctorDetails from "./pages/doctor-routes/UpdateDoctorDetails";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import { createContext, useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { myAxios } from "./services/helper";
import Loading from "./components/Loading";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Request Intersepter
    myAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Response Intersepter
    myAxios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <BrowserRouter basename="/bmd/">
          <ToastContainer position="bottom-center" />
          <Loading show={loading} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="otp" element={<Otp />} />
            <Route path="signup" element={<Signup />} />
            <Route path="services" element={<Services />} />
            <Route path="contactus" element={<Contact />} />
            <Route path="aboutus" element={<AboutUs />} />

            <Route path="/patient" element={<PatientRoute />}>
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="bookappointment" element={<BookAppointment />} />
              <Route path="profile" element={<PatientProfile />} />
              <Route path="doctors" element={<ViewDoctors />} />
              <Route path="appointments" element={<ViewAppointments />} />
              <Route
                path="doctordetails/:doctorId"
                element={<DoctorDetailsComponents />}
              />
              <Route
                path="appointmentdetail/:appointmentId"
                element={<AppointmentDetail />}
              />
              <Route path="update-patient" element={<UpdateDetails />} />
            </Route>
            <Route path="/doctor" element={<DoctorRoute />}>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="profile" element={<DoctorProfile />} />
              <Route path="details" element={<DoctorDetail />} />
              <Route path="update" element={<UpdateDoctorDetails />} />
            </Route>

            <Route path="/doctors" element={<DoctorDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
