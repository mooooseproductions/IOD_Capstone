import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import logo from "../assets/barely-brewing-logo.webp";

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
    <Navbar expand="lg" className="site-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="brand-lockup">
          <img src={logo} alt="" className="brand-logo" />
          <span>Barely Brewing</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
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
            {isLoggedIn && <Nav.Link as={Link} to={"/search"}>Search</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={"/brewing"}>Add Brew</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={"/profile"}>Account</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
