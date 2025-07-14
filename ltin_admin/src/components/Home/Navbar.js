import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import firebase from "../../firebase";
import logo from "./logo.png"; // Ensure correct path
import "./navbar.css";

const NAVIE = () => {
  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log("Logout successful");
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        {/* Left-aligned logo and text */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
            alt="admin"
          />
          <div className="text-start">
            <h6 className="logo-text m-0">Learn TEK In</h6>
            <span className="tagline">We construct your path to the digital world!</span>
          </div>
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Navbar Items */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="logout" as={Link} to="/logout" onClick={handleLogout}>
              <h5>Logout</h5>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NAVIE;
