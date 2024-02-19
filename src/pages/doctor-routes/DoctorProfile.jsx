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

const DoctorProfile = () => {
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentDoctor()
      .then((data) => {
        setCurrentDoctor(data);
        console.log("data doctor" + JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goDashboard = () => {
    navigate("/doctor/dashboard");
  };

  const goDoctorDetails = () => {
    navigate("/doctor/details");
  };
  const updateDoctorDetails = () => {
    navigate("/doctor/update");
  };


  return (
    <Base>
      <Container>
        <Row className="mt-3">
          {/* {JSON.stringify(currentDoctor)} */}
          <Col sm={{ size: 6, offset: 3 }}>
            {currentDoctor && (
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
                      {currentDoctor.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email : </strong>
                      {currentDoctor.userEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Mobile Number : </strong>{" "}
                      {currentDoctor.userMobileNumber}
                    </Typography>

                    {currentDoctor.roles && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>User Role : </strong>
                        {currentDoctor.roles[0].userRole}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      <strong>Reg Date : </strong>
                      {currentDoctor.regDate}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Container className="text-center">
                  <Button
                    onClick={() => goDashboard()}
                    size="small"
                    color="primary"
                  >
                    dashboard
                  </Button>
                  <Button
                    onClick={() => updateDoctorDetails()}
                    size="small"
                    color="primary"
                  >
                    update Profile
                  </Button>
                  <Button
                    onClick={() => goDoctorDetails()}
                    size="small"
                    color="primary"
                  >
                    details
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

export default DoctorProfile;
