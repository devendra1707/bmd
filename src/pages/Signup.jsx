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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { signUp } from "../services/UserService";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    userEmail: "",
    userMobileNumber: "",
  });

  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  // handleChange
  const handleChange = (event, property) => {
    // console.log(event.target.value);
    //   setData({ ...data, [property]: event.target.value });
    // };
    if (property === "id") {
      // setData({ ...data, id: event.target.value });
      setSelectedId(event.target.value);
    } else {
      setData({ ...data, [property]: event.target.value });
    }
  };
  const resetData = () => {
    setData({
      userName: "",
      userEmail: "",
      userMobileNumber: "",
    });
    setSelectedId("");
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (error.isError) {
      toast.error("Form data is invalid , correct all details then submit");
      return;
    }

    console.log(data);

    // call server api for sending data
    signUp(selectedId, data)
      .then((resp) => {
        // console.log(resp);
        // console.log("success log");
        toast.success(
          "User is Registered Successfully !!! Mobile Number " +
            resp.userMobileNumber
        );
        setData({
          userName: "",
          userEmail: "",
          userMobileNumber: "",
        });
        setSelectedId("");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-5">
          {/* {JSON.stringify(data)} */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline>
              <CardHeader className="text-center">
                <h3>Fill Information to Register</h3>
              </CardHeader>
              <CardBody>
                {/* creating form */}
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
                        onChange={(e) => handleChange(e, "userName")}
                        value={data.userName}
                        id="outlined-basic fullWidth"
                        label="Full Name"
                        variant="outlined"
                      />
                      <TextField
                        onChange={(e) => handleChange(e, "userEmail")}
                        value={data.userEmail}
                        type="email"
                        id="outlined-basic fullWidth"
                        label="Email"
                        variant="outlined"
                      />
                      <TextField
                        onChange={(e) => handleChange(e, "userMobileNumber")}
                        value={data.userMobileNumber}
                        id="outlined-basic fullWidth"
                        type="number"
                        label="Mobile Number"
                        variant="outlined"
                      />
                      <Box display="flex" justifyContent="center" mb={2}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          className="px-2"
                        >
                          <FormControlLabel
                            onChange={(e) => handleChange(e, "id")}
                            value="501"
                            control={<Radio />}
                            label="Doctor"
                          />

                          <FormControlLabel
                            onChange={(e) => handleChange(e, "id")}
                            value="502"
                            control={<Radio />}
                            label="Patient"
                          />
                        </RadioGroup>
                      </Box>
                      <Container className="text-center">
                        <Button
                          onClick={submitForm}
                          variant="contained"
                          color="primary"
                          outline
                        >
                          Register
                        </Button>
                        <Button
                          onClick={resetData}
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

export default Signup;
