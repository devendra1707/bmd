import {
  Card,
  CardBody,
 
  Container,
  FormGroup,
  Row,
  Form,
} from "reactstrap";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import {
  appoUserId,
  getAppointment,
} from "../services/appointment/AppointmentService";
import { bookAppointment as doBookAppointment } from "../services/appointment/AppointmentService";
import { useState } from "react";
import { getCurrentUserDetail } from "../auth";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Base from "./Base";

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorId = location?.state?.doctorId;
  const [appointment, setAppointment] = useState({
    patientAddress: "",
    patientDob: "",
    patientEmail: "",
    patientGender: "",
    patientGovIdNum: "",
    patientMobileNumber: "",
    patientName: "",
    patientAge: "",
  });

  // const [user, setUser] = useState(undefined);
  // field change function
  const fieldChange = (event, property) => {
    // console.log("Changing ...");
    setAppointment({ ...appointment, [property]: event.target.value });
  };
  const resetAppointment = () => {
    setAppointment({
      patientAddress: "",
      patientDob: "",
      patientEmail: "",
      patientGender: "",
      patientGovIdNum: "",
      patientMobileNumber: "",
      patientName: "",
      patientAge: "",
    });
  };
  //   useEffect(() => {
  //     loadAllAppointments()
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     testApi()
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     setUser(getCurrentUserDetail());
  //     appoUserId()
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     getAppointment()
  //       .then((data) => {
  //         // console.log("appointment data" + data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  // const bookAppointment = (doctorId) => {
  //   doctorId.preventDefault();
  //   // Call the bookAppointment function with the doctorId
  //   doBookAppointment(doctorId, appointment)
  //     .then((data) => {
  //       alert("Appointment Book");
  //     })
  //     .catch((error) => {
  //       console.error("Error booking appointment:", error);
  //     });
  // };

  const bookAppointment = (event) => {
    event.preventDefault();
    // console.log("Form Submitted ...");
    // console.log(appointment);

    if (appointment.patientMobileNumber.trim() === "") {
      alert("Mobile Number is required !!!");
      return;
    }

    // Submit the form to server
    // appointment["userId"] = user.id;
    // doBookAppointment(appointment)
    //   .then((data) => {
    //     alert("Appointment Book");
    //   })
    //   .catch((error) => {
    //     alert("error");
    //     console.log(error);
    //   });
    //   doBookAppointment(
    //     (doctorId, appointment).then((data) => {
    //       // console.log(JSON.stringify(data));
    //       toast.success("Appointment Booked successfully");
    //       resetAppointment();
    //       navigate("/patient/appointments");
    //     })
    //   ).catch((error) => {
    //     toast.error("Failed to book appointment. Please try again later.");
    //     // console.log(error);
    //   });
    // };
    doBookAppointment(doctorId, appointment)
      .then((data) => {
        toast.success("Appointment Booked successfully");
        resetAppointment();
        navigate("/patient/appointments");
      })
      .catch((error) => {
        toast.error("Failed to book appointment. Please try again later.");
        console.log(error);
      });
  };

  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  return (
    <Base>
      <Container>
      <Card className="mt-3">
      <CardBody>
        {/* {JSON.stringify(appointment)} */}
        <Container className="text-center">
          <h3>Book An Appointment </h3>
        </Container>

        <Form onSubmit={bookAppointment}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "48%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Patient Name"
              variant="filled"
              onChange={(e) => fieldChange(e, "patientName")}
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientAge")}
              id="filled-basic"
              label="Patient Age"
              variant="filled"
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientMobileNumber")}
              id="filled-basic"
              label="Patient Mobile"
              variant="filled"
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientAddress")}
              id="filled-basic"
              label="Patient Address"
              variant="filled"
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientEmail")}
              id="filled-basic"
              label="Patient Email"
              variant="filled"
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientGovIdNum")}
              id="filled-basic"
              label="Patient Gov Id"
              variant="filled"
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientGender")}
              id="filled-basic"
              label="Patient Gender"
              variant="filled"
            />
            <TextField
              onChange={(e) => fieldChange(e, "patientDob")}
              id="filled-basic"
              label="Patient DOB"
              variant="filled"
            />
            {/* <TextField
              id="outlined-select-currency-native"
              select
            //   label="Gender"
              defaultValue="Gender"
              SelectProps={{
                native: false,
              }}
            //   helperText="Gender"
            >
               {gender.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
            </TextField> */}
          </Box>
          <Container className="text-center">
            <Button
              //   onClick={submitForm}
              variant="contained"
              color="primary"
              outline
              type="submit"
            >
              Book Appointment
            </Button>
            <Button
              onClick={resetAppointment}
              outline
              variant="contained"
              color="secondary"
              className="ms-2"
              type="button"
            >
              Reset
            </Button>
          </Container>
        </Form>
      </CardBody>
    </Card>
      </Container>
    </Base>
   
  );
};

export default BookAppointment;
