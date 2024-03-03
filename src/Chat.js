import NavBar from "./components/NavBar";
import mustLogin from "./utils/mustLogin";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getUserData from "./utils/getUserData";
import { io } from "socket.io-client";
import Button from "react-bootstrap/Button";

function Chat() {
  mustLogin(true);
  const [user, setUser] = useState({});
  const [otherUsers, setOtherUsers] = useState([]);
  const socket = io(process.env.API_URL);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData.data.data.user);
      }
      // })();
      // (async () => {
      const otherUsersRequest = await axios.get(
        `${process.env.API_URL}/users/otherUsers`,
        {
          headers: {
            Authorization: `Beare ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setOtherUsers(otherUsersRequest.data.data.users);
      socket.emit("token", userData.data.data.user.token);
      const oldMessages = await axios.get(
        `${process.env.API_URL}/oldMesssages/${userData.data.data.user._id}/${toUser}`
      );
      setMessages(oldMessages.data.data.messages);
      messagesBox.current.scrollTo(0, messagesBox.current.scrollHeight);
    })();
  }, []);
  const toUser = useParams().id;
  const toUserData = otherUsers.find((e) => e._id === toUser);

  const msgBox = useRef();
  const messagesBox = useRef("div");

  // setTimeout(() => {
  // }, 1000);

  function handleSendMessage(e) {
    const message = {
      from: user._id,
      to: toUser,
      message: msgBox.current.value,
    };
    socket.emit("message", JSON.stringify(message));
    setMessages([...messages, message]);
    msgBox.current.value = "";
  }
  socket.on("message", (message) => {
    const decodedMessage = JSON.parse(message);
    setMessages((oldMessages) => [...oldMessages, decodedMessage]);
  });
  useEffect(() => {
    messagesBox.current.scrollTo(0, messagesBox.current.scrollHeight);
  }, [messages]);
  return (
    <>
      <NavBar />
      <Card style={{ width: "90vw", margin: "20px auto" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Chat</ListGroup.Item>
          <ListGroup.Item>
            <Card style={{ width: "20rem", height: "78vh" }}>
              <ListGroup variant="flush" style={{ overflow: "hidden" }}>
                <ListGroup.Item>Users</ListGroup.Item>
                <ListGroup.Item>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    {/* <Button variant="outline-success">Search</Button> */}
                  </Form>
                </ListGroup.Item>
                <ListGroup style={{ overflow: "auto", position: "relative" }}>
                  {otherUsers.map((user) => {
                    return (
                      <>
                        <a
                          href={`/chat/${user._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ListGroup.Item>
                            <img
                              src={`${process.env.API_URL}/avatars/${user.avatar}`}
                              alt={`${user.firstName} ${user.lastName} Avatar`}
                              style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#eee",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                            />
                            {user.firstName} {user.lastName}
                          </ListGroup.Item>
                        </a>
                      </>
                    );
                  })}
                </ListGroup>
              </ListGroup>
            </Card>
            {/* </ListGroup.Item>
          <ListGroup.Item> */}
            <Card
              style={{
                width: "calc(100% - 22rem)",
                height: "78vh",
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
              }}
            >
              <ListGroup
                variant="flush"
                style={{
                  position: "relative",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <ListGroup.Item>
                  {toUserData && (
                    <>
                      <img
                        src={`${process.env.API_URL}/avatars/${toUserData.avatar}`}
                        alt={`${toUserData.firstName} ${toUserData.lastName} Avatar`}
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#eee",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      {toUserData.firstName} {toUserData.lastName}
                    </>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>{"chat"}</ListGroup.Item>
                <ListGroup.Item
                  style={{
                    height: "calc(100% - 155px)",
                    overflow: "auto",
                  }}
                  ref={messagesBox}
                >
                  {messages.map((e) => {
                    if (e.from == user._id) {
                      return (
                        <Card
                          style={{ width: "18rem", backgroundColor: "#2564fe" }}
                          className="mt-3"
                        >
                          <ListGroup
                            variant="flush"
                            style={{ backgroundColor: "#2564fe" }}
                          >
                            <ListGroup.Item
                              style={{ backgroundColor: "#2564fe" }}
                            >
                              {toUserData.firstName} {toUserData.lastName}
                            </ListGroup.Item>
                            <ListGroup.Item
                              style={{ backgroundColor: "#2564fe" }}
                            >
                              {e.message}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      );
                    } else {
                      return (
                        <Card
                          style={{
                            width: "18rem",
                            marginLeft: "calc(100% - 18rem)",
                            backgroundColor: "#eee",
                          }}
                          className="mt-3"
                        >
                          <ListGroup
                            variant="flush"
                            style={{ backgroundColor: "#eee" }}
                          >
                            <ListGroup.Item
                              style={{
                                backgroundColor: "#eee",
                                color: "black",
                              }}
                            >
                              {toUserData.firstName} {toUserData.lastName}
                            </ListGroup.Item>
                            <ListGroup.Item
                              style={{
                                backgroundColor: "#eee",
                                color: "black",
                              }}
                            >
                              {e.message}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      );
                    }
                  })}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    // borderWidth: "1px 0 0 0",
                  }}
                >
                  <Form className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Message"
                      className="me-2"
                      aria-label="Enter Your Message"
                      ref={msgBox}
                    />
                    <Button
                      variant="outline-success"
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export default Chat;
