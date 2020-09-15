// npm dependencies
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 * Class Component:This component handles the form for adding and updating the details.
 */
class FormModal extends Component {
  constructor(props) {
    super(props);
    // initializes the state
    this.state = {
      // Booleans for contional rendering
      showModal: false,
      // form variables
      name: props.data.name || "",
      email: props.data.email || "",
      team: props.data.team || "",
    };
  }

  /**
   * Life Cycle method: This Method updates the local state only when the props does not matched with state.
   * @param {object} props  data coming from other component
   * @param {object} state  Local state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.showModal !== state.showModal) {
      return {
        showModal: true,
      };
    }
    return null;
  }

  /**
   * @description     This method captures the event and updates the state
   * @param {event} e Html event created by input field
   */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * @description This method updates the state.
   */
  handleClose = () => {
    this.props.accessParent.setState({ showModal: false });
  };

  /**
   * @description This method send the user details object to parent class.
   */
  handleSubmit = () => {
    const { name, email, team } = this.state;
    const userObj = {
      name: name,
      email: email,
      team: team,
    };
    const result = this.inputValidation(userObj);
    if (result === 0) {
      // Checks for the props data.
      if (Object.keys(this.props.data).length) {
        // update user case
        this.props.accessParent.updateUser(userObj);
      } else {
        // add user case
        this.props.accessParent.addUser(userObj);
      }
    }
  };

  inputValidation = (obj) => {
    let flag = 0;
    if (!obj.name) {
      flag = 1;
      alert("please enter the name");
    } else if (!obj.email) {
      flag = 1;
      alert("please enter the email");
    } else if (!obj.team) {
      flag = 1;
      alert("please enter the team name");
    } else if (obj.email) {
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const result = regex.test(obj.email);
      if (!result) {
        flag = 1;
        alert("enter valid email address");
      }
    }
    return flag;
  };

  render() {
    const { showModal, name, email, team } = this.state;
    return (
      <div>
        <Modal show={showModal}>
          <Modal.Body>
            <h4 style={{ textAlign: "center" }}>User registration form</h4>
            <Form>
              <Form.Group>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  defaultValue={name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  placeholder="Enter Email"
                  disabled={this.props.data.email || false}
                  defaultValue={email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="team"
                  type="text"
                  placeholder="Enter team"
                  defaultValue={team}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="info" type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Default export
export default FormModal;
