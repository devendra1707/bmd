import { useEffect, useState } from "react";
import { getAllAppointments } from "../services/patient/PatientService";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Container } from "reactstrap";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import styles from "../components/ViewDoctor.module.css";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ViewAllAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(null);
  // const [appointments, setAppointments] = useState({
  //   content: [],
  //   totalPages: "",
  //   totalElements: "",
  //   pageSize: "",
  //   lastPage: false,
  //   pageNumber: "",
  // });
  // const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   console.log("loading posts");
  //   console.log(currentPage);
  //   changePage(currentPage);
  // }, [currentPage]);

  // const changePage = (pageNumber = 0, pageSize = 5) => {
  //   if (pageNumber > appointments.pageNumber && appointments.lastPage) {
  //     return;
  //   }
  //   if (pageNumber < appointments.pageNumber && appointments.pageNumber == 0) {
  //     return;
  //   }
  //   getAllAppointments(pageNumber, pageSize)
  //     .then((data) => {
  //       setAppointments({
  //         content: [...appointments.content, ...data.content],
  //         totalPages: data.totalPages,
  //         totalElements: data.totalElements,
  //         pageSize: data.pageSize,
  //         lastPage: data.lastPage,
  //         pageNumber: data.pageNumber,
  //       });

  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       toast.error("Error in loading posts");
  //     });
  // };

  useEffect(() => {
    getAllAppointments()
      .then((data) => {
        // console.log("All Appointments");

        setAppointments(data);
        // console.log("appointment data" + JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const appointmentDetails = (appointmentId) => {
    navigate("/patient/appointmentdetail/" + appointmentId);
    // console.log(appointmentId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container className="text-center mt-2">
        <CardHeader>
          <h3>List Of All Appointments </h3>
        </CardHeader>
      </Container>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="mt-1"
      >
        {appointments &&
          appointments.map((appointments) => (
            <Grid item xs={3} key={appointments.id}>
              <Card sx={{ maxWidth: 345, height: 350 }} color="dark">
                <CardMedia
                  sx={{ height: 150, width: 140 }}
                  className={styles.img}
                  image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
                  title="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    <strong>Name : </strong>
                    {appointments.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>E - Mail : </strong>
                    {appointments.patientEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Number : </strong>
                    {appointments.patientMobileNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button
                    onClick={() => appointmentDetails(appointments.id)}
                    size="small"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ViewAllAppointments;
