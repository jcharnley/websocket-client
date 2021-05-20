import React, { useRef } from 'react';
import { AppContainer } from '../styles/app-styles';
import {UserSignIn} from './login';
import WsMainRoom from './main-room';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter,
	RouteComponentProps,
} from 'react-router-dom';


class App extends React.Component<RouteComponentProps<any>>
{
	render() {
		return (
			<AppContainer className="App Container">
				<Router>
					<Switch>
						<Route exact path='/' component={UserSignIn} />
						<Route path='/chat' children={() => <WsMainRoom />} />
					</Switch>
				</Router>
			</AppContainer>
		);
	}
}

export default withRouter(App);