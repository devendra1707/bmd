import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const CustomNavbar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const toggle = () => setIsOpen(!isOpen);
  let navigate = useNavigate();
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);
  const logout = () => {
    doLogout(() => {
      // logged out
      setLogin(false);
      navigate("/");
    });
  };

  return (
    <div id={theme}>
      <CssBaseline />

      <Navbar color="dark" dark expand="md" className="px-5 " fixed="top">
        <NavbarBrand tag={ReactLink} to="/">
          BMD
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/doctors">
                All Doctors
              </NavLink>
            </NavItem>
            {user &&
            user.userWithoutDoctorDto.roles[0].userRole == "PATIENT" ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Services
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem tag={ReactLink} to="/patient/doctors">
                    All Doctors
                  </DropdownItem>
                  <DropdownItem tag={ReactLink} to="/patient/dashboard">
                    Patient Dashboard
                  </DropdownItem>
                  <DropdownItem tag={ReactLink} to="/patient/appointments">
                    All Appointmrnt
                  </DropdownItem>
                  <DropdownItem>Get All Doctor</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Services
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem tag={ReactLink} to="/patient/doctors">
                    All Doctors
                  </DropdownItem>
                  <DropdownItem tag={ReactLink} to="/doctor/dashboard">
                    Doctor Dashboard
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            <NavItem>
              <NavLink tag={ReactLink} to="/contactus">
                Contact Us
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/aboutus">
                About Us
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/account">
                Account Details
              </NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Services
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/patient/doctors">
                  All Doctors
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/patient/dashboard">
                  Patient Dashboard
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/patient/appointments">
                  All Appointmrnt
                </DropdownItem>
                <DropdownItem>Get All Doctor</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Nav navbar>
            {login && (
              <>
                {/* <NavItem>
                  {user &&
                  user.userWithoutDoctorDto.roles[0].userRole == "PATIENT" ? (
                    <NavLink tag={ReactLink} to="/patient/profile">
                      Profile Info
                    </NavLink>
                  ) : (
                    <NavLink tag={ReactLink} to="/doctor/profile">
                      Profile Info
                    </NavLink>
                  )}
                </NavItem> */}

                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to={
                      user.userWithoutDoctorDto.roles[0].userRole === "PATIENT"
                        ? "/patient/profile"
                        : "/doctor/profile"
                    }
                  >
                    Profile Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    {user && user.userWithoutDoctorDto.userName}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
            <NavItem>
              <Switch />
            </NavItem>
            <NavItem>
              <span style={{ color: "white" }} className="pr-2">
                A-
              </span>
            </NavItem>
            <NavItem>
              <span style={{ color: "white" }}>A+ </span>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
