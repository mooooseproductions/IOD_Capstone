import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import {
    registerUser,
    setFormField,
    setValidationErrors,
    clearValidationErrors,
} from "../features/registrationSlice";
import { userRegistrationSchema } from "../validation/registrationSchema";

function RegistrationPage() {
    const dispatch = useDispatch();

    const { formData, errors, message, status } = useSelector(
        (state) => state.registration
    );

    const submitting = status === "loading";

    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(
            setFormField({
                field: name,
                value,
            })
        );
    };

    const handleRegister = (event) => {
        event.preventDefault();

        dispatch(clearValidationErrors());

        const result = userRegistrationSchema.safeParse(formData);

        if (!result.success) {
            const validationErrors = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0];

                if (!validationErrors[fieldName]) {
                    validationErrors[fieldName] = issue.message;
                }
            });

            dispatch(setValidationErrors(validationErrors));
            return;
        }

        dispatch(registerUser(result.data));
    };

    return (
        <main className="app-page auth-page">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={5}>
                <Card className="auth-card">
                  <Card.Body>
                    <span className="page-kicker">Join the brewery</span>
                    <h1>Create your account</h1>
                    <p className="page-intro">Keep your batches, recipes, and favourite community brews together.</p>
                    <Form className="auth-form" onSubmit={handleRegister}>
            {message && (
                <Alert variant={status === "failed" ? "danger" : "success"}>
                    {message}
                </Alert>
            )}

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>

                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.name)}
                />

                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Handle</Form.Label>

                <Form.Control
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.handle)}
                />

                <Form.Control.Feedback type="invalid">
                    {errors.handle}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.email)}
                />

                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.password)}
                />

                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Button className="bb-primary w-100" type="submit" disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
            </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
    );
}

export default RegistrationPage;
