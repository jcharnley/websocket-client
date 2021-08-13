import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { unixTimestamp } from "../util";
import { OnlineUser } from "../components/online-users";
import { MessageInput } from "../components/message-input";
import { Roomlist } from "../pages/sub-pages/room-list";
import { MessagingRooms } from "../components/messaging_rooms";
import { FileInput } from "../components/file-input";
// import VideoChat from './videoChat'

import {
	InputContainer,
	CombinedContainer,
	ChatWindowContainer,
} from "../styles/app-styles";
import { InfoContainer } from "../styles/online-users-styles";

const WsMainRoom = () => {
	let history = useHistory();
	const [input, setInput] = React.useState("");
	const [msgAlert, setMsgAlert] = React.useState({});
	// const [inputVideo, setVideo] = React.useState({});
	// const [connection, setRemotePConnetion] = React.useState();
	const [messages, setMessages] = React.useState([]);
	const [isActive, setActive] = React.useState(null);
	const [pvtMessages, setPvtMessages] = React.useState<any[]>([
		[
			{
				id: 0,
				name: "main_room_placeholder",
				message: "null",
				privateRoomID: "main_room",
				timeStamp: { date: "Jul 06", time: "10:53:55" },
			},
		],
	]);
	const [connections, setConnections] = React.useState([]);

	const [currentRooms, setRoomsList] = React.useState([
		{
			id: 0,
			default: true,
			targetName: "general",
		},
	]);
	const ws = useRef(null);
	// let isActiveCurrent = useRef(isActive);
	const setUsername = history.location.search.split("?")[1];

	// const settingNewMessage = (data) => {
	// 	setMsgAlert({
	// 		type: 'private_message',
	// 		data: data.privateRoomMsg[0],
	// 		privateRoomID: data.privateRoomMsg[0].privateRoomID,
	// 		newMsg: true
	// 	})
	// } 

	useEffect(() => {
		// create websocket connection
		ws.current = new WebSocket(`ws://localhost:8090`);
		ws.current.onopen = () => {
			ws.current.send(
				JSON.stringify({
					type: "set_username",
					setName: setUsername,
					timeStamp: unixTimestamp(),
				})
			);
		};

		ws.current.onclose = () => {
			console.log("ws closed");
		};

		fetch("/chat")
			.then((response) => {
				return response.json();
			})
			.then((responseJson) => {
				setMessages(responseJson);
			})
			.catch((error) => {
				console.log("error reaching /chat route", error);
			});

		return () => {
			ws.current.close();
		};
	}, [setUsername]);

	useEffect(() => {
		ws.current.onmessage = async (e) => {
			let data = JSON.parse(e.data);
			switch (data.type) {
				case "message":
					setMessages([...messages, data]);
					setMsgAlert({
						type: data.type,
						newMsg: true
					})
					break;
				case "connections":
					setConnections(data.connections);
					break;
				case "private_room_created":
					console.log("data", data)
					await setRoomsList((currentRooms) => {
						return [
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
						]
					});
					
					break;
				case "private_message_room":
					const found = pvtMessages.find(
						(x, i) => {
							console.log("x", x)
							console.log("data.privateRoomMsg[0].id", data.privateRoomMsg[0].id)
							return x[0].privateRoomID === data.privateRoomMsg[0].privateRoomID
						}

					);

					if (found) {
						setPvtMessages(
							pvtMessages.map((x) => {
								if (x[0].privateRoomID !== data.privateRoomMsg[0].privateRoomID) return x;
								return [...x, data.privateRoomMsg.slice(-1)[0]];
							})
						);
						setMsgAlert({
							type: 'private_message',
							data: data.privateRoomMsg[0],
							privateRoomID: data.privateRoomMsg[0].privateRoomID,
							newMsg: true
						})
					} else {
						setPvtMessages([...pvtMessages, [data.privateRoomMsg[0]]]);
						// console.log("pvtMessages", pvtMessages)

						setMsgAlert({
							type: 'private_message',
							data: data.privateRoomMsg[0],
							privateRoomID: data.privateRoomMsg[0].privateRoomID,
							newMsg: true
						})
					}
					break;
			}
		};

		ws.current.onerror = (event) => {
			console.error(event);
		};
		return () => { };
	}, [messages, connections, isActive, pvtMessages, currentRooms]);
	return (
		<ChatWindowContainer id={"chatContainer"} className={"chatContainerClass"}>
			<InfoContainer className={"onlineInfoClass"}>
				<OnlineUser
					connections={connections}
					current={ws.current}
					//shouldnt need currentRooms here, need to remove when alternative is working
					currentRooms={currentRooms}
					setRoomsList={setRoomsList}
				/>
			</InfoContainer>
			<CombinedContainer
				id={"CombinedContainer"}
				className={"combinedContainerClass"}
			>
				<Roomlist
					rooms={currentRooms}
					isActive={isActive}
					setActive={setActive}
					msgAlert={msgAlert}
					setMsgAlert={setMsgAlert}
				></Roomlist>
				<MessagingRooms
					messages={
						isActive === undefined
							? messages
							: pvtMessages.find((obj, i) => {
								console.log("obj[0]",obj)
								if (obj[0].privateRoomID === isActive) {
									return obj;
								} else {
									return null;
								}
							})
					}
				></MessagingRooms>
			</CombinedContainer>
			<InputContainer className={"InputContainerClass"}>
				<FileInput current={ws.current}></FileInput>
				<MessageInput
					username={setUsername}
					current={ws.current}
					input={input}
					setInput={setInput}
					rooms={currentRooms}
				/>
			</InputContainer>
		</ChatWindowContainer>
	);
};

export default WsMainRoom;
