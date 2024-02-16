import { useEffect, useState } from "react";
import { getCurrentPatient } from "../services/patient/PatientService";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const PatientProfileInfo = () => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentPatient()
      .then((data) => {
        // console.log("Profile");
        setCurrentPatient(data);
        // console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const goDashboard = () => {
    navigate("/patient/dashboard");
  };
  return (
    <Row className="mt-3">
      {/* {JSON.stringify(currentPatient)} */}
      <Col sm={{ size: 6, offset: 3 }}>
        {currentPatient && (
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
                  {currentPatient.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email : </strong>
                  {currentPatient.userEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Mobile Number : </strong>{" "}
                  {currentPatient.userMobileNumber}
                </Typography>

                {currentPatient.roles && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>User Role : </strong>
                    {currentPatient.roles[0].userRole}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  <strong>Reg Date : </strong>
                  {currentPatient.regDate}
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
            </Container>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default PatientProfileInfo;
