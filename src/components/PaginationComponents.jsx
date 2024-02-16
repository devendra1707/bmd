import React from "react";
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const PaginationComponents = () => {
  return (
    <Container className="mt-3">
      <Pagination aria-label="Page navigation example" size="lg">
        <PaginationItem>
          <PaginationLink first href="#">
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" previous>
            Previous
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" next>
            Next
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" last>
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Container>
  );
};

export default PaginationComponents;
