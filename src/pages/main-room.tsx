import React, { useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { unixTimestamp } from '../util';
import { OnlineUser } from '../components/online-users';
import { MessageInput } from '../components/message-input';
import { Roomlist } from '../pages/sub-pages/room-list';
import { MessagingRooms } from '../components/messaging_rooms';
import { FileInput } from '../components/file-input';
// import VideoChat from './videoChat'

import { CombinedContainer, InfoContainer, ChatWindowContainer } from '../styles/app-styles';

const WsMainRoom = () => {
	let history = useHistory();
	const [input, setInput] = React.useState('');
	// const [inputVideo, setVideo] = React.useState({});
	// const [connection, setRemotePConnetion] = React.useState();
	const [messages, setMessages] = React.useState([]);
	const [isActive, setActive] = React.useState(null);
	const [pvtMessages, setPvtMessages] = React.useState<any[]>([
		[
			{
				id: 0,
				name: 'main_room_placeholder',
				message: 'null',
				timeStamp: { date: 'Jul 06', time: '10:53:55' },
			},
		],
	]);
	const [connections, setConnections] = React.useState([]);

	const [currentRooms, setRoomsList] = React.useState([
		{
			id: 0,
			default: true,
			targetName: 'main-room',
		},
	]);
	const ws = useRef(null);
	// let isActiveCurrent = useRef(isActive);
	const setUsername = history.location.search.split('?')[1];

	useEffect(() => {
		// create websocket connection
		ws.current = new WebSocket(`ws://localhost:8090`);
		ws.current.onopen = () => {
			ws.current.send(
				JSON.stringify({
					type: 'set_username',
					setName: setUsername,
					timeStamp: unixTimestamp(),
				})
			);
		};

		ws.current.onclose = () => {
			console.log('ws closed');
		};

		fetch('/chat')
			.then((response) => {
				return response.json();
			})
			.then((responseJson) => {
				setMessages(responseJson);
			})
			.catch((error) => {
				console.log('error reaching /chat route', error);
			});

		return () => {
			ws.current.close();
		};
	}, []);

	useEffect(() => {
		ws.current.onmessage = async (e) => {
			let data = JSON.parse(e.data);
			switch (data.type) {
				case 'message':
					setMessages([...messages, data]);
					break;
				case 'connections':
					setConnections(data.connections);
					break;
				case 'private_room_created':
					await setRoomsList((currentRooms) => [
						...currentRooms,
						{
							id: data.id,
							targetId: data.targetId,
							targetName: data.targetName,
							fromClient: data.fromClient,
							toClient: data.toClient,
							privateRoomActive: data.privateRoomActive,
							privateRoomID: data.privateRoomID,
							default: false,
						},
					]);
					break;
				case 'private_message_room':
					const found = pvtMessages.find((x) => x[0].id === data.privateRoomMsg[0].id);

					if (found) {
						setPvtMessages(
							pvtMessages.map((x) => {
								if (x[0].id !== data.privateRoomMsg[0].id) return x;
								return [...x, data.privateRoomMsg.slice(-1)[0]];
							})
						);
					} else {
						setPvtMessages([...pvtMessages, [data.privateRoomMsg[0]]]);
					}
					break;
			}
		};

		ws.current.onerror = (event) => {
			console.error(event);
		};
		return () => {};
	}, [messages, connections, isActive, pvtMessages]);
	// console.log('pvtMessages', pvtMessages);

	return (
		<div>
			<ChatWindowContainer id={'chatContainer'}>
				<CombinedContainer id={'CombinedContainer'}>
					<Roomlist rooms={currentRooms} isActive={isActive} setActive={setActive}></Roomlist>
					<MessagingRooms
						messages={
							isActive === 0
								? messages
								: pvtMessages.find((obj) => {
										if (obj[0].id === isActive) return obj;
								  })
						}
					></MessagingRooms>
					<InfoContainer>
						<OnlineUser
							connections={connections}
							current={ws.current}
							currentRooms={currentRooms}
							setRoomsList={setRoomsList}
						/>
					</InfoContainer>
				</CombinedContainer>
				<FileInput current={ws.current}></FileInput>
				<MessageInput
					username={setUsername}
					current={ws.current}
					input={input}
					setInput={setInput}
					rooms={currentRooms}
				/>
			</ChatWindowContainer>
		</div>
	);
};

export default WsMainRoom;
