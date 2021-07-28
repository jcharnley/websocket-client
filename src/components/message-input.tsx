import React, { FunctionComponent } from 'react'; // importing FunctionComponent
// import { Roomlist } from '../pages/sub-pages/room-list';
import { InputMessage, MessageButton, TextInputContainer } from '../styles/app-styles';
import { unixTimestamp } from '../util';

type messageObject = {
	username: any;
	current: any;
	input: any;
	setInput: any;
	rooms: any;
};

export const MessageInput: FunctionComponent<messageObject> = ({ current, username, input, setInput, rooms }) => {
	
	
	
	 // Input Field handler
	 const handleUserInput = (e) => {
		setInput(e.target.value);
	  };
	
	  // Reset Input Field handler
	  const resetInputField = () => {
		setInput("");
	  };
	  // Handle enter key press
	//   const handleKeyDown = (event) => {
	// 	if (event.key === 'Enter') {
	// 		console.log("input",input)
	// 		setInput(input);
	// 	}
	//   }
	
	const roomTarget = (roomList) => {

		if (roomList.targetName === 'general') {
			current.send(
				JSON.stringify({
					type: 'message',
					name: username,
					message: input,
					timeStamp: unixTimestamp(),
				})
			);
		}

		if (roomList.privateRoomActive === true) {
			current.send(
				JSON.stringify({
					type: 'private_message_room',
					id: roomList.id,
					privateRoomID: roomList.privateRoomID,
					targetId: roomList.targetId,
					targetName: roomList.targetName,
					name: username,
					message: input,
					timeStamp: unixTimestamp()
				})
			);
		}
	};

	return (
		<TextInputContainer>
			<InputMessage
				type='text'
				placeholder={'Enter message...'}
				value={input}
				onChange={handleUserInput}
				// onKeyDown={handleKeyDown}
			/>
			<MessageButton
				onClick={() => {
					// console.log('room selected', rooms);
					rooms.forEach((roomList) => {
						if (roomList.selected === true) {
							roomTarget(roomList);
						}
					});
					resetInputField()
				}}
				type='submit'
			>
				Send
			</MessageButton>
		</TextInputContainer>
	);
};
