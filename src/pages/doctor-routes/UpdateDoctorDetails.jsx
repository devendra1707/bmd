import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getCurrentPatient,
  updatePatientDetails,
} from "../../services/patient/PatientService";
import {
  getCurrentDoctor,
  updateDoctorDetails,
} from "../../services/doctor/DoctorService";

const UpdateDoctorDetails = () => {
  const navigate = useNavigate();
  const [updateDetails, setUpdateDetails] = useState({
    userName: "",
    userEmail: "",
  });
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const updateForm = (event) => {
    event.preventDefault();

    if (error.isError) {
      toast.error("Form data is invalid , correct all details then submit");
      return;
    }

    // console.log(updateDetails);

    // call server api for sending data
    updateDoctorDetails(updateDetails)
      .then((resp) => {
        toast.success("Doctor Details Updated Successfully !!!");
        setUpdateDetails({
          userName: "",
          userEmail: "",
        });
        navigate("/doctor/profile");
      })
      .catch((error) => {
        // console.log(error);
        // console.log("Error log");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  useEffect(() => {
    getCurrentDoctor()
      .then((data) => {
        // console.log("Profile");
        setCurrentDoctor(data);
        // console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, property) => {
    setUpdateDetails({ ...updateDetails, [property]: event.target.value });
  };

  const resetDetails = () => {
    setUpdateDetails({
      userName: "",
      userEmail: "",
    });
  };

  return (
    <Base>
      {/* {JSON.stringify(currentPatient)} */}
      <Container>
        <Row className="mt-5">
          {/* {JSON.stringify(data)} */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline>
              <CardHeader className="text-center">
                <h3>Fill Information to Update</h3>
              </CardHeader>
              <CardBody>
                {/* creating form */}
                <form>
                  <FormGroup>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { my: 1, width: "100%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        onChange={(e) => handleChange(e, "userName")}
                        value={updateDetails.userName}
                        id="outlined-basic fullWidth"
                        label="Full Name"
                        variant="outlined"
                      />
                      <TextField
                        onChange={(e) => handleChange(e, "userEmail")}
                        value={updateDetails.userEmail}
                        type="email"
                        id="outlined-basic fullWidth"
                        label="Email"
                        variant="outlined"
                      />

                      <Container className="text-center">
                        <Button
                          onClick={updateForm}
                          variant="contained"
                          color="primary"
                          outline
                        >
                          Update
                        </Button>
                        <Button
                          onClick={resetDetails}
                          outline
                          variant="contained"
                          color="secondary"
                          className="ms-2"
                          type="button"
                        >
                          Reset
                        </Button>
                      </Container>
                    </Box>
                  </FormGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default UpdateDoctorDetails;
