// npm dependencies
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
} from "react-bootstrap";

// Data imports
import data from "../Json/data.json";

// component dependencies
import { NameCard, ProfileCard, ChatBox } from "../utils/dependencies";
import FormModal from "../utils/modal";
import Header from "./header";

/**
 * Class Component:This component renders the players list, chat boxes, profile info.
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    // initializes the state
    this.state = {
      selectedContact: {},
      loggedInEmail:
        localStorage.getItem("loggedInEmail") || data.userData[0].email,

      // Booleans for conditional rendering
      showChat: false,
      showModal: false,
      showProfile: false,

      // Arrays for storing data
      tableData: [],
    };
  }

  /**
   * Life Cycle method: This Method renders before the initial render.
   */
  componentDidMount() {
    this.setState({ tableData: data.userData });
  }

  /**
   * @description This methods updates the state.
   */
  handleModal = () => {
    this.setState({ showModal: true });
  };

  /**
   * @description         This method captures the event and updates the state
   * @param {object}  obj Selected user details
   * @param {event}   e   Html event created by input field
   */
  handleCheckbox = (obj, e) => {
    const tempArray = [...this.state.tableData];
    // Updating the checked property for selected user.
    tempArray.forEach((item) => {
      if (obj.name === item.name) {
        item.checked = e.target.checked;
      } else {
        item.checked = false;
      }
    });
    if (e.target.checked) {
      this.setState({
        selectedContact: obj,
        showProfile: true,
        showChat: false,
      });
    } else {
      this.setState({
        selectedContact: {},
        showProfile: false,
        showChat: false,
      });
    }
    this.setState({ tableData: tempArray });
  };

  /**
   * @description This methods updates the state.
   */
  handleChat = () => {
    this.setState({ showChat: true });
  };

  /**
   * @description This methods updates the state.
   */
  handleChatText = (e) => {
    this.setState({ chatText: e.target.value });
  };

  /**
   * @description       This method saves the chat details.
   * @param {event}  e  Html event created by input field.
   */
  saveChat = (e) => {
    e.preventDefault();
    const { loggedInEmail, selectedContact, chatText } = this.state;
    const tempArray = [...this.state.tableData];
    // storing the chat in loggedin user and selected user.
    tempArray.forEach((item) => {
      if (item.email === selectedContact.email) {
        let obj = {
          sender: loggedInEmail,
          reciever: selectedContact.email,
          message: chatText,
        };
        item.chatData.push(obj);
      }
      if (item.email === loggedInEmail) {
        let obj = {
          sender: loggedInEmail,
          reciever: selectedContact.email,
          message: chatText,
        };
        item.chatData.push(obj);
      }
    });
    this.setState({ tableData: tempArray, chatText: "" });
  };

  /**
   * @description       This method filters the user list based on the search param.
   * @param {event}  e  Html event created by input field.
   */
  filterPlayers = (e) => {
    let tempArray = [...data.userData];
    let searchString = e.target.value;
    const filteredArray = tempArray.filter(
      (item) =>
        item.name.toLowerCase().search(searchString.toLowerCase()) !== -1
    );
    this.setState({ tableData: filteredArray });
  };

  /**
   * @description           This method deletes the user data from the list.
   * @param   {object} obj  object to be deleted
   */
  deleteUser = (obj) => {
    const tempArray = [...this.state.tableData];
    const filteredArray = tempArray.filter((item) => item.email !== obj.email);
    data.userData = filteredArray;
    this.setState({
      tableData: filteredArray,
      showProfile: false,
      selectedContact: {},
    });
  };

  /**
   * @description           This method adds the user data to the list.
   * @param   {object} obj  object to be added
   */
  addUser = (obj) => {
    this.setState({ showModal: false });
    const tempArray = [...this.state.tableData];
    obj.chatData = [];
    tempArray.push(obj);
    data.userData.push(obj);
    this.setState({ tableData: tempArray });
  };

  /**
   * @description           This method updates the user data from the list.
   * @param   {object} obj  object to be updated
   */
  updateUser = (obj) => {
    this.setState({ showModal: false });
    const tempArray = [...this.state.tableData];
    tempArray.forEach((item, index) => {
      if (item.email === obj.email) {
        tempArray[index] = obj;
      }
    });
    this.setState({
      tableData: tempArray,
      showProfile: false,
      selectedContact: {},
    });
  };

  render() {
    const {
      chatText,
      tableData,
      showModal,
      showChat,
      showProfile,
      loggedInEmail,
      selectedContact,
    } = this.state;
    return (
      <div>
        <Header accessParent={this} />
        <br></br>
        <Container>
          <Row>
            <Col sm={7}>
              <Row>
                <Col sm={9}>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Search player"
                        name="searchString"
                        onChange={this.filterPlayers}
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col sm={3}>
                  {!showProfile ? (
                    <Button
                      variant="info"
                      type="submit"
                      onClick={this.handleModal}
                    >
                      Add Player
                    </Button>
                  ) : null}
                  {showModal ? (
                    <FormModal
                      showModal={showModal}
                      data={selectedContact}
                      accessParent={this}
                    />
                  ) : null}
                </Col>
              </Row>
              <Table borderless hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Player Name</th>
                    <th>Team</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length
                    ? tableData.map((item) => {
                        if (item.email !== loggedInEmail) {
                          return (
                            <tr key={item.email}>
                              <td>
                                <Form.Check
                                  type="checkbox"
                                  checked={item.checked}
                                  onChange={(e) => this.handleCheckbox(item, e)}
                                />
                              </td>
                              <td>
                                <NameCard name={item.name} email={item.email} />
                              </td>
                              <td>
                                <strong>{item.team}</strong>
                              </td>
                              <td>
                                <Button
                                  variant="info"
                                  type="submit"
                                  disabled={!item.checked}
                                  onClick={this.handleChat}
                                >
                                  Chat
                                </Button>
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}
                  <tr></tr>
                </tbody>
              </Table>
            </Col>
            <Col sm={5}>
              {showProfile ? (
                showChat ? (
                  <div>
                    <ChatBox selectedContact={selectedContact} />
                    <Form onSubmit={this.saveChat}>
                      <Form.Group className="chat-input-group">
                        <InputGroup>
                          <Form.Control
                            className="chat-input-field"
                            type="text"
                            name="chatText"
                            value={chatText}
                            placeholder="Enter Message"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={this.handleChatText}
                          />
                          <InputGroup.Append>
                            <Button variant="info" type="submit">
                              Send
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form.Group>
                    </Form>
                  </div>
                ) : (
                  <ProfileCard
                    data={selectedContact}
                    handleDelete={() => this.deleteUser(selectedContact)}
                    handleUpdate={() => this.handleModal()}
                  />
                )
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// default export
export default Profile;
