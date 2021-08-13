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
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	overflow-y: scroll;
	::-webkit-scrollbar { 
		display: none;
	}
	
`;

const ListUser = styled.li`
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Username = styled.span`
	flex: 1;
	padding-left: 2px;
	font-size: 12px;
	width: 50px;
`;

export const OnlineUser: FunctionComponent<Rooms> = ({ connections, current, setRoomsList, currentRooms }) => {
	let length = Object.keys(currentRooms).length;
	return (
		<OnlineContainer className={'onlineUsersContainerClass'}>
			<Online>
				{connections.map((data, index) => (
					<ListUser key={index}>
						&nbsp;
						<Username
						title={data.username}
						>{data.username}
						</Username>
						<MessageOutlined
						    title={"private message"}
							style={{ marginRight: '5px', fontSize: '12px' }}
							onClick={async (e) => {
								console.log("data online user", data)
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
						<Divider type={'vertical'} style={{margin: ""}}/>
					</ListUser>


				))}
			</Online>
		</OnlineContainer>
	)
};