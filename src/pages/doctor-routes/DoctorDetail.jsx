import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useNavigate } from "react-router-dom";
import { getCurrentDoctor } from "../../services/doctor/DoctorService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Col, Container, Row } from "reactstrap";

const DoctorDetail = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentDoctor()
      .then((data) => {
        setDoctorDetails(data);
        console.log("data doctor" + JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goDashboard = () => {
    navigate("/doctor/dashboard");
  };

  return (
    <Base>
      <Container>
        <Row className="mt-3">
          {/* {JSON.stringify(doctorDetails)} */}
          <Col sm={{ size: 6, offset: 3 }}>
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
                      <strong>Mobile Number : </strong>{" "}
                      {doctorDetails.userMobileNumber}
                    </Typography>

                    {doctorDetails.roles && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>User Role : </strong>
                        {doctorDetails.roles[0].userRole}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      <strong>Reg Date : </strong>
                      {doctorDetails.regDate}
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
                <Container className="text-center">
                  <Button
                    onClick={() => goDashboard()}
                    size="small"
                    color="primary"
                  >
                    edit details
                  </Button>
                  <Button
                    onClick={() => goDashboard()}
                    size="small"
                    color="primary"
                  >
                    dashboard
                  </Button>
                </Container>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default DoctorDetail;
