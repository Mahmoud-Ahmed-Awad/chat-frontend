import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import NavBar from "../components/NavBar";
import mustLogin from "../utils/mustLogin";
import "./EditProfile.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import getUserData from "../utils/getUserData";

function EditProfile() {
  mustLogin(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      setUser(userData.data.data.user);
    })();
  }, []);

  const userUpdates = {};

  function handleChange(e) {
    userUpdates[e.target.name] = e.target;
  }

  const imageRef = useRef();

  const userUpdated = new FormData();
  async function handleUpdate() {
    await Object.values(userUpdates).forEach(async (e) => {
      if (e.name === "avatar") {
        userUpdated.append(e.name, e.files[0]);
        console.log(e);
      } else {
        userUpdated.append(e.name, e.value);
      }
    });
    try {
      await axios.patch(`${window.env.API_URL}/users/update`, userUpdated, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const birthDay = new Date(user.birthDay);

  const birthDayMonthIndex = birthDay.getMonth();
  const birthDayMonthName = monthNames[birthDayMonthIndex];

  const createdAt = new Date(user.createdAt);

  const createdAtMonthIndex = createdAt.getMonth();
  const createdAtMonthName = monthNames[createdAtMonthIndex];

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <div className="user-data">
          <img
            src={`${window.env.API_URL}/avatars/${user.avatar}`}
            alt={`${user.firstName} ${user.lastName} Avatar`}
            className="mb-3"
            loading="lazy"
          />
          <h2>
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </h2>
          <h5>{`Birth Day: ${birthDay.getDate()}, ${birthDayMonthName}, ${birthDay.getFullYear()}`}</h5>
          <h6>{`Created At: ${createdAt.getDate()}, ${createdAtMonthName}, ${createdAt.getFullYear()}`}</h6>
        </div>
        <Card className="mt-3 mb-3">
          <ListGroup variant="flush">
            <ListGroup.Item>Edit Your Data</ListGroup.Item>
            <ListGroup.Item>
              <form encType="multipart/form-data">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    name="avatar"
                    type="file"
                    ref={imageRef}
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChange}
                  />
                </Form.Group>
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
                <InputGroup className="mb-3">
                  <InputGroup.Text id="birthDayInp">Birth Day</InputGroup.Text>
                  <Form.Control
                    type="date"
                    aria-label="Birth Day"
                    aria-describedby="birthDayInp"
                    name="birthDay"
                    onChange={handleChange}
                  />
                </InputGroup>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Password</ListGroup.Item>
                    <ListGroup.Item>
                      <InputGroup>
                        <InputGroup.Text id="currentPasswordInp">
                          Current Password
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Current Password"
                          type="password"
                          aria-label="Current Password"
                          aria-describedby="currentPasswordInp"
                          name="currentPassword"
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mt-2">
                        <InputGroup.Text id="newPasswordInp">
                          New Password
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="New Password"
                          type="password"
                          aria-label="New Password"
                          aria-describedby="newPasswordInp"
                          name="newPassword"
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <Button
                  className="mt-3"
                  variant="primary"
                  onClick={handleUpdate}
                  style={{ width: "100%" }}
                >
                  Update
                </Button>
              </form>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
}

export default EditProfile;
