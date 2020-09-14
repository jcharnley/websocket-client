import React, { useRef, useEffect } from 'react';
import './App.css';

const VideoChat = (props) => {
	const selectedUser = props.selectedUser;
	const ws = props.ws;

	const [input, setInput] = React.useState({});
	const [messages, setMessages] = React.useState([]);
	const videoTag = useRef(null);


	
	const startChat = async () => {
		if (!videoTag) {
			return;
		}
		navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			let video = videoTag.current;
			videoTag.current.srcObject = stream;
			setInput(video.srcObject);
			// video.play();
		});
	};

	return (
		<div>
			<h1>This is the video chat</h1>
			<button
				onClick={() => {
					input.getTracks().forEach((track) => track.stop());

					console.log(input);
				}}
			>
				Off
			</button>
			<button
				onClick={() => {
					startChat();
				}}
			>
				On
			</button>

			<video id={'this.props.id'} ref={videoTag} autoPlay></video>
		</div>
	);
};

export default VideoChat;
