import React from "react";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import ViewAllAppointments from "../../components/ViewAllAppointments";
import PaginationComponents from "../../components/PaginationComponents";

const ViewAppointments = () => {
  return (
    <Base>
      <Container className="">
        <ViewAllAppointments />
        <PaginationComponents />
      </Container>
    </Base>
  );
};

export default ViewAppointments;
