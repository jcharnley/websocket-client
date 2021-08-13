import React, { FunctionComponent } from "react"; // importing FunctionComponent
// import styled from "styled-components";
import "antd/dist/antd.css";
// import { Divider } from "antd";
import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableRowUser,
	TableRowMessage,
	TableRowTimeStamp,
} from "../styles/messaging-rooms-styles";

type Rooms = {
	// connections: any;
	// current: any;
	// setRoomsList: any;
	// currentRooms: any;
	messages: any;
};

export const MessagingRooms: FunctionComponent<Rooms> = ({ messages }) => {
	// let prev;
	// let current;
	// let forward;
	// if (messages === undefined) {
	// } else {
	// 	prev = messages.length - 1;
	// 	current = messages.length;
	// 	forward = messages.length + 1;

	// }

	return (
		<TableContainer className={"messagingRoomsClass"}>
			<Table className={"msgRoomTable"}>
				<TableBody className={"msgRoom TableBody"}>
					{messages &&
						messages.map((message, index) => {
							const { date, time } = message.timeStamp;
							return (
									<TableRow key={index}>
										<TableRowTimeStamp>
											&nbsp;<span>{time}&nbsp;&nbsp;</span>&nbsp;
										</TableRowTimeStamp>
										<TableRowUser>
											&nbsp;
											<span>{message.name}:</span>
											&nbsp; &nbsp;
										</TableRowUser>
										<TableRowMessage>{message.message}</TableRowMessage>
									</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
