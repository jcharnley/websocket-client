import React, { useRef } from 'react';
import './App.css';
import { AppContainer } from './app-styles';
import UserLogin from './userLogin';
import ChatInterface from './chatInterface';
import WsMainRoom from './wsMainRoom';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter,
} from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<AppContainer>
				<Router>
					<Switch>
						<Route exact path='/' component={UserLogin} />
						<Route path='/chat' children={() => <WsMainRoom />} />
					</Switch>
				</Router>
			</AppContainer>
		);
	}
}

export default withRouter(App);
