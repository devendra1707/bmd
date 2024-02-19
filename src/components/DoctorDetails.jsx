import Base from "./Base";
import { toast } from "react-toastify";
import { getAllDoctor } from "../services/patient/PatientService";
import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import styles from "../components/ViewDoctor.module.css";
import { getDoctorBySpelist } from "../services/doctor/DoctorService";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: "1px solid black",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DoctorDetails = () => {
  const [doctorContent, setDoctorContent] = useState({
    content: [],
    totalPages: 0,
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResult([]);
      // changePage(currentPage);
      return;
    }

    getDoctorBySpelist(searchTerm)
      .then((doc) => {
        setSearchResult(doc);
        console.log(JSON.stringify(doc));
      })
      .catch((error) => {
        console.error(error);
        toast.error("Doctor not found with this Specialist Name...");
      });
  }, [searchTerm]);

  const changePage = (pageNumber = 0, pageSize = 8) => {
    if (pageNumber > doctorContent.pageNumber && doctorContent.lastPage) {
      return;
    }
    if (
      pageNumber < doctorContent.pageNumber &&
      doctorContent.pageNumber === 0
    ) {
      return;
    }

    getAllDoctor(pageNumber, pageSize)
      .then((data) => {
        setDoctorContent({
          content: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
      })
      .catch((error) => {
        toast.error("Error in loading Doctor");
      });
  };

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  return (
    <Base>
      <Container>
        <Container className="text-center mt-2">
          <CardHeader>
            <h3>List Of All Doctors </h3>
          </CardHeader>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            ></IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Search>
          </Toolbar>
        </Container>
        {/* {JSON.stringify(doctorContent)} */}
        <Grid container spacing={4}>
          {/* {doctorContent.content.map((doctor) => ( */}
          {/* {(searchResult.length > 0 ? searchResult : doctorContent.content).map(
            (doctor) => ( */}
          {(searchResult.length > 0 ? searchResult : doctorContent.content).map(
            (doctor) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
                <Card sx={{ maxWidth: 345, height: 350 }} color="dark">
                  <CardMedia
                    sx={{ height: 150, width: 140 }}
                    className={styles.img}
                    image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
                    title="green iguana"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      <strong>Name : </strong> {doctor.drName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>E - Mail : </strong> {doctor.drEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Number : </strong> {doctor.drMob}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Specilist : </strong> {doctor.specilist}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Container className="text-center">
                      <Button
                        // onClick={() => doctorDetails(doctor.id)}
                        size="small"
                      >
                        Doctor Details
                      </Button>
                      {/* <Link to="doctordetails"> Doctor Details</Link> */}
                    </Container>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
        <Container className="mt-3">
          <Pagination aria-label="Page navigation example" size="lg">
            <PaginationItem
              onClick={() => changePage(doctorContent.pageNumber - 1)}
              disabled={doctorContent.pageNumber === 0}
            >
              <PaginationLink previous>Previous</PaginationLink>
            </PaginationItem>

            {[...Array(doctorContent.totalPages)].map((_, index) => {
              const currentPageNumber = index + 1;
              const isCurrentPage =
                currentPageNumber === doctorContent.pageNumber + 1;
              const isWithinRange =
                currentPageNumber === 1 ||
                currentPageNumber === doctorContent.totalPages ||
                Math.abs(currentPageNumber - doctorContent.pageNumber) <= 2;

              if (!isWithinRange) {
                return null;
              }

              return (
                <PaginationItem
                  key={index}
                  onClick={() => changePage(index)}
                  active={isCurrentPage}
                >
                  <PaginationLink>{currentPageNumber}</PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem
              onClick={() => changePage(doctorContent.pageNumber + 1)}
              disabled={
                doctorContent.pageNumber === doctorContent.totalPages - 1
              }
            >
              <PaginationLink next>Next</PaginationLink>
            </PaginationItem>
          </Pagination>
        </Container>
        {/* <Container className="mt-3">
          <Pagination aria-label="Page navigation example" size="lg">
            <PaginationItem
              onClick={() => changePage(doctorContent.pageNumber - 1)}
              disabled={doctorContent.pageNumber === 0}
            >
              <PaginationLink previous>Previous</PaginationLink>
            </PaginationItem>
            {[...Array(doctorContent.totalPages)].map((_, index) => (
              <PaginationItem
                key={index}
                onClick={() => changePage(index)}
                active={index === doctorContent.pageNumber}
              >
                <PaginationLink>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem
              onClick={() => changePage(doctorContent.pageNumber + 1)}
              disabled={
                doctorContent.pageNumber === doctorContent.totalPages - 1
              }
            >
              <PaginationLink next>Next</PaginationLink>
            </PaginationItem>
          </Pagination>
        </Container> */}
      </Container>
    </Base>
  );
};

export default DoctorDetails;
