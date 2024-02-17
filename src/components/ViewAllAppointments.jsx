import { useEffect, useState } from "react";
import { getAllAppointments } from "../services/patient/PatientService";
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
import { toast } from "react-toastify";
import { styled, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import styles from "../components/ViewDoctor.module.css";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { getAppointmentByPatientName } from "../services/appointment/AppointmentService";

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

const ViewAllAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState({
    content: [],
    totalPages: 0,
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResult([]);
      return;
    }

    getAppointmentByPatientName(searchTerm)
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Appointment not found with this patient name...");
      });
  }, [searchTerm]);
  // useEffect(() => {
  //   console.log("Search term:", searchTerm);
  //   if (!searchTerm.trim()) {
  //     setSearchResult([]);
  //     return;
  //   }

  //   getAppointmentByPatientName(searchTerm)
  //     .then((data) => {
  //       console.log("Search result:", data);
  //       setSearchResult(data);
  //       // setNoAppointmentsFound(data.length === 0);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("Appointment not found with this patient name...");
  //     });
  // }, [searchTerm]);

  const changePage = (pageNumber = 0, pageSize = 8) => {
    if (pageNumber > appointments.pageNumber && appointments.lastPage) {
      return;
    }
    if (pageNumber < appointments.pageNumber && appointments.pageNumber === 0) {
      return;
    }

    getAllAppointments(pageNumber, pageSize)
      .then((data) => {
        setAppointments({
          content: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
      })
      .catch((error) => {
        toast.error("Error in loading appointments");
      });
  };

  const appointmentDetails = (appointmentId) => {
    navigate("/patient/appointmentdetail/" + appointmentId);
  };

  return (
    <Container className="text-center mt-2">
      <CardHeader>
        <h3>List Of All Appointments </h3>
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

      <Grid container spacing={4}>
        {(searchResult.length > 0 ? searchResult : appointments.content).map(
          (appointment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={appointment.id}>
              <Card sx={{ maxWidth: 345, height: 350 }} color="dark">
                <CardMedia
                  component="img"
                  height="240"
                  sx={{ height: 150, width: 140 }}
                  className={styles.img}
                  image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
                  alt="appointment image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {appointment.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {appointment.patientEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mobile Number: {appointment.patientMobileNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button
                    onClick={() => appointmentDetails(appointment.id)}
                    size="small"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {/* <Grid container spacing={4}>
        {(searchResult.length > 0 ? searchResult : appointments.content).map(
          (appointment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={appointment.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="240"
                  className={styles.img}
                  image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
                  alt="appointment image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {appointment.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {appointment.patientEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mobile Number: {appointment.patientMobileNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button
                    onClick={() => appointmentDetails(appointment.id)}
                    size="small"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
        :(
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            No appointments found.
          </Typography>
        </Grid>
        )
      </Grid> */}
      <Container className="mt-3">
        <Pagination aria-label="Page navigation example" size="lg">
          <PaginationItem
            onClick={() => changePage(appointments.pageNumber - 1)}
            disabled={appointments.pageNumber === 0}
          >
            <PaginationLink previous>Previous</PaginationLink>
          </PaginationItem>

          {[...Array(appointments.totalPages)].map((_, index) => {
            const currentPageNumber = index + 1;
            const isCurrentPage =
              currentPageNumber === appointments.pageNumber + 1;
            const isWithinRange =
              currentPageNumber === 1 ||
              currentPageNumber === appointments.totalPages ||
              Math.abs(currentPageNumber - appointments.pageNumber) <= 2;

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
            onClick={() => changePage(appointments.pageNumber + 1)}
            disabled={appointments.pageNumber === appointments.totalPages - 1}
          >
            <PaginationLink next>Next</PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>

      {/* <Container className="mt-3">
        <Pagination aria-label="Page navigation example" size="lg">
          <PaginationItem
            onClick={() => changePage(appointments.pageNumber - 1)}
            disabled={appointments.pageNumber === 0}
          >
            <PaginationLink previous>Previous</PaginationLink>
          </PaginationItem>
          {[...Array(appointments.totalPages)].map((_, index) => (
            <PaginationItem
              key={index}
              onClick={() => changePage(index)}
              active={index === appointments.pageNumber}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            onClick={() => changePage(appointments.pageNumber + 1)}
            disabled={appointments.pageNumber === appointments.totalPages - 1}
          >
            <PaginationLink next>Next</PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container> */}
    </Container>
  );
};

export default ViewAllAppointments;

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   border: "1px solid black",
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// const ViewAllAppointments = () => {
//   const navigate = useNavigate();
//   // const [appointments, setAppointments] = useState(null);
//   const [appointments, setAppointments] = useState({
//     content: [],
//     totalPages: 0,
//     totalElements: "",
//     pageSize: "",
//     lastPage: false,
//     pageNumber: "",
//   });
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     // console.log("loading posts");
//     // console.log(currentPage);
//     changePage(currentPage);
//   }, [currentPage]);

//   const changePage = (pageNumber = 0, pageSize = 8) => {
//     if (pageNumber > appointments.pageNumber && appointments.lastPage) {
//       return;
//     }
//     if (pageNumber < appointments.pageNumber && appointments.pageNumber == 0) {
//       return;
//     }

//     getAllAppointments(pageNumber, pageSize)
//       .then((data) => {
//         setAppointments({
//           // content: [...appointments.content, ...data.content],
//           content: data.content,
//           totalPages: data.totalPages,
//           totalElements: data.totalElements,
//           pageSize: data.pageSize,
//           lastPage: data.lastPage,
//           pageNumber: data.pageNumber,
//         });

//         console.log(data);
//       })
//       .catch((error) => {
//         toast.error("Error in loading posts");
//       });
//   };

//   const appointmentDetails = (appointmentId) => {
//     navigate("/patient/appointmentdetail/" + appointmentId);
//   };

//   // search Code start

//   // useEffect(() => {
//   //   getAppointmentByPatientName()
//   //     .then((data) => {
//   //       console.log("search Reasult ==> " + JSON.stringify(data));
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       toast.error("Appointment Not Found With this Patient Name...");
//   //     });
//   // });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResult, setSearchResult] = useState([]);

//   // useEffect(() => {
//   //   if (!searchTerm.trim()) return; // Skip if searchTerm is empty

//   //   getAppointmentByPatientName(searchTerm)
//   //     .then((data) => {
//   //       setSearchResult(data);
//   //       console.log("Search Result ==> ", data);
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //       toast.error("Appointment not found with this patient name...");
//   //     });
//   // }, [searchTerm]);

//   useEffect(() => {
//     if (!searchTerm.trim()) return; // Skip if searchTerm is empty

//     getAppointmentByPatientName(searchTerm)
//       .then((data) => {
//         setSearchResult(data);
//         console.log("Search Result ==> ", data);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Appointment not found with this patient name...");
//       });
//   }, [searchTerm]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }}>
//         {/* {JSON.stringify(appointments)} */}
//         <Container className="text-center mt-2">
//           <CardHeader>
//             <h3>List Of All Appointments </h3>
//           </CardHeader>
//           <Box sx={{ flexGrow: 1 }}>
//             <Toolbar>
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="open drawer"
//                 sx={{ mr: 2 }}
//               ></IconButton>
//               <Typography
//                 variant="h6"
//                 component="div"
//                 sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
//               ></Typography>
//               <Search>
//                 <SearchIconWrapper>
//                   <SearchIcon />
//                 </SearchIconWrapper>
//                 <StyledInputBase
//                   placeholder="Search…"
//                   inputProps={{ "aria-label": "search" }}
//                   onChange={handleSearchChange}
//                 />
//               </Search>
//             </Toolbar>
//           </Box>
//           {searchResult.length > 0 ? (
//             <Grid
//             container
//             rowSpacing={4}
//             columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//             className="mt-1"
//             >
//               {searchResult.map((appointment) => (
//                 <Grid item xs={3} key={appointment.id}>
//                   {appointments &&
//                     appointments.content.map((appointments) => (
//                       <Grid item xs={3} key={appointments.id}>
//                         <Card sx={{ maxWidth: 345, height: 350 }} color="dark">
//                           <CardMedia
//                             sx={{ height: 150, width: 140 }}
//                             className={styles.img}
//                             image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
//                             title="green iguana"
//                           />

//                           <CardContent>
//                             <Typography
//                               gutterBottom
//                               variant="body2"
//                               component="div"
//                             >
//                               <strong>Name : </strong>
//                               {appointments.patientName}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               <strong>E - Mail : </strong>
//                               {appointments.patientEmail}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               <strong>Number : </strong>
//                               {appointments.patientMobileNumber}
//                             </Typography>
//                           </CardContent>
//                           <CardActions>
//                             <Button size="small">Share</Button>
//                             <Button
//                               onClick={() =>
//                                 appointmentDetails(appointments.id)
//                               }
//                               size="small"
//                             >
//                               Learn More
//                             </Button>
//                           </CardActions>
//                         </Card>
//                       </Grid>
//                     ))}
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography variant="body1" align="center">
//               No appointments found.
//             </Typography>
//           )}
//         </Container>
//         {/* <Container className="text-center mt-2">

//           <Box sx={{ flexGrow: 1 }}>
//             <Toolbar>
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="open drawer"
//                 sx={{ mr: 2 }}
//               ></IconButton>
//               <Typography
//                 variant="h6"
//                 component="div"
//                 sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
//               ></Typography>
//               <TextField
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search…"
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                   sx: { borderRadius: 0 },
//                 }}
//               />
//             </Toolbar>
//           </Box>
//           {searchResult.length > 0 && (
//             <div>
//               {searchResult.map((appointment) => (
//                 <div key={appointment.id}>

//                 </div>
//               ))}
//             </div>
//           )}
//         </Container>
//       */}
//         {/* <Grid
//           container
//           rowSpacing={4}
//           columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//           className="mt-1"
//         >
//            {appointments &&
//             appointments.content.map((appointments) => (
//               <Grid item xs={3} key={appointments.id}>
//                 <Card sx={{ maxWidth: 345, height: 350 }} color="dark">
//                   <CardMedia
//                     sx={{ height: 150, width: 140 }}
//                     className={styles.img}
//                     image="https://tse3.mm.bing.net/th?id=OIP.4dcJ_AHTJ81dikKbJ_xBtgHaGw&pid=Api&P=0&h=180"
//                     title="green iguana"
//                   />

//                   <CardContent>
//                     <Typography gutterBottom variant="body2" component="div">
//                       <strong>Name : </strong>
//                       {appointments.patientName}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>E - Mail : </strong>
//                       {appointments.patientEmail}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Number : </strong>
//                       {appointments.patientMobileNumber}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small">Share</Button>
//                     <Button
//                       onClick={() => appointmentDetails(appointments.id)}
//                       size="small"
//                     >
//                       Learn More
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//         </Grid>*/}
//         {/* <Container className="mt-3">
//           <Pagination aria-label="Page navigation example" size="lg">
//             <PaginationItem
//               onClick={() => changePage(appointments.pageNumber - 1)}
//               disabled={appointments.pageNumber == 0}
//             >
//               <PaginationLink previous>Previous</PaginationLink>
//             </PaginationItem>

//             {[...Array(appointments.totalPages)].map((item, index) => (
//               <PaginationItem
//                 onClick={() => changePage(index)}
//                 active={index == appointments.pageNumber}
//                 key={index}
//               >
//                 <PaginationLink>{index + 1}</PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem
//               onClick={() => changePage(appointments.pageNumber + 1)}
//               disabled={appointments.lastPage}
//             >
//               <PaginationLink next>Next</PaginationLink>
//             </PaginationItem>
//           </Pagination>
//         </Container> */}
//         {/* <Container className="mt-3">
//           <Pagination aria-label="Page navigation example" size="lg">
//             <PaginationItem
//               onClick={() => changePage(appointments.pageNumber - 1)}
//               disabled={appointments.pageNumber === 0}
//             >
//               <PaginationLink previous>Previous</PaginationLink>
//             </PaginationItem>

//             {[...Array(appointments.totalPages)].map((_, index) => {
//               const currentPageNumber = index + 1;
//               const isCurrentPage =
//                 currentPageNumber === appointments.pageNumber + 1;
//               const isWithinRange =
//                 currentPageNumber === 1 ||
//                 currentPageNumber === appointments.totalPages ||
//                 Math.abs(currentPageNumber - appointments.pageNumber) <= 2;

//               if (!isWithinRange) {
//                 return null;
//               }

//               return (
//                 <PaginationItem
//                   key={index}
//                   onClick={() => changePage(index)}
//                   active={isCurrentPage}
//                 >
//                   <PaginationLink>{currentPageNumber}</PaginationLink>
//                 </PaginationItem>
//               );
//             })}

//             <PaginationItem
//               onClick={() => changePage(appointments.pageNumber + 1)}
//               disabled={appointments.pageNumber === appointments.totalPages - 1}
//             >
//               <PaginationLink next>Next</PaginationLink>
//             </PaginationItem>
//           </Pagination>
//         </Container> */}
//         <Container className="mt-3">
//           <Pagination aria-label="Page navigation example" size="lg">
//             <PaginationItem
//               onClick={() => changePage(appointments.pageNumber - 1)}
//               disabled={appointments.pageNumber === 0}
//             >
//               <PaginationLink previous>Previous</PaginationLink>
//             </PaginationItem>

//             {[...Array(appointments.totalPages)].map((_, index) => {
//               const currentPageNumber = index + 1;
//               const isCurrentPage =
//                 currentPageNumber === appointments.pageNumber + 1;
//               const isFirstPage = currentPageNumber === 1;
//               const isLastPage = currentPageNumber === appointments.totalPages;
//               const isWithinRange =
//                 isFirstPage ||
//                 isLastPage ||
//                 Math.abs(currentPageNumber - appointments.pageNumber) <= 1;

//               if (isWithinRange) {
//                 return (
//                   <PaginationItem
//                     key={index}
//                     onClick={() => changePage(index)}
//                     active={isCurrentPage}
//                   >
//                     <PaginationLink>{currentPageNumber}</PaginationLink>
//                   </PaginationItem>
//                 );
//               } else if (index === 1 || index === appointments.totalPages - 2) {
//                 // Display ellipsis (...) for the second and second-to-last pages
//                 return (
//                   <PaginationItem key={index} disabled>
//                     <PaginationLink>...</PaginationLink>
//                   </PaginationItem>
//                 );
//               } else {
//                 return null;
//               }
//             })}

//             <PaginationItem
//               onClick={() => changePage(appointments.pageNumber + 1)}
//               disabled={appointments.pageNumber === appointments.totalPages - 1}
//             >
//               <PaginationLink next>Next</PaginationLink>
//             </PaginationItem>
//           </Pagination>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default ViewAllAppointments;
