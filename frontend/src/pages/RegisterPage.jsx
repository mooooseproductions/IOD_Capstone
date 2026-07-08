import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import api from '../api/connection';

function RegisterPage() {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        handle: "",
        email: "",
        passowrd: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/user/register");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>

                    <Form.Control
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        aria-describedby="inputGroup-sizing-sm"

                    />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Handle</InputGroup.Text>
                    <Form.Control
                        name="handle"
                        value={user.handle}
                        onChange={handleChange}
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
                    <Form.Control
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
                    <Form.Control
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>

        </>
    );
}

export default RegisterPage;