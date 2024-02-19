import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendOtp } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userMobileNumber, setUserMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserMobileNumber(event.target.value);
  };

  const sendOtp1 = (event) => {
    event.preventDefault();
    // console.log(userMobileNumber);
    if (userMobileNumber.trim() === "") {
      toast.error("Mobile Number is required !!!");
      return;
    }

    sendOtp(userMobileNumber)
      .then((resp) => {
        // console.log("Send otp");
        // console.log(JSON.stringify(resp));
        // console.log(resp.message);
        setOtpSent(true);
        toast.success(
          // "OTP send Successfully !!! Mobile Number " + userMobileNumber
          "OTP IS :: " + resp.message
        );
        navigate("/otp", {
          state: { otp: resp.otp, userMobileNumber: userMobileNumber },
        });
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong on server !!!");
      });
  };

  const resetData = () => {
    setUserMobileNumber("");
  };

  return (
    <Base>
      <Container>
        {/* {JSON.stringify(userMobileNumber)} */}
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline>
              <CardHeader className="text-center">
                <h3>Login Here !!!</h3>
              </CardHeader>
              <CardBody>
                <form action="">
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
                        onChange={(e) => handleChange(e, "userMob")}
                        value={userMobileNumber}
                        id="outlined-basic fullWidth"
                        type="number"
                        label="Mobile Number"
                        variant="outlined"
                      />

                      <Container className="text-center">
                        <Button
                          variant="contained"
                          color="primary"
                          outline
                          onClick={sendOtp1}
                        >
                          Send OTP
                        </Button>
                        <Button
                          outline
                          variant="contained"
                          color="secondary"
                          className="ms-2"
                          type="reset"
                          onClick={resetData}
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

export default Login;
