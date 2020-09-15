// npm dependencies
import React, { Component } from "react";
import { Navbar, Form } from "react-bootstrap";

// data imports
import data from "../Json/data.json";

/**
 * Class Component:This component has the header functionality.
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Life Cycle method: This Method renders before the initial render.
   */
  componentDidMount() {
    // sets the elected userdetails in local storage.
    localStorage.setItem("loggedInEmail", data.userData[0].email);
  }

  /**
   * @description     This method captures the event and updates the state
   * @param {event} e Html event created by input field
   */
  handleChange = (e) => {
    localStorage.setItem("loggedInEmail", e.target.value);
    // sets the state of parent class
    this.props.accessParent.setState({
      loggedInEmail: e.target.value,
      selectedContact: {},
      showProfile: false,
      chatClick: false,
    });
  };

  render() {
    return (
      <Navbar className="justify-content-end color-nav">
        <Form inline>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Text style={{ color: "white", paddingRight: "5px" }}>
              <h6> Signed in as: </h6>
            </Form.Text>
            <Form.Control as="select" onChange={this.handleChange}>
              {data.userData.length
                ? data.userData.map((item, index) => (
                    <option key={index} value={item.email}>
                      {item.email}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Form.Group>
        </Form>
      </Navbar>
    );
  }
}

// default export
export default Header;
