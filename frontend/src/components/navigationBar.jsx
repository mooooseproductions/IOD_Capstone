import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";

function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, status } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(accessToken);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Barely Brewing</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/register"}>Sign Up</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link
                as="button"
                onClick={handleLogout}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Logging out..." : "Logout"}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;