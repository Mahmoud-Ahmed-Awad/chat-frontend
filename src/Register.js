import NavBar from "./components/NavBar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import mustLogin from "./utils/mustLogin";

function Register() {
  mustLogin(false);
  let user = {};
  function handleChange(e) {
    user[e.target.name] = e.target.value;
  }
  async function handleRegister() {
    console.log(user);
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.password &&
      user.birthDay
    ) {
      try {
        const login = await axios.post(
          `${window.env.API_URL}users/register`,
          user
        );
        if (login.data.status === "SUCCESS") {
          window.localStorage.setItem("token", login.data.data.user.token);
          window.location.href = "/chat";
        }
      } catch (error) {}
    }
  }
  return (
    <>
      <NavBar />
      <Card className="login-register">
        <ListGroup variant="flush">
          <ListGroup.Item>Login</ListGroup.Item>
          <ListGroup.Item>
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text>First and last name</InputGroup.Text>
                <Form.Control
                  aria-label="First name"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                />
                <Form.Control
                  aria-label="Last name"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="emaillInp">Email</InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="emaillInp"
                  name="email"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text id="passwordInp">Password</InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  type="password"
                  aria-label="Password"
                  aria-describedby="passwordInp"
                  name="password"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mt-3">
                <InputGroup.Text id="birthDayInp">Birth Day</InputGroup.Text>
                <Form.Control
                  type="date"
                  aria-label="Birth Day"
                  aria-describedby="birthDayInp"
                  name="birthDay"
                  onChange={handleChange}
                />
              </InputGroup>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleRegister}
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </Form>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export default Register;
