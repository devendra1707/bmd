import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Col, Container, Row } from "reactstrap";
import styles from "../components/ViewDoctor.module.css";
import { useParams } from "react-router-dom";
import { getDoctorById } from "../services/patient/PatientService";
import { toast } from "react-toastify";
import Base from "./Base";
import { useNavigate } from "react-router-dom";

const DoctorDetailsComponents = () => {
  const { doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // if (doctorId) {
    getDoctorById(doctorId)
      .then((data) => {
        setDoctorDetails(data);
        console.log("Doctor Details", data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Appointment...");
      });
    // }
  }, []);

  const backToAllDoctor = () => {
    navigate("/patient/doctors");
  };
  return (
    <Base>
      <Row className="mt-3">
        {/* {JSON.stringify(doctorDetails)} */}
        <Col sm={{ size: 8, offset: 2 }}>
          {doctorDetails && (
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
                    {doctorDetails.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email : </strong>
                    {doctorDetails.userEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Number : </strong>
                    {doctorDetails.userMobileNumber}
                  </Typography>
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Hospital Name : </strong>
                      {doctorDetails.doctorDto.hospitalName}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Hospital Email : </strong>
                      {doctorDetails.doctorDto.hospitalEmail}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Hospital Address : </strong>
                      {doctorDetails.doctorDto.hospitalAddress}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Doctor Degree : </strong>
                      {doctorDetails.doctorDto.drDegree}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Hospital Faculty : </strong>
                      {doctorDetails.doctorDto.hospitalFacilty}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Specialist : </strong>
                      {doctorDetails.doctorDto.specilist}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Normal Fee : </strong>
                      {doctorDetails.doctorDto.normalAppoinmentFees}
                    </Typography>
                  )}
                  {doctorDetails.doctorDto && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Emergency Fee : </strong>
                      {doctorDetails.doctorDto.emergencyAppoinmentFees}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Container className="text-center">
                  <Button
                    onClick={backToAllDoctor}
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

export default DoctorDetailsComponents;
