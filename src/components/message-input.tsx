import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { InputMessage, MessageButton } from '../styles/app-styles';
import { unixTimestamp } from '../util';

type messageObject = {
	username: any;
	current: any;
	input: any;
	setInput: any;
};


export const MessageInput: FunctionComponent<messageObject> = ({ current, username, input, setInput}) => (
	<div>
		<InputMessage
			type='text'
			placeholder={'Enter message...'}
			value={input}
			onChange={(e) => setInput(e.target.value)}
		/>
		<MessageButton
			onClick={() => {
				current.send(
					JSON.stringify({
						type: 'message',
						name: username,
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
);

