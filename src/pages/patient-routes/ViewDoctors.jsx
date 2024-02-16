import React from "react";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import ViewAllDoctors from "../../components/ViewAllDoctors";
import { Link } from "react-router-dom";

const ViewDoctors = () => {
  return (
    <Base>
      <Container>
        <ViewAllDoctors />
      </Container>
    </Base>
  );
};

export default ViewDoctors;
