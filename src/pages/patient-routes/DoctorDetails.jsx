import React from "react";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import DoctorDetailsComponents from "../../components/DoctorDetailsComponents";

const DoctorDetails = () => {
  return (
    <Base>
      <Container>
        <DoctorDetailsComponents />
      </Container>
    </Base>
  );
};

export default DoctorDetails;
