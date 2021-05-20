import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { InfoContainer, OnlineContainer, Online } from '../styles/app-styles';
type Users = {
    connections: any,
	current: any,
	setUser: any,
};

export const OnlineUser: FunctionComponent<Users> = ({ connections, current, setUser }) => (
	<OnlineContainer>
		<Online>
			{connections.map((data, key) => (
				<li key={key}>
					{data.username}
					{/* <button
						onClick={async (e) => {
							// const msg = 'this is a test pvt';
							current.send(
								JSON.stringify({
									type: 'private-message',
									targetId: data.id,
									targetName: data.username,
									// msg: msg,
								})
							);
							await setUser({
								type: 'private-message',
								targetId: data.id,
								targetName: data.username,
								// msg: msg,
							});
						}}
					>
						Private
					</button>
					<button
						onClick={async () => {
							// await makeCall(data.id);
							// getMediaFeed(data.id);
						}}
					>
						Video
					</button> */}
				</li>
			))}
		</Online>
	</OnlineContainer>
);

// const el = <Card title="Welcome!" paragraph="To this example" />
