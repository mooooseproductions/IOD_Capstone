import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { loginUser } from "../features/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const [loginDetails, setLoginDetails] = useState({
    email: "eap@beer.com",
    password: "123456",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(loginDetails)).unwrap();

      navigate("/profile");
    } catch (error) {
      // Redux already stores and displays the error
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>

        <Form.Control
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>

        <Form.Control
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
}

export default LoginPage;