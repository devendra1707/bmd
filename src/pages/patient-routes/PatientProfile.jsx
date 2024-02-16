import React from "react";
import Base from "../../components/Base";
import { Container } from "@mui/material";
import PatientProfileInfo from "../../components/PatientProfileInfo";

const PatientProfile = () => {
  return (
    <Base>
      <Container className="text-center">
        <PatientProfileInfo />
      </Container>
    </Base>
  );
};

export default PatientProfile;
