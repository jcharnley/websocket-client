import React, { useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { unixTimestamp } from './util';
// import VideoChat from './videoChat';

import {
	CombinedContainer,
	InfoContainer,
	OnlineContainer,
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

const WsMainRoom = () => {
	let history = useHistory();

	const [input, setInput] = React.useState('');
	// const [inputVideo, setVideo] = React.useState({});
	const [connection, setRemotePConnetion] = React.useState();
	const [messages, setMessages] = React.useState([]);
	const [connections, setConnections] = React.useState([]);
	const [selectedUser, setUser] = React.useState({
		type: null,
		targetId: null,
		targetName: null,
	});
	const ws = useRef(null);
	const videoTag = useRef(null);
	const videoTag2 = useRef(null);
	const setUsername = history.location.search.split('?')[1];

	let configuration = {
		iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
	};
	// Video

	let localstream;
	let pc1;
	let pc2;

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
				case 'private_message':
					console.log('private-message', data);
					break;
				// case 'createPeerConnection':
				// 	const { fromClient, toClient } = JSON.parse(e.data);
				// 	console.log('createPeerConnection', JSON.parse(e.data));
				
				
					// ws.current.send(
					// 	JSON.stringify({
					// 		type: 'triggerLocalStream',
					// 		fromClient: fromClient,
					// 		toClient: toClient,
					// 	})
					// );

					// break;
				// case 'acceptLocalStream':
		

				// 	break;
				case 'offer':
					// const { offer, fromClient, toClient, candidate } = JSON.parse(e.data);
			
					// ws.current.send(
					// 	JSON.stringify({
					// 		type: 'answer',
					// 		answer: answer,
					// 		fromClient: fromClient,
					// 		toClient: toClient,
					// 	})
					// );

					break;
				case 'answer':
					console.log('answer', data.answer);
					console.log('RTC peer connections', connection);
					break;
				case 'candidate':
					console.log('candidate', data.candidate);
					break;
			}
		};

		ws.current.onerror = (event) => {
			console.error(event);
		};
		return () => {};
	}, [messages, connections]);

	const getMediaFeed = (id) => {
		console.log('Requesting local stream');
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: true,
			})
			.then((stream) => {
				videoTag.current.srcObject = stream;
				localstream = stream;
				console.log('Received local stream');
				call(id);
			})
			.catch((e) => {
				console.log(e);
			});
	};


	const call = async (id) => {
		console.log('Starting call');
		const videoTracks = localstream.getVideoTracks();
		const audioTracks = localstream.getAudioTracks();

		if (videoTracks.length > 0) {
			console.log(`Using Video device: ${videoTracks[0].label}`);
		}
		if (audioTracks.length > 0) {
			console.log(`Using Audio device: ${audioTracks[0].label}`);
		}
		// let servers = null;
		pc1 = new RTCPeerConnection(configuration);
		console.log('Created local peer connection object pc1', pc1.signalingState);
	
	
		ws.current.send(JSON.stringify({ type: 'createPeerConnection', toClient: id }));

		// localstream.getTracks().forEach((track) => pc1.addTrack(track, localstream));

		// pc1.createOffer({
		// 				offerToReceiveAudio: 1,
		// 				offerToReceiveVideo: 1,
		// 			}).then(gotDescription1, onCreateSessionDescriptionError);

		// ws.addEventListener('acceptLocalStream', async message => {
		// 	console.log("new on message", message)
		// 	// if (message.answer) {
		// 	// 	const remoteDesc = new RTCSessionDescription(message.answer);
		// 	// 	await peerConnection.setRemoteDescription(remoteDesc);
		// 	// }
		// });
	};


	return (
		<div>
			<ChatWindowContainer>
				<CombinedContainer>
					<TableContainer>
						<Table>
							<TableBody>
								{messages.map((message, index) => {
									const { date, time } = message.timeStamp;

									return (
										<tr key={index}>
											<TableRowUser width='10%' key={index}>
												{message.name}
											</TableRowUser>
											<TableRowMessage width='75%'>{message.message}</TableRowMessage>
											<TableRowTimeStamp width='15%'>{time}</TableRowTimeStamp>
										</tr>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>

					<InfoContainer>
						<OnlineContainer>
							<Online>
								{connections.map((data, key) => (
									<li key={key}>
										{data.username}
										<button
											onClick={async (e) => {
												const msg = 'this is a test pvt';
												ws.current.send(
													JSON.stringify({
														type: 'private-message',
														targetId: data.id,
														targetName: data.username,
														msg: msg,
													})
												);
												await setUser({
													type: 'private-message',
													targetId: data.id,
													targetName: data.username,
													msg: msg,
												});
											}}
										>
											Private
										</button>
										<button
											onClick={async () => {
												// await makeCall(data.id);
												getMediaFeed(data.id);
											}}
										>
											Video
										</button>
									</li>
								))}
							</Online>
						</OnlineContainer>
					</InfoContainer>
				</CombinedContainer>
				<div>
					<InputMessage
						type='text'
						placeholder={'Enter message...'}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<MessageButton
						onClick={() => {
							ws.current.send(
								JSON.stringify({
									type: 'message',
									name: setUsername,
									message: input,
									timeStamp: unixTimestamp(),
								})
							);
						}}
						type='submit'
					>
						Send
					</MessageButton>
				</div>
			</ChatWindowContainer>
			<video id={'this.props.id'} ref={videoTag} autoPlay>
				Video 1
			</video>
			<video id={'this.props.id'} ref={videoTag2} autoPlay>
				Video 2
			</video>
		</div>
	);
};

export default WsMainRoom;
