import { useEffect, useState } from "react";
import { getAllDoctors } from "../services/patient/PatientService";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import styles from "../components/ViewDoctor.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ViewAllDoctors = ({ id }) => {
  const [doctorContent, setDoctorContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDoctors()
      .then((data) => {
        // let allDoc = JSON.stringify(data);
        // console.log("Doctor data" + JSON.stringify(data));
        setDoctorContent(data);
        // console.log("---------" + allDoc);

        // data.forEach((item) => {
        //   console.log(item.userEmail);
        // });
        // console.log(allDoc.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const doctorDetails = (doctorId) => {
    navigate("/patient/doctordetails/" + doctorId);
  };
  const bookAppointments = (doctorId) => {
    // navigate("/patient/dashboard");
    navigate("/patient/bookappointment", { state: { doctorId } });
    console.log(doctorId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {JSON.stringify(doctorContent)} */}
      <Container className="text-center mt-2">
        <CardHeader>
          <h3>List Of All Doctors </h3>
        </CardHeader>
      </Container>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="mt-1"
      >
        {doctorContent &&
          doctorContent.map((doctor) => (
            <Grid item xs={3} key={doctor.id}>
              <Card sx={{ maxWidth: 345 }} color="dark">
                <CardMedia
                  sx={{ height: 150, width: 140 }}
                  className={styles.img}
                  image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
                  title="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    <strong>Name : </strong> {doctor.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>E - Mail : </strong> {doctor.userEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Number : </strong> {doctor.userMobileNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => bookAppointments(doctor.id)}
                    size="small"
                  >
                    Book Appointments
                  </Button>
                  <Button onClick={() => doctorDetails(doctor.id)} size="small">
                    Doctor Details
                  </Button>
                  {/* <Link to="doctordetails"> Doctor Details</Link> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ViewAllDoctors;
