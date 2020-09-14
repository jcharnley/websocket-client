import * as React from 'react';
import { useState, useEffect } from "react"
import ChatInterface from './chatInterface'
import { withRouter, RouteComponentProps } from "react-router-dom";
// import Layout from '../components/layout';
// import SEO from '../components/seo';

interface SearchProps extends RouteComponentProps<any> {
  history: any
}


const UserLogin: React.FunctionComponent<SearchProps> = ({ history }) => {

  const [username, setName] = useState<string>("");

  return (
    <div className="loginWindowContainer">
      <label>
        <h5>Username</h5>
      </label>
      <div className="container">
        <input
          className="inputName"
          type="text"
          placeholder={"Enter your name"}
          onChange={event => {
            setName(event.currentTarget.value)
          }}
          required
        />
        <button
          className="loginButton"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            history.push(`/chat?${username}`);
          }}
        >
          Enter!
          </button>
      </div>
    </div>
  );
}

export default UserLogin

