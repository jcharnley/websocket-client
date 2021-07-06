import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import styled from 'styled-components';
import 'antd/dist/antd.css';
// import { InfoContainer } from '../styles/app-styles';
import { MessageOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

type Rooms = {
	connections: any;
	current: any;
	setRoomsList: any;
	currentRooms: any;
};

const OnlineContainer = styled.div`
	// list-style: none;
`;

const Online = styled.ul`
	// text-align: center;
	list-style: none;
	padding: 0;
	margin: 0;
`;

const ListUser = styled.li`
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Username = styled.span`
	flex: 1;
`;

export const OnlineUser: FunctionComponent<Rooms> = ({ connections, current, setRoomsList, currentRooms }) => {
let length = Object.keys(currentRooms).length;
	return (

		<OnlineContainer>
		<Online>
			{connections.map((data, key) => (
				<div key={key}>
					<ListUser>
						<Username>{data.username}</Username>
						<MessageOutlined
							style={{ marginRight: '5px' }}
							onClick={async (e) => {
								current.send(
									JSON.stringify({
										id: length,
										type: 'private_messages_start',
										targetId: data.id,
										targetName: data.username,
										privateRoomActive: true
									})
								);
							}}
						/>
					</ListUser>
					<Divider style={{ margin: 0 }} />
				</div>
			))}
		</Online>
	</OnlineContainer>
	)
};