import React, { useRef } from 'react';
import {
	CombinedContainer,
	InfoContainer,
	OnlineContainer,
	DeleteButton,
	Online,
	TableContainer,
	Table,
	TableBody,
	TableRowUser,
	TableRowMessage,
	TableRowTimeStamp,
	MessageButton,
	InputMessage,
	ChatWindowContainer,
} from './app-styles';

// const wsClient = new WebSocket('ws://localhost:8090/chat');

class ChatInterface extends React.Component {
	constructor(props) {
		super(props);
		this.usernameRef = React.createRef();
		this.newData = React.createRef();
	}

	state = {
		name: null,
		message: '',
		messages: [],
		timeStamp: '',
		connections: 0,
		ws: '',
	};

	// componentDidMount() {
		// fetch('/chat')
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		this.setState({
		// 			messages: result,
		// 		});
		// 	})
		// 	.catch(function (error) {
		// 		console.error(error);
		// 	});

	// 	wsClient.onopen = (evt) => {};

	// 	wsClient.onmessage = (evt) => {
	// 		const data = JSON.parse(evt.data);
	// 		if (typeof data === 'number') {
	// 			this.setState({ connections: data });
	// 		} else if (typeof data === 'object' && Object.keys(data) !== 'username') {
	// 			this.addMessage(data);
	// 		} else {
	// 			if (data === true) {
	// 				this.setState({ messages: [] });
	// 			}
	// 		}
	// 	};


	// componentDidUpdate() {
		// if (this.newData.current === null) {
		// 	return null;
		// } else {
		// 	this.newData.current.scrollIntoView({ behavior: 'smooth' });
		// }
	// }




	

	// clearChat = () => {
	// 	const r = window.confirm('want to delete broadcast chat?');
	// 	if (r == true) {
	// 		wsClient.send(
	// 			JSON.stringify({
	// 				clear: true,
	// 			})
	// 		);
	// 		this.setState({ messages: [] });
	// 	} else {
	// 		console.log('exit delete');
	// 	}
	// };
	render() {
		return (
			<ChatWindowContainer>
				<CombinedContainer>
					<TableContainer>
						<Table>
							<TableBody>
								{this.state.messages.map((message, index) => {
									const { date, time } = this.unixTimestampToHuman(
										message.timeStamp
									);
									if (Object.keys(message).includes('username')) {
									} else if (Object.entries(message).length != 0) {
										return (
											<tr key={index} ref={this.newData}>
												<TableRowUser width='10%' key={index}>
													{message.name}
												</TableRowUser>
												<TableRowMessage width='75%'>
													{message.message}
												</TableRowMessage>
												<TableRowTimeStamp width='15%'>
													{time}
												</TableRowTimeStamp>
											</tr>
										);
									}
								})}
							</TableBody>
						</Table>
					</TableContainer>

					<InfoContainer>
						<DeleteButton
							onClick={() => {
								this.clearChat();
							}}
						>
							Delete
						</DeleteButton>
						<OnlineContainer>
							{/* <Online>Online: {this.state.connections}</Online> */}
						</OnlineContainer>
					</InfoContainer>
				</CombinedContainer>
				<form action='.' onSubmit={(e) => this.submitMessage(e)}>
					<InputMessage
						type='text'
						placeholder={'Enter message...'}
						value={this.state.message}
						onChange={(e) => this.enterMessage(e)}
					/>
					<MessageButton type='submit'>Send</MessageButton>
				</form>
			</ChatWindowContainer>
		);
	}
}

export default ChatInterface;
