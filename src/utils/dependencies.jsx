// npm dependencies
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

// style dependencies
import "./dependencies.css";

/**
 * Functional Component:   This component renders the info of players.
 * @param {object}  props  Player details
 */
export const NameCard = (props) => {
  return (
    <Container>
      <Row>
        <Col sm={2} className="name-container">
          <strong> {props.name[0]}</strong>
        </Col>
        <Col sm={10}>
          <h5>{props.name}</h5>
          <p>{props.email}</p>
        </Col>
      </Row>
    </Container>
  );
};

/**
 * Functional Component:This component renders the full profile info of players.
 * @param {object}  props  Player details
 */
export const ProfileCard = (props) => {
  return (
    <Container className="profile-container">
      <br />
      <div style={{ textAlign: "center" }}>
        <h2 className="name-cls">{props.data.name[0]}</h2>
        <h5>{props.data.name.toUpperCase()}</h5>
        <p>
          Captain for <strong> {props.data.team} </strong>team
        </p>
      </div>
      <br />
      <Row>
        <Col sm={1}></Col>
        <Col sm={3}>
          <p>Name</p>
          <p>Email</p>
          <p>Team</p>
        </Col>
        <Col sm={6}>
          <p>{props.data.name}</p>
          <p>{props.data.email}</p>
          <p>{props.data.team}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={3}></Col>
        <Col sm={3}>
          <Button variant="info" onClick={props.handleUpdate}>
            Update
          </Button>
        </Col>
        <Col sm={3}>
          <Button variant="info" onClick={props.handleDelete}>
            Delete
          </Button>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

/**
 * Functional Component:This component renders the chat info between the players.
 * @param {object}  props  chat details
 */
export const ChatBox = (props) => {
  const { selectedContact } = props;
  // Gets the logged in email form local storage.
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  let filteredArray = [];
  // Data filtering
  if (selectedContact.chatData.length > 0) {
    filteredArray = selectedContact.chatData.filter((item) => {
      return (
        (item.sender === selectedContact.email &&
          item.reciever === loggedInEmail) ||
        (item.sender === loggedInEmail &&
          item.reciever === selectedContact.email)
      );
    });
  }
  return (
    <div className="chat-container">
      <h5 className="chat-name">{selectedContact.name}</h5>
      <div class="scrollbar" id="scrollchat">
        {filteredArray.length
          ? filteredArray.map((data, index) => {
              return (
                <div
                  key={index}
                  className={`message-container-${
                    data.reciever !== selectedContact.email ? "left" : "right"
                  }`}
                >
                  <p>{data.message}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
