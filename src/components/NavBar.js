import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import getUserData from "../utils/getUserData";

function NavBar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData.data.data.user);
      }
    })();
  }, []);

  return (
    <Navbar
      key={"md"}
      expand={"md"}
      className="bg-body-tertiary mb-3 fixed-top"
    >
      <Container fluid>
        <Navbar.Brand href="/chat">Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
            {user._id && (
              <NavDropdown
                title={
                  <img
                    src={`${window.env.API_URL}/avatars/${user.avatar}`}
                    alt={`${user.firstName} ${user.lastName} Avatar`}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#eee",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                }
                id="offcanvasNavbarDropdown-expand-md"
                style={{ marginRight: "5px" }}
              >
                <NavDropdown.Item href="/editProfile">
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout" style={{ color: "red" }}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;
