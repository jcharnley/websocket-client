import React, { useRef } from "react";
import "./App.css";
import styled from "styled-components";

const wsClient = new WebSocket("ws://localhost:8090/chat");

const AppContainer = styled.div``;

const ChatWindowContainer = styled.div``;

const CombinedContainer = styled.div`
  display: flex;
`;
const OnlineContainer = styled.div`
  width: 10%;
  border: 1px solid blue;
  overflow: scroll;
`;

const Online = styled.h5`
  text-align: center;
  margin-right: 3rem;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  overflow: scroll;
  width: 90%;
`;

const Table = styled.table`
  width: 100%;
`;
const TableBody = styled.tbody``;

const TableRow = styled.td`
  padding: 0;
  > last-child {
    position: sticky;
    bottom: 0;
  }
`;
const TableRowTimeStamp = styled.td`
  padding: 0;
  text-align: right;
`;

const MessageButton = styled.button`
  width: 10%;
`;

const InputMessage = styled.input`
  width: 90%;
  height: 3rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.newData = React.createRef();
  }

  state = {
    name: null,
    message: "",
    messages: [],
    timeStamp: "",
    connections: 0,
    ws: ""
  };

  componentDidMount() {
    fetch("/chat")
      .then(response => response.json())
      .then(result => {
        this.setState({
          messages: result
        });
      })
      .catch(function(error) {
        console.error(error);
      });

    wsClient.onopen = evt => {
      // console.log("connected");
    };

    wsClient.onmessage = evt => {
      // console.log("onmessage", evt.data);

      if (evt.data === "wsId") {
        console.log(true);
      }
      // on receiving a message, add it to the list of messages

      const data = JSON.parse(evt.data);
      if (typeof data === "number") {
        this.setState({ connections: data });
      }

      if (typeof data === "object" && Object.keys(data) !== "username") {
        this.addMessage(data);
      }
    };

    wsClient.onclose = () => {
      // automatically try to reconnect on connection loss
      this.setState({
        ws: this.state.ws
      });
    };
  }

  componentDidUpdate() {
    if (this.newData.current === null) {
      return null;
    } else {
      this.newData.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  timeStamp = () => {
    return Math.floor(new Date().getTime() / 1000);
  };

  unixTimestampToHuman = timestamp => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(timestamp);
    const format = t.toString().split(" ");
    return {
      date: format.slice(1, 3).join(" "),
      time: format[4]
    };
  };

  addMessage = message => {
    this.setState({
      messages: [...this.state.messages, message]
    });
  };

  enterMessage = e => {
    this.setState({ message: e.target.value, timeStamp: this.timeStamp() });
  };

  submitMessage = e => {
    e.preventDefault();
    // on submit of the ChatInput form, send the message, add it to the list and reset the input
    const message = {
      name: this.state.name,
      message: this.state.message,
      timeStamp: this.state.timeStamp
    };
    wsClient.send(JSON.stringify(message));
  };

  login = () => {
    this.setState({
      name: this.usernameRef.current.value
    });
    wsClient.send(
      JSON.stringify({
        username: this.usernameRef.current.value
      })
    );
  };

  loginWindow = () => (
    <div className="loginWindowContainer">
      <label>
        <h5>Username</h5>
      </label>
      <div className="container">
        <input
          className="inputName"
          type="text"
          placeholder={"Enter your name"}
          ref={this.usernameRef}
          required
        />
        <button
          className="loginButton"
          onClick={() => {
            this.login();
          }}
        >
          Enter!
        </button>
      </div>
    </div>
  );

  showChatWindow = () => (
    <ChatWindowContainer>
      <CombinedContainer>
        <TableContainer>
          <Table>
            <TableBody>
              {this.state.messages.map((message, index) => {
                const { date, time } = this.unixTimestampToHuman(
                  message.timeStamp
                );
                console.log("message", message);
                if (Object.keys(message).includes("username")) {
                  return null;
                } else if (Object.entries(message).length != 0) {
                  return (
                    <tr key={index} ref={this.newData}>
                      <TableRow width="5%" key={index}>
                        {message.name}
                      </TableRow>
                      <TableRow width="80%">{message.message}</TableRow>
                      <TableRowTimeStamp width="15%">{time}</TableRowTimeStamp>
                    </tr>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <OnlineContainer>
          <Online>Online: {this.state.connections}</Online>
        </OnlineContainer>
      </CombinedContainer>
      <form action="." onSubmit={e => this.submitMessage(e)}>
        <InputMessage
          type="text"
          placeholder={"Enter message..."}
          value={this.state.message}
          onChange={e => this.enterMessage(e)}
        />
        <MessageButton type="submit">Send</MessageButton>
      </form>
    </ChatWindowContainer>
  );

  render() {
    return (
      <AppContainer>
        {this.state.name ? this.showChatWindow() : this.loginWindow()}
      </AppContainer>
    );
  }
}

export default App;
