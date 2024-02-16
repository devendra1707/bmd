import Base from "../../components/Base";
import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAppointmentById } from "../../services/appointment/AppointmentService";

const AppointmentDetail = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    getAppointmentById(appointmentId)
      .then((data) => {
        setAppointmentDetails(data);
        // console.log("Appointment Details", data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Appointment...");
      });
  }, []);

  const backToAllAppointments = () => {
    navigate("/patient/appointments");
  };

  return (
    <Base>
      <Row className="mt-3 mb-3">
        {/* {JSON.stringify(appointmentDetails)} */}
        <Col sm={{ size: 8, offset: 2 }}>
          {appointmentDetails && (
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="270"
                  cover
                  image="https://tse1.mm.bing.net/th?id=OIP.S0zzWOBuHHp-QrCglJ3xrwHaGD&pid=Api&P=0&h=180"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Name : </strong>
                    {appointmentDetails.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email : </strong>
                    {appointmentDetails.patientEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Number : </strong>
                    {appointmentDetails.patientMobileNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Age : </strong>
                    {appointmentDetails.patientAge}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Gender : </strong>
                    {appointmentDetails.patientGender}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>DOB : </strong>
                    {appointmentDetails.patientDob}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Address : </strong>
                    {appointmentDetails.patientAddress}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Container className="text-center">
                  <Button
                    onClick={backToAllAppointments}
                    size="small"
                    color="primary"
                  >
                    Back
                  </Button>
                </Container>
              </CardActions>
            </Card>
          )}
        </Col>
      </Row>
    </Base>
  );
};

export default AppointmentDetail;
