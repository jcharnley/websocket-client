import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {
	TableContainer,
	Table,
	TableBody,
	TableRowUser,
	TableRowMessage,
	TableRowTimeStamp,
} from '../styles/app-styles';

type Rooms = {
	// connections: any;
	// current: any;
	// setRoomsList: any;
	// currentRooms: any;
	messages: any
};

export const MessagingRooms: FunctionComponent<Rooms> = ({ messages }) => {
	console.log("messages", messages)
	return (
		<TableContainer>
			<Table>
				<TableBody>
					{messages && messages.map((message, index) => {
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
	);
};
